import { NormalizedFilm } from "@/lib/types"
import MovieCard from "./MovieCard"

interface MovieGridProps {
  films: NormalizedFilm[]
}

const MovieGrid = ({ films }: MovieGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {films.map((film) => (
          <MovieCard key={film.id} film={film} />
        ))}
      </div>
    </>
  )
}
export default MovieGrid
