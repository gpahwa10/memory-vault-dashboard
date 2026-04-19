"use client"

import { useState, useRef, useEffect } from "react"
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
  Search,
  Loader2,
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
import { Skeleton } from "@/components/ui/skeleton"
import { useAddMemory } from "@/app/(dashboard)/add-memory-context"
import {
  memoryDetailService,
  type BookMemory,
} from "@/app/(dashboard)/memory-detail/memory-detail-service"
import { toast } from "sonner"

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
  date?: string
}

function bookMemoryToQuestionItem(m: BookMemory): QuestionItem {
  const answered =
    Boolean(m.answer?.trim()) || m.status?.toLowerCase() === "answered"
  const media: MediaItem[] = []
  m.images.forEach((url, i) => {
    media.push({
      id: `${m.id}-img-${i}`,
      type: "image",
      url,
      name: url.split("/").pop() || `image-${i + 1}`,
    })
  })
  if (m.videoUrl) {
    media.push({
      id: `${m.id}-video`,
      type: "video",
      url: m.videoUrl,
      name: "Video",
    })
  }
  return {
    id: m.id,
    question: m.question,
    answer: m.answer,
    answered,
    media,
    date: m.date,
  }
}

function collectRemoteImageUrlsFromMedia(media: MediaItem[]): string[] {
  return media
    .filter((m) => m.type === "image" && /^https?:\/\//i.test(m.url))
    .map((m) => m.url)
}

function firstRemoteVideoUrlFromMedia(media: MediaItem[]): string | null {
  const v = media.find(
    (m) => m.type === "video" && /^https?:\/\//i.test(m.url)
  )
  return v?.url ?? null
}

function MemoriesGridSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="space-y-3"
    >
      <span className="sr-only">Loading memories</span>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card/80"
          >
            <Skeleton className="h-36 w-full shrink-0 rounded-none rounded-t-xl" />
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex items-start gap-2">
                <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-[85%] rounded-md" />
                </div>
              </div>
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-2/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const initialQuestions: QuestionItem[] = [
  {
    id: "1",
    question: "What was the first word your baby said?",
    answer: "She said 'Dada' for the first time at 8 months!",
    answered: true,
    media: [{ id: "m1", type: "image", url: "/samples/memory-1.jpg", name: "memory-1.jpg" }],
    date: "2026-01-15",
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
    date: "2026-01-28",
  },
  {
    id: "3",
    question: "What is your favourite memory from the first month?",
    answer: "",
    answered: false,
    media: [],
    date: "2026-02-02",
  },
  {
    id: "4",
    question: "How did you choose your baby's name?",
    answer: "We named her after her great-grandmother.",
    media: [{ id: "m4", type: "image", url: "/samples/memory-3.jpg", name: "memory-3.jpg" }],
    answered: true,
    date: "2026-02-05",
  },
  {
    id: "5",
    question: "What song does your baby love?",
    answer: "",
    media: [],
    answered: false,
    date: "2026-02-10",
  },
]

export function EditVaultContent({ bookId }: { bookId?: string }) {
  const [questions, setQuestions] = useState<QuestionItem[]>(() =>
    bookId ? [] : initialQuestions
  )
  const [memoriesLoadState, setMemoriesLoadState] = useState<
    "idle" | "loading" | "error" | "success"
  >(() => (bookId ? "loading" : "success"))
  const [memoriesError, setMemoriesError] = useState<string | null>(null)

  useEffect(() => {
    if (!bookId) {
      setQuestions(initialQuestions)
      setMemoriesLoadState("success")
      setMemoriesError(null)
      return
    }

    let cancelled = false
    setMemoriesLoadState("loading")
    setMemoriesError(null)

    memoryDetailService
      .getBookMemories(bookId)
      .then((memories) => {
        if (cancelled) return
        setQuestions(memories.map(bookMemoryToQuestionItem))
        setMemoriesLoadState("success")
      })
      .catch((err) => {
        if (cancelled) return
        setMemoriesError(typeof err === "string" ? err : "Failed to load memories")
        setQuestions([])
        setMemoriesLoadState("error")
      })

    return () => {
      cancelled = true
    }
  }, [bookId])
  const [editingMediaKey, setEditingMediaKey] = useState<string | null>(null)
  const [addMediaForQuestionId, setAddMediaForQuestionId] = useState<string | null>(null)
  const [selectedQ, setSelectedQ] = useState<QuestionItem | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "title-az">("newest")
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<"all" | "answered" | "pending">("all")
  const [isEditingQuestionText, setIsEditingQuestionText] = useState(false)
  const [lowQualityMedia, setLowQualityMedia] = useState<Record<string, boolean>>({})
  const [isSavingModal, setIsSavingModal] = useState(false)
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
      {
        id: crypto.randomUUID(),
        question: "",
        answer: "",
        answered: false,
        media: [],
        date: new Date().toISOString().slice(0, 10),
      },
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

  const handleModalDateChange = (value: string) => {
    if (!selectedQ) return
    const updated = { ...selectedQ, date: value }
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

  const handleModalSave = async () => {
    if (!selectedQ) return
    setIsEditingQuestionText(false)

    if (!bookId) {
      setSelectedQ(null)
      return
    }

    const imageUrls = collectRemoteImageUrlsFromMedia(selectedQ.media)
    const videoUrl = firstRemoteVideoUrlFromMedia(selectedQ.media)
    const hasLocalOnlyMedia = selectedQ.media.some(
      (m) =>
        (m.type === "image" || m.type === "video") &&
        !/^https?:\/\//i.test(m.url)
    )

    setIsSavingModal(true)
    try {
      await memoryDetailService.updateBookMemory(bookId, selectedQ.id, {
        question: selectedQ.question,
        answer: selectedQ.answer,
        date: selectedQ.date || new Date().toISOString().slice(0, 10),
        status: selectedQ.answer.trim() ? "answered" : "pending",
        images: imageUrls,
        videoUrl,
      })
      if (hasLocalOnlyMedia) {
        toast.success("Memory updated", {
          description:
            "Only hosted image/video URLs are sent. Upload to storage for URLs to attach files.",
        })
      } else {
        toast.success("Memory updated")
      }
      const memories = await memoryDetailService.getBookMemories(bookId)
      setQuestions(memories.map(bookMemoryToQuestionItem))
      setSelectedQ(null)
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to update memory")
    } finally {
      setIsSavingModal(false)
    }
  }

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const time = q.date ? new Date(q.date).getTime() : null
    const fromOk = fromDate && time !== null ? time >= new Date(fromDate).getTime() : true
    const toOk = toDate && time !== null ? time <= new Date(toDate).getTime() : true

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "answered" && q.answered) ||
      (statusFilter === "pending" && !q.answered)

    return matchesSearch && fromOk && toOk && matchesStatus
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOption === "title-az") {
      return a.question.localeCompare(b.question)
    }

    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return sortOption === "newest" ? bTime - aTime : aTime - bTime
  })

  return (
    <div className="animate-fade-in-up flex min-w-0 flex-col gap-6 pb-2 sm:gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <h1 className="min-w-0 font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Your Memories
        </h1>
        <div className="flex flex-col gap-3 sm:mb-0 sm:items-end">
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="text-xs text-muted-foreground">
              {bookId && memoriesLoadState === "loading" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2
                    className="h-3.5 w-3.5 shrink-0 animate-spin text-vault-teal"
                    aria-hidden
                  />
                  Loading memories…
                </span>
              ) : (
                <>
                  {questions.filter((q) => q.answered).length} of{" "}
                  {questions.length} answered
                </>
              )}
            </span>

            <Button
            type="button"
            disabled={Boolean(bookId && memoriesLoadState === "loading")}
            onClick={() =>
              openAddMemory(bookId ? { bookId } : undefined)
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-1.5 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10 disabled:pointer-events-none disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add a new memory
          </Button>
          </div>
        </div>
      </div>

      {bookId && memoriesError && (
        <p className="text-sm text-destructive" role="alert">
          {memoriesError}
        </p>
      )}

      {bookId && memoriesLoadState === "loading" ? (
        <MemoriesGridSkeleton />
      ) : (
        <>
      <div
        className={cn(
          "mb-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
          bookId && memoriesLoadState === "error" && "opacity-90"
        )}
      >
        {/* Search */}
        <div className="flex min-w-0 max-w-full flex-1 items-center gap-2 sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search memories..."
            className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20 transition-all"
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Date filter */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-muted-foreground">
          <div className="flex min-w-0 items-center gap-1">
            <span className="shrink-0">From</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-7 min-w-0 max-w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground focus:border-vault-teal focus:outline-none focus:ring-1 focus:ring-vault-teal/30"
            />
          </div>
          <div className="flex min-w-0 items-center gap-1">
            <span className="shrink-0">To</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-7 min-w-0 max-w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground focus:border-vault-teal focus:outline-none focus:ring-1 focus:ring-vault-teal/30"
            />
          </div>
        </div>
        {/* Status filter */}
        <div className="flex w-full min-w-0 items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] sm:w-auto">
          <span className="text-muted-foreground">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="bg-transparent text-foreground focus:outline-none"
          >
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex w-full min-w-0 items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] sm:ml-auto sm:w-auto sm:max-w-[12rem]">
          <span className="text-muted-foreground">Sort</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
            className="bg-transparent text-foreground focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title-az">Title A–Z</option>
          </select>
        </div>
      </div>

      {/* ── Card grid (new) ──────────────────────────────────────────────── */}
      <section>
        {bookId &&
          memoriesLoadState === "success" &&
          sortedQuestions.length === 0 && (
            <p className="mb-4 text-sm text-muted-foreground">
              No memories yet. Use &quot;Add a new memory&quot; to create one.
            </p>
          )}

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedQuestions.map((q, idx) => {
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
                onClick={() => {
                  setSelectedQ(q)
                  setIsEditingQuestionText(false)
                }}
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
        </>
      )}

      {/* ── Question detail modal ────────────────────────────────────────── */}
      <Dialog
        open={!!selectedQ}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedQ(null)
            setIsEditingQuestionText(false)
          }
        }}
      >
        <DialogContent
          showCloseButton
          className="flex max-h-[min(90dvh,100svh)] w-[min(100%,calc(100vw-1rem))] max-w-2xl min-w-0 flex-col gap-0 overflow-hidden p-0 pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-2"
        >
          <DialogHeader className="min-w-0 shrink-0 space-y-3 px-4 pb-0 pt-4 text-left sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <DialogTitle className="min-w-0 pr-8 font-serif text-lg sm:text-xl">
                Question details
              </DialogTitle>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h3 className="shrink-0 text-xs font-medium text-muted-foreground">Date</h3>
                <input
                  type="date"
                  value={selectedQ?.date || ""}
                  onChange={(e) => handleModalDateChange(e.target.value)}
                  className="h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-[11px] text-foreground focus:border-vault-teal focus:outline-none focus:ring-1 focus:ring-vault-teal/30 sm:h-8 sm:max-w-[11rem]"
                />
              </div>
            </div>
          </DialogHeader>

          {selectedQ && (
            <div className="min-h-0 min-w-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-2 sm:px-6">
              {/* Question text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Question
                  </label>
                  {!isEditingQuestionText && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-[11px]"
                      onClick={() => setIsEditingQuestionText(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
                {isEditingQuestionText ? (
                  <Textarea
                    value={selectedQ.question}
                    onChange={(e) => handleModalQuestionChange(e.target.value)}
                    placeholder="Edit the question text..."
                    className="min-h-[80px] resize-none"
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
                    {selectedQ.question || "No question text yet."}
                  </div>
                )}
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
                  className="min-h-[130px]"
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Media attached
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => modalAddImageRef.current?.click()}
                      className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:flex-initial sm:min-h-0 sm:py-1"
                    >
                      <ImageIcon className="h-3.5 w-3.5 shrink-0" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => modalAddVideoRef.current?.click()}
                      className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:flex-initial sm:min-h-0 sm:py-1"
                    >
                      <Video className="h-3.5 w-3.5 shrink-0" />
                      Video
                    </button>
                  </div>
                </div>

                {selectedQ.media.length > 0 ? (
                  <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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
                          <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
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

          <DialogFooter className="mt-auto shrink-0 gap-2 border-t border-border bg-background px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button
              variant="outline"
              onClick={() => setSelectedQ(null)}
              disabled={isSavingModal}
              className="min-h-11 w-full sm:min-h-9 sm:w-auto"
            >
              Close
            </Button>
            <Button
              onClick={() => void handleModalSave()}
              disabled={isSavingModal}
              className="min-h-11 w-full sm:min-h-9 sm:w-auto"
            >
              {isSavingModal ? "Saving…" : "Save changes"}
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
