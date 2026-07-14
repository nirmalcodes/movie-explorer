"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useEffect } from "react"

interface HomeErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const HomeError = ({ error, reset }: HomeErrorProps) => {
  useEffect(() => {
    console.error("Failed to load movies:", error)
  }, [error])

  return (
    <>
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <AlertTriangle
          className="h-10 w-10 text-destructive"
          aria-hidden="true"
        />
        <h1 className="text-xl font-semibold">Couldn&apos;t load movies</h1>
        <p className="max-w-md text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </main>
    </>
  )
}
export default HomeError
