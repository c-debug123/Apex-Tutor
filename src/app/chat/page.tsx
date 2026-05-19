'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { type User } from 'firebase/auth';
import MessageBubble, { type Message } from '@/components/chat/MessageBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ChatInput from '@/components/chat/ChatInput';
import OnboardingSubject from '@/components/chat/OnboardingSubject';
import OnboardingTopics from '@/components/chat/OnboardingTopics';
import OnboardingSignIn from '@/components/chat/OnboardingSignIn';
import SuggestedSources from '@/components/chat/SuggestedSources';
import SuggestedReplies from '@/components/chat/SuggestedReplies';
import { subscribeToAuthState } from '@/lib/auth';
import { saveChatSession } from '@/lib/firestore';

// ─── Types ────────────────────────────────────────────────────────────────────

type OnboardingStep = 'subject' | 'topics' | 'signin' | 'complete';
type Language = 'english' | 'taglish' | 'tagalog';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: 'English',
  taglish: 'Taglish',
  tagalog: 'Tagalog',
};

// ─── Language pill (header-level; bridges to ChatInterface via custom event) ──

function LanguagePill() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language>('english');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function handleSelect(lang: Language) {
    setSelected(lang);
    setOpen(false);
    // Signal to ChatInterface (across Suspense boundary) via custom event
    window.dispatchEvent(new CustomEvent('apex:language', { detail: lang }));
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1"
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '13px',
          color: '#334155',
          background: '#ffffff',
          cursor: 'pointer',
        }}
      >
        {LANGUAGE_LABELS[selected]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 z-50 mt-1 overflow-hidden"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            minWidth: '140px',
          }}
        >
          {(Object.entries(LANGUAGE_LABELS) as [Language, string][]).map(([value, label]) => (
            <li key={value}>
              <button
                type="button"
                role="option"
                aria-selected={selected === value}
                onClick={() => handleSelect(value)}
                className="w-full px-4 py-2 text-left text-sm"
                style={{
                  background: selected === value ? '#f1f0ff' : 'transparent',
                  color: selected === value ? '#6163fe' : '#334155',
                  cursor: 'pointer',
                  fontWeight: selected === value ? 600 : 400,
                  border: 'none',
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Inner chat component (needs useSearchParams) ─────────────────────────────

function ChatInterface() {
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep | null>(null);
  const [subject, setSubject] = useState<'math' | 'science' | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Language preference — updated by header pill via custom event
  const [language, setLanguage] = useState<Language>('english');

  const bottomRef = useRef<HTMLDivElement>(null);
  const didSendInitial = useRef(false);
  // Stores the first user message while onboarding is in progress
  const pendingMessageRef = useRef<string>('');

  // Listen for language changes dispatched by LanguagePill in the header
  useEffect(() => {
    function handleLanguageEvent(e: Event) {
      const lang = (e as CustomEvent<Language>).detail;
      setLanguage(lang);
    }
    window.addEventListener('apex:language', handleLanguageEvent);
    return () => window.removeEventListener('apex:language', handleLanguageEvent);
  }, []);

  // Auto-scroll when messages or onboarding steps change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, onboardingStep]);

  // Keep user state in sync with Firebase auth
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setOnboardingStep((prev) => (prev === 'signin' ? 'complete' : prev));
      }
    });
    return unsubscribe;
  }, []);

  // Core API call — does NOT add user message to thread (caller already did that).
  const callApi = useCallback(
    async (text: string) => {
      setIsLoading(true);
      setIsTyping(true);

      try {
        const historyForApi = messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        }));

        let idToken: string | null = null;
        if (user) {
          try {
            idToken = await user.getIdToken();
          } catch {
            // non-fatal
          }
        }

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
          body: JSON.stringify({
            message: text,
            subject,
            topics,
            language,
            history: historyForApi,
          }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = (await response.json()) as {
          reply?: string;
          suggestions?: string[];
          error?: string;
        };

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply ?? 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
          suggestions: data.suggestions ?? [],
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (user) {
          saveChatSession({
            userId: user.uid,
            subject,
            topics,
            messages: [...messages, assistantMessage].map((m) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp.toISOString(),
            })),
          }).catch(() => {});
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Something went wrong. Please check your connection and try again.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    },
    [messages, subject, topics, language, user]
  );

  const sendMessage = useCallback(
    async (text: string, file: File | null) => {
      const trimmed = text.trim();
      if (!trimmed && !file) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
        attachment: file
          ? {
              name: file.name,
              type: file.type === 'application/pdf' ? 'pdf' : 'image',
            }
          : undefined,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setAttachment(null);

      // First message — hold it and start onboarding
      if (onboardingStep === null) {
        pendingMessageRef.current = trimmed;
        setOnboardingStep('subject');
        return;
      }

      await callApi(trimmed);
    },
    [onboardingStep, callApi]
  );

  // When onboarding completes, fire the API for the held first message —
  // the user message is already in the thread, so only call the API.
  useEffect(() => {
    if (onboardingStep !== 'complete') return;
    const pending = pendingMessageRef.current;
    if (!pending) return;
    pendingMessageRef.current = ''; // consume — prevent double-fire
    callApi(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingStep]); // callApi excluded intentionally — runs once on completion

  // Handle ?q= param on mount — send once
  useEffect(() => {
    if (didSendInitial.current) return;
    const q = searchParams.get('q');
    if (q && q.trim()) {
      didSendInitial.current = true;
      sendMessage(q.trim(), null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend() {
    sendMessage(input, attachment);
  }

  const isEmpty = messages.length === 0 && !isTyping && onboardingStep === null;
  const onboardingActive = onboardingStep !== null && onboardingStep !== 'complete';

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main chat column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Message thread */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '24px 32px' }}>
          {isEmpty ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div
                  className="mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
                  }}
                >
                  A
                </div>
                <p className="text-xl font-semibold" style={{ color: '#232323' }}>
                  Hi there! I&apos;m Apex, your AI tutor.
                </p>
                <p className="mt-2 text-base" style={{ color: '#94a3b8' }}>
                  Got a tricky problem? Ask me anything — Math, Science, or whatever&apos;s on your
                  mind.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {messages.map((msg, idx) => {
                const isLastAssistant =
                  msg.role === 'assistant' &&
                  idx === messages.length - 1 &&
                  !isTyping &&
                  onboardingStep === 'complete';
                return (
                  <div key={msg.id} className="flex flex-col gap-2">
                    <MessageBubble message={msg} user={user} />
                    {isLastAssistant && msg.suggestions && msg.suggestions.length > 0 && (
                      <SuggestedReplies
                        suggestions={msg.suggestions}
                        onSelect={(text) => sendMessage(text, null)}
                      />
                    )}
                  </div>
                );
              })}

              {/* Onboarding steps rendered inline in the thread */}
              {onboardingStep === 'subject' && (
                <OnboardingSubject
                  onSelect={(s) => {
                    setSubject(s);
                    setOnboardingStep('topics');
                  }}
                />
              )}
              {onboardingStep === 'topics' && subject && (
                <OnboardingTopics
                  subject={subject}
                  onContinue={(t) => {
                    setTopics(t);
                    setOnboardingStep('signin');
                  }}
                />
              )}
              {onboardingStep === 'signin' && (
                <OnboardingSignIn
                  onSuccess={(u) => {
                    setUser(u);
                    setOnboardingStep('complete');
                  }}
                />
              )}

              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input toolbar */}
        <ChatInput
          input={input}
          attachment={attachment}
          isLoading={isLoading}
          onboardingActive={onboardingActive}
          onInputChange={setInput}
          onSend={handleSend}
          onAttachmentChange={setAttachment}
        />
      </div>

      {/* Suggested Sources panel */}
      <SuggestedSources />
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col" style={{ background: '#ffffff' }}>
      {/* Header */}
      <header
        className="flex flex-shrink-0 items-center justify-between px-4"
        style={{
          height: '56px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <Image
            src="/apex-orb.png"
            alt="Apex Tutor orb logo"
            width={24}
            height={24}
            priority
          />
          <span
            className="font-black"
            style={{
              fontSize: '14px',
              letterSpacing: '0.5px',
              color: '#232323',
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 860,
            }}
          >
            APEX TUTOR
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguagePill />
          <Link
            href="/"
            className="text-sm transition-colors"
            style={{ color: '#6b7c94' }}
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* Chat interface wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center">
            <div className="text-sm" style={{ color: '#94a3b8' }}>
              Loading...
            </div>
          </div>
        }
      >
        <ChatInterface />
      </Suspense>
    </div>
  );
}
