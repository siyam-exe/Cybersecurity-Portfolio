"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"

interface EmailActionsProps {
  address: string
  href: string
}

function fallbackCopy(value: string) {
  const input = document.createElement("textarea")
  input.value = value
  input.style.position = "fixed"
  input.style.opacity = "0"
  document.body.appendChild(input)
  input.select()
  const copied = document.execCommand("copy")
  input.remove()
  if (!copied) throw new Error("Copy failed")
}

export function EmailActions({ address, href }: EmailActionsProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(address)
      else fallbackCopy(address)
      setStatus("copied")
    } catch {
      try {
        fallbackCopy(address)
        setStatus("copied")
      } catch {
        setStatus("error")
      }
    }
  }

  return (
    <div className="contact-email-options">
      <button type="button" className="contact-email-action" onClick={copyEmail} aria-label={`Copy email address ${address}`}>
        <span>
          <Mail aria-hidden="true" />
          <span>
            <small>{status === "copied" ? "EMAIL COPIED" : "COPY EMAIL ADDRESS"}</small>
            {address}
          </span>
        </span>
        {status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
      <div className="contact-email-result" role="status" aria-live="polite">
        {status === "copied" && "Email address copied to your clipboard."}
        {status === "error" && "Copy was blocked. Select the address above or open your email app."}
      </div>
      <a href={href} className="contact-mailto-link">
        Open email app <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  )
}
