import { NextRequest, NextResponse } from 'next/server';
import { getGroqClient } from '@/lib/groq';
import { buildTutorPrompt } from '@/lib/tutor-orchestrator';
import { getStudentProgress, getMemorySnapshot } from '@/lib/learn';
import { TUTORS } from '@/data/tutors';
import { MATHEMATICS_SUBTOPICS } from '@/data/curriculum/mathematics';
import { TutorChatResponse, LessonPhase, Subtopic, Lesson } from '@/types/tutor';

type Language = 'english' | 'taglish' | 'tagalog';

interface ChatBody {
  lessonId: string;
  subtopicId: string;
  message: string;
  phase: LessonPhase;
  language: Language;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}

function extractTutorJson(raw: string): TutorChatResponse | null {
  // Try direct parse first
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed.reply === 'string' && typeof parsed.phase === 'string') {
      return parsed as unknown as TutorChatResponse;
    }
  } catch {
    // fall through
  }

  // Extract first {...} block
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]) as Record<string, unknown>;
    if (typeof parsed.reply === 'string' && typeof parsed.phase === 'string') {
      return parsed as unknown as TutorChatResponse;
    }
  } catch {
    return null;
  }

  return null;
}

function getAllSubtopics(): Subtopic[] {
  return MATHEMATICS_SUBTOPICS;
}

function findSubtopicAndLesson(
  subtopicId: string,
  lessonId: string
): { subtopic: Subtopic; lesson: Lesson } | null {
  const allSubtopics = getAllSubtopics();
  const subtopic = allSubtopics.find((s) => s.id === subtopicId);
  if (!subtopic) return null;
  const lesson = subtopic.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  return { subtopic, lesson };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tutorId: string }> }
) {
  const { tutorId } = await params;

  // Validate tutor
  const tutor = TUTORS.find((t) => t.id === tutorId);
  if (!tutor) {
    return NextResponse.json({ error: 'Tutor not found.' }, { status: 404 });
  }

  // Parse body
  let body: Partial<ChatBody>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { lessonId, subtopicId, message, phase, language, history } = body;

  if (!lessonId || !subtopicId || !message || !phase) {
    return NextResponse.json(
      { error: 'lessonId, subtopicId, message, and phase are required.' },
      { status: 400 }
    );
  }

  // Resolve lesson and subtopic from curriculum
  const curriculumResult = findSubtopicAndLesson(subtopicId, lessonId);
  if (!curriculumResult) {
    return NextResponse.json({ error: 'Lesson or subtopic not found.' }, { status: 404 });
  }
  const { subtopic, lesson } = curriculumResult;

  // Get Firebase auth token (optional — logged for analytics but not required)
  const authHeader = req.headers.get('Authorization');
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  // Attempt to load student progress and memory from Firestore
  // We use a stub userId when unauthenticated
  let progress = null;
  let memory = null;

  if (idToken) {
    try {
      // Decode JWT to get uid (without verifying — this is client-side context)
      // For full auth verification, use firebase-admin. Here we use the uid from the token payload.
      const payload = JSON.parse(
        Buffer.from(idToken.split('.')[1], 'base64').toString('utf8')
      ) as { user_id?: string; sub?: string };
      const userId = payload.user_id ?? payload.sub ?? null;
      if (userId) {
        [progress, memory] = await Promise.all([
          getStudentProgress(userId, subtopicId).catch(() => null),
          getMemorySnapshot(userId, subtopicId).catch(() => null),
        ]);
      }
    } catch {
      // non-fatal — proceed without personalization
    }
  }

  const resolvedLanguage: Language = (['english', 'taglish', 'tagalog'] as Language[]).includes(
    language as Language
  )
    ? (language as Language)
    : 'english';

  const resolvedPhase: LessonPhase = (['teach', 'practice', 'quiz', 'review'] as LessonPhase[]).includes(
    phase as LessonPhase
  )
    ? (phase as LessonPhase)
    : 'teach';

  const resolvedHistory = Array.isArray(history) ? history.slice(-12) : [];

  try {
    const groq = getGroqClient();

    const { groqMessages } = buildTutorPrompt({
      tutor,
      subtopic,
      lesson,
      progress,
      memory,
      language: resolvedLanguage,
      phase: resolvedPhase,
      history: resolvedHistory,
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        ...groqMessages,
        { role: 'user', content: message },
      ],
      max_tokens: 1536,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    const parsed = extractTutorJson(raw);

    if (!parsed) {
      return NextResponse.json({
        reply: raw || 'Sorry, something went wrong. Please try again.',
        phase: resolvedPhase,
        confusion_detected: false,
        mastery_signal: 'neutral',
        suggestions: ['Can you explain that again?', 'Give me an example.', 'I think I understand!'],
      } satisfies TutorChatResponse);
    }

    // Normalize and validate the response
    const validPhases: LessonPhase[] = ['teach', 'practice', 'quiz', 'review'];
    const responsePhase: LessonPhase = validPhases.includes(parsed.phase as LessonPhase)
      ? (parsed.phase as LessonPhase)
      : resolvedPhase;

    const validSignals = ['strong', 'neutral', 'weak'];
    const masterySignal = validSignals.includes(parsed.mastery_signal as string)
      ? parsed.mastery_signal
      : 'neutral';

    const suggestions = (Array.isArray(parsed.suggestions) ? parsed.suggestions : [])
      .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
      .slice(0, 3);

    while (suggestions.length < 3) {
      suggestions.push(
        ['Can you explain more?', 'Give me an example.', 'Let me try one!'][suggestions.length]
      );
    }

    const response: TutorChatResponse = {
      reply: parsed.reply,
      phase: responsePhase,
      confusion_detected: Boolean(parsed.confusion_detected),
      mastery_signal: masterySignal as TutorChatResponse['mastery_signal'],
      suggestions,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('[api/tutor/chat]', (err as Error).message);
    return NextResponse.json(
      { error: 'Tutor is temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
