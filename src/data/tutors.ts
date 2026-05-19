import { TutorConfig } from '@/types/tutor';

export const TUTORS: TutorConfig[] = [
  {
    id: 'math-tutor',
    name: 'Ms. Reyes',
    subject: 'mathematics',
    avatarColor: 'linear-gradient(135deg, #6163fe 0%, #a78bfa 100%)',
    avatarInitial: 'R',
    personality: 'warm, patient, and Socratic',
    teachingStyle: 'question-led with real-world Filipino examples',
    tone: 'encouraging and friendly',
    ageGroups: ['9-12', '13-15', '16-18'],
    languages: ['english', 'taglish', 'tagalog'],
    tagline: 'Making math click, one question at a time.',
  },
  {
    id: 'science-tutor',
    name: 'Prof. Cruz',
    subject: 'science',
    avatarColor: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    avatarInitial: 'C',
    personality: 'curious, energetic, and example-first',
    teachingStyle: 'phenomenon-based with analogies',
    tone: 'enthusiastic and clear',
    ageGroups: ['9-12', '13-15', '16-18'],
    languages: ['english', 'taglish', 'tagalog'],
    tagline: "Science is everywhere — let's find it together.",
  },
];
