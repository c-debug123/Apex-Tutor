'use client';

interface OnboardingSubjectProps {
  name: string;
  onSelect: (subject: 'math' | 'science') => void;
}

const TUTORS = [
  {
    subject: 'math' as const,
    emoji: '📐',
    label: 'Math',
    tutorName: 'Ms. Reyes',
    tagline: 'Making math click, one step at a time.',
    borderColor: '#6163fe',
    badgeColor: '#6163fe',
    badgeBg: '#f1f0ff',
    hoverShadow: 'rgba(97,99,254,0.15)',
    disabled: false,
  },
  {
    subject: 'science' as const,
    emoji: '🔬',
    label: 'Science',
    tutorName: 'Prof. Cruz',
    tagline: "Science is everywhere — let's explore.",
    borderColor: '#0ea5e9',
    badgeColor: '#0ea5e9',
    badgeBg: '#f0f9ff',
    hoverShadow: 'rgba(14,165,233,0.15)',
    disabled: false,
  },
  {
    subject: null,
    emoji: '📖',
    label: 'English',
    tutorName: 'Coming soon',
    tagline: 'Read, write, and speak with confidence.',
    borderColor: '#e2e8f0',
    badgeColor: '#94a3b8',
    badgeBg: '#f8fafc',
    hoverShadow: 'transparent',
    disabled: true,
  },
] as const;

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

export default function OnboardingSubject({ name, onSelect }: OnboardingSubjectProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <ApexAvatar />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#334155', margin: '0 0 14px', lineHeight: 1.5 }}>
            What do you want to learn today,{' '}
            <strong style={{ color: '#6163fe' }}>{name}</strong>?
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {TUTORS.map((t) => {
              const cardStyle: React.CSSProperties = {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRadius: '12px',
                padding: '14px 12px',
                textAlign: 'left',
                border: `1px solid ${t.disabled ? '#e2e8f0' : '#e2e8f0'}`,
                background: t.disabled ? '#f8fafc' : '#fafafa',
                cursor: t.disabled ? 'not-allowed' : 'pointer',
                opacity: t.disabled ? 0.55 : 1,
                pointerEvents: t.disabled ? 'none' : 'auto',
                transition: 'all 0.15s',
                position: 'relative',
              };

              return (
                <button
                  key={t.label}
                  type="button"
                  disabled={t.disabled}
                  onClick={() => {
                    if (!t.disabled && t.subject !== null) onSelect(t.subject);
                  }}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    if (t.disabled) return;
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = t.borderColor;
                    btn.style.background = '#ffffff';
                    btn.style.boxShadow = `0 2px 12px ${t.hoverShadow}`;
                  }}
                  onMouseLeave={(e) => {
                    if (t.disabled) return;
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = '#e2e8f0';
                    btn.style.background = '#fafafa';
                    btn.style.boxShadow = 'none';
                  }}
                  aria-disabled={t.disabled}
                  aria-label={t.disabled ? `${t.label} — coming soon` : `Learn ${t.label} with ${t.tutorName}`}
                >
                  {/* Emoji icon */}
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>{t.emoji}</span>

                  {/* Subject label + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                      {t.label}
                    </span>
                    {t.disabled && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#94a3b8',
                          background: '#f1f5f9',
                          borderRadius: '4px',
                          padding: '2px 5px',
                          letterSpacing: '0.3px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Soon
                      </span>
                    )}
                  </div>

                  {/* Tutor name badge */}
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: t.badgeColor,
                      background: t.badgeBg,
                      borderRadius: '4px',
                      padding: '2px 6px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {t.tutorName}
                  </span>

                  {/* Tagline */}
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
                    {t.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
