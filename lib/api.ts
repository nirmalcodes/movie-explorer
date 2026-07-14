import {
  FILMS_ENDPOINT,
  FILMS_REVALIDATE_SECONDS,
  filmByIdEndpoint,
} from "./constants"
import { Film, NormalizedFilm } from "./types"

/**
 * Thrown for any failure in the data layer (network failure, non-2xx
 * response, or unexpected payload shape). Lets UI code distinguish
 * "no results" from "something actually broke" and lets error.tsx
 * boundaries render a useful message.
 */
export class FilmsApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = "FilmsApiError"
  }
}

/**
 * Converts a raw API film (numeric fields as strings, inconsistent
 * naming) into the normalized shape the UI consumes.
 */
export function normalizeFilm(film: Film): NormalizedFilm {
  const releaseYear = Number.parseInt(film.release_date, 10)
  const runningTimeMinutes = Number.parseInt(film.running_time, 10)
  const rtScore = Number.parseInt(film.rt_score, 10)

  return {
    id: film.id,
    title: film.title,
    originalTitle: film.original_title,
    originalTitleRomanised: film.original_title_romanised,
    posterImage: film.image,
    bannerImage: film.movie_banner,
    description: film.description,
    director: film.director,
    producer: film.producer,
    // Guard against any future API weirdness (e.g. an empty string)
    // producing NaN and silently breaking sort/display downstream.
    releaseYear: Number.isNaN(releaseYear) ? 0 : releaseYear,
    runningTimeMinutes: Number.isNaN(runningTimeMinutes)
      ? 0
      : runningTimeMinutes,
    rtScore: Number.isNaN(rtScore) ? 0 : rtScore,
  }
}

/**
 * Fetches the full film catalog.
 *
 * Intended to be called from a Server Component so the request is
 * cached/revalidated by Next.js rather than re-fetched on every
 * client interaction. Downstream search/sort operate on this
 * in-memory list rather than re-hitting the API.
 */
export async function getFilms(): Promise<NormalizedFilm[]> {
  let response: Response

  try {
    response = await fetch(FILMS_ENDPOINT, {
      next: { revalidate: FILMS_REVALIDATE_SECONDS },
    })
  } catch (err) {
    throw new FilmsApiError(
      "Could not reach the Studio Ghibli API. Check your connection and try again."
    )
  }

  if (!response.ok) {
    throw new FilmsApiError(
      `Studio Ghibli API returned an error (${response.status}).`,
      response.status
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new FilmsApiError(
      "Received an unreadable response from the films API."
    )
  }

  if (!Array.isArray(payload)) {
    throw new FilmsApiError("Films API returned an unexpected response shape.")
  }

  return (payload as Film[]).map(normalizeFilm)
}

/**
 * Fetches a single film by id directly from GET /films/{id}, for the
 * details page.
 *
 * Deliberately hits the resource-specific endpoint rather than reusing
 * getFilms() + find() — even though the latter would technically work
 * for a dataset this small (see git history for that version). This
 * mirrors how you'd fetch a single resource against a real production
 * API: don't pull the whole collection to read one record, and let the
 * server tell you definitively whether that id exists (404) rather than
 * inferring it from an in-memory search.
 *
 * Returns null on a 404 (film not found) so the page can call
 * notFound(). Any other failure still throws a FilmsApiError.
 */
export async function getFilmById(id: string): Promise<NormalizedFilm | null> {
  let response: Response

  try {
    response = await fetch(filmByIdEndpoint(id), {
      next: { revalidate: FILMS_REVALIDATE_SECONDS },
    })
  } catch {
    throw new FilmsApiError(
      "Could not reach the Studio Ghibli API. Check your connection and try again."
    )
  }

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new FilmsApiError(
      `Studio Ghibli API returned an error (${response.status}).`,
      response.status
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new FilmsApiError(
      "Received an unreadable response from the films API."
    )
  }

  // Confirmed: an invalid/nonexistent id returns 404 with an empty body,
  // which is already handled above. This check is a separate, narrower
  // safety net for the unlikely case of a 200 response whose body isn't
  // actually a film — cheap to keep, shouldn't ever trigger in practice.
  if (
    !payload ||
    typeof payload !== "object" ||
    !("id" in payload) ||
    !("title" in payload)
  ) {
    return null
  }

  return normalizeFilm(payload as Film)
}
