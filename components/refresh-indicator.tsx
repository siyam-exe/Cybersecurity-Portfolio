"use client"

import { usePathname } from "next/navigation"

export function RefreshIndicator() {
  const pathname = usePathname()

  return (
    <div key={pathname} className="refresh-indicator" aria-hidden="true">
      <div className="refresh-indicator__line" />
    </div>
  )
}
