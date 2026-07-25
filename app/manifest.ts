import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Cybersecurity Portfolio`,
    short_name: siteConfig.handle,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020806",
    theme_color: "#020806",
    icons: [
      {
        src: siteConfig.avatar,
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
