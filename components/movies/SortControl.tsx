"use client"

import { ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { SORT_OPTIONS } from "@/lib/constants"

interface SortControlProps {
  value: string
  onValueChange: (value: string) => void
}

const SortControl = ({ value, onValueChange }: SortControlProps) => {
  return (
    <>
      <Select
        items={SORT_OPTIONS}
        value={value}
        onValueChange={(newValue) => {
          if (newValue !== null) {
            onValueChange(newValue)
          }
        }}
      >
        <SelectTrigger className="w-full sm:w-[240px]" aria-label="Sort movies">
          <ArrowUpDown
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
export default SortControl
