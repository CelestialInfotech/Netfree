// /lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCxGTNoRirKf90XGPHd6q7Y2PTrWHvyz4g",
  authDomain: "netfree-co.firebaseapp.com",
  projectId: "netfree-co",
  storageBucket: "netfree-co.firebasestorage.app",
  messagingSenderId: "707360894491",
  appId: "1:707360894491:web:1f5fbd7400c1e7594752be",
  measurementId: "G-MV2QVXGH23"
};

// Prevent re-initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics: Analytics | null = null;

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  try {
    const supported = await isSupported();
    if (!supported) return null;
    if (!analytics) {
      analytics = getAnalytics(app);
    }
    return analytics;
  } catch (e) {
    // Analytics may not be available in some environments
    // eslint-disable-next-line no-console
    console.warn("Firebase Analytics not available", e);
    return null;
  }
}

export function getAnalyticsInstance(): Analytics | null {
  return analytics;
}

export default app;
