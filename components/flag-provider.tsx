"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"

interface FlagContextType {
  flagFound: boolean
  setFlagFound: (found: boolean) => void
  submitFlag: (flag: string) => { success: boolean; message: string }
}

const FlagContext = createContext<FlagContextType | undefined>(undefined)

const CORRECT_FLAG = "CTF{g0bl!n$@9_pwn}"

export function FlagProvider({ children }: { children: React.ReactNode }) {
  const [flagFound, setFlagFound] = useState(false)

  const submitFlag = useCallback((flag: string) => {
    const normalizedFlag = flag.trim()
    const isCorrect = normalizedFlag === CORRECT_FLAG

    if (isCorrect) {
      setFlagFound(true)
    }

    return {
      success: isCorrect,
      message: isCorrect ? "🎉 Correct flag! Congratulations!" : "❌ Incorrect flag. Try again.",
    }
  }, [])

  return <FlagContext.Provider value={{ flagFound, setFlagFound, submitFlag }}>{children}</FlagContext.Provider>
}

export function useFlagContext() {
  const context = useContext(FlagContext)
  if (!context) {
    throw new Error("useFlagContext must be used within FlagProvider")
  }
  return context
}
