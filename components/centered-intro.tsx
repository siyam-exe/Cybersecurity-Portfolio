"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function CenteredIntro() {
  const [phase, setPhase] = useState<"name" | "alias">("name")
  const [displayedName, setDisplayedName] = useState("")
  const [displayedAlias, setDisplayedAlias] = useState("")

  const fullName = "Alif Abedin Siyam"
  const alias = "1tsD@M0nk3"

  useEffect(() => {
    if (phase === "name") {
      // Type the name
      if (displayedName.length < fullName.length) {
        const timer = setTimeout(() => {
          setDisplayedName(fullName.slice(0, displayedName.length + 1))
        }, 50) // Character delay
        return () => clearTimeout(timer)
      } else {
        // After name is typed, wait 5 seconds then switch phase
        const timer = setTimeout(() => {
          setPhase("alias")
          setDisplayedName("")
        }, 5000)
        return () => clearTimeout(timer)
      }
    } else if (phase === "alias") {
      // Type the alias
      if (displayedAlias.length < alias.length) {
        const timer = setTimeout(() => {
          setDisplayedAlias(alias.slice(0, displayedAlias.length + 1))
        }, 50) // Character delay
        return () => clearTimeout(timer)
      } else {
        // After alias is typed, wait a moment then loop back
        const timer = setTimeout(() => {
          setPhase("name")
          setDisplayedAlias("")
          setDisplayedName("")
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [displayedName, displayedAlias, phase])

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Avatar with soft glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Soft glow behind avatar */}
        <div className="absolute inset-0 -m-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl rounded-full" />

        {/* Avatar image */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-primary/50">
          <Image
            src="/images/design-mode/cybersecurity-hacker-avatar.jpg"
            alt="Alif Abedin Siyam"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Static Hello */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl text-foreground font-light"
      >
        Hello,
      </motion.p>

      {/* Animation loop container */}
      <div className="min-h-32 flex flex-col items-center justify-center">
        {phase === "name" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-lg text-foreground/70 font-light">I'M,</p>
            <p className="text-4xl font-bold text-primary neon-glow mt-2">
              {displayedName}
              {displayedName.length < fullName.length && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>
        )}

        {phase === "alias" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-lg text-foreground/70 font-light">Also known as,</p>
            <p className="text-4xl font-bold text-secondary mt-2">
              {displayedAlias}
              {displayedAlias.length < alias.length && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
