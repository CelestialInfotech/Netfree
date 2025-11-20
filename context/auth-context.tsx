// 'use client'

// import { createContext, useContext, useEffect, useState } from 'react'
// import { initializeApp } from 'firebase/app'
// import {
//   getAuth,
//   onAuthStateChanged,
//   signOut as firebaseSignOut,
//   User,
// } from 'firebase/auth'
// import { useRouter } from 'next/navigation'

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// }

// initializeApp(firebaseConfig)

// interface AuthContextType {
//   user: User | null
//   loading: boolean
//   signOut: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const auth = getAuth()
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const signOut = async () => {
//     const auth = getAuth()
//     await firebaseSignOut(auth)
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider')
//   }
//   return context
// }


'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCxGTNoRirKf90XGPHd6q7Y2PTrWHvyz4g",
  authDomain: "netfree-co.firebaseapp.com",
  projectId: "netfree-co",
  storageBucket: "netfree-co.firebasestorage.app",
  messagingSenderId: "707360894491",
  appId: "1:707360894491:web:1f5fbd7400c1e7594752be",
  measurementId: "G-MV2QVXGH23"
}

// Prevent initializing Firebase twice
let appInitialized = false
if (!appInitialized) {
  initializeApp(firebaseConfig)
  appInitialized = true
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // 🚀 Google Login
  const signInWithGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  // 🚀 Update Profile (Fixes your TS error)
  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    const auth = getAuth()
    if (!auth.currentUser) return

    await firebaseUpdateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })

    // Update local state so UI refreshes
    setUser({ ...auth.currentUser })
  }

  // 🚀 Sign Out
  const signOut = async () => {
    const auth = getAuth()
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        updateProfile,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
