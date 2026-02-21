"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  HelpCircle,
  ImageIcon,
  Video,
  Plus,
  Trash2,
  Pencil,
  GripVertical,
} from "lucide-react"

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
  media: MediaItem[]
}

const initialQuestions: QuestionItem[] = [
  {
    id: "1",
    question: "What was the first word your baby said?",
    answer: "She said 'Dada' for the first time at 8 months!",
    media: [{ id: "m1", type: "image", url: "/samples/memory-1.jpg", name: "memory-1.jpg" }],
  },
  {
    id: "2",
    question: "Describe your baby's favourite toy.",
    answer: "A soft brown teddy bear named Mr. Snuggles.",
    media: [
      { id: "m2", type: "image", url: "/samples/memory-2.jpg", name: "memory-2.jpg" },
      { id: "m3", type: "video", url: "#", name: "birthday-video.mp4" },
    ],
  },
  {
    id: "3",
    question: "What is your favourite memory from the first month?",
    answer: "",
    media: [],
  },
  {
    id: "4",
    question: "How did you choose your baby's name?",
    answer: "We named her after her great-grandmother.",
    media: [{ id: "m4", type: "image", url: "/samples/memory-3.jpg", name: "memory-3.jpg" }],
  },
  {
    id: "5",
    question: "What song does your baby love?",
    answer: "",
    media: [],
  },
]

export function EditVaultContent() {
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions)
  const [editingMediaKey, setEditingMediaKey] = useState<string | null>(null)
  const [addMediaForQuestionId, setAddMediaForQuestionId] = useState<string | null>(null)
  const addImageInputRef = useRef<HTMLInputElement>(null)
  const addVideoInputRef = useRef<HTMLInputElement>(null)
  const replaceImageInputRef = useRef<HTMLInputElement>(null)
  const replaceVideoInputRef = useRef<HTMLInputElement>(null)

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
      { id: crypto.randomUUID(), question: "", answer: "", media: [] },
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

  return (
    <div className="animate-fade-in-up flex flex-col gap-8 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Edit the vault
        </h1>
        <p className="mt-1 text-muted-foreground">
          Change answers and attach images or videos to each question
        </p>
      </div>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-vault-teal" />
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Questions, answers & attached media
          </h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Edit each question and answer, and add or remove images/videos for that question.
        </p>
        <div className="flex flex-col gap-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestionText(q.id, e.target.value)}
                  placeholder="Question"
                  className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="cursor-grab text-muted-foreground" aria-hidden>
                    <GripVertical className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <textarea
                value={q.answer}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                placeholder="Your answer..."
                rows={2}
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
              {/* Media attached to this question */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Images & videos for this question
                </p>
                <div className="flex flex-wrap items-start gap-3">
                  {q.media.map((item) => (
                    <div
                      key={item.id}
                      className="group relative w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      <div className="relative aspect-square">
                        {item.type === "image" ? (
                          <Image
                            src={item.url}
                            alt={item.name ?? "Attachment"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <Video className="h-8 w-8 text-vault-teal/60" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => replaceMedia(q.id, item.id, item.type)}
                            className="rounded bg-background/90 p-1.5 text-foreground hover:bg-vault-teal hover:text-primary-foreground"
                            aria-label="Replace"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeMedia(q.id, item.id)}
                            className="rounded bg-background/90 p-1.5 text-foreground hover:bg-destructive hover:text-primary-foreground"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      {item.name && (
                        <p className="truncate px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {item.name}
                        </p>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => triggerAddImage(q.id)}
                    className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-vault-gold/40 hover:text-vault-gold"
                    aria-label="Add image"
                  >
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerAddVideo(q.id)}
                    className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-vault-teal/40 hover:text-vault-teal"
                    aria-label="Add video"
                  >
                    <Video className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Video</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 py-3 text-sm font-medium text-vault-warm transition-colors hover:bg-vault-gold/10"
          >
            <Plus className="h-4 w-4" />
            Add question
          </button>
        </div>
      </section>

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

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-vault-teal px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
