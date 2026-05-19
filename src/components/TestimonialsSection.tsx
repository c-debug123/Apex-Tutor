// Server component — no 'use client' needed
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

interface UniversityLogo {
  id: string;
  name: string;
  short: string;
  logoFile: string;
  altText: string;
  fallbackColor: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarColor: string;
}

const UNIVERSITIES: UniversityLogo[] = [
  {
    id: 'admu',
    name: 'Ateneo de Manila University',
    short: 'Ateneo',
    logoFile: 'ateneo.png',
    altText: 'Ateneo de Manila University seal',
    fallbackColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'up',
    name: 'University of the Philippines',
    short: 'UP',
    logoFile: 'up.png',
    altText: 'University of the Philippines seal',
    fallbackColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    id: 'dlsu',
    name: 'De La Salle University',
    short: 'DLSU',
    logoFile: 'dlsu.png',
    altText: 'De La Salle University seal',
    fallbackColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'ust',
    name: 'University of Santo Tomas',
    short: 'UST',
    logoFile: 'ust.png',
    altText: 'University of Santo Tomas seal',
    fallbackColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Super laki ng improvement ng son ko in Math after just a few sessions. Before, hirap siyang sumabay sa class discussions, but now mas confident na siya mag-solve on his own. What I love most is how the tutors explain complex topics in a simple and relatable way. Sulit compared to traditional tutors charging $60/hour or more.',
    author: 'Maria L.',
    role: 'Parent of Grade 8 Student',
    initials: 'ML',
    avatarColor: 'bg-orange-400',
  },
  {
    id: 't2',
    quote:
      'I used to struggle a lot with Science, especially Physics and Chemistry. The AI tutorial sessions made everything easier to understand because the lessons felt interactive and personalized. It honestly feels like learning from top teachers, but in a much more approachable way.',
    author: 'Ethan R.',
    role: 'Senior High School Student',
    initials: 'ER',
    avatarColor: 'bg-purple-400',
  },
  {
    id: 't3',
    quote:
      'Ang ganda ng mix ng English and Taglish explanations because mas naiintindihan ko yung concepts without feeling overwhelmed. The tutors really focus on helping students think critically, not just memorize formulas. I feel more prepared now to compete academically and in real-world problem solving.',
    author: 'Nicole T.',
    role: 'First Year College Student',
    initials: 'NT',
    avatarColor: 'bg-teal-400',
  },
];

/** Returns true if the logo file exists in /public/logos and is at least 1 KB. */
function logoIsValid(filename: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', 'logos', filename);
    const stat = fs.statSync(filePath);
    return stat.size >= 1024;
  } catch {
    return false;
  }
}

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Trusted by students from top universities across the Philippines
        </h2>

        {/* university logo row */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6">
          {UNIVERSITIES.map((uni) =>
            logoIsValid(uni.logoFile) ? (
              <div
                key={uni.id}
                data-university-id={uni.id}
                data-university-name={uni.name}
                title={uni.name}
                className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-200 bg-white p-2"
              >
                <Image
                  src={`/logos/${uni.logoFile}`}
                  width={48}
                  height={48}
                  alt={uni.altText}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : (
              <span
                key={uni.id}
                data-university-id={uni.id}
                data-university-name={uni.name}
                title={uni.name}
                className={`rounded-full border px-5 py-2 text-sm font-semibold tracking-wide ${uni.fallbackColor}`}
              >
                {uni.short}
              </span>
            )
          )}
        </div>

        {/* testimonial cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              {/* stars */}
              <div className="mb-4 flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              {/* quote */}
              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-gray-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.avatarColor}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
