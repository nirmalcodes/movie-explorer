"use client"

import { debounce } from "lodash-es"
import { Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Input } from "../ui/input"

interface SearchBarProps {
  onSearchChange: (query: string) => void
  placeholder?: string
}

const DEBOUNCE_MS = 300

const SearchBar = ({
  onSearchChange,
  placeholder = "Search movies by title…",
}: SearchBarProps) => {
  const [value, setValue] = useState("")

  const debouncedOnChange = useMemo(
    () => debounce((query: string) => onSearchChange(query), DEBOUNCE_MS),
    [onSearchChange]
  )

  useEffect(() => {
    return () => debouncedOnChange.cancel()
  }, [debouncedOnChange])
  return (
    <>
      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            const next = e.target.value
            setValue(next)
            debouncedOnChange(next)
          }}
          placeholder={placeholder}
          className="pl-9"
          aria-label="Search movies by title"
        />
      </div>
    </>
  )
}
export default SearchBar
