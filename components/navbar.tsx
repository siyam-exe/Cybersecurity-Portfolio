"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Terminal, X } from "lucide-react"

const navItems = [
  { href: "/about", label: "About" },
  { href: "/writeups", label: "Writeups" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <nav className="nav-enter sticky top-0 z-50 border-b border-primary/30 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" aria-label="Home" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group">
          <Terminal className="h-5 w-5" aria-hidden="true" />
          <span className="text-lg font-bold neon-glow flex items-center gap-1">
            1tsD@M0nk3
            <span className="inline-block w-2 h-5 bg-primary blink ml-1" aria-hidden="true" />
          </span>
        </Link>

        <button
          type="button"
          className="md:hidden text-primary p-2 rounded hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div id="primary-navigation" className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-2 border-b border-primary/30 bg-black/95 p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-all hover:text-primary hover:neon-glow relative group py-2 md:py-0 ${active ? "text-primary neon-glow" : "text-[#E0E0E0]"}`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
