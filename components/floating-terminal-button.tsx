"use client"

import { Radar, TerminalSquare } from "lucide-react"

export function FloatingTerminalButton() {
  const openTerminal = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "~", code: "Backquote", bubbles: true }))

  return (
    <button type="button" onClick={openTerminal} className="terminal-launcher" aria-label="Open terminal and CTF challenge">
      <span className="terminal-launcher-icon"><TerminalSquare aria-hidden="true" /></span>
      <span className="terminal-launcher-copy">
        <strong>TERMINAL</strong>
        <small>CTF challenge inside</small>
      </span>
      <span className="terminal-launcher-ctf"><Radar aria-hidden="true" /> CTF</span>
    </button>
  )
}
