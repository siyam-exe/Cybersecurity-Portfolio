import { ExternalLink } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { WriteupLibrary } from "@/components/writeup-library"
import { createPageMetadata, siteLinks } from "@/lib/site"
import { writeupsSchema } from "@/lib/structured-data"
import { writeups, writeupCategories } from "@/lib/writeups"

export const metadata = createPageMetadata({
  title: "Cybersecurity Writeups | Alif Abedin Siyam",
  description: "Technical CTF walkthroughs across cryptography, OSINT, forensics, privilege escalation, web exploitation, binary exploitation, and reverse engineering.",
  path: "/writeups",
  keywords: ["cybersecurity writeups", "CTF writeups", "security research", "technical walkthroughs"],
})

export default function WriteupsPage() {
  return (
    <div className="page-enter container mx-auto px-4 py-20">
      <JsonLd data={writeupsSchema(writeups)} />
      <header className="mb-10 max-w-5xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-secondary">Technical knowledge library</p>
        <h1 className="mb-4 text-4xl font-bold text-primary neon-glow md:text-5xl">
          <span className="text-secondary">{">"}</span> Writeups
        </h1>
        <p className="max-w-4xl leading-7 text-muted-foreground">
          Technical walkthroughs documenting how I approach authorized CTF challenges, investigate evidence, test assumptions, use security tooling, and turn the final solution into a reproducible explanation.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-primary">{writeups.length} completed writeups</span>
          <span className="rounded-md border border-secondary/30 bg-secondary/5 px-3 py-2 text-secondary">{writeupCategories.length} technical categories</span>
          <a href="https://github.com/siyam-exe/30-day-ctf-writeup" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-muted-foreground transition hover:border-primary hover:text-primary">
            GitHub source <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a href={siteLinks.medium} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-muted-foreground transition hover:border-primary hover:text-primary">
            Medium articles <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <WriteupLibrary writeups={writeups} categories={writeupCategories} />
    </div>
  )
}
