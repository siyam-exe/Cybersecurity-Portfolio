import { readFileSync } from "node:fs"
import path from "node:path"
import catalog from "@/content/writeups/catalog.json"

export const writeupCategories = [
  "Cryptography",
  "OSINT",
  "Forensics",
  "Privilege Escalation",
  "Web Exploitation",
  "Binary Exploitation",
  "Reverse Engineering",
] as const

export type WriteupCategory = (typeof writeupCategories)[number]

export interface WriteupMetadata {
  sourceFile: string
  slug: string
  title: string
  platform: string
  category: WriteupCategory
  summary: string
  tags: readonly string[]
  cover: string
  github: string
}

export interface Writeup extends WriteupMetadata {
  content: string
}

export interface WriteupHeading {
  depth: 2 | 3
  id: string
  text: string
}

const categorySlugs: Record<WriteupCategory, string> = {
  Cryptography: "cryptography",
  OSINT: "osint",
  Forensics: "forensics",
  "Privilege Escalation": "privilege-escalation",
  "Web Exploitation": "web-exploitation",
  "Binary Exploitation": "binary-exploitation",
  "Reverse Engineering": "reverse-engineering",
}

function isCategory(value: string): value is WriteupCategory {
  return writeupCategories.some((category) => category === value)
}

function createMetadata(item: (typeof catalog)[number]): WriteupMetadata {
  if (!isCategory(item.category)) throw new Error(`Unknown writeup category: ${item.category}`)

  return {
    ...item,
    category: item.category,
    cover: `/writeups/assets/${item.slug}/image-001.png`,
    github: `https://github.com/siyam-exe/30-day-ctf-writeup/blob/main/writeups/${item.sourceFile}`,
  }
}

export const writeups = catalog.map(createMetadata)

const uniqueSlugs = new Set(writeups.map(({ slug }) => slug))
if (uniqueSlugs.size !== writeups.length) throw new Error("Writeup slugs must be unique")

export function getWriteup(slug: string): Writeup | null {
  const metadata = writeups.find((item) => item.slug === slug)
  if (!metadata) return null

  const articlePath = path.join(
    process.cwd(),
    "content",
    "writeups",
    "articles",
    categorySlugs[metadata.category],
    `${metadata.slug}.md`,
  )

  return { ...metadata, content: readFileSync(articlePath, "utf8") }
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getWriteupHeadings(content: string): WriteupHeading[] {
  const headings: WriteupHeading[] = []
  let inCodeBlock = false

  for (const line of content.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = /^(##|###)\s+(.+)$/.exec(line)
    if (!match) continue
    const text = match[2].replace(/[`*_~]/g, "").trim()
    headings.push({ depth: match[1].length as 2 | 3, id: slugifyHeading(text), text })
  }

  return headings
}

export function getRelatedWriteups(writeup: WriteupMetadata) {
  const related = writeups.filter((item) => item.category === writeup.category)
  const index = related.findIndex((item) => item.slug === writeup.slug)
  return {
    previous: index > 0 ? related[index - 1] : null,
    next: index < related.length - 1 ? related[index + 1] : null,
  }
}
