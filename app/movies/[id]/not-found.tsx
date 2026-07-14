import { Button } from "@/components/ui/button"
import { FilmIcon } from "lucide-react"
import Link from "next/link"

const MovieNotFound = () => {
  return (
    <>
      <main className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <FilmIcon
          className="h-10 w-10 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="text-xl font-semibold">Movie not found</h1>
        <p className="max-w-md text-muted-foreground">
          We couldn&apos;t find a movie with that id. It may have been removed
          or the link is incorrect.
        </p>
        <Button nativeButton={false} render={<Link href="/" />}>
          Back to all movies
        </Button>
      </main>
    </>
  )
}
export default MovieNotFound
