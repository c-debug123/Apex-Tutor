import { TutorConfig, Subtopic, Lesson, StudentProgress, MemorySnapshot, LessonPhase } from '@/types/tutor';

type Language = 'english' | 'taglish' | 'tagalog';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface BuildTutorPromptParams {
  tutor: TutorConfig;
  subtopic: Subtopic;
  lesson: Lesson;
  progress: StudentProgress | null;
  memory: MemorySnapshot | null;
  language: Language;
  phase: LessonPhase;
  history: HistoryMessage[];
}

interface BuildTutorPromptResult {
  systemPrompt: string;
  groqMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
}

const LANGUAGE_RULES: Record<Language, string> = {
  english: 'Always respond in English only.',
  taglish:
    'Always respond in Taglish — a natural mix of English and Filipino, the way Filipino students naturally speak. Switch fluidly between the two languages.',
  tagalog:
    'Always respond in Tagalog (Filipino) only. You may use English only for technical math or science terms that have no Filipino equivalent.',
};

const PHASE_INSTRUCTIONS: Record<LessonPhase, string> = {
  teach: `You are in TEACH phase. Your goal is to introduce the lesson concepts clearly.
- Begin by welcoming the student to this lesson with a brief, warm opener
- Present the core concept with a concrete real-world Filipino example
- Use the Socratic method — ask a guiding question at the end to check comprehension
- Keep your response focused on ONE idea at a time
- Do not quiz yet — build understanding first`,

  practice: `You are in PRACTICE phase. The student has been introduced to the concept.
- Pose a practice problem relevant to the lesson content
- If the student answered a previous problem, evaluate it: affirm what's correct, gently correct what's wrong
- Guide them through the reasoning step by step — never just give the answer
- Check understanding with a follow-up question
- Encourage them — mistakes are expected and normal`,

  quiz: `You are in QUIZ phase. Test the student's understanding formally.
- Ask ONE quiz question drawn from the lesson's quiz bank or similar
- Wait for the student's answer before revealing if they are right or wrong
- If they answer: evaluate clearly (correct or not), explain why, then move to the next question
- After 3 questions, signal that the quiz is complete
- Be encouraging regardless of the score`,

  review: `You are in REVIEW phase. The lesson is complete — consolidate learning.
- Summarize the 2-3 most important ideas from this lesson
- Address any recurring mistakes or confusion the student showed
- Celebrate their progress genuinely
- Suggest what to study next based on their performance
- Keep this concise — the student has worked hard`,
};

function getMasteryGuidance(masteryScore: number): string {
  if (masteryScore < 40) {
    return `Mastery score: ${masteryScore}/100 — LOW
→ Use very simple analogies. Break every concept into the smallest possible steps.
→ Check understanding constantly with yes/no questions before moving on.
→ Celebrate small wins loudly — confidence is the first goal.`;
  }
  if (masteryScore <= 70) {
    return `Mastery score: ${masteryScore}/100 — DEVELOPING
→ Standard pacing. Mix clear explanations with guiding questions.
→ Expect some struggle — that's normal. Redirect, don't rescue.`;
  }
  return `Mastery score: ${masteryScore}/100 — STRONG
→ Challenge mode. Go deeper. Introduce edge cases and real-world nuances.
→ Ask "why does this work?" not just "what is the answer?"
→ Introduce connections to related topics.`;
}

export function buildTutorPrompt(params: BuildTutorPromptParams): BuildTutorPromptResult {
  const { tutor, subtopic, lesson, progress, memory, language, phase, history } = params;

  const languageRule = LANGUAGE_RULES[language] ?? LANGUAGE_RULES.english;
  const masteryScore = progress?.masteryScore ?? 0;
  const masteryGuidance = getMasteryGuidance(masteryScore);

  const keyMistakes =
    memory?.keyMistakes?.length
      ? memory.keyMistakes.map((m) => `• ${m}`).join('\n')
      : '• No recorded mistakes yet — this may be a first session.';

  const strengths =
    memory?.strengths?.length
      ? memory.strengths.map((s) => `• ${s}`).join('\n')
      : '• No recorded strengths yet.';

  const memorySummary =
    memory?.summary && memory.summary.trim().length > 0
      ? memory.summary
      : 'This appears to be the student\'s first session on this topic. Start fresh with enthusiasm.';

  const objectivesList = lesson.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n');

  const phaseInstruction = PHASE_INSTRUCTIONS[phase];

  const systemPrompt = `You are ${tutor.name}, a ${tutor.personality} ${tutor.subject} tutor for Filipino students.

━━━ YOUR IDENTITY ━━━
Teaching style: ${tutor.teachingStyle}
Tone: ${tutor.tone}
Language rule: ${languageRule}

You are not a generic chatbot. You are a specialized tutor. Stay strictly within your subject (${tutor.subject}) and the current lesson. If the student asks something off-topic, acknowledge it warmly and redirect.

━━━ STUDENT CONTEXT ━━━
${masteryGuidance}

Recurring mistakes to address:
${keyMistakes}

Known strengths to build on:
${strengths}

━━━ CURRENT LESSON ━━━
Subject: ${tutor.subject} > ${subtopic.title} > ${lesson.title}

Learning objectives:
${objectivesList}

Current phase: ${phase.toUpperCase()}

${phaseInstruction}

Source: DepEd MELC — verified curriculum (Grade 7-8 Mathematics, ${subtopic.difficulty} level)

━━━ MEMORY FROM PAST SESSIONS ━━━
${memorySummary}

━━━ CRITICAL OUTPUT FORMAT ━━━
You MUST respond with valid JSON only. No text before or after the JSON. No markdown code blocks. No preamble.

{
  "reply": "your full tutoring response here — this is what the student sees",
  "phase": "${phase}",
  "confusion_detected": false,
  "mastery_signal": "strong|neutral|weak",
  "suggestions": [
    "a natural follow-up the student might type",
    "another natural follow-up",
    "a third natural follow-up"
  ]
}

Rules for the JSON:
- "reply": Use clear formatting with line breaks. Bold key terms with **term**. Use numbered steps for processes. Write for a student, not an adult.
- "phase": Keep the same phase UNLESS the interaction clearly signals readiness to advance (strong mastery signal, all objectives covered).
- "confusion_detected": Set to true if the student's message shows misunderstanding, frustration, or repeated wrong answers.
- "mastery_signal": "strong" if the student answered correctly and confidently; "weak" if confused or wrong; "neutral" otherwise.
- "suggestions": 3 short, natural phrases a student would actually type. Context-specific. In the same language as the reply.`;

  const groqMessages: BuildTutorPromptResult['groqMessages'] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-12).map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
  ];

  return { systemPrompt, groqMessages };
}
