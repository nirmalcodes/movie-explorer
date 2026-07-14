import { Skeleton } from "@/components/ui/skeleton"

const MovieDetailsSkeleton = () => {
  return (
    <>
      <div aria-hidden="true">
        <Skeleton className="h-[220px] w-full rounded-t-none rounded-b-xl sm:h-[320px] lg:h-[400px]" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 flex flex-col gap-6 sm:-mt-20 sm:flex-row sm:items-end">
            <Skeleton className="aspect-[2/3] w-40 shrink-0 rounded-xl border-4 border-background sm:w-52" />
            <div className="flex-1 space-y-3 pb-2">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key -- static placeholder list
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default MovieDetailsSkeleton
