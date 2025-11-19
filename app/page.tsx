'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { HeroCarousel } from '@/components/hero-carousel'
import { MovieRow } from '@/components/movie-row'
import type { Movie, MovieCategory } from '@/types/movie'

export default function Home() {
  const [categories, setCategories] = useState<(MovieCategory & { movies: Movie[] })[]>([])
  const [sliderMovies, setSliderMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/home`)

        const data = await response.json()

        // --------------------------------------------
        // ✅ Set Slider Movies directly from API
        // --------------------------------------------
        setSliderMovies(data.slider || [])

        // --------------------------------------------
        // ✅ Build Movie Categories
        // --------------------------------------------
        const processedCategories = data.post.map((category: any) => {
          const movieIds = category.ids.split(',')

          const movies: Movie[] = movieIds.map((id: string) => ({
            id: id.trim(),
            title: '',
            img: '',
            desc: '',
            ua: '',
          }))

          return {
            ...category,
            movies,
          }
        })

        setCategories(processedCategories)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel movies={sliderMovies} />

      {/* Movie Categories */}
      <div className="max-w-8xl mx-auto">
        {loading ? (
          <>
            {/* --- Hero Banner Shimmer --- */}
            <div className="relative w-full h-[90vh] bg-surface-secondary animate-pulse overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-center px-10">
                {/* Title Big Shimmer */}
                <div className="h-14 w-1/3 bg-surface rounded mb-6"></div>

                {/* Subtitle languages shimmer */}
                <div className="h-4 w-1/4 bg-surface rounded mb-4"></div>

                {/* NEW EPISODE shimmer */}
                <div className="h-5 w-1/5 bg-surface rounded mb-4"></div>

                {/* Description shimmer (3 lines) */}
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-2/3 bg-surface rounded"></div>
                  <div className="h-3 w-3/4 bg-surface rounded"></div>
                  <div className="h-3 w-2/5 bg-surface rounded"></div>
                </div>

                {/* U/A tag */}
                <div className="h-6 w-16 bg-surface rounded mb-8"></div>

                {/* Buttons shimmer */}
                <div className="flex gap-4">
                  <div className="h-10 w-32 bg-surface rounded"></div>
                  <div className="h-10 w-28 bg-surface rounded"></div>
                </div>
              </div>
            </div>

            {/* --- Trending Now Title --- */}
            <div className="max-w-7xl mx-auto px-6 mt-10">
              <div className="h-6 w-40 bg-surface-secondary animate-pulse rounded mb-4"></div>

              {/* --- Movie Card Row Shimmer --- */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 sm:h-48 bg-surface-secondary animate-pulse rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* --- Category Rows Shimmer --- */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="max-w-7xl mx-auto px-6 mt-14">
                <div className="h-6 w-52 bg-surface-secondary animate-pulse rounded mb-4"></div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-40 sm:h-48 bg-surface-secondary animate-pulse rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          categories.map((category) => (
            <MovieRow
              key={category.cate}
              title={category.cate}
              movies={category.movies}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-surface-secondary mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted text-sm">
          <p>&copy; 2025 NetMirror. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
