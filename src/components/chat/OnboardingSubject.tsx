'use client';

interface OnboardingSubjectProps {
  onSelect: (subject: 'math' | 'science') => void;
}

const TUTORS = [
  {
    subject: 'math' as const,
    name: 'Ms. Reyes',
    initial: 'R',
    tagline: 'Making math click, one question at a time.',
    avatarColor: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
    badgeColor: '#6163fe',
    badgeBg: '#f1f0ff',
    label: 'Mathematics',
  },
  {
    subject: 'science' as const,
    name: 'Prof. Cruz',
    initial: 'C',
    tagline: "Science is everywhere — let's find it together.",
    avatarColor: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    badgeColor: '#0ea5e9',
    badgeBg: '#f0f9ff',
    label: 'Science',
  },
];

export default function OnboardingSubject({ onSelect }: OnboardingSubjectProps) {
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

      <div className="flex flex-col gap-3" style={{ maxWidth: '480px' }}>
        <div
          className="px-4 py-3"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
          }}
        >
          <p className="mb-3 text-sm leading-relaxed" style={{ color: '#334155' }}>
            Who do you want to learn with today?
          </p>
          <div className="flex gap-3">
            {TUTORS.map((t) => (
              <button
                key={t.subject}
                type="button"
                onClick={() => onSelect(t.subject)}
                className="flex flex-1 flex-col gap-2 rounded-xl p-3 text-left transition-all"
                style={{
                  border: '1px solid #e2e8f0',
                  background: '#fafafa',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = t.badgeColor;
                  (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 2px 12px ${t.badgeColor}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fafafa';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: t.avatarColor,
                    flexShrink: 0,
                  }}
                >
                  {t.initial}
                </div>
                {/* Name + badge */}
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#232323' }}>
                    {t.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: t.badgeColor,
                      background: t.badgeBg,
                      borderRadius: '4px',
                      padding: '1px 5px',
                    }}
                  >
                    {t.label}
                  </span>
                </div>
                {/* Tagline */}
                <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
                  {t.tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
