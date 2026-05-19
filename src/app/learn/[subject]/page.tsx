'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MATHEMATICS_SUBTOPICS } from '@/data/curriculum/mathematics';
import { TUTORS } from '@/data/tutors';
import { Subtopic, Difficulty } from '@/types/tutor';

const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string; label: string }> = {
  beginner: { bg: '#dcfce7', text: '#16a34a', label: 'Beginner' },
  intermediate: { bg: '#fef9c3', text: '#ca8a04', label: 'Intermediate' },
  advanced: { bg: '#fee2e2', text: '#dc2626', label: 'Advanced' },
  college: { bg: '#ede9fe', text: '#7c3aed', label: 'College' },
};

function getSubtopics(subject: string): Subtopic[] {
  if (subject === 'mathematics') return MATHEMATICS_SUBTOPICS;
  return [];
}

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = use(params);
  const subtopics = getSubtopics(subject);
  const tutor = TUTORS.find((t) => t.subject === subject);

  const subjectLabel =
    subject.charAt(0).toUpperCase() + subject.slice(1);

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
            href="/learn"
            style={{ color: '#6163fe', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            ← All Subjects
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="w-full max-w-3xl">
          {/* Page header */}
          <div className="mb-2 flex items-center gap-3">
            {tutor && (
              <div
                className="flex items-center justify-center font-bold text-white"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: tutor.avatarColor,
                  fontSize: '16px',
                  flexShrink: 0,
                }}
              >
                {tutor.avatarInitial}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#232323' }}>
                {subjectLabel}
              </h1>
              {tutor && (
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  with {tutor.name} — {tutor.tagline}
                </p>
              )}
            </div>
          </div>

          <p className="mb-8 mt-1 text-sm" style={{ color: '#94a3b8' }}>
            DepEd MELC-aligned curriculum · Grade 7–8
          </p>

          {subtopics.length === 0 ? (
            <div
              className="rounded-xl p-8 text-center"
              style={{ border: '1px solid #e2e8f0', color: '#94a3b8' }}
            >
              No curriculum available for this subject yet.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {subtopics.map((subtopic) => {
                const dc = DIFFICULTY_COLORS[subtopic.difficulty];
                return (
                  <Link
                    key={subtopic.id}
                    href={`/learn/${subject}/${subtopic.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="rounded-2xl p-5 transition-all"
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
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold" style={{ fontSize: '15px', color: '#232323' }}>
                              {subtopic.title}
                            </span>
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{ background: dc.bg, color: dc.text }}
                            >
                              {dc.label}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                            {subtopic.description}
                          </p>
                          {subtopic.prerequisites.length > 0 && (
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                              Prerequisites:{' '}
                              {subtopic.prerequisites
                                .map((p) => {
                                  const prereq = subtopics.find((s) => s.id === p);
                                  return prereq ? prereq.title : p;
                                })
                                .join(', ')}
                            </p>
                          )}
                        </div>
                        <div
                          className="flex flex-shrink-0 flex-col items-end gap-1 text-right"
                          style={{ minWidth: '80px' }}
                        >
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {subtopic.estimatedMinutes} min
                          </span>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {subtopic.lessons.length} lessons
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
