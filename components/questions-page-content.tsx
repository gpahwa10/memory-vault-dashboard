"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Sparkles, X, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  name?: string
}

interface QuestionItem {
  id: string
  question: string
  answered: boolean
  answer: string
  sampleAnswer?: string
  media?: MediaItem[]
}

const initialQuestions: QuestionItem[] = [
  {
    id: "1",
    question: "What was the first word your baby said?",
    answered: true,
    answer: "She said 'Dada' for the first time at 8 months!",
    sampleAnswer: "She said 'Dada' for the first time at 8 months!",
    media: [{ id: "m1", type: "image", url: "/samples/memory-1.jpg", name: "memory-1.jpg" }],
  },
  {
    id: "2",
    question: "Describe your baby's favourite toy.",
    answered: true,
    answer: "A soft brown teddy bear named Mr. Snuggles.",
    sampleAnswer: "A soft brown teddy bear named Mr. Snuggles.",
    media: [
      { id: "m2", type: "image", url: "/samples/memory-2.jpg", name: "memory-2.jpg" },
      { id: "m3", type: "video", url: "#", name: "birthday-video.mp4" },
    ],
  },
  {
    id: "3",
    question: "What is your favourite memory from the first month?",
    answered: false,
    answer: "",
    sampleAnswer:
      "Holding her for the first time and watching her fall asleep on my chest. The quiet hospital room at 3 a.m. felt like the whole world.",
    media: [],
  },
  {
    id: "4",
    question: "How did you choose your baby's name?",
    answered: true,
    answer: "We named her after her great-grandmother.",
    sampleAnswer: "We named her after her great-grandmother.",
    media: [{ id: "m4", type: "image", url: "/samples/memory-3.jpg", name: "memory-3.jpg" }],
  },
  {
    id: "5",
    question: "What song does your baby love?",
    answered: false,
    answer: "",
    sampleAnswer:
      "Twinkle, Twinkle, Little Star—she always calms down when we sing it at bedtime.",
    media: [],
  },
  {
    id: "6",
    question: "Describe a funny moment with your baby.",
    answered: true,
    answer: "She tried to eat her own foot during bath time!",
    sampleAnswer: "She tried to eat her own foot during bath time!",
    media: [],
  },
  {
    id: "7",
    question: "What is your baby's favourite food?",
    answered: true,
    answer: "Mashed bananas, without a doubt.",
    sampleAnswer: "Mashed bananas, without a doubt.",
    media: [],
  },
  {
    id: "8",
    question: "How does your baby react when they see themselves in a mirror?",
    answered: false,
    answer: "",
    sampleAnswer:
      "She smiles and babbles at her reflection, sometimes leaning in to kiss the baby in the mirror.",
    media: [],
  },
  {
    id: "9",
    question: "What is the most surprising thing your baby has done?",
    answered: false,
    answer: "",
    sampleAnswer:
      "She waved bye-bye on her own at 9 months when grandma left—we had never taught her that.",
    media: [],
  },
  {
    id: "10",
    question: "Describe your baby's bedtime routine.",
    answered: false,
    answer: "",
    sampleAnswer:
      "Bath, then a bottle, then we read one short book and sing a lullaby. She usually falls asleep with her hand on my cheek.",
    media: [],
  },
]

export function QuestionsPageContent() {
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [fullScreenMedia, setFullScreenMedia] = useState<MediaItem | null>(null)

  const answeredCount = questions.filter((q) => q.answered).length
  const total = questions.length

  const updateAnswer = (id: string, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer } : q))
    )
  }

  const handleSaveEdit = (id: string, value: string) => {
    updateAnswer(id, value)
    setEditingId(null)
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          All Questions
        </h1>
        <p className="mt-1 text-muted-foreground">
          {answeredCount} of {total} questions answered
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-vault-teal transition-all duration-700"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {total - answeredCount} questions remaining
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className={`rounded-xl border p-5 transition-all ${
              q.answered
                ? "border-border bg-card"
                : "border-vault-gold/30 bg-vault-gold/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  q.answered
                    ? "bg-vault-teal text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{q.question}</p>
                {q.answered ? (
                  <>
                    {editingId === q.id ? (
                      <div className="mt-2 space-y-2" data-edit-block>
                        <textarea
                          autoFocus
                          rows={3}
                          defaultValue={q.answer}
                          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                          onKeyDown={(e) => {
                            if (e.key === "Escape") setEditingId(null)
                          }}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.querySelector("[data-edit-block] textarea")
                              if (el instanceof HTMLTextAreaElement)
                                handleSaveEdit(q.id, el.value)
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

                    {/* Actions: Edit + Enhance text (only when not editing) */}
                    {editingId !== q.id && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(q.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-vault-teal/40 bg-vault-teal/10 px-3 py-1.5 text-xs font-semibold text-vault-teal transition-colors hover:bg-vault-teal/20"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-vault-gold/40 bg-vault-gold/10 px-3 py-1.5 text-xs font-semibold text-vault-warm transition-colors hover:bg-vault-gold/20"
                          onClick={() => {
                            /* Enhance text – placeholder for AI enhancement */
                          }}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          Enhance text
                        </button>
                      </div>
                    )}

                    {/* Media attached to this question (answered only) */}
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
                  <div className="mt-2 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Sample answer (you can edit or replace):
                    </p>
                    <textarea
                      placeholder="Type your answer here..."
                      rows={3}
                      defaultValue={q.sampleAnswer ?? ""}
                      className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen media viewer */}
      <Dialog
        open={!!fullScreenMedia}
        onOpenChange={(open) => !open && setFullScreenMedia(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 z-50 flex h-screen w-screen max-w-none items-center justify-center border-0 bg-black/95 p-0"
        >
          <DialogTitle className="sr-only">
            View media full screen
          </DialogTitle>
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
                    <p className="text-xs text-muted-foreground">
                      Playback in full screen would go here
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
