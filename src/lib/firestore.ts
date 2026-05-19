import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

export interface StoredMessage {
  role: string;
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id?: string;
  userId: string;
  subject: string | null;
  topics: string[];
  title: string;           // first user message, truncated
  messages: StoredMessage[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

// Create a brand-new session and return its Firestore ID
export async function createChatSession(
  session: Omit<ChatSession, 'id'>
): Promise<string> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = await addDoc(collection(db, 'chatSessions'), {
    ...session,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// Update messages on an existing session (called after every AI reply)
export async function updateChatSession(
  sessionId: string,
  messages: StoredMessage[]
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  await updateDoc(doc(db, 'chatSessions', sessionId), {
    messages,
    updatedAt: serverTimestamp(),
  });
}

// Load all sessions for a user, most recent first
export async function getUserSessions(userId: string): Promise<ChatSession[]> {
  if (!db) throw new Error('Firestore not initialized');
  const q = query(
    collection(db, 'chatSessions'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatSession));
}
