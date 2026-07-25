import type { Metadata } from "next"

export const siteConfig = {
  name: "Alif Abedin Siyam",
  handle: "1tsD@M0nk3",
  title: "Alif Abedin Siyam | SOC Analyst & Security Researcher",
  description:
    "Cybersecurity portfolio of Alif Abedin Siyam, a SOC analyst and security researcher documenting practical projects, security investigations, and technical writeups.",
  url: "https://alifabedinsiyam.vercel.app",
  locale: "en_US",
  image: "/og.png",
  avatar: "/monkey.png",
} as const

export const siteLinks = {
  github: "https://github.com/siyam-exe",
  linkedin: "https://www.linkedin.com/in/alif-abedin-siyam/",
  medium: "https://medium.com/@siyam.exe",
  email: "mailto:siyam.exe@gmail.com",
  emailAddress: "siyam.exe@gmail.com",
} as const

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

interface PageMetadata {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
  type?: "website" | "article"
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path)

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: siteConfig.image,
          width: 1792,
          height: 1024,
          alt: `${siteConfig.name} cybersecurity portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.image],
    },
  }
}
