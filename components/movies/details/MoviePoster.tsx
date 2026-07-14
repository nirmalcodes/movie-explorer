import { PLACEHOLDER_POSTER } from "@/lib/constants"
import Image from "next/image"

interface MoviePosterProps {
  src: string
  alt: string
}

const MoviePoster = ({ src, alt }: MoviePosterProps) => {
  return (
    <>
      <div className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-lg sm:w-52">
        <Image
          src={src || PLACEHOLDER_POSTER}
          alt={alt}
          fill
          sizes="(max-width: 640px) 160px, 208px"
          className="object-cover"
          priority
        />
      </div>
    </>
  )
}
export default MoviePoster
