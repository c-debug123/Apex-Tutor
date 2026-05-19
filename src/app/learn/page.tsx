'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type User } from 'firebase/auth';
import { subscribeToAuthState } from '@/lib/auth';
import { TUTORS } from '@/data/tutors';

export default function LearnPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = subscribeToAuthState((u) => setUser(u));
    return unsub;
  }, []);

  // Still loading auth state
  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-sm" style={{ color: '#94a3b8' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#ffffff' }}>
      {/* Header */}
      <header
        className="flex flex-shrink-0 items-center justify-between px-4"
        style={{ height: '56px', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <Image src="/apex-orb.png" alt="Apex Tutor orb logo" width={24} height={24} priority />
          <span
            className="font-black"
            style={{
              fontSize: '14px',
              letterSpacing: '0.5px',
              color: '#232323',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 860,
            }}
          >
            APEX TUTOR
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/chat" style={{ color: '#6163fe', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
            Chat
          </Link>
          <Link href="/" className="text-sm transition-colors" style={{ color: '#6b7c94', textDecoration: 'none' }}>
            Back to home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-4 py-12">
        {!user ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="flex items-center justify-center text-2xl font-bold text-white"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
              }}
            >
              A
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#232323' }}>
              Sign in to start learning
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px' }}>
              Your progress and personalized lessons are saved to your account.
            </p>
            <Link
              href="/chat"
              style={{
                background: '#6163fe',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                padding: '10px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '8px',
              }}
            >
              Go to Chat to Sign In
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold" style={{ color: '#232323' }}>
                Choose a Subject
              </h1>
              <p className="mt-2" style={{ color: '#64748b', fontSize: '15px' }}>
                Select a tutor and dive into structured, DepEd-aligned lessons.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {TUTORS.map((tutor) => (
                <Link
                  key={tutor.id}
                  href={`/learn/${tutor.subject}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex flex-col gap-4 rounded-2xl p-6 transition-all"
                    style={{
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#6163fe';
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 4px 20px rgba(97,99,254,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="flex items-center justify-center text-xl font-bold text-white"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: tutor.avatarColor,
                        flexShrink: 0,
                      }}
                    >
                      {tutor.avatarInitial}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-semibold"
                          style={{ fontSize: '16px', color: '#232323' }}
                        >
                          {tutor.name}
                        </span>
                        <span
                          className="capitalize rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ background: '#f1f0ff', color: '#6163fe' }}
                        >
                          {tutor.subject}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>{tutor.tagline}</p>
                    </div>

                    {/* CTA */}
                    <div
                      className="mt-auto flex items-center gap-1 font-medium"
                      style={{ fontSize: '13px', color: '#6163fe' }}
                    >
                      Start Learning
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
