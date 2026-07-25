"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function CenteredIntro({ headingId }: { headingId?: string }) {
  const [phase, setPhase] = useState<"name" | "alias">("name")
  const [displayedName, setDisplayedName] = useState("")
  const [displayedAlias, setDisplayedAlias] = useState("")
  const [reduceMotion, setReduceMotion] = useState(false)

  const fullName = "Alif Abedin Siyam"
  const alias = "1tsD@M0nk3"

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setPhase("name")
      setDisplayedName(fullName)
      setDisplayedAlias("")
      return
    }

    if (phase === "name") {
      if (displayedName.length < fullName.length) {
        const timer = setTimeout(() => {
          setDisplayedName(fullName.slice(0, displayedName.length + 1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setPhase("alias")
          setDisplayedName("")
        }, 5000)
        return () => clearTimeout(timer)
      }
    } else if (phase === "alias") {
      if (displayedAlias.length < alias.length) {
        const timer = setTimeout(() => {
          setDisplayedAlias(alias.slice(0, displayedAlias.length + 1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setPhase("name")
          setDisplayedAlias("")
          setDisplayedName("")
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [displayedName, displayedAlias, phase, reduceMotion])

  return (
    <div className="home-intro flex w-full flex-col items-center justify-center gap-5 md:gap-6">
      <div className="avatar-enter relative">
        <div className="absolute inset-0 -m-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl rounded-full" />

        <div className="home-avatar relative h-48 w-48 overflow-hidden rounded-full border-2 border-primary/50 md:h-52 md:w-52">
          <Image
            src="/images/design-mode/cybersecurity-hacker-avatar.jpg"
            alt="Alif Abedin Siyam"
            fill
            sizes="(min-width: 768px) 208px, 192px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <p className="section-enter text-xl font-light text-foreground md:text-2xl" style={{ animationDelay: "300ms" }}>
        Hello,
      </p>

      <div className="flex min-h-28 flex-col items-center justify-center md:min-h-32">
        {phase === "name" && (
          <div className="fade-enter text-center">
            <p className="text-lg text-foreground/70 font-light">I&apos;M,</p>
            <h1 id={headingId} className="mt-2 text-4xl font-bold text-primary neon-glow md:text-5xl">
              <span className="sr-only">{fullName}</span>
              <span aria-hidden="true">
                {displayedName}
                {!reduceMotion && displayedName.length < fullName.length && <span className="animate-pulse">|</span>}
              </span>
            </h1>
          </div>
        )}

        {phase === "alias" && (
          <div className="fade-enter text-center">
            <p className="text-lg text-foreground/70 font-light">Also known as,</p>
            <p className="text-4xl font-bold text-secondary mt-2">
              {displayedAlias}
              {!reduceMotion && displayedAlias.length < alias.length && <span className="animate-pulse">|</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
