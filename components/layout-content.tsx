"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BinaryRain } from "@/components/binary-rain"
import { LiveTerminal } from "@/components/live-terminal"
import { FloatingTerminalButton } from "@/components/floating-terminal-button"
import { RefreshIndicator } from "@/components/refresh-indicator"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BinaryRain />
      <RefreshIndicator />
      <div id="ctf-announcement" aria-live="polite" aria-atomic="true" className="sr-only" />

      <div className="relative z-10">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
      </div>
      <FloatingTerminalButton />
      <LiveTerminal />
    </>
  )
}
