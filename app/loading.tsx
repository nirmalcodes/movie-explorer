import MovieGridSkeleton from "@/components/movies/MovieGridSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

const HomeLoading = () => {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Movie Explorer</h1>
          <p className="mt-1 text-muted-foreground">
            Browse, search, and sort through the Studio Ghibli film catalog.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:max-w-sm" />
            <Skeleton className="h-10 w-full sm:w-[240px]" />
          </div>

          <MovieGridSkeleton count={8} />
        </div>
      </main>
    </>
  )
}
export default HomeLoading
