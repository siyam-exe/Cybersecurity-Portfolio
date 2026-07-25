"use client"

import { useCallback, useEffect, useRef } from "react"
import Script from "next/script"

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  remove: (widgetId: string) => void
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface TurnstileProps {
  siteKey: string
  resetSignal: number
  onTokenChange: (token: string) => void
}

export function Turnstile({ siteKey, resetSignal, onTokenChange }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<string | null>(null)

  const render = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetRef.current) return
    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      callback: (token: string) => onTokenChange(token),
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange(""),
    })
  }, [onTokenChange, siteKey])

  useEffect(() => {
    if (widgetRef.current && window.turnstile) {
      window.turnstile.reset(widgetRef.current)
      onTokenChange("")
    }
  }, [onTokenChange, resetSignal])

  useEffect(() => {
    render()
    return () => {
      if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current)
      widgetRef.current = null
    }
  }, [render])

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={render} />
      <div ref={containerRef} role="group" className="min-h-[65px]" aria-label="CAPTCHA verification" />
    </>
  )
}
