"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

const navItems = [
  { href: "/about", label: "About" },
  { href: "/writeups", label: "Writeups" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-primary/30 bg-black/60 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group">
          <Terminal className="h-5 w-5" />
          <span className="text-lg font-bold neon-glow flex items-center gap-1">
            1tsD@M0nk3
            <span className="inline-block w-2 h-5 bg-primary blink ml-1"></span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-all hover:text-primary hover:neon-glow relative group ${
                pathname === item.href ? "text-primary neon-glow" : "text-[#E0E0E0]"
              }`}
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
