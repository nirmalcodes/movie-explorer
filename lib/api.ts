import {
  FILMS_ENDPOINT,
  FILMS_REVALIDATE_SECONDS,
  filmByIdEndpoint,
} from "./constants"
import { Film, NormalizedFilm } from "./types"

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
    releaseYear: Number.isNaN(releaseYear) ? 0 : releaseYear,
    runningTimeMinutes: Number.isNaN(runningTimeMinutes)
      ? 0
      : runningTimeMinutes,
    rtScore: Number.isNaN(rtScore) ? 0 : rtScore,
  }
}

export async function getFilms(): Promise<NormalizedFilm[]> {
  const response = await fetch(FILMS_ENDPOINT, {
    next: { revalidate: FILMS_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch films (${response.status})`)
  }

  const films: Film[] = await response.json()
  return films.map(normalizeFilm)
}

export async function getFilmById(id: string): Promise<NormalizedFilm | null> {
  const response = await fetch(filmByIdEndpoint(id), {
    next: { revalidate: FILMS_REVALIDATE_SECONDS },
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch film ${id} (${response.status})`)
  }

  const film: Film = await response.json()
  return normalizeFilm(film)
}
