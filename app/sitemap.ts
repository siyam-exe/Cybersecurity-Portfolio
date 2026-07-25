import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import { writeups } from "@/lib/writeups"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/writeups"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  ]

  return [
    ...routes,
    ...writeups.map(({ slug }) => ({
      url: absoluteUrl(`/writeups/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
