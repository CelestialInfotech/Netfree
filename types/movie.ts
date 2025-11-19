export interface Movie {
  id: string
  img: string
  genre: string
  match: string
  runtime: string
  desc: string
  producers: string
  ua: string
  namelogo?: string
  title: string
  cate?: string
  year?: string
  duration?: string
  rating?: string
  genres?: string
  cast?: string
  director?: string
  imdbRating?: string
  lang: any[]
  episodes: any[]
  season?: SeasonData[]
  type?: string
}

export interface SeasonData {
  s: string      // season number
  id: string     // season API id
  ep: string     // number of episodes
}
export interface Season {
  seasonNumber: number
  episodes: Episode[]
}

export interface Episode {
  episodeNumber: number
  title: string
  description: string
  duration: string
  releaseDate: string
  rating: string
  thumbnail: string
  videoUrl?: string
}
export interface MovieSlider {
  id: string
  img: string
  desc: string
  ua: string
  namelogo?: string
  title: string
}

export interface MovieCategory {
  ids: string
  cate: string
}
