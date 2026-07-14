export interface Film {
  id: string
  title: string
  original_title: string
  original_title_romanised: string
  image: string
  movie_banner: string
  description: string
  director: string
  producer: string
  release_date: string
  running_time: string
  rt_score: string
  people: string[]
  species: string[]
  locations: string[]
  vehicles: string[]
  url: string
}

export interface NormalizedFilm {
  id: string
  title: string
  originalTitle: string
  originalTitleRomanised: string
  posterImage: string
  bannerImage: string
  description: string
  director: string
  producer: string
  releaseYear: number
  runningTimeMinutes: number
  rtScore: number
}

export type SortKey = "releaseYear" | "rtScore"
export type SortDirection = "asc" | "desc"

export interface SortOption {
  key: SortKey
  direction: SortDirection
  label: string
}
