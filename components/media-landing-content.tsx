"use client"

import Link from "next/link"
import Image from "next/image"
import { Camera } from "lucide-react"
import type { Memory as MemoryType } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

export function MediaLandingContent({
  memories,
}: {
  memories: SerializedMemory[]
}) {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Photos & Videos
        </h1>
        <p className="mt-1 text-muted-foreground">
          Choose a memory to view its photos and videos
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory) => {
          const imageCount = memory.images?.length ?? 0
          const hasVideo = memory.hasVideo ?? false
          return (
            <Link
              key={memory.id}
              href={`/memory-detail/${memory.id}/media`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:border-vault-gold/40 hover:shadow-md"
            >
              <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-muted">
                {imageCount > 0 ? (
                  <Image
                    src={memory.images![0]}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="96px"
                    unoptimized={memory.images![0].startsWith("#")}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 py-3 pr-3">
                <p className="font-semibold text-foreground truncate">
                  {memory.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {imageCount} photo{imageCount !== 1 ? "s" : ""}
                  {hasVideo ? ", 1 video" : ""}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
