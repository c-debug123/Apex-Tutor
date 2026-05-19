import { NextRequest, NextResponse } from 'next/server';

const LOCAL_TTS_URL = process.env.TTS_SERVER_URL ?? 'http://127.0.0.1:8880/tts';

// Strip markdown so TTS doesn't read "asterisk asterisk bold asterisk asterisk"
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/━+/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export async function POST(req: NextRequest) {
  // Require a signed-in user
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const rawText = typeof body.text === 'string' ? body.text.trim() : '';
  if (!rawText) {
    return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
  }

  const text = stripMarkdown(rawText).slice(0, 600);

  try {
    const ttsResponse = await fetch(LOCAL_TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text();
      console.error('[api/tts] local server error:', ttsResponse.status, errText.slice(0, 200));
      return NextResponse.json({ error: 'Voice generation failed.' }, { status: 502 });
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[api/tts]', (err as Error).message);
    return NextResponse.json({ error: 'Voice unavailable. Try again.' }, { status: 500 });
  }
}
