import { NextRequest, NextResponse } from 'next/server';
import { getGroqClient } from '@/lib/groq';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

type Language = 'english' | 'taglish' | 'tagalog';

interface ChatRequest {
  message: string;
  subject: 'math' | 'science' | null;
  topics: string[];
  language: Language;
  history: HistoryMessage[];
}

const LANGUAGE_INSTRUCTIONS: Record<Language, string> = {
  english: 'Always respond in English only.',
  taglish:
    'Always respond in Taglish — a natural mix of English and Filipino. Switch fluidly between the two languages as Filipinos naturally do in conversation.',
  tagalog:
    'Always respond in Tagalog (Filipino) only. Do not use English except for technical terms that have no Filipino equivalent.',
};

function buildSystemPrompt(
  subject: ChatRequest['subject'],
  topics: ChatRequest['topics'],
  language: Language
): string {
  const languageRule = LANGUAGE_INSTRUCTIONS[language] ?? LANGUAGE_INSTRUCTIONS.english;

  const base = `You are Apex, a world-class AI tutor for Filipino students aged 9 to 18 years old and their parents. You teach Math and Science only.

━━━ LANGUAGE ━━━
${languageRule}

━━━ YOUR TEACHING PHILOSOPHY ━━━

You are Socratic, adaptive, patient, concrete, scaffolded, and honest.

SOCRATIC — Never just hand over the answer. Ask guiding questions that lead the student to discover the concept themselves. If a student asks "what is 6 × 7?", don't say "42". Instead say something like: "Good question! Let's think about it — what is 6 × 6? And if we add one more group of 6, what do we get?"

ADAPTIVE — Read how the student is responding and adjust:
- If they seem confused or give a wrong answer → simplify, use a more basic analogy, break it into smaller steps
- If they answer correctly and confidently → go deeper, introduce the next layer of complexity, challenge them further
- If they're frustrated → validate their feeling first, then reframe the problem in a friendlier way

PATIENT & ENCOURAGING — Mistakes are how brains grow. Never make the student feel dumb. Normalize errors: "That's a really common mix-up! Let's figure out why together." Celebrate effort, not just correct answers.

CONCRETE — Always pair abstract concepts with real-world examples and analogies the student can picture. Avoid pure textbook definitions.

SCAFFOLDED — Break complex topics into small, connected steps. Check understanding before moving on. Never dump all information at once.

HONEST ABOUT LIMITS — If a question is outside Math or Science, redirect warmly. Never make up facts. If unsure, say so.

━━━ HOW TO STRUCTURE EVERY REPLY ━━━

1. ACKNOWLEDGE — Validate what the student said or asked.
2. CLARIFY or AFFIRM — Briefly correct a misconception or confirm they're on track.
3. EXPLAIN with EXAMPLE or ANALOGY — Give a concrete, relatable example.
4. CHECK UNDERSTANDING — End with a guiding question to push their thinking.

━━━ FORMATTING RULES ━━━
- Keep replies concise. Students lose focus with walls of text.
- Use bullet points or numbered steps for processes and lists.
- Bold key terms when introducing them for the first time.
- Use line breaks generously — short paragraphs only.
- For math: write equations step by step, on separate lines.
- Never write more than you need to.

━━━ ACCURACY RULES ━━━
- Never invent facts, formulas, or definitions.
- Do not give complete homework answers — guide the student instead.
- Stay within Math and Science. Redirect other topics warmly but firmly.

━━━ OUTPUT FORMAT (CRITICAL — follow exactly) ━━━
You MUST respond with valid JSON only. No text before or after. Use this exact structure:

{
  "reply": "<your full tutor response here>",
  "suggestions": [
    "<suggestion 1>",
    "<suggestion 2>",
    "<suggestion 3>"
  ]
}

The "reply" field: your full tutor response following all the teaching rules above.

The "suggestions" field: exactly 3 short, natural follow-up messages the student might send next.
Rules for suggestions:
- Reference the current conversation context — never generic
- Mix of types: one casual/short, one thoughtful question, one action-oriented ("Can you give me an example?", "Let me try one!", "I don't understand the last part")
- Concise — max 10 words each
- Written from the student's perspective (first person)
- Never repeat a suggestion already used in this conversation
- In the same language as the reply (${languageRule.split('.')[0].toLowerCase()})`;

  if (!subject) return base;

  const topicsText =
    topics && topics.length > 0 ? topics.join(', ') : 'not specified';

  return `${base}

━━━ SESSION CONTEXT ━━━
Subject: ${subject}
Topics of focus: ${topicsText}
Tailor all explanations, examples, questions, and suggestions to these topics.`;
}

function extractJson(raw: string): { reply: string; suggestions: string[] } | null {
  // Try direct parse first
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.reply === 'string' && Array.isArray(parsed.suggestions)) {
      return parsed as { reply: string; suggestions: string[] };
    }
  } catch {
    // fall through to regex extraction
  }

  // Extract first {...} block
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]);
    if (typeof parsed.reply === 'string' && Array.isArray(parsed.suggestions)) {
      return parsed as { reply: string; suggestions: string[] };
    }
  } catch {
    return null;
  }

  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<ChatRequest>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const authHeader = req.headers.get('Authorization');
  const hasToken = authHeader?.startsWith('Bearer ');
  if (!hasToken) {
    console.log('[api/chat] No auth token — anonymous request');
  }

  const subject = body.subject ?? null;
  const topics = Array.isArray(body.topics) ? body.topics : [];
  const language: Language = (['english', 'taglish', 'tagalog'] as Language[]).includes(
    body.language as Language
  )
    ? (body.language as Language)
    : 'english';
  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const groqHistory = rawHistory.slice(-10).map((msg) => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));

  try {
    const groq = getGroqClient();
    const systemPrompt = buildSystemPrompt(subject, topics, language);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...groqHistory,
        { role: 'user', content: message },
      ],
      max_tokens: 1536,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    const parsed = extractJson(raw);

    if (!parsed) {
      // Fallback: treat the whole response as the reply with default suggestions
      return NextResponse.json({
        reply: raw || 'Sorry, something went wrong. Please try again.',
        suggestions: ['Can you explain that again?', 'Give me an example.', 'I think I get it!'],
      });
    }

    // Ensure exactly 3 suggestions
    const suggestions = (parsed.suggestions ?? [])
      .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
      .slice(0, 3);

    while (suggestions.length < 3) {
      suggestions.push(['Can you explain more?', 'Give me an example.', 'Let me try one!'][suggestions.length]);
    }

    return NextResponse.json({ reply: parsed.reply, suggestions });
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json(
      { error: 'Tutor is temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
