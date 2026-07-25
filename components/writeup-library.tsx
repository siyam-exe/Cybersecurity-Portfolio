"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { BookOpen, FileCode2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TerminalBox } from "@/components/terminal-box"
import type { WriteupCategory, WriteupMetadata } from "@/lib/writeups"

interface WriteupLibraryProps {
  writeups: readonly WriteupMetadata[]
  categories: readonly WriteupCategory[]
}

export function WriteupLibrary({ writeups, categories }: WriteupLibraryProps) {
  const [category, setCategory] = useState<WriteupCategory | "All">("All")
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return writeups.filter((writeup) => {
      const matchesCategory = category === "All" || writeup.category === category
      const searchable = [writeup.title, writeup.platform, writeup.category, writeup.summary, ...writeup.tags]
        .join(" ")
        .toLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, query, writeups])

  const sections = categories
    .map((name) => ({ name, writeups: visible.filter((writeup) => writeup.category === name) }))
    .filter((section) => section.writeups.length > 0)

  return (
    <>
      <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex flex-wrap gap-2" aria-label="Filter writeups by category">
          <button
            type="button"
            onClick={() => setCategory("All")}
            aria-pressed={category === "All"}
            className={`rounded-md border px-3 py-2 text-sm transition-colors ${category === "All" ? "border-primary bg-primary text-primary-foreground" : "border-primary/30 bg-background/70 text-muted-foreground hover:border-primary hover:text-primary"}`}
          >
            All <span className="opacity-70">{writeups.length}</span>
          </button>
          {categories.map((name) => {
            const count = writeups.filter((writeup) => writeup.category === name).length
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
                className={`rounded-md border px-3 py-2 text-sm transition-colors ${category === name ? "border-primary bg-primary text-primary-foreground" : "border-primary/30 bg-background/70 text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {name} <span className="opacity-70">{count}</span>
              </button>
            )
          })}
        </div>

        <label className="relative block min-w-72">
          <span className="sr-only">Search writeups</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools, platforms, techniques..."
            className="w-full rounded-md border border-primary/40 bg-background/80 py-2.5 pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      {sections.length ? (
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.name} aria-labelledby={`category-${section.name}`}>
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md border border-secondary/40 bg-secondary/10 text-secondary">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h2 id={`category-${section.name}`} className="text-2xl font-bold text-primary">
                    <span className="text-secondary">{">"}</span> {section.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">{section.writeups.length} documented walkthrough{section.writeups.length === 1 ? "" : "s"}</p>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {section.writeups.map((writeup, index) => (
                  <Link
                    key={writeup.slug}
                    href={`/writeups/${writeup.slug}`}
                    className="section-enter group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}
                  >
                    <TerminalBox className="card-popup h-full overflow-hidden p-0 transition-colors group-hover:border-secondary">
                      <div className="relative space-y-4 p-5">
                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-secondary/10 transition-transform duration-500 group-hover:scale-110" />
                        <div className="pointer-events-none absolute right-6 top-8 h-10 w-10 rotate-45 border border-primary/10" />
                        <div className="relative flex items-center justify-between gap-4">
                          <div className="grid h-10 w-10 place-items-center rounded-md border border-secondary/30 bg-secondary/10 text-secondary">
                            <FileCode2 className="h-5 w-5" />
                          </div>
                          <Badge className="border-primary/45 bg-background/80 text-primary">
                            {writeup.platform}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                          {writeup.title}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">{writeup.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {writeup.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="border-t border-primary/15 pt-3 text-xs text-secondary transition-colors group-hover:text-primary">
                          Read full walkthrough <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </TerminalBox>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <TerminalBox title="search-results.log">
          <p className="py-10 text-center text-muted-foreground">No writeups match that search.</p>
        </TerminalBox>
      )}
    </>
  )
}
