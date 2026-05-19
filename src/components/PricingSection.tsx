'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    period: '/month',
    highlight: false,
    tagline: 'Perfect for trying it out with your child.',
    features: ['10 questions per day', 'Math only', 'Text responses only'],
    featuresLabel: 'Features included:',
    cta: 'Get started',
  },
  {
    name: 'Starter',
    price: 199,
    period: '/month',
    highlight: true,
    tagline: 'Less than ₱7 a day for unlimited homework help.',
    features: [
      'Unlimited questions',
      'Math + Science',
      'Voice responses',
      'Tagalog & Bisaya mode',
      'Progress tracker',
      'Monthly certificate',
    ],
    featuresLabel: 'All in Starter, plus:',
    cta: 'Get started',
  },
  {
    name: 'Family',
    price: 399,
    period: '/month',
    highlight: false,
    tagline: 'One price for the whole family.',
    features: [
      'Everything in Starter',
      'Up to 3 children',
      'Parent dashboard',
      'Weekly progress report',
      'Downloadable workbooks',
    ],
    featuresLabel: 'All in Premium, plus:',
    cta: 'Get started',
  },
];

function CheckIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="10" cy="10" r="10" fill={filled ? '#ffffff' : '#6163fe'} />
      <path
        d="M6 10.5l2.5 2.5 5.5-5.5"
        stroke={filled ? '#6163fe' : '#ffffff'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaymentModal({
  plan,
  onClose,
}: {
  plan: (typeof PLANS)[number];
  onClose: () => void;
}) {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const router = useRouter();

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => router.push('/chat'), 1500);
      return () => clearTimeout(t);
    }
  }, [status, router]);

  function formatCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  function handlePay() {
    if (!card || !expiry || !cvv || !name) return;
    setStatus('processing');
    setTimeout(() => setStatus('success'), 2000);
  }

  const inputStyle = {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '14px',
    color: '#232323',
    outline: 'none',
    background: '#f8fafc',
    boxSizing: 'border-box' as const,
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#ecfdf5', margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#22c55e" />
                <path d="M10 16.5l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#232323', margin: '0 0 8px' }}>
              Payment successful!
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px' }}>
              Welcome to Apex Tutor {plan.name}. Your account has been upgraded.
            </p>
            <button
              disabled
              style={{
                background: '#6163fe', color: '#fff', border: 'none',
                borderRadius: '10px', padding: '12px 32px',
                fontSize: '14px', fontWeight: 600, cursor: 'default', width: '100%',
                opacity: 0.85,
              }}
            >
              Taking you to chat…
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {plan.name} Plan
                </p>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#232323', margin: 0 }}>
                  ₱{plan.price}<span style={{ fontSize: '14px', fontWeight: 400, color: '#94a3b8' }}>/month</span>
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '20px', padding: '0', lineHeight: 1 }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Card icons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {['VISA', 'MC', 'GCash', 'Maya'].map((b) => (
                <span key={b} style={{
                  fontSize: '10px', fontWeight: 700, padding: '3px 7px',
                  border: '1px solid #e2e8f0', borderRadius: '4px', color: '#64748b',
                }}>
                  {b}
                </span>
              ))}
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Name on card</label>
                <input
                  type="text"
                  placeholder="Juan dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Card number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={status === 'processing' || !card || !expiry || !cvv || !name}
              style={{
                marginTop: '20px',
                width: '100%',
                background: '#6163fe',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '13px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: (!card || !expiry || !cvv || !name) ? 0.5 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              {status === 'processing' ? 'Processing…' : `Pay ₱${plan.price}/month`}
            </button>

            <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
              🔒 Secured with 256-bit SSL encryption
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState<(typeof PLANS)[number] | null>(null);
  const router = useRouter();

  function handleCta(plan: (typeof PLANS)[number]) {
    if (plan.price === 0) {
      router.push('/chat');
    } else {
      setActivePlan(plan);
    }
  }

  return (
    <section style={{ padding: '80px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#232323', margin: '0 0 12px' }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlight ? '#6163fe' : '#ffffff',
                border: plan.highlight ? 'none' : '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {/* Plan name */}
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: plan.highlight ? '#ffffff' : '#232323',
                margin: '0 0 16px',
              }}>
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: plan.highlight ? '#ffffff' : '#232323' }}>
                  ₱{plan.price}
                </span>
                <span style={{ fontSize: '16px', color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>
                  {plan.period}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCta(plan)}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '10px',
                  border: plan.highlight ? 'none' : '1px solid #e2e8f0',
                  background: plan.highlight ? '#ffffff' : 'transparent',
                  color: plan.highlight ? '#6163fe' : '#232323',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '24px',
                }}
              >
                {plan.cta} →
              </button>

              {/* Divider */}
              <div style={{ height: '1px', background: plan.highlight ? 'rgba(255,255,255,0.2)' : '#e2e8f0', marginBottom: '24px' }} />

              {/* Features */}
              <p style={{ fontSize: '13px', fontWeight: 600, color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#334155', margin: '0 0 16px' }}>
                {plan.featuresLabel}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: plan.highlight ? '#ffffff' : '#334155' }}>
                    <CheckIcon filled={plan.highlight} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Tagline */}
              <p style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#94a3b8', margin: 0, marginTop: 'auto' }}>
                {plan.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {activePlan && (
        <PaymentModal plan={activePlan} onClose={() => setActivePlan(null)} />
      )}
    </section>
  );
}
