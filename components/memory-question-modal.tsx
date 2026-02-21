"use client"

import Image from "next/image"
import { X, Video } from "lucide-react"

interface MemoryQuestionModalProps {
  open: boolean
  onClose: () => void
  question: string
  answer?: string
  images: string[]
  hasVideo: boolean
}

export function MemoryQuestionModal({
  open,
  onClose,
  question,
  answer,
  images,
  hasVideo,
}: MemoryQuestionModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Memory question details"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Memory question
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Question
            </p>
            <p className="text-base font-medium text-foreground">{question}</p>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Answer
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {answer || "No answer yet."}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Images & videos for this memory
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                >
                  <Image
                    src={src}
                    alt={`Memory image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {hasVideo && (
                <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border bg-muted">
                  <Video className="h-8 w-8 text-vault-teal" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
