"use client"

import { useEffect, useRef } from "react"

export function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const fontSize = 14
    let width = 0
    let height = 0
    let drops: number[] = []
    let frame = 0
    let lastDraw = 0
    let visible = true
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const columns = Math.ceil(width / fontSize)
      drops = Array.from({ length: columns }, (_, index) => drops[index] ?? Math.random() * -100)
    }

    const render = (time: number) => {
      frame = 0
      if (!visible || document.hidden || reducedMotion) return
      if (time - lastDraw < 50) {
        frame = requestAnimationFrame(render)
        return
      }
      lastDraw = time
      context.fillStyle = "rgba(10, 10, 10, 0.05)"
      context.fillRect(0, 0, width, height)
      context.fillStyle = "#00FF99"
      context.font = `${fontSize}px monospace`

      drops.forEach((drop, index) => {
        context.fillText(Math.random() > 0.5 ? "1" : "0", index * fontSize, drop * fontSize)
        if (drop * fontSize > height && Math.random() > 0.975) drops[index] = 0
        drops[index] += 1
      })

      frame = requestAnimationFrame(render)
    }

    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion) frame = requestAnimationFrame(render)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
      } else {
        start()
      }
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      if (reducedMotion && frame) cancelAnimationFrame(frame)
      if (!reducedMotion) start()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else if (frame) cancelAnimationFrame(frame)
      if (!visible) frame = 0
    })

    resize()
    observer.observe(canvas)
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", handleVisibility)
    mediaQuery.addEventListener("change", handleMotionChange)
    start()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" />
}
