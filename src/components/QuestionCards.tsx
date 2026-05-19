'use client';

import { useRouter } from 'next/navigation';

const QUESTIONS: string[] = [
  'How to study addition and subtraction?',
  'Outline all the topics for my science subject.',
  'Explain physics to me like a 5 year old.',
];

export default function QuestionCards() {
  const router = useRouter();

  function handleClick(question: string) {
    router.push(`/chat?q=${encodeURIComponent(question)}`);
  }

  return (
    <section className="px-4 pb-16 pt-8 sm:pb-20">
      <div className="mx-auto flex max-w-[825px] flex-col items-center gap-6 sm:flex-row sm:items-stretch">
        {QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => handleClick(question)}
            className="flex-1 text-left transition-transform duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6163fe]"
            style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              boxShadow: '0px 8px 12px rgba(149,157,165,0.2)',
              borderRadius: '16px',
              padding: '16px 24px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <p
              style={{
                color: '#334155',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              {question}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
