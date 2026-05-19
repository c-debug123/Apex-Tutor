'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MATHEMATICS_SUBTOPICS } from '@/data/curriculum/mathematics';
import { Subtopic } from '@/types/tutor';

function getSubtopic(subject: string, subtopicId: string): Subtopic | null {
  if (subject === 'mathematics') {
    return MATHEMATICS_SUBTOPICS.find((s) => s.id === subtopicId) ?? null;
  }
  return null;
}

export default function SubtopicPage({
  params,
}: {
  params: Promise<{ subject: string; subtopicId: string }>;
}) {
  const { subject, subtopicId } = use(params);
  const subtopic = getSubtopic(subject, subtopicId);

  if (!subtopic) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-center">
          <p style={{ color: '#232323', fontWeight: 600 }}>Subtopic not found.</p>
          <Link href={`/learn/${subject}`} style={{ color: '#6163fe', fontSize: '14px' }}>
            Back to {subject}
          </Link>
        </div>
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
          <Link
            href={`/learn/${subject}`}
            style={{ color: '#6163fe', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Subtopic header */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold" style={{ color: '#232323' }}>
              {subtopic.title}
            </h1>
            <p className="mt-1.5" style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
              {subtopic.description}
            </p>
          </div>

          {/* Source credit */}
          <div
            className="mb-8 mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', display: 'inline-flex' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              DepEd MELC-aligned curriculum · Verified
            </span>
          </div>

          {/* Lesson list */}
          <div className="flex flex-col gap-3">
            {subtopic.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/learn/${subject}/${subtopicId}/${lesson.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="flex items-start gap-4 rounded-2xl p-5 transition-all"
                  style={{
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#6163fe';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 4px 16px rgba(97,99,254,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Lesson number */}
                  <div
                    className="flex flex-shrink-0 items-center justify-center font-bold"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#f1f0ff',
                      color: '#6163fe',
                      fontSize: '14px',
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Lesson info */}
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="font-semibold" style={{ fontSize: '15px', color: '#232323' }}>
                      {lesson.title}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <span key={i} style={{ fontSize: '12px', color: '#94a3b8' }}>
                          {i === 0 ? '' : '· '}
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Time + CTA */}
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {lesson.estimatedMinutes} min
                    </span>
                    <span
                      style={{ fontSize: '12px', color: '#6163fe', fontWeight: 500 }}
                    >
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
