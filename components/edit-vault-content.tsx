"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  Camera,
  Check,
  Eye,
  HelpCircle,
  ImageIcon,
  Video,
  Plus,
  Trash2,
  Pencil,
  GripVertical,
  Sparkles,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAddMemory } from "@/app/(dashboard)/add-memory-context"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  name?: string
}

interface QuestionItem {
  id: string
  question: string
  answer: string
  answered: boolean
  media: MediaItem[]
}

const initialQuestions: QuestionItem[] = [
  {
    id: "1",
    question: "What was the first word your baby said?",
    answer: "She said 'Dada' for the first time at 8 months!",
    answered: true,
    media: [{ id: "m1", type: "image", url: "/samples/memory-1.jpg", name: "memory-1.jpg" }],
  },
  {
    id: "2",
    question: "Describe your baby's favourite toy.",
    answer: "A soft brown teddy bear named Mr. Snuggles.",
    answered: true,
    media: [
      { id: "m2", type: "image", url: "/samples/memory-2.jpg", name: "memory-2.jpg" },
      { id: "m3", type: "video", url: "#", name: "birthday-video.mp4" },
    ],
  },
  {
    id: "3",
    question: "What is your favourite memory from the first month?",
    answer: "",
    answered: false,
    media: [],
  },
  {
    id: "4",
    question: "How did you choose your baby's name?",
    answer: "We named her after her great-grandmother.",
    media: [{ id: "m4", type: "image", url: "/samples/memory-3.jpg", name: "memory-3.jpg" }],
    answered: true,
  },
  {
    id: "5",
    question: "What song does your baby love?",
    answer: "",
    media: [],
    answered: false,
  },
]

export function EditVaultContent() {
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions)
  const [editingMediaKey, setEditingMediaKey] = useState<string | null>(null)
  const [addMediaForQuestionId, setAddMediaForQuestionId] = useState<string | null>(null)
  const [selectedQ, setSelectedQ] = useState<QuestionItem | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [lowQualityMedia, setLowQualityMedia] = useState<Record<string, boolean>>({
    // Mark one sample image as low quality so the badge appears in demo data
    m1: true,
  })
  const addImageInputRef = useRef<HTMLInputElement>(null)
  const addVideoInputRef = useRef<HTMLInputElement>(null)
  const replaceImageInputRef = useRef<HTMLInputElement>(null)
  const replaceVideoInputRef = useRef<HTMLInputElement>(null)
  const modalAddImageRef = useRef<HTMLInputElement>(null)
  const modalAddVideoRef = useRef<HTMLInputElement>(null)

  const openAddMemory = useAddMemory()

  const updateAnswer = (questionId: string, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer } : q))
    )
  }

  const updateQuestionText = (questionId: string, question: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, question } : q))
    )
  }

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), question: "", answer: "", answered: false, media: [] },
    ])
  }

  const removeMedia = (questionId: string, mediaId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, media: q.media.filter((m) => m.id !== mediaId) }
          : q
      )
    )
  }

  const addMediaToQuestion = (
    questionId: string,
    type: "image" | "video",
    file?: File
  ) => {
    if (type === "image" && file) {
      const url = URL.createObjectURL(file)
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                media: [
                  ...q.media,
                  { id: crypto.randomUUID(), type: "image", url, name: file.name },
                ],
              }
            : q
        )
      )
    } else if (type === "video" && file) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                media: [
                  ...q.media,
                  { id: crypto.randomUUID(), type: "video", url: "#", name: file.name },
                ],
              }
            : q
        )
      )
    }
    setAddMediaForQuestionId(null)
  }

  const replaceMedia = (questionId: string, mediaId: string, type: "image" | "video") => {
    setEditingMediaKey(`${questionId}:${mediaId}`)
    if (type === "image") replaceImageInputRef.current?.click()
    else replaceVideoInputRef.current?.click()
  }

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !addMediaForQuestionId) return
    addMediaToQuestion(addMediaForQuestionId, "image", file)
    e.target.value = ""
  }

  const handleAddVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !addMediaForQuestionId) return
    addMediaToQuestion(addMediaForQuestionId, "video", file)
    e.target.value = ""
  }

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingMediaKey) return
    const [questionId, mediaId] = editingMediaKey.split(":")
    const url = URL.createObjectURL(file)
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              media: q.media.map((m) =>
                m.id === mediaId ? { ...m, url, name: file.name, type: "image" as const } : m
              ),
            }
          : q
      )
    )
    setEditingMediaKey(null)
    e.target.value = ""
  }

  const handleReplaceVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingMediaKey) return
    const [questionId, mediaId] = editingMediaKey.split(":")
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              media: q.media.map((m) =>
                m.id === mediaId ? { ...m, name: file.name, type: "video" as const } : m
              ),
            }
          : q
      )
    )
    setEditingMediaKey(null)
    e.target.value = ""
  }

  const triggerAddImage = (questionId: string) => {
    setAddMediaForQuestionId(questionId)
    addImageInputRef.current?.click()
  }

  const triggerAddVideo = (questionId: string) => {
    setAddMediaForQuestionId(questionId)
    addVideoInputRef.current?.click()
  }

  const handleEnhance = () => {
    if (!selectedQ) return
    const raw = selectedQ.answer.trim()
    if (!raw) return
    setIsEnhancing(true)
    setTimeout(() => {
      const base = raw.charAt(0).toUpperCase() + raw.slice(1).replace(/\s+/g, " ")
      const enhanced = /[.!?]$/.test(base) ? base : `${base}.`
      const updated = { ...selectedQ, answer: enhanced }
      setSelectedQ(updated)
      setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
      setIsEnhancing(false)
    }, 400)
  }

  const handleModalAnswerChange = (value: string) => {
    if (!selectedQ) return
    const updated = { ...selectedQ, answer: value, answered: value.trim().length > 0 }
    setSelectedQ(updated)
    setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
  }

  const handleModalQuestionChange = (value: string) => {
    if (!selectedQ) return
    const updated = { ...selectedQ, question: value }
    setSelectedQ(updated)
    setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
  }

  const handleModalDeleteMedia = (mediaId: string) => {
    if (!selectedQ) return
    const updated = { ...selectedQ, media: selectedQ.media.filter((m) => m.id !== mediaId) }
    setSelectedQ(updated)
    setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
  }

  const handleModalAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedQ) return
    const url = URL.createObjectURL(file)
    const newMedia: MediaItem = { id: crypto.randomUUID(), type: "image", url, name: file.name }
    const updated = { ...selectedQ, media: [...selectedQ.media, newMedia] }
    setSelectedQ(updated)
    setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
    e.target.value = ""
  }

  const handleModalAddVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedQ) return
    const newMedia: MediaItem = { id: crypto.randomUUID(), type: "video", url: "#", name: file.name }
    const updated = { ...selectedQ, media: [...selectedQ.media, newMedia] }
    setSelectedQ(updated)
    setQuestions((prev) => prev.map((q) => (q.id === selectedQ.id ? updated : q)))
    e.target.value = ""
  }

  const handleModalSave = () => {
    setSelectedQ(null)
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-8 pb-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Your Memories
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {questions.filter((q) => q.answered).length} of {questions.length} answered
            </span>
            {/* <button
              type="button"
              onClick={addQuestion}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-1.5 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10"
            >
              <Plus className="h-3.5 w-3.5" />
              Add question
            </button> */}
            <Button
            type="button"
            onClick={() => openAddMemory()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-1.5 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10"
          >
            <Plus className="h-3.5 w-3.5" />
            Add a new memory
          </Button>
          </div>
        </div>
        {/* <p className="mt-1 text-muted-foreground">
          Change answers and attach images or videos to each question
        </p> */}
      </div>

      <div className="flex items-center mb-2 max-w-md w-full">
        <input
          type="text"
          placeholder="Search memories..."
          className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20 transition-all"
          value={searchTerm || ""}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm?.length > 0 && (
          <button
            type="button"
            className="ml-2 p-1 rounded hover:bg-muted/50"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* ── Card grid (new) ──────────────────────────────────────────────── */}
      <section>
      
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((q, idx) => {
            const firstMedia = q.media[0]
            const mediaCount = q.media.length
            const preview =
              q.answer.trim().length > 0
                ? q.answer.trim().length > 120
                  ? q.answer.trim().slice(0, 117) + "..."
                  : q.answer.trim()
                : "No answer yet."

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedQ(q)}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-vault-teal/40",
                  q.answered
                    ? "border-vault-teal/40 bg-vault-teal/5"
                    : "border-border bg-muted/20"
                )}
              >
                {/* Thumbnail area */}
                <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-vault-teal/10 to-vault-gold/5">
                  {firstMedia ? (
                    firstMedia.type === "image" ? (
                      <Image
                        src={firstMedia.url}
                        alt={q.question || `Memory ${idx + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onLoadingComplete={(img) => {
                          const isLow =
                            img.naturalWidth < 800 ||
                            img.naturalHeight < 800
                          if (isLow) {
                            setLowQualityMedia((prev) => ({
                              ...prev,
                              [firstMedia.id]: true,
                            }))
                          }
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Video className="h-10 w-10 text-vault-teal/60" />
                      </div>
                    )
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Camera className="h-10 w-10 text-vault-teal/30" />
                    </div>
                  )}

                  {/* Status badge */}
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                      q.answered
                        ? "bg-vault-teal text-primary-foreground"
                        : "bg-muted/90 text-muted-foreground backdrop-blur-sm"
                    )}
                  >
                    {q.answered ? "Answered" : "Pending"}
                  </span>

                  {/* Media count badge */}
                  {mediaCount > 0 && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      <Camera className="h-3 w-3" />
                      {mediaCount}
                    </span>
                  )}

                  {/* Low-quality image badge (answered questions only) */}
                  {q.answered && q.media.some((m) => lowQualityMedia[m.id]) && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-amber-600/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-50 shadow">
                      Low-resolution image
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vault-teal/10 text-[11px] font-bold text-vault-teal">
                      {idx + 1}
                    </span>
                    <p className="line-clamp-2 text-sm font-semibold text-foreground">
                      {q.question || `Question ${idx + 1}`}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{preview}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Old list section (commented out) ────────────────────────────── */}
      {/* 
      <section className="rounded-xl border border-border bg-card p-2 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-vault-teal" />
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Questions, answers & attached media
          </h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Edit each question and answer, and add or remove images/videos for that question.
        </p>
        ... (old list layout removed)
      </section>
      */}

      {/* ── Question detail modal ────────────────────────────────────────── */}
      <Dialog open={!!selectedQ} onOpenChange={(open) => !open && setSelectedQ(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Question details
            </DialogTitle>
          </DialogHeader>

          {selectedQ && (
            <div className="space-y-5 py-2">
              {/* Question text */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Question
                </label>
                <Textarea
                  value={selectedQ.question}
                  onChange={(e) => handleModalQuestionChange(e.target.value)}
                  placeholder="Edit the question text..."
                  className="min-h-[80px] resize-none"
                />
              </div>

              {/* Answer */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Description
                </label>
                <Textarea
                  value={selectedQ.answer}
                  onChange={(e) => handleModalAnswerChange(e.target.value)}
                  placeholder="Write your answer here..."
                  className="min-h-[130px] resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleEnhance}
                    disabled={isEnhancing || !selectedQ.answer.trim()}
                    className="inline-flex items-center gap-1 rounded-md bg-vault-teal px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-vault-teal/90 disabled:opacity-60"
                  >
                    {isEnhancing ? (
                      "Enhancing..."
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3" />
                        Enhance text
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Media attached
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => modalAddImageRef.current?.click()}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => modalAddVideoRef.current?.click()}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Video
                    </button>
                  </div>
                </div>

                {selectedQ.media.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {selectedQ.media.map((item) => (
                      <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <div className="relative aspect-square">
                          {item.type === "image" ? (
                            <Image
                              src={item.url}
                              alt={item.name ?? "Attachment"}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="200px"
                              onLoadingComplete={(img) => {
                                const isLow =
                                  img.naturalWidth < 800 ||
                                  img.naturalHeight < 800
                                if (isLow) {
                                  setLowQualityMedia((prev) => ({
                                    ...prev,
                                    [item.id]: true,
                                  }))
                                }
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Video className="h-10 w-10 text-vault-teal/60" />
                            </div>
                          )}

                          {/* Hover actions */}
                          <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => replaceMedia(selectedQ.id, item.id, item.type)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-foreground shadow backdrop-blur-sm hover:bg-vault-teal hover:text-primary-foreground"
                              aria-label="Replace media"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleModalDeleteMedia(item.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-foreground shadow backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                              aria-label="Delete media"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {(item.name || lowQualityMedia[item.id]) && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            {lowQualityMedia[item.id] && (
                                <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-[6px] font-semibold uppercase tracking-wide text-black">
                                  Low-resolution
                                </span>
                              )}
                            <div className="flex items-center justify-between gap-2">
                              {item.name && (
                                <p className="truncate text-[11px] text-white">
                                  {item.name}
                                </p>
                              )}
                              
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-28 items-center justify-center rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                      <Camera className="mx-auto mb-1 h-7 w-7 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">No media attached</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedQ(null)}>
              Close
            </Button>
            <Button onClick={handleModalSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <input ref={modalAddImageRef} type="file" accept="image/*" className="hidden" onChange={handleModalAddImage} />
      <input ref={modalAddVideoRef} type="file" accept="video/*" className="hidden" onChange={handleModalAddVideo} />

      <input
        ref={addImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAddImage}
      />
      <input
        ref={addVideoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleAddVideo}
      />
      <input
        ref={replaceImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleReplaceImage}
      />
      <input
        ref={replaceVideoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleReplaceVideo}
      />
    </div>
  )
}
