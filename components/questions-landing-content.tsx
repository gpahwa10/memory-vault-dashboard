"use client"

import Link from "next/link"
import { HelpCircle } from "lucide-react"
import type { Memory as MemoryType } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

export function QuestionsLandingContent({
  memories,
}: {
  memories: SerializedMemory[]
}) {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Questions
        </h1>
        <p className="mt-1 text-muted-foreground">
          Choose a memory to view and edit its questions
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory) => {
          const answered =
            memory.memoryQuestions?.filter((q) => q.answer?.trim()).length ?? 0
          const total = memory.memoryQuestions?.length ?? 0
          return (
            <Link
              key={memory.id}
              href={`/memory-detail/${memory.id}/questions`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-vault-teal/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-vault-teal/15 text-vault-teal transition-colors group-hover:bg-vault-teal/25">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground truncate">
                  {memory.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {answered} of {total} answered
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
