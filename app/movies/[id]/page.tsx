import MovieBanner from "@/components/movies/details/MovieBanner"
import MovieMeta from "@/components/movies/details/MovieMeta"
import MoviePoster from "@/components/movies/details/MoviePoster"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getFilmById } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: MovieDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const film = await getFilmById(id)

  if (!film) {
    return { title: "Movie not found" }
  }

  return {
    title: film.title,
    description: film.description.slice(0, 155),
    openGraph: {
      title: film.title,
      description: film.description.slice(0, 155),
      images: [film.posterImage],
    },
  }
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params
  const film = await getFilmById(id)

  if (!film) {
    notFound()
  }

  return (
    <>
      <main>
        <MovieBanner src={film.bannerImage} alt={`${film.title} banner`} />

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "mt-4 -ml-2",
            })}
          >
            <ArrowLeft
              data-icon="inline-start"
              className="h-4 w-4"
              aria-hidden="true"
            />
            Back to all movies
          </Link>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end">
            <MoviePoster src={film.posterImage} alt={`${film.title} poster`} />
            <div className="pb-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {film.title}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-3xl leading-relaxed text-foreground/90">
            {film.description}
          </p>

          <Separator className="my-8" />

          <MovieMeta film={film} />
        </div>
      </main>
    </>
  )
}
export default MovieDetailsPage
