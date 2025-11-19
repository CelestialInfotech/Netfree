// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import Link from 'next/link'
// import type { Movie } from '@/types/movie'
// import { Play, Plus, Info } from 'lucide-react'
// import { MovieHoverCard } from './movie-hover-card'

// interface MovieCardProps {
//   movie: Movie
// }

// export function MovieCard({ movie }: MovieCardProps) {
//   const [hovered, setHovered] = useState(false)
//   const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
//   const cardRef = useRef<HTMLDivElement>(null)

//   const handleMouseEnter = () => {
//     if (cardRef.current) {
//       const rect = cardRef.current.getBoundingClientRect()
//       setCardPosition({
//         top: rect.top + window.scrollY,
//         left: rect.left + rect.width + 16 // 16px is ml-4 from the original code
//       })
//     }
//     setHovered(true)
//   }

//   return (
//     <div className="relative flex-shrink-0" ref={cardRef}>
//       <div
//         className="relative w-32 sm:w-40 md:w-48 cursor-pointer"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-secondary transform transition-all duration-300 hover:scale-110">
//           <img
//             src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
//             alt={movie.title}
//             className="w-full h-full object-cover"
//           />

//           {/* Gradient overlay on image on hover */}
//           {hovered && (
//             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent rounded-lg" />
//           )}
//         </div>

//         {/* Title below card */}
//         {/* <div className="mt-2 text-foreground text-sm font-semibold line-clamp-2">
//           {movie.title}
//         </div> */}
//       </div>

//       {hovered && (
//         <div
//           className="fixed z-50"
//           style={{
//             top: `${cardPosition.top}px`,
//             left: `${cardPosition.left}px`,
//           }}
//         >
//           <MovieHoverCard movie={movie} isVisible={hovered} movieid={movie.id} />
//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Movie } from '@/types/movie'
import { MovieHoverCard } from './movie-hover-card'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setCardPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width + 16
      })
    }
    setHovered(true)
  }

  const handleClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  return (
    <div className="relative flex-shrink-0" ref={cardRef}>
      <div
        className="relative w-32 sm:w-40 md:w-48 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-secondary transform transition-all duration-300 hover:scale-110">
          <img
            src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent rounded-lg" />
          )}
        </div>

        {/* <div className="mt-2 text-foreground text-sm font-semibold line-clamp-2">
          {movie.title}
        </div> */}
      </div>

      {hovered && (
        <div
          className="fixed z-50"
          style={{
            top: `${cardPosition.top}px`,
            left: `${cardPosition.left}px`,
          }}
        >
          <MovieHoverCard movie={movie} isVisible={hovered} movieid={movie.id} />
        </div>
      )}
    </div>
  )
}
