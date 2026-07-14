"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

interface MovieDetailsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const MovieDetailsError = ({ error, reset }: MovieDetailsErrorProps) => {
  useEffect(() => {
    console.error("Failed to load movie details:", error)
  }, [error])

  return (
    <>
      <main className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <AlertTriangle
          className="h-10 w-10 text-destructive"
          aria-hidden="true"
        />
        <h1 className="text-xl font-semibold">Couldn&apos;t load this movie</h1>
        <p className="max-w-md text-muted-foreground">{error.message}</p>
        <div className="flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" render={<Link href="/" />}>
            Back to all movies
          </Button>
        </div>
      </main>
    </>
  )
}
export default MovieDetailsError
