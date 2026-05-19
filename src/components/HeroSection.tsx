'use client';

import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SUGGESTED_PROMPTS = [
  'How do I solve quadratic equations?',
  'Why is the sky blue?',
  'What is photosynthesis?',
];

export default function HeroSection() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  function handlePromptClick(prompt: string) {
    router.push(`/chat?q=${encodeURIComponent(prompt)}`);
  }

  function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;
    router.push(`/chat?q=${encodeURIComponent(trimmed)}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <section className="relative px-4 py-20 sm:py-28 md:py-36">

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Branding */}
        <div className="mb-8 flex items-center gap-3">
          <Image
            src="/apex-orb.png"
            alt="Apex Tutor orb logo"
            width={48}
            height={48}
            priority
          />
          <span
            className="font-black"
            style={{
              fontSize: '28px',
              letterSpacing: '0.56px',
              color: '#232323',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 860,
            }}
          >
            APEX TUTOR
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mb-10 max-w-[550px] text-center"
          style={{
            fontSize: '48px',
            lineHeight: '64px',
            color: '#232323',
            fontWeight: 500,
          }}
        >
          99% cheaper than getting a real-world tutor.
        </h1>

        {/* Search input box */}
        <div
          className="flex w-full items-center gap-3"
          style={{
            maxWidth: '825px',
            background: '#ffffff',
            border: '2px solid #62d0ff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0px 4px 10px rgba(51,51,51,0.12)',
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What topic or subject do you need help with?"
            aria-label="Ask Apex Tutor a question"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-[#6b7c94]"
            style={{
              color: '#232323',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send question"
            className="flex flex-shrink-0 items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: '#6163fe',
              height: '32px',
              padding: '8px 12px',
              borderRadius: '8px',
              boxShadow: 'inset 0px -2px 3px rgba(48,48,48,0.12)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span
              className="font-semibold"
              style={{
                color: '#ffffff',
                fontSize: '14px',
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                lineHeight: 1,
              }}
            >
              Send
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </button>
        </div>

        {/* Suggested prompts */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
          aria-label="Suggested prompts"
        >
          <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
            Try me:
          </span>
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePromptClick(prompt)}
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#6163fe',
                padding: '4px 12px',
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
