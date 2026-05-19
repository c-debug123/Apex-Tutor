'use client';

import { useState, useRef, useCallback } from 'react';

interface ReadAloudButtonProps {
  text: string;
  getIdToken: () => Promise<string | null>;
}

type State = 'idle' | 'loading' | 'playing';

export default function ReadAloudButton({ text, getIdToken }: ReadAloudButtonProps) {
  const [state, setState] = useState<State>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setState('idle');
  }, []);

  const play = useCallback(async () => {
    if (state === 'playing') {
      stop();
      return;
    }

    setState('loading');

    try {
      const idToken = await getIdToken();
      if (!idToken) {
        setState('idle');
        return;
      }

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        setState('idle');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

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
    } catch {
      setState('idle');
    }
  }, [state, stop, text]);

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ animation: 'spin 1s linear infinite' }}
        >
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : state === 'playing' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
