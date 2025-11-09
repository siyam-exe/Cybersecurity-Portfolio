"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { TerminalBox } from "@/components/terminal-box"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { useEffect } from "react"

// Placeholder writeups data
const writeups = [
  {
    slug: "example-thm-room",
    title: "Example TryHackMe Room",
    platform: "TryHackMe",
    difficulty: "Medium",
    summary: "A comprehensive walkthrough of a TryHackMe room covering web exploitation and privilege escalation.",
    date: "Coming Soon",
    tags: ["Web Exploitation", "Linux", "Privilege Escalation"],
  },
  {
    slug: "example-htb-box",
    title: "Example HackTheBox Machine",
    platform: "HackTheBox",
    difficulty: "Hard",
    summary: "Detailed writeup for a challenging HTB box involving reverse engineering and buffer overflow.",
    date: "Coming Soon",
    tags: ["Reverse Engineering", "Binary Exploitation", "Windows"],
  },
]

const difficultyColors = {
  Easy: "bg-primary/20 text-primary border-primary",
  Medium: "bg-secondary/20 text-secondary border-secondary",
  Hard: "bg-destructive/20 text-destructive border-destructive",
}

export default function WriteupsPage() {
  useEffect(() => {
    // Add global console helper for CTF challenge
    ;(window as any).startCTF = () => {
      console.log(
        "%c🔐 CTF Challenge Activated 🔐",
        "color: #00ff99; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ff99;",
      )
      console.log("%c[>] You've discovered the hidden challenge!", "color: #009ec4; font-size: 12px;")
      console.log("%c[>] Find and submit the flag using: flag CTF{...}", "color: #009ec4; font-size: 12px;")
      console.log(
        "%c[>] Hint: Look through the page source and console for clues...",
        "color: #8844dd; font-size: 12px;",
      )
    }

    // Print CTF challenge hint to console on page load
    console.log("%c🎯 Hidden CTF Challenge Detected!", "color: #00ff99; font-size: 14px; font-weight: bold;")
    console.log("%cType 'startCTF()' in the console for more information.", "color: #009ec4; font-size: 11px;")

    // Intercept the 'flag' command from terminal and handle CTF verification
    const handleCTFSubmission = (event: Event) => {
      const customEvent = event as CustomEvent
      const flagInput = customEvent.detail?.flagValue

      if (flagInput && flagInput === "CTF{g0bl!n$@9_pwn}") {
        console.log("%c✅ [+] Challenge completed successfully!", "color: #00ff99; font-size: 14px; font-weight: bold;")
        console.log("%c[+] The goblin's secret has been revealed!", "color: #00ff99; font-size: 12px;")
        console.log("%c🎉 You've unlocked the hidden treasure!", "color: #ffd700; font-size: 14px; font-weight: bold;")

        // Dispatch success event for terminal to handle
        window.dispatchEvent(
          new CustomEvent("ctf-success", {
            detail: {
              message: "[+] Challenge completed successfully!\n[+] Access granted. Welcome, operator.",
            },
          }),
        )
      }
    }

    window.addEventListener("ctf-submission", handleCTFSubmission)

    return () => {
      window.removeEventListener("ctf-submission", handleCTFSubmission)
      delete (window as any).startCTF
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-20"
    >
      {/* Visually hidden aria-live region for accessibility */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="ctf-announcement" />
      
      {/* Render comment that will appear in page source - Double Base64 encoded flag */}
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- 
        ====================================================
        🏴‍☠️ THE GOBLIN'S TREASURE 🏴‍☠️
        ====================================================
        
        Congratulations, you found the goblin's secret stash!
        
        UTFSR2UyY3dZbXdoYmlSQU9WOXdkMjU5
        
        The goblin whispers: "What you see isn't always what you get.
        Sometimes the truth lies beneath the surface... and then beneath again."
        
        Decode wisely.
        ====================================================
        -->`}} style={{ display: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 neon-glow">
          <span className="text-secondary">{">"}</span> CTF Writeups
        </h1>
        <p className="text-muted-foreground mb-12">
          Documentation of my journey through various CTF challenges and penetration testing exercises.
        </p>

        {writeups.length === 0 ? (
          <TerminalBox title="writeups.log">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">CTF Writeups coming soon... stay tuned.</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-primary">{">"}</span> Currently working on documenting my latest challenges
              </p>
            </div>
          </TerminalBox>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {writeups.map((writeup, index) => (
              <motion.div
                key={writeup.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/writeups/${writeup.slug}`}>
                  <TerminalBox className="h-full hover:border-primary transition-all cursor-pointer group card-popup">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {writeup.title}
                        </h3>
                        <Badge className={difficultyColors[writeup.difficulty as keyof typeof difficultyColors]}>
                          {writeup.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {writeup.platform}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{writeup.date}</span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{writeup.summary}</p>

                      <div className="flex flex-wrap gap-2">
                        {writeup.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TerminalBox>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}