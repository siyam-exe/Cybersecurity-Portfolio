"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpenText,
  CircleHelp,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Radar,
  ShieldCheck,
  TerminalSquare,
  UserRound,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AsciiTorus } from "@/components/ascii-torus"
import { ctfStorageKey, type CtfResponse, type CtfStage } from "@/lib/ctf"
import { siteLinks } from "@/lib/site"

declare global {
  interface Window {
    startCTF?: () => void
  }
}

type LineType = "input" | "output" | "muted" | "error" | "success" | "system"

interface TerminalLine {
  id: number
  type: LineType
  content: string
}

const helpText = `COMMAND INDEX

EXPLORE
  home · about · projects · writeups · contact

PROFILE
  whoami · status · github · linkedin · medium · email

UTILITIES
  ls · pwd · date · echo <text> · clear · exit

DAMONKE CTF
  ctf start · ctf look note · ctf status · ctf resume · ctf reset
  ctf accuse <name> · ctf submit DAMONKE{...}
  ask wizard  (Thistle answers)

The terminal drives the journey. Evidence lives in a real writeup, the
homelab project report, and the path polite crawlers avoid.`

const initialLines: Omit<TerminalLine, "id">[] = [
  { type: "system", content: "1tsD@M0nk3 CONTROL NODE // secure session established" },
  { type: "output", content: "Welcome. Explore the portfolio through commands or use the command menu." },
  { type: "success", content: "[CTF] The Elderbanana Tree has stopped growing. Three Peelrune fragments are somewhere beyond Sunroot Grove." },
  { type: "muted", content: 'Type "help" for the command index or "ctf" for the case briefing.' },
]

const shortcuts = [
  { command: "home", label: "Home", icon: Home },
  { command: "about", label: "About", icon: UserRound },
  { command: "projects", label: "Projects", icon: FolderGit2 },
  { command: "writeups", label: "Writeups", icon: BookOpenText },
]

export function LiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>(() => initialLines.map((line, index) => ({ ...line, id: index })))
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBusy, setIsBusy] = useState(false)
  const [ctfSession, setCtfSession] = useState("")
  const [ctfStage, setCtfStage] = useState<CtfStage>(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const lineIdRef = useRef(initialLines.length)
  const router = useRouter()

  const addLine = useCallback((type: LineType, content: string) => {
    const id = lineIdRef.current++
    setLines((previous) => [...previous, { id, type, content }].slice(-200))
  }, [])

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay)
    timersRef.current.push(timer)
  }, [])

  const closeTerminal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(ctfStorageKey)
      if (!stored) return
      const value = JSON.parse(stored) as { session?: string; stage?: CtfStage }
      if (value.session && typeof value.stage === "number") {
        setCtfSession(value.session)
        setCtfStage(value.stage)
      }
    } catch {
      sessionStorage.removeItem(ctfStorageKey)
    }
  }, [])

  useEffect(() => {
    const syncCtfState = (event: Event) => {
      const { session, stage } = (event as CustomEvent<{ session: string; stage: CtfStage }>).detail
      setCtfSession(session)
      setCtfStage(stage)
    }

    window.addEventListener("portfolio:ctf-state", syncCtfState)
    return () => window.removeEventListener("portfolio:ctf-state", syncCtfState)
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target
      const isEditing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable
      if (event.key === "~" && !isEditing) {
        event.preventDefault()
        setIsOpen((open) => {
          if (!open) lastFocusedElementRef.current = document.activeElement as HTMLElement
          return !open
        })
      } else if (event.key === "Escape" && isOpen) {
        closeTerminal()
      }
    }

    const openTerminal = () => {
      lastFocusedElementRef.current = document.activeElement as HTMLElement
      setIsOpen(true)
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("portfolio:open-terminal", openTerminal)
    window.startCTF = () => {
      openTerminal()
      addLine("success", "[CTF] Sunroot Grove route ready. Run ctf start when you are ready.")
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("portfolio:open-terminal", openTerminal)
      delete window.startCTF
    }
  }, [addLine, closeTerminal, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      lastFocusedElementRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const saveCtfState = (session: string, stage: CtfStage) => {
    setCtfSession(session)
    setCtfStage(stage)
    sessionStorage.setItem(ctfStorageKey, JSON.stringify({ session, stage }))
  }

  const resetCtf = async () => {
    await postCtf("reset")
    setCtfSession("")
    setCtfStage(0)
    sessionStorage.removeItem(ctfStorageKey)
    addLine("system", "[CTF] Journey cleared. Run ctf start for a new session.")
  }

  const showCtfResponse = (body: CtfResponse) => {
    addLine(body.ok ? "success" : "error", `${body.ok ? "[+]" : "[-]"} ${body.message}`)
    body.evidence?.forEach((item) => addLine("output", `    ${item}`))
    if (body.hint) addLine("output", `    "${body.hint}"`)
    if (body.session && typeof body.stage === "number") saveCtfState(body.session, body.stage)
    if (body.ok && body.stage === 7) {
      addLine("success", "      __\n  ___/o \\_     PEELRUNE RESTORED\n /  _     \\    GROVE STATUS: GROWING\n \\_/ \\____/")
    }
  }

  const postCtf = async (action: string, answer = "") => {
    setIsBusy(true)
    try {
      const result = await fetch("/api/ctf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, answer, session: ctfSession }),
        signal: AbortSignal.timeout(10_000),
      })
      const body = await result.json() as CtfResponse
      showCtfResponse(body)
      return body
    } catch {
      addLine("error", "[-] Challenge service did not respond. Try again in a moment.")
      return null
    } finally {
      setIsBusy(false)
    }
  }

  const getCtf = async (resource: string) => {
    setIsBusy(true)
    try {
      const result = await fetch(`/api/ctf?resource=${resource}`, { headers: { "X-CTF-Session": ctfSession }, signal: AbortSignal.timeout(10_000) })
      const body = await result.json() as CtfResponse
      showCtfResponse(body)
      if (resource === "note" && result.ok) {
        const trail = result.headers.get("x-thistle-route")
        if (trail) addLine("output", `    X-Thistle-Route: ${trail}`)
      }
      return body
    } catch {
      addLine("error", "[-] Evidence service did not respond.")
      return null
    } finally {
      setIsBusy(false)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteLinks.emailAddress)
      addLine("success", `[+] Email copied: ${siteLinks.emailAddress}`)
    } catch {
      addLine("error", `[-] Clipboard unavailable. Email: ${siteLinks.emailAddress}`)
    }
  }

  const navigate = (path: string, label: string) => {
    addLine("muted", `[>] Opening ${label}...`)
    schedule(() => {
      router.push(path)
      closeTerminal()
    }, 260)
  }

  const openExternal = (url: string, label: string) => {
    addLine("muted", `[>] Opening ${label} in a new tab...`)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const shakeTerminal = () => {
    dialogRef.current?.classList.remove("terminal-shake")
    requestAnimationFrame(() => dialogRef.current?.classList.add("terminal-shake"))
    schedule(() => dialogRef.current?.classList.remove("terminal-shake"), 450)
  }

  const showCtfBriefing = () => {
    const progress = ctfStage === 7 ? "COMPLETE" : `${Math.max(0, Math.min(5, ctfStage - 1))}/5`
    addLine("system", "THE LAST PEEL OF SUNROOT GROVE // site-wide quest")
    addLine("output", `Progress: ${progress}`)
    addLine("output", "The Elderbanana Tree's growth spell has frayed into three Peelrune fragments. Grum, Cindermaw, and Hazel each hold one.")
    const next = ctfStage === 1
      ? "ctf look note"
      : ctfStage === 2
        ? "ctf resume → recover Grum's proof, then ctf submit <word>"
        : ctfStage === 3
          ? "ctf resume → order Cindermaw's build record, then ctf submit <sequence>"
          : ctfStage === 4
            ? "ctf resume → find Hazel, decrypt her fragment, then ctf submit <fragment>"
            : ctfStage === 5
              ? "ctf resume → verify the smoke-darkened project mark"
              : ctfStage === 6
                ? "ctf submit DAMONKE{grum_cindermaw_hazel}"
                : ctfStage === 7
                  ? "the tree is growing again"
                  : "ctf start"
    addLine("muted", `Next: ${next}`)
  }

  const executeCommand = async (value: string, recordHistory = true) => {
    const trimmed = value.trim()
    if (!trimmed || isBusy) return
    const [rawCommand, ...args] = trimmed.split(/\s+/)
    const command = rawCommand.toLowerCase()
    addLine("input", `visitor@portfolio:~$ ${trimmed}`)
    if (recordHistory) {
      setHistory((previous) => [...previous, trimmed].slice(-50))
      setHistoryIndex(-1)
    }

    switch (command) {
      case "help": addLine("output", helpText); break
      case "home": navigate("/", "Home"); break
      case "about": navigate("/about", "About"); break
      case "projects": navigate("/projects", "Projects"); break
      case "writeups": navigate("/writeups", "Writeups"); break
      case "contact": navigate("/contact", "Contact"); break
      case "github": openExternal(siteLinks.github, "GitHub"); break
      case "linkedin": openExternal(siteLinks.linkedin, "LinkedIn"); break
      case "medium": openExternal(siteLinks.medium, "Medium"); break
      case "email": await copyEmail(); break
      case "whoami":
        addLine("output", `Alif Abedin Siyam // 1tsD@M0nk3\nSOC Analyst | Security Researcher | Aspiring Penetration Tester`)
        break
      case "status":
        addLine("output", "SYSTEM STATUS\n  portfolio: online\n  documented project: 1\n  published writeups: 30\n  challenge: available")
        break
      case "ls": addLine("output", "about/  projects/  writeups/  contact/  sunroot-grove.ctf"); break
      case "pwd": addLine("output", "/home/visitor/portfolio"); break
      case "date": addLine("output", new Date().toString()); break
      case "echo": addLine("output", args.join(" ")); break
      case "startctf":
        await executeCommand("ctf start", false)
        break
      case "ask":
        if (args[0]?.toLowerCase() === "wizard") await postCtf("hint")
        else addLine("error", '[-] Thistle only responds through the established command: ask wizard')
        break
      case "ctf": {
        const action = args[0]?.toLowerCase()
        if (!action) showCtfBriefing()
        else if (action === "start") {
          await postCtf("start")
        }
        else if (action === "look" && args[1]?.toLowerCase() === "note") {
          if (!ctfSession) addLine("error", "[-] No active journey. Run ctf start first.")
          else await getCtf("note")
        }
        else if (action === "resume") {
          if (!ctfSession) addLine("error", "[-] No active journey. Run ctf start first.")
          else if (ctfStage === 2) navigate("/writeups/ecb-oracle#how-the-challenge-actually-works", "Grum's proof")
          else if (ctfStage === 3) navigate("/projects", "Cindermaw's build record")
          else if (ctfStage === 4) navigate("/robots.txt", "the route to Hollow's Reach")
          else if (ctfStage === 5) navigate("/projects", "the smoke-darkened project record")
          else showCtfBriefing()
        }
        else if (action === "status") showCtfBriefing()
        else if (action === "accuse") {
          const suspect = args.slice(1).join(" ")
          if (!suspect) addLine("error", "[-] Usage: ctf accuse <name>")
          else await postCtf("accuse", suspect)
        }
        else if (action === "submit") {
          const answer = args.slice(1).join(" ")
          if (!ctfSession) addLine("error", "[-] No active journey. Run ctf start first.")
          else if (!answer) addLine("error", "[-] Usage: ctf submit <guardian-proof|DAMONKE{...}>")
          else await postCtf("verify", answer)
        }
        else if (action === "reset") await resetCtf()
        else addLine("error", `Unknown CTF action: ${action}. Type "ctf" for the case briefing.`)
        break
      }
      case "clear": setLines([]); break
      case "exit": addLine("muted", "Closing control node..."); schedule(closeTerminal, 250); break
      default: addLine("error", `Command not found: ${command}. Type "help" for the command index.`); shakeTerminal()
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const command = input
    setInput("")
    void executeCommand(command)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (!history.length) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault()
      const nextIndex = historyIndex + 1
      setHistoryIndex(nextIndex >= history.length ? -1 : nextIndex)
      setInput(nextIndex >= history.length ? "" : history[nextIndex])
    }
  }

  const handleDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !dialogRef.current) return
    const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const progress = ctfStage === 7 ? 5 : Math.max(0, Math.min(5, ctfStage - 1))

  return (
    <>
      {isOpen && (
        <>
          <div className="terminal-overlay-enter terminal-overlay" onClick={closeTerminal} aria-hidden="true" />
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="terminal-title" tabIndex={-1} onKeyDown={handleDialogKeyDown} className="terminal-dialog-enter terminal-shell">
            <header className="terminal-topbar">
              <div className="terminal-window-controls" aria-hidden="true"><span /><span /><span /></div>
              <div className="terminal-title-group">
                <TerminalSquare aria-hidden="true" />
                <div>
                  <strong id="terminal-title">1tsD@M0nk3 Control Node</strong>
                  <small>interactive portfolio terminal</small>
                </div>
              </div>
              <div className="terminal-topbar-status"><span aria-hidden="true" /> ONLINE</div>
              <Button variant="ghost" size="sm" onClick={closeTerminal} aria-label="Close terminal"><X aria-hidden="true" /></Button>
            </header>

            <div className="terminal-workspace">
              <aside className="terminal-sidebar">
                <div className="terminal-sidebar-label">COMMAND MENU</div>
                <nav aria-label="Terminal shortcuts" className="terminal-shortcuts">
                  {shortcuts.map((item) => (
                    <button key={item.command} type="button" onClick={() => void executeCommand(item.command)}>
                      <item.icon aria-hidden="true" /><span>{item.label}</span><kbd>{item.command}</kbd>
                    </button>
                  ))}
                  <button type="button" onClick={() => void executeCommand("help")}>
                    <CircleHelp aria-hidden="true" /><span>Command index</span><kbd>help</kbd>
                  </button>
                </nav>

                <div className={`terminal-ctf-card ${ctfStage === 7 ? "is-complete" : ""}`}>
                  <div className="terminal-ctf-card-heading">
                    <Radar aria-hidden="true" />
                    <span>LIVE CTF</span>
                    <i aria-hidden="true" />
                  </div>
                  <strong>THE LAST PEEL</strong>
                  <p>Three guardians. One badly copied mark.</p>
                  <div
                    className="terminal-ctf-progress"
                    aria-label={ctfStage === 7 ? "All 5 challenge chapters complete" : `Challenge chapter ${progress} of 5 active`}
                  >
                    {[1, 2, 3, 4, 5].map((stage) => <span key={stage} className={progress >= stage ? "is-active" : ""} />)}
                  </div>
                  <small>{ctfStage === 7 ? "CHALLENGE COMPLETE" : `${progress}/5 CHAPTERS · THISTLE HINTS AVAILABLE`}</small>
                  <button type="button" onClick={() => void executeCommand(ctfSession ? "ctf resume" : "ctf start")}>
                    <ShieldCheck aria-hidden="true" /> {ctfSession ? "Resume journey" : "Start journey"}
                  </button>
                </div>

                <div className="terminal-sidebar-links">
                  <button type="button" onClick={() => void executeCommand("github")}><Github aria-hidden="true" /> GitHub</button>
                  <button type="button" onClick={() => void executeCommand("linkedin")}><Linkedin aria-hidden="true" /> LinkedIn</button>
                  <button type="button" onClick={() => void executeCommand("email")}><Mail aria-hidden="true" /> Email</button>
                </div>
              </aside>

              <section className="terminal-console">
                <div className="terminal-boot-screen" role="img" aria-label="Animated ASCII torus and portfolio system information">
                  <AsciiTorus />
                  <div className="terminal-neofetch">
                    <p><span>USER</span><strong>1tsD@M0nk3</strong></p>
                    <p><span>ROLE</span><strong>security researcher</strong></p>
                    <p><span>NODE</span><strong>portfolio.local</strong></p>
                    <p><span>STACK</span><strong>Next.js / TypeScript</strong></p>
                    <p><span>CTF</span><strong>{ctfStage === 7 ? "grove growing" : ctfSession ? `route active · ${progress}/5` : "peelrune scattered"}</strong></p>
                    <small>ASCII TORUS · ZERO ASSET LOAD</small>
                  </div>
                </div>
                <div className="terminal-console-meta">
                  <span><i aria-hidden="true" /> SESSION ENCRYPTED</span>
                  <span>~ shortcut · ↑↓ history · esc close</span>
                </div>
                <div ref={outputRef} role="log" aria-live="polite" className="terminal-output scanlines">
                  {lines.map((line) => <div key={line.id} className={`terminal-line terminal-line-${line.type}`}>{line.content}</div>)}
                  {isBusy && <div className="terminal-processing" role="status"><span /><span /><span /> processing</div>}
                </div>

                <div className="terminal-suggestions" aria-label="Suggested commands">
                  {[
                    ["help", "Command index"],
                    ["whoami", "Profile"],
                    ["status", "Status"],
                    [ctfSession ? "ctf resume" : "ctf", "CTF challenge"],
                  ].map(([command, label]) => <button key={command} type="button" onClick={() => void executeCommand(command)}>{label}<span>{command}</span></button>)}
                </div>

                <form onSubmit={handleSubmit} className="terminal-command-form">
                  <label htmlFor="terminal-input" className="sr-only">Terminal command</label>
                  <span aria-hidden="true">visitor@portfolio:~$</span>
                  <input id="terminal-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleInputKeyDown} placeholder={isBusy ? "Processing command..." : "Type a command or choose from the menu"} autoComplete="off" spellCheck={false} disabled={isBusy} />
                  <button type="submit" disabled={isBusy || !input.trim()}>RUN</button>
                </form>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  )
}
