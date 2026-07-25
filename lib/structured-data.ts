import type { Project } from "@/lib/content"
import type { WriteupMetadata } from "@/lib/writeups"
import { absoluteUrl, siteConfig, siteLinks } from "@/lib/site"

const personId = absoluteUrl("/#person")
const websiteId = absoluteUrl("/#website")

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  alternateName: siteConfig.handle,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.avatar),
  jobTitle: "SOC Analyst and Security Researcher",
  knowsAbout: [
    "Security operations",
    "Security research",
    "Penetration testing",
    "Network security",
    "Digital forensics",
  ],
  sameAs: [siteLinks.github, siteLinks.linkedin, siteLinks.medium],
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        alternateName: siteConfig.handle,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#webpage"),
        name: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      personSchema,
    ],
  }
}

function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  }
}

export function aboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/about#webpage"),
        name: `About ${siteConfig.name}`,
        description: `Professional profile, experience, education, certifications, capabilities, tools, and interests of ${siteConfig.name}.`,
        url: absoluteUrl("/about"),
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      personSchema,
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  }
}

export function projectsSchema(projects: readonly Project[]) {
  const documented = projects.filter((project) => project.status === "Documented")

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/projects#webpage"),
        name: `${siteConfig.name} — Cybersecurity Projects`,
        description: "Documented security projects with architecture, technical decisions, detection evidence, and reproducible operations.",
        url: absoluteUrl("/projects"),
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: documented.length,
          itemListElement: documented.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              url: absoluteUrl("/projects"),
              sameAs: project.github ?? undefined,
              keywords: project.tags.join(", "),
              author: { "@id": personId },
            },
          })),
        },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
    ],
  }
}

export function writeupsSchema(writeups: readonly WriteupMetadata[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/writeups#webpage"),
        name: `${siteConfig.name} — Cybersecurity Writeups`,
        description: "Technical security walkthroughs organized by category and platform.",
        url: absoluteUrl("/writeups"),
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: writeups.length,
          itemListElement: writeups.map((writeup, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: writeup.title,
            url: absoluteUrl(`/writeups/${writeup.slug}`),
          })),
        },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Writeups", path: "/writeups" },
      ]),
    ],
  }
}

export function writeupSchema(writeup: WriteupMetadata) {
  const path = `/writeups/${writeup.slug}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": absoluteUrl(`${path}#article`),
        headline: writeup.title,
        description: writeup.summary,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        image: absoluteUrl(siteConfig.image),
        articleSection: writeup.category,
        keywords: [writeup.category, writeup.platform, ...writeup.tags].join(", "),
        author: { "@id": personId },
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
      personSchema,
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Writeups", path: "/writeups" },
        { name: writeup.title, path },
      ]),
    ],
  }
}

export function pageSchema({
  type,
  name,
  description,
  path,
}: {
  type: "ContactPage" | "WebPage"
  name: string
  description: string
  path: string
}) {
  const label = path === "/contact" ? "Contact" : "Privacy"

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": absoluteUrl(`${path}#webpage`),
        name,
        description,
        url: absoluteUrl(path),
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: label, path },
      ]),
    ],
  }
}
