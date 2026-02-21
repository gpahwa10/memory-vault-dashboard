"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Pencil, Sparkles, X, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Memory as MemoryType, MemoryQuestion, MemoryQuestionMedia } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

// Unanswered sample questions (like Q8–Q10 in the design) appended so every memory shows them
const UNANSWERED_SAMPLE_QUESTIONS: MemoryQuestion[] = [
  {
    question: "How does your baby react when they see themselves in a mirror?",
    answer: "",
    sampleAnswer:
      "She smiles and babbles at her reflection, sometimes leaning in to kiss the baby in the mirror.",
  },
  {
    question: "What is the most surprising thing your baby has done?",
    answer: "",
    sampleAnswer:
      "She waved bye-bye on her own at 9 months when grandma left—we had never taught her that.",
  },
  {
    question: "Describe your baby's bedtime routine.",
    answer: "",
    sampleAnswer:
      "Bath, then a bottle, then we read one short book and sing a lullaby. She usually falls asleep with her hand on my cheek.",
  },
]

export function MemoryQuestionsContent({ memory }: { memory: SerializedMemory }) {
  const [questions, setQuestions] = useState<MemoryQuestion[]>(() => {
    const base = memory.memoryQuestions?.length ? memory.memoryQuestions : []
    return [...base, ...UNANSWERED_SAMPLE_QUESTIONS]
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [fullScreenMedia, setFullScreenMedia] = useState<MemoryQuestionMedia | null>(null)

  const answeredCount = questions.filter((q) => q.answer?.trim()).length
  const total = questions.length

  const updateAnswer = (index: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, answer } : q))
    )
  }

  const handleSaveEdit = (index: number, value: string) => {
    updateAnswer(index, value)
    setEditingIndex(null)
  }

  const handleUnansweredSave = (index: number, textareaRef: HTMLTextAreaElement | null) => {
    if (textareaRef) {
      updateAnswer(index, textareaRef.value)
    }
  }

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
          Questions
        </h1>
        <p className="mt-1 text-muted-foreground">
          {memory.title} · {answeredCount} of {total} answered
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-vault-teal transition-all duration-700"
            style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {total - answeredCount} questions remaining
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {questions.map((q, idx) => {
          const answered = !!q.answer?.trim()
          const id = `${memory.id}-q-${idx}`
          return (
            <div
              key={id}
              className={`rounded-xl border p-5 transition-all ${answered
                  ? "border-border bg-card"
                  : "border-vault-gold/30 bg-vault-gold/5"
                }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${answered
                      ? "bg-vault-teal text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{q.question}</p>
                  {answered ? (
                    <>
                      {editingIndex === idx ? (
                        <div className="mt-2 space-y-2" data-edit-block>
                          <textarea
                            autoFocus
                            rows={3}
                            defaultValue={q.answer}
                            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                            onKeyDown={(e) => {
                              if (e.key === "Escape") setEditingIndex(null)
                            }}
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingIndex(null)}
                              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const el = document.querySelector(
                                  "[data-edit-block] textarea"
                                )
                                if (el instanceof HTMLTextAreaElement)
                                  handleSaveEdit(idx, el.value)
                              }}
                              className="rounded-lg bg-vault-teal px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-vault-teal/90"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {q.answer}
                        </p>
                      )}

                      {editingIndex !== idx && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingIndex(idx)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-vault-teal/40 bg-vault-teal/10 px-3 py-1.5 text-xs font-semibold text-vault-teal transition-colors hover:bg-vault-teal/20"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-vault-gold/40 bg-vault-gold/10 px-3 py-1.5 text-xs font-semibold text-vault-warm transition-colors hover:bg-vault-gold/20"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Enhance text
                          </button>
                        </div>
                      )}

                      {q.media && q.media.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">
                            Media attached
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {q.media.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setFullScreenMedia(item)}
                                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-vault-teal/40"
                              >
                                {item.type === "image" ? (
                                  <Image
                                    src={item.url}
                                    alt={item.name ?? "Attachment"}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                    unoptimized={item.url.startsWith("#")}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-muted">
                                    <Video className="h-8 w-8 text-vault-teal/60" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // ── Unanswered question ──────────────────────────────────
                    <UnansweredQuestion
                      q={q}
                      onSave={(value) => updateAnswer(idx, value)}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Dialog
        open={!!fullScreenMedia}
        onOpenChange={(open) => !open && setFullScreenMedia(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 z-50 flex h-screen w-screen max-w-none items-center justify-center border-0 bg-black/95 p-0"
        >
          <DialogTitle className="sr-only">View media full screen</DialogTitle>
          {fullScreenMedia && (
            <>
              {fullScreenMedia.type === "image" ? (
                <div className="relative h-full w-full">
                  <Image
                    src={fullScreenMedia.url}
                    alt={fullScreenMedia.name ?? "Full size"}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    unoptimized={fullScreenMedia.url.startsWith("#")}
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <div className="flex max-h-full max-w-full flex-col items-center gap-2 rounded-lg bg-muted/20 p-4">
                    <Video className="h-16 w-16 text-vault-teal/80" />
                    <p className="text-sm text-muted-foreground">
                      Video: {fullScreenMedia.name ?? "Video"}
                    </p>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setFullScreenMedia(null)}
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

// ── Unanswered question sub-component ────────────────────────────────────────
function UnansweredQuestion({
  q,
  onSave,
}: {
  q: MemoryQuestion
  onSave: (value: string) => void
}) {
  // Pre-fill with sample answer when no answer yet (like in the design)
  const [localValue, setLocalValue] = useState(
    q.answer?.trim() ?? q.sampleAnswer ?? ""
  )
  const hasSample = !!q.sampleAnswer

  return (
    <div className="mt-2 space-y-2">
      {hasSample ? (
        <>
          <p className="text-xs font-medium text-muted-foreground">
            Sample answer (you can edit or replace):
          </p>
          <textarea
            rows={3}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
          />
        </>
      ) : (
        <>
          <p className="text-xs font-medium text-muted-foreground">
            Your answer (optional):
          </p>
          <textarea
            placeholder="Type your answer here..."
            rows={3}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
          />
        </>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(localValue)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-vault-teal px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-vault-teal/90"
        >
          Save answer
        </button>
        <button
          type="button"
          onClick={() => onSave(localValue)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-vault-gold px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-vault-gold/90"
        >
          Attach Media
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-vault-gold/40 bg-vault-gold/10 px-3 py-1.5 text-xs font-semibold text-vault-warm transition-colors hover:bg-vault-gold/20"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Enhance text
        </button>
      </div>
    </div>
  )
}