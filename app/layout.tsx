import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { LayoutContent } from "@/components/layout-content"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "1tsD@M0nk3 | Alif Abedin Siyam",
  description:
    "Cybersecurity student at Asia Pacific University (APU) passionate about ethical hacking, penetration testing, and threat intelligence.",
  keywords: ["cybersecurity", "ethical hacking", "penetration testing", "CTF", "TryHackMe", "HackTheBox"],
  authors: [{ name: "Alif Abedin Siyam" }],
  openGraph: {
    title: "1tsD@M0nk3 | Alif Abedin Siyam",
    description: "Cybersecurity Student & CTF Enthusiast",
    type: "website",
  },
  icons: {
    icon: "/images/monkey.png",
    shortcut: "/images/monkey.png",
    apple: "/images/monkey.png",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="bg-background text-foreground font-mono">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
