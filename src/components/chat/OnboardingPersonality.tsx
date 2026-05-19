'use client';

interface OnboardingPersonalityProps {
  onSelect: (personality: string) => void;
}

const PERSONALITIES = [
  {
    id: 'encouraging',
    label: 'Encouraging',
    description: 'Cheer me on, go easy on mistakes 🌟',
  },
  {
    id: 'direct',
    label: 'Direct',
    description: 'Just explain it clearly, no fluff ⚡',
  },
  {
    id: 'playful',
    label: 'Playful',
    description: 'Make it fun with games and jokes 🎮',
  },
];

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

export default function OnboardingPersonality({ onSelect }: OnboardingPersonalityProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <ApexAvatar />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '460px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px 18px 18px 18px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#334155', margin: '0 0 14px', lineHeight: 1.5 }}>
            Last one! How do you like to be taught?
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
            }}
            role="group"
            aria-label="Select your teaching style"
          >
            {PERSONALITIES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  background: '#fafafa',
                  padding: '14px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#6163fe';
                  btn.style.background = '#f1f0ff';
                  btn.style.boxShadow = '0 2px 10px rgba(97,99,254,0.15)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#e2e8f0';
                  btn.style.background = '#fafafa';
                  btn.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  {p.label}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                  {p.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
