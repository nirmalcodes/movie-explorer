import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NormalizedFilm, SortDirection, SortKey } from "./types"
import { orderBy } from "lodash-es"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "124" minutes -> "2h 4m". Falls back gracefully for 0/invalid values. */
export function formatRuntime(minutes: number): string {
  if (!minutes || minutes <= 0) return "Unknown runtime"
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

/**
 * Rotten-Tomatoes-style color tier for the score badge.
 * Thresholds loosely follow RT's own certified-fresh/fresh/rotten bands.
 */
export function getScoreTier(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high"
  if (score >= 40) return "medium"
  return "low"
}

/** Case-insensitive title search. Empty/whitespace query returns all films. */
export function filterFilmsByTitle(
  films: NormalizedFilm[],
  query: string
): NormalizedFilm[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return films
  return films.filter((film) => film.title.toLowerCase().includes(trimmed))
}

/** Sorts by a single key/direction using lodash's orderBy for a stable sort. */
export function sortFilms(
  films: NormalizedFilm[],
  key: SortKey,
  direction: SortDirection
): NormalizedFilm[] {
  return orderBy(films, [key], [direction])
}

/**
 * Parses a combined sort control value like "releaseYear-desc" into its
 * key/direction parts. Matches the `value` format used in SORT_OPTIONS.
 */
export function parseSortValue(value: string): {
  key: SortKey
  direction: SortDirection
} {
  const [key, direction] = value.split("-") as [SortKey, SortDirection]
  return { key, direction }
}
