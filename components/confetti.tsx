"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
    }))
    setParticles(newParticles)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            position: "fixed",
            zIndex: 99999,
            width: `${4 + Math.floor(Math.random() * 6)}px`,
            height: `${4 + Math.floor(Math.random() * 6)}px`,
            left: `${particle.left}%`,
            top: "-10px",
            background:
              ["rgb(0, 255, 153)", "rgb(0, 180, 216)", "rgb(154, 77, 255)"][
                Math.floor(Math.random() * 3)
              ],
            animation: `fall ${particle.duration}s ease-in forwards`,
            animationDelay: `${particle.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
