'use client';

import { use, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type User } from 'firebase/auth';
import MessageBubble, { type Message } from '@/components/chat/MessageBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ChatInput from '@/components/chat/ChatInput';
import { subscribeToAuthState } from '@/lib/auth';
import { MATHEMATICS_SUBTOPICS } from '@/data/curriculum/mathematics';
import { Subtopic, LessonPhase, TutorChatResponse } from '@/types/tutor';
import { TUTORS } from '@/data/tutors';

type Language = 'english' | 'taglish' | 'tagalog';

const PHASE_LABELS: Record<LessonPhase, string> = {
  teach: 'Teaching',
  practice: 'Practice',
  quiz: 'Quiz',
  review: 'Review',
};

const PHASE_ICONS: Record<LessonPhase, string> = {
  teach: '📚',
  practice: '✏️',
  quiz: '🧠',
  review: '🔁',
};

const PHASE_COLORS: Record<LessonPhase, { bg: string; text: string; border: string }> = {
  teach: { bg: '#f1f0ff', text: '#6163fe', border: '#c7d2fe' },
  practice: { bg: '#fef9c3', text: '#854d0e', border: '#fde68a' },
  quiz: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
  review: { bg: '#fff7ed', text: '#9a3412', border: '#fed7aa' },
};

function getSubtopic(subject: string, subtopicId: string): Subtopic | null {
  if (subject === 'mathematics') {
    return MATHEMATICS_SUBTOPICS.find((s) => s.id === subtopicId) ?? null;
  }
  return null;
}

function getTutorId(subject: string): string {
  if (subject === 'mathematics') return 'math-tutor';
  if (subject === 'science') return 'science-tutor';
  return 'math-tutor';
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; subtopicId: string; lessonId: string }>;
}) {
  const { subject, subtopicId, lessonId } = use(params);

  const subtopic = getSubtopic(subject, subtopicId);
  const lesson = subtopic?.lessons.find((l) => l.id === lessonId) ?? null;
  const tutorId = getTutorId(subject);
  const tutor = TUTORS.find((t) => t.id === tutorId);

  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<LessonPhase>('teach');
  const [language] = useState<Language>('english');
  const [hasStarted, setHasStarted] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);

  // Force-advance phase after 1 exchange per phase (teach→practice→quiz→review)
  const phaseExchangeCount = useRef(0);
  const PHASE_ORDER: LessonPhase[] = ['teach', 'practice', 'quiz', 'review'];

  const bottomRef = useRef<HTMLDivElement>(null);
  const didStart = useRef(false);

  useEffect(() => {
    const unsub = subscribeToAuthState((u) => setUser(u));
    return unsub;
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callTutorApi = useCallback(
    async (text: string, currentPhase: LessonPhase) => {
      if (!lesson || !subtopic) return;
      setIsLoading(true);
      setIsTyping(true);

      try {
        let idToken: string | null = null;
        if (user) {
          try {
            idToken = await user.getIdToken();
          } catch {
            // non-fatal
          }
        }

        const historyForApi = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch(`/api/tutor/${tutorId}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
          body: JSON.stringify({
            lessonId: lesson.id,
            subtopicId: subtopic.id,
            message: text,
            phase: currentPhase,
            language,
            history: historyForApi,
          }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = (await response.json()) as TutorChatResponse | { error: string };

        if ('error' in data) throw new Error(data.error);

        const tutorResponse = data as TutorChatResponse;

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: tutorResponse.reply,
          timestamp: new Date(),
          suggestions: tutorResponse.suggestions,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Force phase advancement: after 1 AI reply per phase, move to the next
        phaseExchangeCount.current += 1;
        if (phaseExchangeCount.current >= 1) {
          phaseExchangeCount.current = 0;
          const currentIdx = PHASE_ORDER.indexOf(currentPhase);
          if (currentPhase === 'review') {
            // Already in review → lesson is done
            setLessonDone(true);
          } else {
            const nextPhase = PHASE_ORDER[currentIdx + 1] ?? 'review';
            setPhase(nextPhase);
          }
        } else {
          setPhase(tutorResponse.phase);
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
    [lesson, subtopic, messages, user, tutorId, language]
  );

  // Auto-start: send "start" to trigger the teach phase on mount
  useEffect(() => {
    if (didStart.current) return;
    if (!lesson || !subtopic) return;
    didStart.current = true;
    setHasStarted(true);
    callTutorApi('start', 'teach');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, subtopic]);

  const sendMessage = useCallback(
    async (text: string, _file: File | null) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      await callTutorApi(trimmed, phase);
    },
    [callTutorApi, phase]
  );

  if (!subtopic || !lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-center">
          <p style={{ color: '#232323', fontWeight: 600 }}>Lesson not found.</p>
          <Link href={`/learn/${subject}`} style={{ color: '#6163fe', fontSize: '14px' }}>
            Back to {subject}
          </Link>
        </div>
      </div>
    );
  }

  const phaseStyle = PHASE_COLORS[phase];

  return (
    <div className="flex h-screen flex-col" style={{ background: '#ffffff' }}>
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
          <Link
            href={`/learn/${subject}/${subtopicId}`}
            style={{ color: '#6163fe', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            ← {subtopic.title}
          </Link>
        </div>
      </header>

      {/* Body: sidebar + chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: lesson navigator */}
        <aside
          className="hidden flex-shrink-0 flex-col overflow-y-auto md:flex"
          style={{
            width: '220px',
            borderRight: '1px solid #e2e8f0',
            padding: '16px 12px',
            background: '#fafafa',
          }}
        >
          <p
            className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: '#94a3b8' }}
          >
            {subtopic.title}
          </p>
          <nav className="flex flex-col gap-1">
            {subtopic.lessons.map((l) => {
              const isActive = l.id === lessonId;
              return (
                <Link
                  key={l.id}
                  href={`/learn/${subject}/${subtopicId}/${l.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="rounded-lg px-3 py-2 text-sm transition-colors"
                    style={{
                      background: isActive ? '#f1f0ff' : 'transparent',
                      color: isActive ? '#6163fe' : '#334155',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    {l.order}. {l.title}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main chat column */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tutor header + phase pill */}
          <div
            className="flex flex-shrink-0 items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center gap-2">
              {tutor && (
                <div
                  className="flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: tutor.avatarColor,
                    flexShrink: 0,
                  }}
                >
                  {tutor.avatarInitial}
                </div>
              )}
              <div>
                <p className="font-semibold" style={{ fontSize: '14px', color: '#232323' }}>
                  {tutor?.name ?? 'Tutor'}
                </p>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>{lesson.title}</p>
              </div>
            </div>

            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: phaseStyle.bg,
                color: phaseStyle.text,
                border: `1px solid ${phaseStyle.border}`,
              }}
            >
              <span aria-hidden="true">{PHASE_ICONS[phase]}</span>
              {PHASE_LABELS[phase]}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '24px 32px' }}>
            {!hasStarted ? (
              <div className="flex h-full items-center justify-center">
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Starting lesson...</p>
              </div>
            ) : (
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {messages.map((msg, idx) => {
                  const isLastAssistant =
                    msg.role === 'assistant' && idx === messages.length - 1 && !isTyping;
                  return (
                    <div key={msg.id} className="flex flex-col gap-2">
                      <MessageBubble message={msg} user={user} />
                      {isLastAssistant && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pl-10">
                          {msg.suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => sendMessage(suggestion, null)}
                              className="rounded-full text-sm transition-colors"
                              style={{
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#334155',
                                padding: '6px 14px',
                                cursor: 'pointer',
                                fontSize: '13px',
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = '#6163fe';
                                (e.currentTarget as HTMLButtonElement).style.color = '#6163fe';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
                                (e.currentTarget as HTMLButtonElement).style.color = '#334155';
                              }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {isTyping && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Lesson done banner + next lesson button */}
          {lessonDone ? (
            <div
              className="flex flex-shrink-0 items-center justify-between px-6 py-4"
              style={{ borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#232323' }}>
                🎉 Lesson complete!
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/learn/${subject}/${subtopicId}`}
                  style={{
                    background: '#6163fe',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '8px 18px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Next lesson →
                </Link>
              </div>
            </div>
          ) : (
            <ChatInput
              input={input}
              attachment={null}
              isLoading={isLoading}
              onboardingActive={false}
              onInputChange={setInput}
              onSend={() => sendMessage(input, null)}
              onAttachmentChange={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
