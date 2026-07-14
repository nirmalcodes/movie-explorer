import { Clapperboard } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Header = () => {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Clapperboard className="h-5 w-5" aria-hidden="true" />
            Movie Explorer
          </Link>
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
export default Header
