/**
 * Shape returned by GET https://ghibliapi.vercel.app/films
 * Verified against the live API response (2026-07-14).
 *
 * Notes on the raw API's quirks that we deliberately keep as-is here
 * (and normalize later in api.ts / utils.ts):
 * - `release_date`, `running_time`, `rt_score` are all numeric values
 *   encoded as strings by the API.
 * - `people`, `species`, `locations`, `vehicles` are arrays of resource
 *   URLs (not expanded objects). We don't need to follow them for this
 *   assignment, but the field is typed for completeness.
 * - Some entries have a single-element array containing a "collection root"
 *   URL with no trailing id (e.g. "https://ghibliapi.vercel.app/people/")
 *   when a film has no related resources — not a real reference.
 */
export interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

/**
 * Normalized film shape used throughout the app (UI-facing).
 * Numeric fields are converted from the API's string encoding so
 * components never have to think about parsing.
 */
export interface NormalizedFilm {
  id: string;
  title: string;
  originalTitle: string;
  originalTitleRomanised: string;
  posterImage: string;
  bannerImage: string;
  description: string;
  director: string;
  producer: string;
  releaseYear: number;
  runningTimeMinutes: number;
  rtScore: number;
}

export type SortKey = "releaseYear" | "rtScore";
export type SortDirection = "asc" | "desc";

export interface SortOption {
  key: SortKey;
  direction: SortDirection;
  label: string;
}

/**
 * Discriminated union for async data state.
 * Lets components exhaustively switch on `status` instead of juggling
 * separate loading/error/data booleans.
 */
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };