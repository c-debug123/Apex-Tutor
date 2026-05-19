'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ReadAloudButtonProps {
  text: string;
  getIdToken: () => Promise<string | null>;
}

type State = 'idle' | 'loading' | 'playing';

// Strip markdown so speech doesn't read "asterisk asterisk"
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
    .trim()
    .slice(0, 600);
}

// Pick the best available voice: prefer Google/Microsoft neural voices
function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    'Google US English',
    'Microsoft Aria Online (Natural)',
    'Microsoft Jenny Online (Natural)',
    'Google UK English Female',
    'Microsoft David Online (Natural)',
    'Samantha', // macOS
    'Karen',    // macOS
  ];
  for (const name of preferred) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  // Fallback: any English voice
  return voices.find((v) => v.lang.startsWith('en')) ?? voices[0] ?? null;
}

function speakWithBrowser(text: string): void {
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.95;
  utt.pitch = 1.05;
  utt.volume = 1;
  const voice = pickVoice();
  if (voice) utt.voice = voice;
  window.speechSynthesis.speak(utt);
}

export default function ReadAloudButton({ text, getIdToken }: ReadAloudButtonProps) {
  const [state, setState] = useState<State>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const usingBrowser = useRef(false);

  // Pre-load voices on mount (browser requires this)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (usingBrowser.current && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      usingBrowser.current = false;
    }
    setState('idle');
  }, []);

  const play = useCallback(async () => {
    if (state === 'playing') {
      stop();
      return;
    }

    setState('loading');
    const clean = stripMarkdown(text);

    // Try server TTS first (requires signed-in user)
    try {
      const idToken = await getIdToken();
      if (idToken) {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ text: clean }),
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audioRef.current = audio;
          usingBrowser.current = false;

          audio.onended = () => {
            URL.revokeObjectURL(url);
            audioRef.current = null;
            setState('idle');
          };
          audio.onerror = () => {
            URL.revokeObjectURL(url);
            audioRef.current = null;
            setState('idle');
          };

          await audio.play();
          setState('playing');
          return;
        }
      }
    } catch {
      // Server TTS unavailable — fall through to browser speech
    }

    // Fallback: browser Web Speech API
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      usingBrowser.current = true;
      speakWithBrowser(clean);
      setState('playing');

      // Poll until done
      const check = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(check);
          usingBrowser.current = false;
          setState('idle');
        }
      }, 250);
    } else {
      setState('idle');
    }
  }, [state, stop, text, getIdToken]);

  const label =
    state === 'loading' ? 'Loading audio…' : state === 'playing' ? 'Stop reading' : 'Read aloud';

  return (
    <button
      type="button"
      onClick={play}
      aria-label={label}
      title={label}
      disabled={state === 'loading'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        border: '1px solid #e2e8f0',
        background: state === 'playing' ? '#6163fe' : '#ffffff',
        color: state === 'playing' ? '#ffffff' : '#94a3b8',
        cursor: state === 'loading' ? 'not-allowed' : 'pointer',
        padding: 0,
        flexShrink: 0,
        transition: 'background 0.15s, color 0.15s',
        opacity: state === 'loading' ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (state === 'idle') {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#6163fe';
          (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
        }
      }}
      onMouseLeave={(e) => {
        if (state === 'idle') {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
          (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
        }
      }}
    >
      {state === 'loading' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ animation: 'spin 1s linear infinite' }}>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : state === 'playing' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
          fill="currentColor" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
