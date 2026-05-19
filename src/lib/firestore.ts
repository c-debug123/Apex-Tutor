import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface ChatSession {
  id?: string;
  userId: string;
  subject: string | null;
  topics: string[];
  messages: { role: string; content: string; timestamp: string }[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

// Save a new chat session (always inserts; extend to upsert if needed)
export async function saveChatSession(session: ChatSession): Promise<string> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = await addDoc(collection(db, 'chatSessions'), {
    ...session,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// Load sessions for a user, most recent first, limit 20
export async function getUserSessions(userId: string): Promise<ChatSession[]> {
  if (!db) throw new Error('Firestore not initialized');
  const q = query(
    collection(db, 'chatSessions'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ChatSession));
}
