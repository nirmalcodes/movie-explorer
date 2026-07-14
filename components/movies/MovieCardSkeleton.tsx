import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const MovieCardSkeleton = () => {
  return (
    <>
      <Card className="h-full overflow-hidden pt-0" aria-hidden="true">
        <Skeleton className="aspect-[2/3] w-full rounded-none" />

        <CardContent className="pt-4">
          <Skeleton className="h-5 w-3/4" />
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </Card>
    </>
  )
}
export default MovieCardSkeleton
