"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingTerminalButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowTooltip(true)
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 2000)
    return () => clearTimeout(timer)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowTooltip(false)
  }

  const handleClick = () => {
    const event = new KeyboardEvent("keydown", {
      key: "~",
      code: "Backquote",
      bubbles: true,
    })
    window.dispatchEvent(event)
  }

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <motion.button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center cursor-pointer transition-all"
        style={{
          boxShadow: "0 0 12px rgba(0, 221, 136, 0.5), 0 0 24px rgba(0, 221, 136, 0.2)",
        }}
        aria-label="Open terminal"
      >
        <span className="text-primary font-bold text-lg">{">_"}</span>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 right-20 text-xs text-primary whitespace-nowrap font-mono pointer-events-none"
            style={{
              textShadow: "0 0 4px rgba(0, 221, 136, 0.6)",
            }}
          >
            Click this button to open terminal
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
