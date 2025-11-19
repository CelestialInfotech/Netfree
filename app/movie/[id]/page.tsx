'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { MovieRow } from '@/components/movie-row'
// import MoviePlayer from '@/components/movie-player'
import { Play, Plus, Share2, Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Movie } from '@/types/movie'
import { SeasonsSection } from '@/components/seasons-section'
import { useAuth } from "@/context/auth-context";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/services/watchlist";
import ShareMenu from "@/components/share-menu";


interface APIMovie {
  ids: string
  cate: string
  title?: string
  desc?: string
  [key: string]: any
}

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const [movie, setMovie] = useState<Movie & { videoUrl?: string } | null>(null)
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([])
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showShare, setShowShare] = useState(false);
  const { user } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);


  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(`/api/detail?id=${encodeURIComponent(movieId)}`)
        const apiData = await res.json()

        console.log("[v0] API response:", apiData)
        setMovie(apiData)
        setSuggestedMovies(apiData.suggest)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [movieId])

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user?.uid) return;
      const exists = await isInWatchlist(user.uid, movieId);
      setInWatchlist(exists);
    };

    checkWatchlist();
  }, [user, movieId]);

  const toggleWatchlist = async () => {
    if (!user?.uid) {
      router.push("/login");
      return;
    }

    try {
      setWatchlistLoading(true);

      if (inWatchlist) {
        await removeFromWatchlist(user.uid, movieId);
        setInWatchlist(false);
      } else {
        await addToWatchlist(user.uid, movieId);
        setInWatchlist(true);
      }
    } catch (error) {
      console.error("Watchlist error:", error);
    } finally {
      setWatchlistLoading(false);
    }
  };



  if (loading) {
    return (
      <main className="bg-background min-h-screen">
        <Header />

        {/* --- Top Banner Skeleton --- */}
        <div className="relative w-full h-screen max-h-[700px] overflow-hidden">
          <div className="w-full h-full bg-surface-secondary animate-pulse" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              {/* Title */}
              <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-3/4 bg-surface-secondary animate-pulse rounded-lg mb-6"></div>

              {/* Description */}
              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-4 w-4/6 bg-surface-secondary animate-pulse rounded"></div>
              </div>

              {/* Tag Row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-5 w-16 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-5 w-12 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-5 w-12 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-5 w-10 bg-surface-secondary animate-pulse rounded"></div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-8">
                <div className="h-11 w-32 bg-surface-secondary animate-pulse rounded-md"></div>
                <div className="h-11 w-11 bg-surface-secondary animate-pulse rounded-md"></div>
                <div className="h-11 w-11 bg-surface-secondary animate-pulse rounded-md"></div>
                <div className="h-11 w-11 bg-surface-secondary animate-pulse rounded-md"></div>
              </div>

              {/* Prime included */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-4 w-40 bg-surface-secondary animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- About Section Skeleton --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left Block */}
            <div className="md:col-span-2">
              <div className="h-7 w-40 bg-surface-secondary animate-pulse rounded mb-4"></div>

              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-surface-secondary animate-pulse rounded"></div>
                <div className="h-4 w-3/5 bg-surface-secondary animate-pulse rounded"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-surface-secondary animate-pulse rounded mb-2"></div>
                    <div className="h-5 w-32 bg-surface-secondary animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block */}
            <div className="bg-surface-secondary rounded-lg p-6 animate-pulse">
              <div className="h-6 w-32 bg-surface animate-pulse rounded mb-4"></div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-surface animate-pulse rounded mb-1"></div>
                    <div className="h-4 w-32 bg-surface animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* More like this */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="h-6 w-40 bg-surface-secondary animate-pulse rounded mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-48 bg-surface-secondary animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }


  if (!movie) {
    return (
      <main className="bg-background min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Movie not found</h2>
            <Button onClick={() => router.push('/')} className="bg-primary hover:bg-primary-hover">
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <Header />

      <div className="relative w-full h-screen max-h-[700px] overflow-hidden">
        <img
          src={`https://imgcdn.kim/pv/c/${movieId}.jpg`}
          alt={movie.title}
          className="w-full h-full object-cover"
        ></img>
        <div
          className="absolute inset-0 bg-cover bg-center"
        // style={{ backgroundImage: `https://imgcdn.kim/pv/c/${movieId}.jpg`,height: '700px', width: '1200px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 text-balance">
              {movie.title}
            </h1>

            <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-6 leading-relaxed max-w-xl line-clamp-3">
              {movie.desc}
            </p>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 flex-wrap text-sm sm:text-base">
              <span className="text-gray-300">{movie.match}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{movie.runtime}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">HD</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">{movie.ua}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 text-base">
              {movie.genre?.split(',').map((genre, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white underline transition-colors cursor-pointer"
                >
                  {genre}
                  {index < (movie.genres?.length || 0) - 1 && <span className="ml-4">•</span>}
                </a>
              ))}
            </div>
            {/* <iframe id="iframe-embed" width="100%" height="500" scrolling="no" src="https://videostr.net/embed-1/v3/e-1/XaBjVejjsykA?z=" allowfullscreen="allowfullscreen" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe> */}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() => { movie.type?.toLowerCase() === "t" ? router.push(`/player?id=${movie.episodes[0].id}`) : router.push(`/player?id=${movieId}`) }}
                className="bg-white hover:bg-gray-200 text-black gap-2 transition-smooth px-6 py-2 rounded-md font-semibold"
              >
                <Play size={20} className="fill-black" />
                <span>Play</span>
              </Button>
              {/* <Button className="bg-gray-700 hover:bg-gray-600 text-white gap-2 transition-smooth px-6 py-2 rounded-md">
                <Plus size={20} />
              </Button> */}
              <Button
                onClick={toggleWatchlist}
                disabled={watchlistLoading}
                className={`${inWatchlist ? "bg-green-600 hover:bg-green-500" : "bg-gray-700 hover:bg-gray-600"
                  } text-white gap-2 transition-smooth px-6 py-2 rounded-md`}
              >
                {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
                {inWatchlist ? "Added" : "Watchlist"}
              </Button>
              {/* <Button className="bg-gray-700 hover:bg-gray-600 text-white gap-2 transition-smooth px-6 py-2 rounded-md">
                <Share2 size={20} />
              </Button> */}
              <div className="relative">
                <Button
                  onClick={() => setShowShare((prev) => !prev)}
                  className="bg-gray-700 hover:bg-gray-600 text-white gap-2 transition-smooth px-6 py-2 rounded-md"
                >
                  <Share2 size={20} />
                </Button>

                {showShare && (
                  <ShareMenu
                    movieId={movieId}
                    onClose={() => setShowShare(false)}
                  />
                )}
              </div>



              <Button className="bg-gray-700 hover:bg-gray-600 text-white gap-2 transition-smooth px-6 py-2 rounded-md">
                <Download size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-8 text-sm">
              <Check size={15} className="text-white rounded-lg bg-primary p-0.5" />
              <span className="text-gray-200">Included with Prime</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">About this movie</h2>
            <p className="text-foreground-muted leading-relaxed mb-6">
              {movie.desc} Experience an unforgettable journey with stunning visuals and compelling storytelling.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-foreground-muted text-sm mb-1">Genre</p>
                <p className="text-foreground font-semibold">{movie.genre?.split(',').join(', ')}</p>
              </div>
              <div>
                <p className="text-foreground-muted text-sm mb-1">Director</p>
                <p className="text-foreground font-semibold">
                  {movie.director === "" ? "Extreme Director" : movie.director}
                </p>
              </div>
              <div>
                <p className="text-foreground-muted text-sm mb-1">Cast</p>
                <p className="text-foreground font-semibold">{movie.cast}</p>
              </div>
              <div>
                <p className="text-foreground-muted text-sm mb-1">Producers</p>
                {movie.producers === "" ? "Extreme Producers" : movie.producers}
              </div>
            </div>
          </div>

          <div className="bg-surface-secondary rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">More Info</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-foreground-muted mb-1">Availability</p>
                <p className="text-primary font-semibold">Available Now</p>
              </div>
              <div>
                <p className="text-foreground-muted mb-1">Quality</p>
                <p className="text-foreground">4K Ultra HD</p>
              </div>
              <div>
                <p className="text-foreground-muted mb-1">Languages</p>
                <p className="text-foreground">{movie.lang.map((lang, index) => `${lang.l}, `)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {movie.type?.toLowerCase() === "t" && (
        <SeasonsSection seriesId={movieId} seasons={movie.season ?? []} />
      )}



      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <MovieRow title="More Like This" movies={suggestedMovies} />
      </div>

      <footer className="bg-surface border-t border-surface-secondary mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted text-sm">
          <p>&copy; 2025 NetMirror. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
