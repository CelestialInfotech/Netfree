'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Movie, MovieSlider } from '@/types/movie'
import Link from 'next/link'

interface HeroCarouselProps {
  movies: MovieSlider[]
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, movies.length])

  const movie = movies[current]

  if (!movie) return null

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-smooth duration-500"
        style={{ backgroundImage: `url(${movie.img})` }}
      >
        {/* <div className="absolute inset-0 gradient-overlay" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-2xl">
          {/* Movie Logo/Title */}
          {movie.namelogo ? (
            <img
              src={movie.namelogo || "/placeholder.svg"}
              alt={movie.title}
              className="h-16 sm:h-20 md:h-30 mb-3 sm:mb-4 object-contain"
            />
          ) : (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white text-shadow">
              {movie.title}
            </h1>
          )}

          {/* Description */}
          <p className="text-foreground-muted text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
            {movie.desc}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-2 sm:gap-4 mb-6">
            {movie.ua && (
              <span className="px-2 sm:px-3 py-1 bg-surface-secondary text-foreground-muted text-xs sm:text-sm rounded">
                {movie.ua}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Link href={`/movie/${movie.id}`}>
              <Button className="bg-primary hover:bg-primary-hover text-white gap-2 transition-smooth hover:scale-105">
                <Play size={18} />
                <span>Watch Now</span>
              </Button>
            </Link>
            <Link href={`/movie/${movie.id}`}>
              <Button
                variant="outline"
                className="border-foreground-muted text-foreground hover:border-primary hover:text-primary transition-smooth gap-2"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add to List</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={() => {
          setCurrent((prev) => (prev - 1 + movies.length) % movies.length)
          setAutoplay(false)
        }}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-primary rounded-full transition-smooth opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} className="text-white" />
      </button> */}

      {/* <button
        onClick={() => {
          setCurrent((prev) => (prev + 1) % movies.length)
          setAutoplay(false)
        }}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-primary rounded-full transition-smooth opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} className="text-white" />
      </button> */}

      {/* Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoplay(false)
            }}
            className={`w-2 h-2 rounded-full transition-smooth ${idx === current ? 'bg-primary w-6' : 'bg-foreground-muted'}`}
          />
        ))}
      </div> */}
    </div>
  )
}
