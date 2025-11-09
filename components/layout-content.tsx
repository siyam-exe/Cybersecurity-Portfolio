"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BinaryRain } from "@/components/binary-rain"
import { LiveTerminal } from "@/components/live-terminal"
import { FloatingTerminalButton } from "@/components/floating-terminal-button"
import { usePathname } from "next/navigation"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  return (
    <>
      <BinaryRain />
      <div id="ctf-announcement" aria-live="polite" aria-atomic="true" className="sr-only" />

      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
      {!isLandingPage && <FloatingTerminalButton />}
      <LiveTerminal />
    </>
  )
}
