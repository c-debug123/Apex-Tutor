'use client';

interface OnboardingSubjectProps {
  onSelect: (subject: 'math' | 'science') => void;
}

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
            What subject do you need help with?
          </p>
          <div className="flex gap-3" role="group" aria-label="Select a subject">
            {(['math', 'science'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelect(s)}
                className="flex-1 px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  border: '1px solid #6163fe',
                  color: '#6163fe',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#6163fe';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                  (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
