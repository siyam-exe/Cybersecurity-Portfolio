"use client"

import { useEffect } from "react"
import Link from "next/link"
import { TerminalBox } from "@/components/terminal-box"
import { Button } from "@/components/ui/button"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Route rendering failed", error.digest || error.name)
  }, [error])

  return (
    <div className="container mx-auto max-w-2xl px-4 py-24">
      <TerminalBox title="error.log">
        <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">The page could not be loaded. Try again or return home.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={reset}>Try again</Button>
          <Link href="/" className="inline-flex h-10 items-center rounded-md border border-primary px-4 text-sm text-primary hover:bg-primary/10">Return home</Link>
        </div>
      </TerminalBox>
    </div>
  )
}
