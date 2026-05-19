'use client';

import { useState, useRef, useEffect } from 'react';

interface OnboardingNameProps {
  onSubmit: (name: string) => void;
}

function ApexAvatar() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '11px',
        fontWeight: 700,
        color: '#ffffff',
      }}
    >
      A
    </div>
  );
}

export default function OnboardingName({ onSubmit }: OnboardingNameProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <ApexAvatar />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#334155', margin: '0 0 14px', lineHeight: 1.5 }}>
            First things first — what&apos;s your name?
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your first name..."
              maxLength={40}
              style={{
                flex: 1,
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '9px 13px',
                fontSize: '14px',
                color: '#334155',
                background: '#fafafa',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = '#6163fe';
                (e.currentTarget as HTMLInputElement).style.background = '#ffffff';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLInputElement).style.background = '#fafafa';
              }}
              aria-label="Your first name"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!value.trim()}
              style={{
                background: '#6163fe',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: value.trim() ? 'pointer' : 'not-allowed',
                opacity: value.trim() ? 1 : 0.4,
                whiteSpace: 'nowrap',
                transition: 'opacity 0.15s',
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
