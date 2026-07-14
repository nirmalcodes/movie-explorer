import { FILMS_ENDPOINT, FILMS_REVALIDATE_SECONDS } from "./constants"
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
 * Fetches a single film by id for the details page.
 *
 * Reuses getFilms() rather than hitting /films/{id} directly: the
 * dataset is small (~20 films) and getFilms() is cached, so this
 * avoids a second round trip and keeps normalization logic in one
 * place. Swap to a direct `${FILMS_ENDPOINT}/${id}` fetch if the
 * catalog grows large enough that fetching everything becomes wasteful.
 */
export async function getFilmById(id: string): Promise<NormalizedFilm | null> {
  const films = await getFilms()
  return films.find((film) => film.id === id) ?? null
}
