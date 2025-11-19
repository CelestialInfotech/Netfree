import { db } from "@/lib/firebase"; // your firebase config
import { doc, setDoc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const addToWatchlist = async (uid: string, movieId: string) => {
  const ref = doc(db, "users", uid,);
  await updateDoc(ref, {
    watchlist: arrayUnion(movieId),
  });
};

export const removeFromWatchlist = async (uid: string, movieId: string) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    watchlist: arrayRemove(movieId),
  });
};

export const isInWatchlist = async (uid: string, movieId: string): Promise<boolean> => {
  const ref = doc(db, "users", uid, "watchlist", movieId);
  const snap = await getDoc(ref);
  return snap.exists();
};
