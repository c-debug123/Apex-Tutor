'use client';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

function ApexMascot() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Antenna base */}
      <line x1="60" y1="18" x2="60" y2="32" stroke="#6163fe" strokeWidth="3" strokeLinecap="round" />
      {/* Antenna tip orb */}
      <circle cx="60" cy="13" r="6" fill="#6163fe" />
      <circle cx="60" cy="13" r="3" fill="#a78bfa" />

      {/* Body / head — rounded square */}
      <rect x="22" y="30" width="76" height="68" rx="20" ry="20"
        fill="url(#apexBodyGrad)" />

      {/* Inner face panel */}
      <rect x="30" y="38" width="60" height="50" rx="14" ry="14"
        fill="#ffffff" fillOpacity="0.18" />

      {/* Left eye */}
      <ellipse cx="44" cy="62" rx="8" ry="9" fill="white" />
      <circle cx="46" cy="62" r="4.5" fill="#6163fe" />
      <circle cx="47.5" cy="59.5" r="1.5" fill="white" />

      {/* Right eye */}
      <ellipse cx="76" cy="62" rx="8" ry="9" fill="white" />
      <circle cx="78" cy="62" r="4.5" fill="#6163fe" />
      <circle cx="79.5" cy="59.5" r="1.5" fill="white" />

      {/* Smile */}
      <path d="M46 80 Q60 92 74 80" stroke="white" strokeWidth="3"
        strokeLinecap="round" fill="none" />

      {/* Cheek blush left */}
      <ellipse cx="36" cy="74" rx="6" ry="4" fill="#a78bfa" fillOpacity="0.45" />
      {/* Cheek blush right */}
      <ellipse cx="84" cy="74" rx="6" ry="4" fill="#a78bfa" fillOpacity="0.45" />

      {/* Little ears / side nubs */}
      <rect x="14" y="52" width="10" height="16" rx="5" fill="#6163fe" />
      <rect x="96" y="52" width="10" height="16" rx="5" fill="#6163fe" />

      <defs>
        <linearGradient id="apexBodyGrad" x1="22" y1="30" x2="98" y2="98"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6163fe" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function OnboardingWelcome({ onContinue }: OnboardingWelcomeProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(97, 99, 254, 0.10)',
          padding: '48px 40px 40px',
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0',
        }}
      >
        {/* Mascot */}
        <div style={{ marginBottom: '24px' }}>
          <ApexMascot />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#1e293b',
            margin: '0 0 10px',
            lineHeight: 1.2,
          }}
        >
          Hi! I&apos;m Apex 👋
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: '15px',
            color: '#64748b',
            margin: '0 0 32px',
            lineHeight: 1.6,
            maxWidth: '280px',
          }}
        >
          Your personal AI tutor. Let&apos;s get you set up in 30 seconds!
        </p>

        {/* CTA button */}
        <button
          type="button"
          onClick={onContinue}
          style={{
            background: '#6163fe',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 36px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            transition: 'opacity 0.15s, transform 0.1s',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          Let&apos;s go →
        </button>
      </div>
    </div>
  );
}
