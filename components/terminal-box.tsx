import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TerminalBoxProps {
  children: ReactNode
  className?: string
  title?: string
}

export function TerminalBox({ children, className, title }: TerminalBoxProps) {
  return (
    <div className={cn("terminal-box rounded-lg p-6 scanlines", className)}>
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-sm text-primary ml-2">{title}</span>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
