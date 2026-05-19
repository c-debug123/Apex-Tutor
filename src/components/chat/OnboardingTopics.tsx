'use client';

import { useState } from 'react';

interface OnboardingTopicsProps {
  subject: 'math' | 'science';
  onContinue: (topics: string[]) => void;
}

const TOPICS_BY_SUBJECT: Record<'math' | 'science', string[]> = {
  math: ['Multiplication and division'],
  science: ['Solar System'],
};

export default function OnboardingTopics({ subject, onContinue }: OnboardingTopicsProps) {
  const options = TOPICS_BY_SUBJECT[subject];
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(topic: string) {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  return (
    <div className="flex items-start gap-3">
      {/* Apex avatar */}
      <div
        aria-hidden="true"
        className="flex flex-shrink-0 items-center justify-center text-xs font-bold text-white"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
          fontSize: '11px',
        }}
      >
        A
      </div>

      <div className="flex flex-col gap-1" style={{ maxWidth: '65%' }}>
        <div
          className="px-4 py-3"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
          }}
        >
          <p className="mb-3 text-sm leading-relaxed" style={{ color: '#334155' }}>
            Please tell us what topic you need help with (check all that applies).
          </p>

          <fieldset className="mb-3">
            <legend className="sr-only">Select topics</legend>
            <div className="flex flex-col gap-2">
              {options.map((topic) => {
                const checked = selected.includes(topic);
                return (
                  <label
                    key={topic}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors"
                    style={{
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="flex flex-shrink-0 items-center justify-center"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: checked ? '2px solid #6163fe' : '2px solid #cbd5e1',
                        background: checked ? '#6163fe' : '#ffffff',
                        transition: 'all 0.15s',
                      }}
                    >
                      {checked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle(topic)}
                      aria-label={topic}
                    />
                    <span className="text-sm" style={{ color: '#334155' }}>
                      {topic}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => onContinue(selected)}
            disabled={selected.length === 0}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: '#6163fe',
              borderRadius: '8px',
              border: 'none',
              cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
