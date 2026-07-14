import { PLACEHOLDER_POSTER } from "@/lib/constants"
import Image from "next/image"

interface MovieBannerProps {
  src: string
  alt: string
}

const MovieBanner = ({ src, alt }: MovieBannerProps) => {
  return (
    <>
      <div className="relative h-[220px] w-full overflow-hidden rounded-b-xl bg-muted sm:h-[320px] lg:h-[400px]">
        <Image
          src={src || PLACEHOLDER_POSTER}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Fades the banner into the page background so the poster/title
          block below reads cleanly regardless of banner brightness. */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      </div>
    </>
  )
}
export default MovieBanner
