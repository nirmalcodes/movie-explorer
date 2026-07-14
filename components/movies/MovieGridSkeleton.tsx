import MovieCardSkeleton from "./MovieCardSkeleton"

interface MovieGridSkeletonProps {
  count?: number
}

const MovieGridSkeleton = ({ count = 8 }: MovieGridSkeletonProps) => {
  return (
    <>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="status"
        aria-label="Loading movies"
      >
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
export default MovieGridSkeleton
