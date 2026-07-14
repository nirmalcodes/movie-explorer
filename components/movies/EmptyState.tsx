import { SearchX } from "lucide-react"

interface EmptyStateProps {
  query?: string
}

const EmptyState = ({ query }: EmptyStateProps) => {
  return (
    <>
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center text-muted-foreground"
      >
        <SearchX className="h-10 w-10" aria-hidden="true" />
        <p className="font-medium text-foreground">
          {query ? `No results found for "${query}"` : "No movies found"}
        </p>
        <p className="text-sm">
          Try a different title or clear the search to see all movies.
        </p>
      </div>
    </>
  )
}
export default EmptyState
