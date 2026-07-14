export const API_BASE_URL = "https://ghibliapi.vercel.app"

export const FILMS_ENDPOINT = `${API_BASE_URL}/films`

export function filmByIdEndpoint(id: string): string {
  return `${FILMS_ENDPOINT}/${id}`
}

/** Revalidate every hour. */
export const FILMS_REVALIDATE_SECONDS = 3600

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "releaseYear-desc", label: "Release Year (Newest first)" },
  { value: "releaseYear-asc", label: "Release Year (Oldest first)" },
  { value: "rtScore-desc", label: "Rating (Highest first)" },
  { value: "rtScore-asc", label: "Rating (Lowest first)" },
]

export const DEFAULT_SORT_VALUE = "releaseYear-desc"

export const PLACEHOLDER_POSTER = "/placeholder-poster.png"
