"use client"

import { useRef, useEffect } from "react"

/**
 * Full-screen background video at 50% opacity.
 * Place your theme video in public/ e.g. public/background.mp4
 * Use muted, autoPlay, loop for ambient background (browser autoplay policy).
 */
export function BackgroundVideo({
  src = "/background.mp4",
  className = "",
}: {
  src?: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [src])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1] min-h-screen min-w-full ${className}`}
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 size-full object-cover opacity-50"
        src={src}
      />
    </div>
  )
}
