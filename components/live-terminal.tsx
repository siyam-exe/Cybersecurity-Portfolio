"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Confetti } from "./confetti"

interface TerminalLine {
  type: "input" | "output" | "error" | "success"
  content: string
}

const commands = {
  help: `Available commands:
  help          - Show this help message
  about         - Navigate to About page
  projects      - Navigate to Projects page
  writeups      - Navigate to Writeups page
  contact       - Navigate to Contact page
  email         - Copy contact email
  echo <text>   - Echo text back
  startctf      - Begin the CTF challenge
  decode <text> - Decode a base64 string
  flag <code>   - Submit CTF flag
  clear         - Clear terminal
  whoami        - Display user info
  exit          - Close terminal`,
  whoami: `User: Alif Abedin Siyam
Handle: 1tsD@M0nk3
Role: Cybersecurity Student & CTF Enthusiast
Location: Asia Pacific University (APU)
Email: siyam.exe@gmail.com`,
}

export function LiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to 1tsD@M0nk3 Terminal v1.0" },
    { type: "output", content: "[!] I heard there's an interesting writeup about web security..." },
    { type: "output", content: "[!] Maybe you should check the page source when you get there." },
    { type: "output", content: 'Type "help" for available commands' },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showConfetti, setShowConfetti] = useState(false)
  const [ctfPulsing, setCtfPulsing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "~") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    const handleCTFSuccess = (event: Event) => {
      const customEvent = event as CustomEvent
      const message = customEvent.detail?.message || "[+] Challenge completed successfully!"

      addLine("success", message)
      setShowConfetti(true)
      setCtfPulsing(true)

      const announcement = document.getElementById("ctf-announcement")
      if (announcement) {
        announcement.textContent = "CTF challenge completed. Access granted."
      }

      setTimeout(() => setCtfPulsing(false), 1600)
      setTimeout(() => setShowConfetti(false), 5000)
    }

    window.addEventListener("ctf-success", handleCTFSuccess)
    return () => window.removeEventListener("ctf-success", handleCTFSuccess)
  }, [])

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content }])
  }

  const shakeTerminal = () => {
    const element = outputRef.current?.closest(".terminal-container")
    if (element instanceof HTMLElement) {
      element.style.animation = "shake 0.5s"
      setTimeout(() => {
        element.style.animation = ""
      }, 500)
    }
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const lowerCmd = trimmedCmd.toLowerCase()
    const [command, ...args] = lowerCmd.split(" ")

    addLine("input", `$ ${trimmedCmd}`)

    switch (command) {
      case "help":
        addLine("output", commands.help)
        break

      case "about":
        addLine("output", "Navigating to About page...")
        setTimeout(() => {
          router.push("/about")
          setIsOpen(false)
        }, 500)
        break

      case "projects":
        addLine("output", "Navigating to Projects page...")
        setTimeout(() => {
          router.push("/projects")
          setIsOpen(false)
        }, 500)
        break

      case "writeups":
        addLine("output", "Navigating to Writeups page...")
        setTimeout(() => {
          router.push("/writeups")
          setIsOpen(false)
        }, 500)
        break

      case "contact":
        addLine("output", "Navigating to Contact page...")
        setTimeout(() => {
          router.push("/contact")
          setIsOpen(false)
        }, 500)
        break

      case "email":
        navigator.clipboard.writeText("siyam.exe@gmail.com")
        addLine("output", "Email copied to clipboard: siyam.exe@gmail.com")
        break



      case "echo":
        addLine("output", args.join(" ") || "")
        break

      case "startctf":
        addLine("success", "[+] > Accessing goblin's archive...")
        addLine("output", "...............................")
        addLine("output", "[*] < Found encrypted scroll fragment >")
        addLine("output", "[*] Note to self: Goblins love layers...")
        addLine("output", "[*] like onions, or particularly complex codes")
        addLine("output", "[*] Last seen: Lurking in writeups' depths")
        addLine("output", "...............................")
        addLine("output", "[?] What lies beneath the surface?")
        break

      case "decode":
        const input = trimmedCmd.substring(7).trim()
        if (!input) {
          addLine("error", "Usage: decode <base64_string>")
          addLine("output", "[*] Some strings may need multiple decoding attempts...")
        } else {
          try {
            const decoded = atob(input.replace(/\s/g, ""))
            // Check if the decoded result looks like base64
            const base64Regex = /^[A-Za-z0-9+/=]+$/
            if (base64Regex.test(decoded)) {
              addLine("success", `[+] Decoded layer: ${decoded}`)
              addLine("output", "[*] Hmm... this still looks encoded")
            } else {
              addLine("success", `[+] Decoded: ${decoded}`)
            }
          } catch (e) {
            addLine("error", "[-] Invalid base64 string!")
            shakeTerminal()
          }
        }
        break

      case "flag":
        const flagInput = trimmedCmd.substring(5).trim()
        if (!flagInput) {
          addLine("error", "Usage: flag <code>")
        } else {
          // Submit the flag to any listeners (page may validate and emit ctf-success)
          addLine("output", "[>] Submitting flag for verification...")
          window.dispatchEvent(
            new CustomEvent("ctf-submission", {
              detail: { flagValue: flagInput },
            }),
          )

          // Give immediate feedback; final validation and success handling is handled by page listener
          addLine("output", "[>] Verification in progress (check console for hints)")
        }
        break

      case "clear":
        setLines([])
        break

      case "whoami":
        addLine("output", commands.whoami)
        break

      case "exit":
        addLine("output", "Closing terminal...")
        setTimeout(() => setIsOpen(false), 300)
        break

      case "":
        break

      default:
        addLine("error", `Command not found: ${command}. Type "help" for available commands.`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    }
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`terminal-container fixed inset-0 z-50 flex flex-col m-4 md:m-8 rounded-lg overflow-hidden`}
              style={{
                background: "rgba(0, 20, 20, 0.8)",
                backdropFilter: "blur(10px)",
                boxShadow: `0 0 30px rgba(0, 221, 136, 0.3), inset 0 1px 0 rgba(0, 221, 136, 0.3)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-primary font-bold">1tsD@M0nk3:~$</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-destructive/20 hover:text-destructive"
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Terminal Output */}
              <div
                ref={outputRef}
                className={`flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm scanlines transition-all duration-800 ${
                  ctfPulsing ? "ctf-pulse" : ""
                }`}
              >
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      line.type === "input"
                        ? "text-foreground"
                        : line.type === "error"
                          ? "text-destructive"
                          : line.type === "success"
                            ? "text-primary neon-glow"
                            : "text-muted-foreground"
                    } whitespace-pre-wrap`}
                  >
                    {line.content}
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleSubmit} className="border-t border-primary/30 p-4 bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
                    placeholder="Type a command..."
                    autoComplete="off"
                  />
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </>
  )
}
