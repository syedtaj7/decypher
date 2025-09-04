// Firebase configuration
// Note: Prefer environment variables in production
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAh_0w2qdqa3mOKQLr5BBEGsZhds3kZaTk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "decypher-8e7e2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "decypher-8e7e2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "decypher-8e7e2.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "222808938469",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:222808938469:web:f4e8bfdd10c7c5d21bc10c",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-C057CT3JSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let analytics: Analytics | undefined;

// Initialize Analytics only in the browser and when supported
if (typeof window !== 'undefined') {
  isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
