'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MovieCard } from '@/components/movie-card'
import type { Movie } from '@/types/movie'

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 400
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
        {title}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-r from-background via-background to-transparent hover:from-primary/80 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {/* Movie Container */}

        {movies === null ? (
          <div></div>
        ) : (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}

          </div>
        )}


        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-l from-background via-background to-transparent hover:from-primary/80 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
