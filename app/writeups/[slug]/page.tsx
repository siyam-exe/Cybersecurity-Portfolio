import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, ListTree } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JsonLd } from "@/components/json-ld"
import { MarkdownArticle } from "@/components/markdown-article"
import { createPageMetadata, siteLinks } from "@/lib/site"
import { writeupSchema } from "@/lib/structured-data"
import { getRelatedWriteups, getWriteup, getWriteupHeadings, writeups } from "@/lib/writeups"

export function generateStaticParams() {
  return writeups.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) return {}
  return createPageMetadata({
    title: `${writeup.title} | ${writeup.platform} Writeup`,
    description: writeup.summary,
    path: `/writeups/${writeup.slug}`,
    keywords: [writeup.category, writeup.platform, ...writeup.tags, "CTF writeup", "cybersecurity writeup"],
    type: "article",
  })
}

export const dynamicParams = false

export default async function WriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) notFound()

  const headings = getWriteupHeadings(writeup.content)
  const related = getRelatedWriteups(writeup)

  return (
    <div className="page-enter container mx-auto px-4 py-20">
      <JsonLd data={writeupSchema(writeup)} />
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/writeups" className="inline-flex items-center gap-2 text-primary transition hover:text-secondary">
          <ArrowLeft className="h-4 w-4" /> Writeups
        </Link>
        <span aria-hidden="true">/</span>
        <span>{writeup.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{writeup.title}</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-xl border border-primary/45 bg-gradient-to-br from-primary/10 via-card/95 to-secondary/10 p-6 shadow-[0_0_30px_rgba(0,221,136,0.08)] md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-primary/15" />
        <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rotate-45 border border-secondary/10" />
        <div className="relative max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge>{writeup.category}</Badge>
            <Badge variant="outline">{writeup.platform}</Badge>
            <span className="rounded border border-accent/35 bg-accent/10 px-2.5 py-1 text-xs text-accent-foreground">Full solution · spoilers visible</span>
          </div>

          <h1 className="mb-5 text-3xl font-bold text-primary neon-glow md:text-5xl">{writeup.title}</h1>
          <p className="max-w-4xl text-base leading-7 text-muted-foreground md:text-lg">{writeup.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {writeup.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <a href={writeup.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-background/60 px-4 py-2 text-primary transition hover:border-secondary hover:text-secondary">
              Source on GitHub <ExternalLink className="h-4 w-4" />
            </a>
            <a href={siteLinks.medium} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-background/60 px-4 py-2 text-muted-foreground transition hover:border-primary hover:text-primary">
              More on Medium <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0 rounded-xl border border-primary/35 bg-card/80 p-5 shadow-[0_0_25px_rgba(0,221,136,0.06)] backdrop-blur md:p-8 lg:p-10">
          <MarkdownArticle content={writeup.content} slug={writeup.slug} />
        </article>

        <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-primary/25 bg-card/85 p-5 lg:block">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-primary">
            <ListTree className="h-4 w-4" /> Contents
          </h2>
          <nav aria-label="Article contents">
            <ul className="space-y-2 text-xs leading-5">
              {headings.map((heading, index) => (
                <li key={`${heading.id}-${index}`} className={heading.depth === 3 ? "pl-3" : undefined}>
                  <a href={`#${heading.id}`} className="text-muted-foreground transition hover:text-primary">{heading.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <nav aria-label="Related writeups" className="mt-10 grid gap-4 sm:grid-cols-2">
        {related.previous ? (
          <Link href={`/writeups/${related.previous.slug}`} className="group rounded-lg border border-primary/25 bg-card/70 p-5 transition hover:border-primary">
            <span className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Previous in {writeup.category}</span>
            <span className="font-semibold text-foreground transition group-hover:text-primary">{related.previous.title}</span>
          </Link>
        ) : <div />}
        {related.next && (
          <Link href={`/writeups/${related.next.slug}`} className="group rounded-lg border border-primary/25 bg-card/70 p-5 text-right transition hover:border-primary">
            <span className="mb-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">Next in {writeup.category} <ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="font-semibold text-foreground transition group-hover:text-primary">{related.next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
