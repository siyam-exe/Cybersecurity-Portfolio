"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle, Send, XCircle } from "lucide-react"
import { contactLimits } from "@/lib/contact"
import { Turnstile } from "@/components/turnstile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [website, setWebsite] = useState("")
  const [consent, setConsent] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [resetSignal, setResetSignal] = useState(0)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  const handleTokenChange = useCallback((token: string) => setTurnstileToken(token), [])

  const resetStatus = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    resetTimerRef.current = setTimeout(() => setStatus("idle"), 5000)
  }

  const resetCaptcha = () => {
    setTurnstileToken("")
    setResetSignal((value) => value + 1)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === "sending") return
    if (!siteKey || !turnstileToken) {
      setErrorMessage("Complete the CAPTCHA before sending your message.")
      setStatus("error")
      resetStatus()
      return
    }

    setStatus("sending")
    setErrorMessage("")

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website, consent, turnstileToken }),
        signal: AbortSignal.timeout(15_000),
      })
      const body = await result.json() as { error?: string }
      resetCaptcha()

      if (!result.ok) throw new Error(body.error || "Message delivery failed.")

      setFormData({ name: "", email: "", message: "" })
      setConsent(false)
      setStatus("success")
      resetStatus()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Message delivery failed. Please use the email link instead.")
      setStatus("error")
      resetStatus()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-fields">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-foreground">Name <span className="text-destructive">*</span></Label>
          <Input id="name" name="name" type="text" required minLength={contactLimits.name.min} maxLength={contactLimits.name.max} value={formData.name} onChange={handleChange} placeholder="Your name" autoComplete="name" disabled={status === "sending"} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-foreground">Email <span className="text-destructive">*</span></Label>
          <Input id="email" name="email" type="email" required maxLength={contactLimits.email.max} value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" disabled={status === "sending"} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="message" className="text-sm text-foreground">Message <span className="text-destructive">*</span></Label>
          <span className="text-xs text-muted-foreground" aria-live="polite">{formData.message.length}/{contactLimits.message.max}</span>
        </div>
        <Textarea id="message" name="message" required minLength={contactLimits.message.min} maxLength={contactLimits.message.max} value={formData.message} onChange={handleChange} placeholder="Tell me what you would like to discuss..." rows={7} className="resize-none" disabled={status === "sending"} />
      </div>

      <label className="contact-consent flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 accent-primary" />
        <span>I agree that my name, email, and message may be processed through EmailJS to answer this request. See the <Link href="/privacy" className="text-secondary hover:text-primary underline underline-offset-2">privacy notice</Link>.</span>
      </label>

      {siteKey ? <Turnstile siteKey={siteKey} resetSignal={resetSignal} onTokenChange={handleTokenChange} /> : <p role="alert" className="text-sm text-destructive">The contact form is not configured. Please use the email link.</p>}

      <noscript><p className="text-sm text-destructive">JavaScript is required for the protected contact form. Please use the email link instead.</p></noscript>

      <Button type="submit" className="contact-submit w-full bg-primary text-background hover:bg-primary/90" disabled={status === "sending" || !siteKey}>
        {status === "sending" ? <span>Sending...</span> : <><Send className="h-4 w-4 mr-2" aria-hidden="true" />Send Message</>}
      </Button>

      {status === "success" && <div role="status" aria-live="polite" className="flex items-center gap-2 p-3 rounded-lg bg-primary/20 border border-primary text-primary text-sm"><CheckCircle className="h-4 w-4" aria-hidden="true" /><span>Message sent successfully! I&apos;ll get back to you soon.</span></div>}
      {status === "error" && <div role="alert" aria-live="assertive" className="flex items-center gap-2 p-3 rounded-lg bg-destructive/20 border border-destructive text-destructive text-sm"><XCircle className="h-4 w-4" aria-hidden="true" /><span>{errorMessage}</span></div>}
    </form>
  )
}
