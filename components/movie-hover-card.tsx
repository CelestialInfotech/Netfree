// 'use client'

// import { Play, Plus, Info, Check } from 'lucide-react'
// import type { Movie } from '@/types/movie'
// import Link from 'next/link'

// interface MovieHoverCardProps {
//   movie: Movie
//   isVisible: boolean
// }

// export function MovieHoverCard({ movie, isVisible }: MovieHoverCardProps) {
//   if (!isVisible) return null

//   return (
//     <div className="w-80 bg-surface-secondary rounded-xl overflow-hidden shadow-2xl border border-surface-tertiary transform transition-all duration-300 opacity-100">
//       {/* Movie Poster Image - Large */}
//       <div className="relative w-full aspect-video bg-surface-secondary overflow-hidden">
//         <img
//           src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
//           alt={movie.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-secondary" />
//       </div>

//       {/* Content Section */}
//       <div className="p-5">
//         <h3 className="text-foreground text-xl font-bold mb-4 line-clamp-2">
//           {movie.title}
//         </h3>

//         <div className="flex gap-3 mb-4">
//           <Link href={`/movie/${movie.id}`} className="flex-1">
//             <button className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
//               <Play size={18} fill="currentColor" />
//               <span>Play</span>
//             </button>
//           </Link>
//           <button className="flex items-center justify-center gap-2 bg-surface-tertiary hover:bg-surface-secondary text-foreground py-2.5 px-3 rounded-lg transition-colors">
//             <Plus size={20} />
//           </button>
//           <button className="flex items-center justify-center gap-2 bg-surface-tertiary hover:bg-surface-secondary text-foreground py-2.5 px-3 rounded-lg transition-colors">
//             <Info size={20} />
//           </button>
//         </div>

//         <div className="flex items-center gap-1.5 mb-4">
//           <Check size={16} className="text-primary" />
//           <span className="text-foreground text-xs font-semibold">Included with Prime</span>
//         </div>

//         <div className="flex gap-2 mb-3 text-xs text-foreground-muted font-medium">
//           <span>{movie.year || '2024'}</span>
//           <span>•</span>
//           <span>{movie.duration || '1h 48m'}</span>
//           <span>•</span>
//           <span>{movie.ua || 'U/A 18+ [A]'}</span>
//         </div>

//         <p className="text-foreground-muted text-xs leading-relaxed">
//           {movie.desc || 'No description available'}
//         </p>
//       </div>
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { Play, Plus, Info, Check } from 'lucide-react'
import type { Movie } from '@/types/movie'
import Link from 'next/link'

interface MovieHoverCardProps {
  movie: Movie
  isVisible: boolean
  movieid: string
}

export function MovieHoverCard({ movie, isVisible, movieid }: MovieHoverCardProps) {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const fetchDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/CelestialInfotech/Netfree/refs/heads/main/pv/post.php/${movieid}`
        )
        const data = await res.json()

        setDetails(data) // store API response
        console.log("data ::::::::::::: ", data);
        
      } catch (err) {
        console.error("Failed to fetch movie details", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [isVisible])

  if (!isVisible) return null


  return (
    <div className="w-80 bg-surface-secondary rounded-xl overflow-hidden shadow-2xl border border-surface-tertiary">
      
      {/* Poster */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3">
          {movie.title}
        </h3>

        {/* Buttons */}
        <div className="flex gap-3 mb-4">
          <Link href={`/movie/${movie.id}`} className="flex-1">
            <button className="w-full bg-white text-black py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Play size={18} fill="currentColor" />
              <span>Play</span>
            </button>
          </Link>

          <button className="p-3 rounded-lg bg-surface-tertiary">
            <Plus size={20} />
          </button>

          <button className="p-3 rounded-lg bg-surface-tertiary">
            <Info size={20} />
          </button>
        </div>

        {/* Prime tag */}
        <div className="flex items-center gap-2 text-xs mb-3">
          <Check size={16} className="text-primary" />
          <span>Included with Prime</span>
        </div>

        {/* Dynamic details */}
        {loading ? (
          <p className="text-sm text-foreground-muted">Loading…</p>
        ) : (
          <>
            <div className="flex gap-2 text-xs text-foreground-muted mb-3">
              <span>{details?.year || movie.year || "2024"}</span>
              <span>•</span>
              <span>{details?.duration || movie.duration || "1h 48m"}</span>
              <span>•</span>
              <span>{details?.ua || movie.ua || "U/A 18+"}</span>
            </div>

            <p className="text-xs text-foreground-muted leading-relaxed">
              {details?.description || movie.desc || "No description available"}
            </p>
          </>
        )}

      </div>
    </div>
  )
}
