import { Badge } from "@/components/ui/badge"
import { NormalizedFilm } from "@/lib/types"
import { cn, formatRuntime, getScoreTier } from "@/lib/utils"
import { ReactNode } from "react"

const SCORE_TIER_STYLES: Record<ReturnType<typeof getScoreTier>, string> = {
  high: "bg-green-600 text-white hover:bg-green-600",
  medium: "bg-yellow-500 text-black hover:bg-yellow-500",
  low: "bg-red-600 text-white hover:bg-red-600",
}

interface MovieMetaProps {
  film: NormalizedFilm
}

interface MetaItem {
  label: string
  value: ReactNode
}

const MovieMeta = ({ film }: MovieMetaProps) => {
  const items: MetaItem[] = [
    { label: "Director", value: film.director },
    { label: "Producer", value: film.producer },
    { label: "Release Year", value: film.releaseYear || "Unknown" },
    { label: "Running Time", value: formatRuntime(film.runningTimeMinutes) },
    {
      label: "Rating",
      value: (
        <Badge
          className={cn(
            "font-semibold",
            SCORE_TIER_STYLES[getScoreTier(film.rtScore)]
          )}
        >
          {film.rtScore}%
        </Badge>
      ),
    },
  ]

  return (
    <>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
export default MovieMeta
