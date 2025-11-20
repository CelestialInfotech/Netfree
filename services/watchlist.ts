// import { db } from "@/lib/firebase"; // your firebase config
// import { doc, setDoc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// export const addToWatchlist = async (uid: string, movieId: string) => {
//   const ref = doc(db, "users", uid,);
//   await updateDoc(ref, {
//     watchlist: arrayUnion(movieId),
//   });
// };

// export const removeFromWatchlist = async (uid: string, movieId: string) => {
//   const ref = doc(db, "users", uid);
//   await updateDoc(ref, {
//     watchlist: arrayRemove(movieId),
//   });
// };

// export const isInWatchlist = async (uid: string, movieId: string): Promise<boolean> => {
//   const ref = doc(db, "users", uid, "watchlist", movieId);
//   const snap = await getDoc(ref);
//   return snap.exists();
// };



import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// ADD movie to user's watchlist array
export const addToWatchlist = async (uid: string, movieId: string) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    watchlist: arrayUnion(movieId),
  });
};

// REMOVE movie from user's watchlist array
export const removeFromWatchlist = async (uid: string, movieId: string) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    watchlist: arrayRemove(movieId),
  });
};

// CHECK if movie exists in watchlist array
export const isInWatchlist = async (uid: string, movieId: string): Promise<boolean> => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const data = snap.data();
  const watchlist = data.watchlist || [];

  return watchlist.includes(movieId);
};
