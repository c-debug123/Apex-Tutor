import { collection, doc, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { StudentProgress, MemorySnapshot } from '@/types/tutor';

// ─── Student Progress ─────────────────────────────────────────────────────────

export async function getStudentProgress(
  userId: string,
  subtopicId: string
): Promise<StudentProgress | null> {
  if (!db) return null;
  const ref = doc(db, 'studentProgress', userId, 'subtopics', subtopicId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as StudentProgress;
}

export async function updateStudentProgress(
  userId: string,
  subtopicId: string,
  data: Partial<StudentProgress>
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = doc(db, 'studentProgress', userId, 'subtopics', subtopicId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data });
  } else {
    await setDoc(ref, {
      subtopicId,
      status: 'not-started',
      lessonsCompleted: [],
      quizScores: {},
      masteryScore: 0,
      lastStudiedAt: new Date().toISOString(),
      recurringMistakes: [],
      ...data,
    });
  }
}

// ─── Memory Snapshot ──────────────────────────────────────────────────────────

export async function getMemorySnapshot(
  userId: string,
  subtopicId: string
): Promise<MemorySnapshot | null> {
  if (!db) return null;
  const ref = doc(db, 'memorySnapshots', userId, 'subtopics', subtopicId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as MemorySnapshot;
}

export async function saveMemorySnapshot(
  userId: string,
  subtopicId: string,
  snapshot: MemorySnapshot
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = doc(db, 'memorySnapshots', userId, 'subtopics', subtopicId);
  await setDoc(ref, snapshot);
}

// ─── Lesson Sessions ──────────────────────────────────────────────────────────

export async function createLessonSession(data: {
  userId: string;
  tutorId: string;
  subtopicId: string;
  lessonId: string;
  phase: string;
}): Promise<string> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = await addDoc(collection(db, 'lessonSessions'), {
    ...data,
    messages: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateLessonSession(
  sessionId: string,
  messages: Array<{ role: string; content: string; timestamp: string }>,
  phase: string
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  await updateDoc(doc(db, 'lessonSessions', sessionId), {
    messages,
    phase,
    updatedAt: serverTimestamp(),
  });
}
