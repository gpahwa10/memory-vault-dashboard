"use client"

import { useRef, useEffect } from "react"

/**
 * Background video at 50% opacity.
 * - Default: full-screen fixed (e.g. landing page).
 * - contained: fills its parent (e.g. left half in auth split layout).
 * Place your theme video in public/ e.g. public/background.mp4
 */
export function BackgroundVideo({
  src = "/background.mp4",
  className = "",
  contained = false,
  size = "full",
}: {
  src?: string
  className?: string
  /** If true, use absolute positioning to fill parent instead of fixed full-screen */
  contained?: boolean
  /** When contained: "full" fills parent, "reduced" scales video down (e.g. 75%) */
  size?: "full" | "reduced"
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [src])

  const isReduced = contained && size === "reduced"

  return (
    <div
      className={
        contained
          ? `pointer-events-none absolute inset-0 z-[1] flex items-center justify-center ${className}`
          : `pointer-events-none fixed inset-0 z-[1] min-h-screen min-w-full ${className}`
      }
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={
          
           "absolute inset-0 size-full object-cover opacity-50"
        }
        style={isReduced ? { position: "relative" } : undefined}
        src={src}
      />
    </div>
  )
}
