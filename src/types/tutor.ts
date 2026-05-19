export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'college';
export type LessonPhase = 'teach' | 'practice' | 'quiz' | 'review';
export type MasterySignal = 'strong' | 'neutral' | 'weak';

export interface TutorConfig {
  id: string;
  name: string;
  subject: string;
  avatarColor: string; // gradient CSS string
  avatarInitial: string;
  personality: string;
  teachingStyle: string;
  tone: string;
  ageGroups: string[];
  languages: string[];
  tagline: string;
}

export interface CurriculumSource {
  name: string;
  url: string;
  type: 'deped' | 'ched' | 'oer' | 'ai-enhanced';
  verified: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  overview: string;
  objectives: string[];
  estimatedMinutes: number;
  content: string; // markdown
  examples: string[];
  quiz: QuizQuestion[];
  generatedBy: 'sourced' | 'ai-enhanced';
}

export interface Subtopic {
  id: string;
  title: string;
  subject: string;
  difficulty: Difficulty;
  prerequisites: string[];
  estimatedMinutes: number;
  description: string;
  sources: CurriculumSource[];
  lessons: Lesson[];
}

export interface StudentProgress {
  subtopicId: string;
  status: 'not-started' | 'in-progress' | 'mastered';
  lessonsCompleted: string[];
  quizScores: Record<string, number>;
  masteryScore: number;
  lastStudiedAt: string;
  recurringMistakes: string[];
}

export interface MemorySnapshot {
  summary: string;
  keyMistakes: string[];
  strengths: string[];
  masteryLevel: number;
  updatedAt: string;
}

export interface TutorChatResponse {
  reply: string;
  phase: LessonPhase;
  confusion_detected: boolean;
  mastery_signal: MasterySignal;
  suggestions: string[];
}
