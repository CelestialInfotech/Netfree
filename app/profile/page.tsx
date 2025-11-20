'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { avatarList } from '@/lib/utils'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Movie {
  id: string
  [key: string]: any
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, signOut, updateProfile } = useAuth()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('/default-avatar.png')
  const [editMode, setEditMode] = useState(false)

  // Firebase watchlist
  const [movies, setMovies] = useState<Movie[]>([])
  const [watchlistLoading, setWatchlistLoading] = useState(true)

  // Load user info
  useEffect(() => {
    if (!loading && !user) router.push('/login')

    if (user) {
      setName(user.displayName || 'User')
      setAvatar(user.photoURL || '/default-avatar.png')
    }
  }, [user, loading])


  // Load watchlist from Firebase (same as your WatchlistPage)
  useEffect(() => {
    if (!user) return

    const loadWatchlist = async () => {
      try {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          setMovies([])
          return
        }

        const watchlist: string[] = userSnap.data().watchlist || []
        const movieData = watchlist.map(id => ({ id }))
        setMovies(movieData)

      } catch (err) {
        console.error("Error loading profile watchlist:", err)
      } finally {
        setWatchlistLoading(false)
      }
    }

    loadWatchlist()
  }, [user])


  // Save profile
  const handleSaveProfile = async () => {
    await updateProfile({ displayName: name, photoURL: avatar })
    setEditMode(false)
  }


  if (loading) return null

  return (
    <main className="bg-black min-h-screen text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Account management</h1>

        {/* Profile Card */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-6">

          {/* Avatar + Name */}
          <div className="flex items-center gap-6">
            <img
              src={avatar}
              className="w-24 h-24 rounded-lg border border-neutral-700 object-cover"
            />

            <div>
              {editMode ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-neutral-800 p-2 rounded text-lg border border-neutral-600"
                />
              ) : (
                <h2 className="text-2xl font-bold">{name}</h2>
              )}
              <p className="text-neutral-400 mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Avatar Selection */}
          {editMode && (
            <>
              <p className="text-neutral-300">Select Avatar</p>
              <div className="flex gap-3 flex-wrap">
                {avatarList.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    onClick={() => setAvatar(url)}
                    className={`w-14 h-14 rounded-full border cursor-pointer hover:scale-110 transition
                      ${avatar === url ? "border-red-500" : "border-neutral-700"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Edit Buttons */}
          <div className="flex gap-4">
            {!editMode ? (
              <Button onClick={() => setEditMode(true)} className="bg-red-600 flex gap-2">
                <Edit size={18} /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} className="bg-green-600">Save</Button>
                <Button onClick={() => setEditMode(false)} className="bg-neutral-700">Cancel</Button>
              </div>
            )}
          </div>
        </div>


        {/* Watchlist Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">My Watchlist</h3>

          {watchlistLoading ? (
            <p className="text-neutral-400">Loading watchlist...</p>
          ) : movies.length === 0 ? (
            <p className="text-neutral-400">Your watchlist is empty.</p>
          ) : (
            <div
              className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
                gap-4
              "
            >
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="group cursor-pointer relative"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <img
                    src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
                    className="rounded-md w-full aspect-[16/9] object-cover border border-neutral-700 group-hover:opacity-80 transition"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
