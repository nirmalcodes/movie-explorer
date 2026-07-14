import { NormalizedFilm } from "@/lib/types"
import { cn, getScoreTier } from "@/lib/utils"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "../ui/card"
import Image from "next/image"
import { PLACEHOLDER_POSTER } from "@/lib/constants"
import { Badge } from "../ui/badge"

const SCORE_TIER_STYLES: Record<ReturnType<typeof getScoreTier>, string> = {
  high: "bg-green-600 text-white hover:bg-green-600",
  medium: "bg-yellow-500 text-black hover:bg-yellow-500",
  low: "bg-red-600 text-white hover:bg-red-600",
}

interface MovieCardProps {
  film: NormalizedFilm
}

const MovieCard = ({ film }: MovieCardProps) => {
  const scoreTier = getScoreTier(film.rtScore)

  return (
    <>
      <Link
        href={`/movies/${film.id}`}
        className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={`View details for ${film.title}`}
      >
        <Card className="h-full overflow-hidden pt-0 transition-shadow duration-200 group-hover:shadow-lg">
          <div className="relative aspect-[2/3] w-full bg-muted">
            <Image
              src={film.posterImage || PLACEHOLDER_POSTER}
              alt={`${film.title} poster`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <Badge
              className={cn(
                "absolute top-2 right-2 font-semibold",
                SCORE_TIER_STYLES[scoreTier]
              )}
            >
              {film.rtScore}%
            </Badge>
          </div>

          <CardContent className="pt-4">
            <h3
              className="line-clamp-1 leading-snug font-semibold"
              title={film.title}
            >
              {film.title}
            </h3>
          </CardContent>

          <CardFooter className="flex items-center justify-between pt-0 text-sm text-muted-foreground">
            <span>{film.releaseYear || "—"}</span>
            <span className="line-clamp-1 text-right" title={film.director}>
              {film.director}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}
export default MovieCard
