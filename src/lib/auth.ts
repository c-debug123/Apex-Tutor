import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';

export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}
