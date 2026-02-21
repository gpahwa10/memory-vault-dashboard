"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Video, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Memory as MemoryType } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

export function MemoryMediaContent({ memory }: { memory: SerializedMemory }) {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const images = memory.images ?? []

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <Link
        href={`/memory-detail/${memory.id}`}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {memory.title}
      </Link>

      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Photos & Videos
        </h1>
        <p className="mt-1 text-muted-foreground">
          {memory.title} · {images.length} photo{images.length !== 1 ? "s" : ""}
          {memory.hasVideo ? ", 1 video" : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={`${memory.id}-img-${i}`}
            type="button"
            onClick={() => setFullScreenImage(src)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-vault-teal/40"
          >
            <Image
              src={src}
              alt={`${memory.title} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
        {memory.hasVideo && (
          <div className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-vault-teal/40 bg-vault-teal/5 transition-colors hover:border-vault-teal/60 hover:bg-vault-teal/10">
            <Video className="h-12 w-12 text-vault-teal/80" />
            <span className="text-sm font-medium text-vault-teal">Video</span>
          </div>
        )}
      </div>

      <Dialog
        open={!!fullScreenImage}
        onOpenChange={(open) => !open && setFullScreenImage(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 z-50 flex h-screen w-screen max-w-none items-center justify-center border-0 bg-black/95 p-0"
        >
          <DialogTitle className="sr-only">View photo full screen</DialogTitle>
          {fullScreenImage && (
            <>
              <div className="relative h-full w-full">
                <Image
                  src={fullScreenImage}
                  alt="Full size"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <button
                type="button"
                onClick={() => setFullScreenImage(null)}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
