"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const EXIT_MS = 200

/** Hides the root @app parallel slot off `/` so client nav to `/app` does not leave stale UI. */
export function LandingParallelAppSlot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const onLanding = pathname === "/"
  const [mounted, setMounted] = useState(onLanding)
  const [visible, setVisible] = useState(onLanding)

  useEffect(() => {
    if (onLanding) {
      setMounted(true)
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setVisible(false)
    const t = window.setTimeout(() => setMounted(false), EXIT_MS)
    return () => window.clearTimeout(t)
  }, [onLanding])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {children}
    </div>
  )
}
