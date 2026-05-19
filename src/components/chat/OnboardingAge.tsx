'use client';

interface OnboardingAgeProps {
  name: string;
  onSelect: (range: string) => void;
}

const AGE_RANGES = ['9–10', '11–12', '13–14', '15–16'];

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

export default function OnboardingAge({ name, onSelect }: OnboardingAgeProps) {
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
            Nice to meet you, <strong style={{ color: '#6163fe' }}>{name}</strong>! How old are you?
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}
            role="group"
            aria-label="Select your age range"
          >
            {AGE_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => onSelect(range)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  background: '#fafafa',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '12px 8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#6163fe';
                  btn.style.background = '#f1f0ff';
                  btn.style.color = '#6163fe';
                  btn.style.boxShadow = '0 2px 10px rgba(97,99,254,0.15)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#e2e8f0';
                  btn.style.background = '#fafafa';
                  btn.style.color = '#334155';
                  btn.style.boxShadow = 'none';
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
