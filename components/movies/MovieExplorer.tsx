"use client"

import { DEFAULT_SORT_VALUE } from "@/lib/constants"
import { NormalizedFilm } from "@/lib/types"
import { filterFilmsByTitle, parseSortValue, sortFilms } from "@/lib/utils"
import { useMemo, useState } from "react"
import SearchBar from "./SearchBar"
import SortControl from "./SortControl"
import EmptyState from "./EmptyState"
import MovieGrid from "./MovieGrid"

interface MovieExplorerProps {
  films: NormalizedFilm[]
}

const MovieExplorer = ({ films }: MovieExplorerProps) => {
  const [query, setQuery] = useState("")
  const [sortValue, setSortValue] = useState(DEFAULT_SORT_VALUE)

  const visibleFilms = useMemo(() => {
    const filtered = filterFilmsByTitle(films, query)
    const { key, direction } = parseSortValue(sortValue)
    return sortFilms(filtered, key, direction)
  }, [films, query, sortValue])
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar onSearchChange={setQuery} />
          <SortControl value={sortValue} onValueChange={setSortValue} />
        </div>

        <p aria-live="polite" className="sr-only">
          {visibleFilms.length} movie{visibleFilms.length === 1 ? "" : "s"}{" "}
          found
        </p>

        {visibleFilms.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <MovieGrid films={visibleFilms} />
        )}
      </div>
    </>
  )
}
export default MovieExplorer
