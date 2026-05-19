'use client';

import { useState } from 'react';
import { type User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface OnboardingSignInProps {
  onSuccess: (user: User) => void;
}

export default function OnboardingSignIn({ onSuccess }: OnboardingSignInProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    if (!auth) {
      setError('Sign-in unavailable. Firebase is not configured.');
      return;
    }
    setError(null);
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onSuccess(result.user);
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            To continue with your free chat, please sign in with Google.
          </p>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#334155',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {/* Google G logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {error && (
            <p role="alert" className="mt-2 text-xs" style={{ color: '#ef4444' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
