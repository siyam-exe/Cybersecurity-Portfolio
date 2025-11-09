"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { CenteredIntro } from "@/components/centered-intro"

const description = "Cybersecurity Student | CTF Enthusiast"

const socialLinks = [
  { icon: Github, href: "https://github.com/siyam-exe", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/alif-abedin-siyam-4a713b308/", label: "LinkedIn" },
  { icon: BookOpen, href: "https://medium.com/@siyam.exe", label: "Medium" },
  { icon: Mail, href: "mailto:siyam.exe@gmail.com", label: "Email" },
]

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/20" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center"
      >
        <CenteredIntro />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 w-full max-w-md text-center"
        >
          {/* Description */}
          <p className="text-lg text-foreground/80 font-light mb-8">{description}</p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mb-8">
            {/* About Me Button */}
            <motion.a
              href="/about"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 px-6 border-2 border-secondary text-secondary font-bold rounded hover:bg-secondary/10 transition-colors button-neon-secondary"
              style={{
                boxShadow: "0 0 8px rgba(0,180,216,0.4), inset 0 0 8px rgba(0,180,216,0.1)",
              }}
            >
              About Me
            </motion.a>

            {/* Download CV Button */}
            <motion.a
              href="/docs/Alif Abedin Siyam Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 px-6 bg-primary text-black font-bold rounded hover:shadow-lg transition-shadow button-neon-primary"
              style={{ textShadow: "0 0 2px rgba(0,221,136,0.8)" }}
            >
              Download CV
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="text-foreground/60 hover:text-secondary transition-colors"
                title={label}
              >
                <Icon size={28} className="neon-glow-secondary" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Terminal hint */}
        {showContent && (
          <div className="mt-12 w-full flex justify-center">
            <p
              className="text-xs text-primary text-center"
              style={{ textShadow: "0 0 2px rgba(0,221,136,0.8), 0 0 12px rgba(0,221,136,0.15)" }}
            >
              Press <kbd className="px-2 py-1 bg-muted rounded text-primary font-bold mx-1">~</kbd> to open terminal
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
