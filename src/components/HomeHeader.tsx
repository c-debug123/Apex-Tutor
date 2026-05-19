'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { subscribeToAuthState } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = subscribeToAuthState((u) => setUser(u));
    return unsub;
  }, []);

  async function handleSignIn() {
    try {
      await signInWithPopup(auth!, new GoogleAuthProvider());
    } catch {}
  }

  return (
    <header
      className="flex items-center justify-between px-6"
      style={{
        height: '56px',
        background: 'transparent',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
        <Image src="/apex-orb.png" alt="Apex Tutor" width={28} height={28} priority />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 860,
            letterSpacing: '0.5px',
            color: '#232323',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          APEX TUTOR
        </span>
      </Link>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              {user.displayName ?? user.email}
            </span>
            <Link
              href="/learn"
              style={{
                background: 'transparent',
                color: '#6163fe',
                fontSize: '13px',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              Learn
            </Link>
            <Link
              href="/chat"
              style={{
                background: '#6163fe',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Go to chat →
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '7px 16px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" aria-hidden="true">
              <path fill="#4285F4" d="M46.145 24.503c0-1.636-.146-3.209-.418-4.722H24v8.941h12.418c-.536 2.898-2.162 5.355-4.607 7.004v5.82h7.456c4.363-4.019 6.878-9.934 6.878-17.043z"/>
              <path fill="#34A853" d="M24 48c6.267 0 11.529-2.08 15.372-5.634l-7.456-5.82c-2.073 1.39-4.722 2.21-7.916 2.21-6.092 0-11.248-4.115-13.093-9.645H3.19v6.012C7.015 42.662 15.008 48 24 48z"/>
              <path fill="#FBBC05" d="M10.907 28.111A14.853 14.853 0 0 1 10.072 24c0-1.427.245-2.814.835-4.111v-6.012H3.19A23.96 23.96 0 0 0 0 24c0 3.866.928 7.527 2.569 10.715l7.617-6.012c.237-.19.477-.39.721-.592z"/>
              <path fill="#EA4335" d="M24 9.5c3.43 0 6.518 1.18 8.944 3.494l6.706-6.706C35.525 2.378 30.264 0 24 0 15.008 0 7.015 5.338 3.19 13.123l7.717 6.012C12.752 13.615 17.908 9.5 24 9.5z"/>
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
}
