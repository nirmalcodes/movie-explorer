import MovieExplorer from "@/components/movies/MovieExplorer"
import { getFilms } from "@/lib/api"

const HomePage = async () => {
  const films = await getFilms()
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Movie Explorer</h1>
          <p className="mt-1 text-muted-foreground">
            Browse, search, and sort through the Studio Ghibli film catalog.
          </p>
        </div>

        <MovieExplorer films={films} />
      </main>
    </>
  )
}
export default HomePage
