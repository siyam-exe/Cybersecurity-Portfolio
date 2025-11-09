"use client"

import { type ReactNode, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface InteractiveButtonProps {
  children: ReactNode
  href?: string
  variant?: "default" | "outline"
  size?: "default" | "lg" | "sm"
  color?: "primary" | "secondary" | "accent"
  asChild?: boolean
  onClick?: () => void
  className?: string
}

export function InteractiveButton({
  children,
  href,
  variant = "default",
  size = "default",
  color = "primary",
  asChild,
  onClick,
  className,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add("button-click")
      setTimeout(() => {
        buttonRef.current?.classList.remove("button-click")
      }, 200)
    }
    onClick?.()
  }

  const colorClass = {
    primary: "button-neon-primary",
    secondary: "button-neon-secondary",
    accent: "button-neon-accent",
  }[color]

  const baseClasses = `${colorClass} transition-all duration-200 ${className || ""}`

  if (href) {
    return (
      <Button asChild size={size} variant={variant} className={baseClasses} onClick={handleClick}>
        <Link href={href}>{children}</Link>
      </Button>
    )
  }

  return (
    <Button ref={buttonRef} size={size} variant={variant} className={baseClasses} onClick={handleClick}>
      {children}
    </Button>
  )
}
