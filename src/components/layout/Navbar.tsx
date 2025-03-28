import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"

export default function Navbar() {
  return (
      // {/* Navbar */}
      <nav className="fixed top-0 w-full bg-transparent py-3 px-6 flex items-center justify-between z-50">
        <Link href="/" className="text-xl font-bold">
          NextPress
        </Link>

        <div className="flex gap-8 items-center">
          <Link href="/authors" className="text-sm">
            Authors
          </Link>

          <Link href="/blog" className="text-sm">
            Blog
          </Link>

          <Link href="/cpt" className="text-sm">
            Projects
          </Link>
          <ThemeToggle />
        </div>
      </nav>
  )
}
