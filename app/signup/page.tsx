// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
// import { Header } from '@/components/header'
// import { Button } from '@/components/ui/button'
// import { Mail, Lock, User } from 'lucide-react'
// import Link from 'next/link'

// export default function SignupPage() {
//   const router = useRouter()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')

//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)

//     try {
//       const auth = getAuth()
//       await createUserWithEmailAndPassword(auth, email, password)
//       router.push('/')
//     } catch (err: any) {
//       setError(err.message || 'Failed to sign up')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="bg-background min-h-screen">
//       <Header />

//       <div className="flex items-center justify-center py-20 px-4">
//         <div className="w-full max-w-md">
//           <div className="bg-surface rounded-lg p-8 border border-surface-secondary">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Get Started</h1>
//             <p className="text-foreground-muted mb-8">Create your account today</p>

//             {error && (
//               <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSignup} className="space-y-6">
//               <div>
//                 <label className="block text-foreground text-sm font-medium mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 text-foreground-muted" size={18} />
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="John Doe"
//                     className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-foreground text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 text-foreground-muted" size={18} />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-foreground text-sm font-medium mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 text-foreground-muted" size={18} />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-foreground text-sm font-medium mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 text-foreground-muted" size={18} />
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
//                     required
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-primary hover:bg-primary-hover text-white transition-smooth disabled:opacity-50"
//               >
//                 {loading ? 'Creating account...' : 'Sign Up'}
//               </Button>
//             </form>

//             <p className="text-center text-foreground-muted text-sm mt-6">
//               Already have an account?{' '}
//               <Link href="/login" className="text-primary hover:text-primary-hover transition-smooth">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Mail, Lock, User } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";
import { avatarList } from '@/lib/utils';


export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
      const handleContextMenu = (e: { preventDefault: () => any; }) => e.preventDefault();
  
      const handleKeyDown = (e: { key: string; preventDefault: () => void; ctrlKey: any; shiftKey: any; }) => {
        // Block F12
        if (e.key === "F12") {
          e.preventDefault();
        }
  
        // Block Ctrl + Shift + (I, J, C)
        if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
          e.preventDefault();
        }
  
        // Block Ctrl + U
        if (e.ctrlKey && e.key === "U") {
          e.preventDefault();
        }
      };
  
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  
  
    
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // update displayName in auth (optional)
      if (name) {
        await firebaseUpdateProfile(res.user, { displayName: name });
      }

      // create Firestore user doc (ensures exists)
      const userRef = doc(db, "users", res.user.uid);
      await setDoc(userRef, {
        uid: res.user.uid,
        name: name || res.user.displayName || "",
        email: email,
        avatar: res.user.photoURL || randomAvatar,
        watchlist: [],
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    try {
      // you can use context signInWithGoogle or do it here:
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      // ensure user doc
      const userRef = doc(db, "users", res.user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          name: res.user.displayName || "",
          email: res.user.email || "",
          avatar: res.user.photoURL || randomAvatar,
          watchlist: [],
          createdAt: serverTimestamp(),
        });
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-background min-h-screen">
      <Header />

      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-surface rounded-lg p-8 border border-surface-secondary">
            <h1 className="text-3xl font-bold text-foreground mb-2">Get Started</h1>
            <p className="text-foreground-muted mb-8">Create your account today</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-foreground text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-foreground-muted" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-foreground-muted" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground-muted" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground-muted" size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white transition-smooth disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Google Signup Button */}
            <div className="mt-6">
              <Button
                onClick={handleGoogle}
                disabled={loading}
                variant="outline"
                className="w-full flex items-center gap-2 py-2 border border-surface-secondary"
              >
                <FcGoogle size={22} />
                Continue with Google
              </Button>
            </div>

            <p className="text-center text-foreground-muted text-sm mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary-hover transition-smooth">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
