"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SkillBarProps {
  name: string
  level: number
  icon: LucideIcon
}

export function SkillBar({ name, level, icon: Icon }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
        <span className="text-sm text-secondary">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full neon-glow"
        />
      </div>
    </div>
  )
}
