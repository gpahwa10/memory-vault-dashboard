"use client"

import { useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import {
  X,
  CalendarIcon,
  ImagePlus,
  Video,
  Sparkles,
  Undo2,
  Save,
  Trash2,
  GripVertical,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { MEMORY_CATEGORIES } from "@/lib/memories"
import { memoryDetailService } from "@/app/(dashboard)/memory-detail/memory-detail-service"
import { fileToUploadableImageDataUrl } from "@/lib/compress-image"
import { toast } from "sonner"

const CATEGORY_CONFIG: Record<
  (typeof MEMORY_CATEGORIES)[number],
  { image: string; label: string; accent: string }
> = {
  "Wedding Albums": {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&fit=crop",
    label: "Wedding Albums",
    accent: "from-rose-900/80",
  },
  "Travel Journey": {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80&fit=crop",
    label: "Travel Journey",
    accent: "from-sky-900/80",
  },
  "Baby Milestones": {
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80&fit=crop",
    label: "Baby Milestones",
    accent: "from-amber-900/70",
  },
  "Graduation Books": {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80&fit=crop",
    label: "Graduation Books",
    accent: "from-emerald-900/80",
  },
}

interface AddMemoryModalProps {
  open: boolean
  onClose: () => void
  /** When set (e.g. from openAddMemory({ bookId })), targets this book. */
  bookId?: string
}

interface UploadedImage {
  id: string
  /** Preview URL (`blob:` from createObjectURL). */
  url: string
  name: string
  /** Original file for API payload (blob URLs are not accepted by the server). */
  file?: File
}

function readBlobAsDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

/** Builds `images: string[]` for create memory: remote URLs as-is; file uploads as compressed JPEG data URLs. */
async function resolveImageUrlsForApi(items: UploadedImage[]): Promise<string[]> {
  const out: string[] = []
  for (const img of items) {
    if (/^https?:\/\//i.test(img.url)) {
      out.push(img.url)
      continue
    }
    if (img.file) {
      if (img.file.type.startsWith("image/")) {
        try {
          out.push(await fileToUploadableImageDataUrl(img.file))
        } catch {
          out.push(await readBlobAsDataURL(img.file))
        }
      } else {
        out.push(await readBlobAsDataURL(img.file))
      }
      continue
    }
    if (img.url.startsWith("blob:")) {
      try {
        const res = await fetch(img.url)
        const blob = await res.blob()
        if (blob.type.startsWith("image/")) {
          try {
            out.push(await fileToUploadableImageDataUrl(blob))
          } catch {
            out.push(await readBlobAsDataURL(blob))
          }
        } else {
          out.push(await readBlobAsDataURL(blob))
        }
      } catch {
        /* skip unreadable blob */
      }
    }
  }
  return out
}

/** Single video attachment (API has one `videoUrl`). */
interface UploadedVideo {
  id: string
  url: string
  name: string
  file?: File
}

/** ~2MB cap keeps JSON under typical limits alongside compressed photos. */
const MAX_EMBED_VIDEO_BYTES = 2 * 1024 * 1024

async function resolveVideoUrlForApi(
  video: UploadedVideo | null
): Promise<string | null> {
  if (!video) return null
  if (/^https?:\/\//i.test(video.url)) return video.url
  const blobSource = video.file
    ? video.file
    : await fetch(video.url).then((r) => r.blob())
  if (blobSource.size > MAX_EMBED_VIDEO_BYTES) {
    throw new Error("VIDEO_TOO_LARGE")
  }
  return readBlobAsDataURL(blobSource)
}

function bookIdFromPathname(pathname: string | null): string | undefined {
  if (!pathname) return undefined
  const m = pathname.match(/^\/memory-detail\/([^/]+)/)
  return m?.[1]
}

export function AddMemoryModal({ open, onClose, bookId: bookIdProp }: AddMemoryModalProps) {
  const pathname = usePathname()
  const [category, setCategory] = useState<(typeof MEMORY_CATEGORIES)[number] | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [includeInBook, setIncludeInBook] = useState(true)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [videoAttachment, setVideoAttachment] = useState<UploadedVideo | null>(
    null
  )
  const [memoryText, setMemoryText] = useState("")
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [memoryQuestion, setMemoryQuestion] = useState("")
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return
      const remaining = 4 - images.length
      const toAdd = Array.from(files).slice(0, remaining)
      const newImages: UploadedImage[] = toAdd.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      }))
      setImages((prev) => [...prev, ...newImages])
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [images.length]
  )

  const removeVideo = () => {
    setVideoAttachment((prev) => {
      if (prev?.url.startsWith("blob:")) URL.revokeObjectURL(prev.url)
      return null
    })
  }

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setVideoAttachment((prev) => {
      if (prev?.url.startsWith("blob:")) URL.revokeObjectURL(prev.url)
      return {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      }
    })
    e.target.value = ""
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id)
      if (removed?.url.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  const handleEnhanceText = () => {
    if (!memoryText.trim()) return
    setOriginalText(memoryText)
    const enhanced = memoryText
      .replace(/\bi\b/g, "I")
      .replace(/^./, (c) => c.toUpperCase())
    setMemoryText(
      enhanced.endsWith(".")
        ? enhanced
        : enhanced + ". This memory fills the heart with warmth and joy."
    )
    setIsEnhanced(true)
  }

  const handleUndo = () => {
    if (originalText !== null) {
      setMemoryText(originalText)
      setOriginalText(null)
      setIsEnhanced(false)
    }
  }

  const resetForm = () => {
    setCategory(null)
    setDate(new Date())
    setIncludeInBook(true)
    setVideoAttachment((prev) => {
      if (prev?.url.startsWith("blob:")) URL.revokeObjectURL(prev.url)
      return null
    })
    setImages((prev) => {
      prev.forEach((img) => {
        if (img.url.startsWith("blob:")) URL.revokeObjectURL(img.url)
      })
      return []
    })
    setMemoryText("")
    setOriginalText(null)
    setIsEnhanced(false)
    setMemoryQuestion("")
  }

  const handleSave = async () => {
    const fromPath = bookIdFromPathname(pathname)
    const fromQuery =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("bookId") ?? undefined
        : undefined
    const targetBookId = bookIdProp ?? fromPath ?? fromQuery

    if (!targetBookId) {
      toast.error("No memory book selected", {
        description:
          "Open a vault from the dashboard, go to a book, or use /edit-vault?bookId=… then add a memory.",
      })
      return
    }

    const q = memoryQuestion.trim()
    const a = memoryText.trim()
    if (!q && !a) {
      toast.error("Add a memory title or description before saving.")
      return
    }

    setIsSaving(true)
    try {
      const imageUrls = await resolveImageUrlsForApi(images)
      if (images.length > 0 && imageUrls.length === 0) {
        toast.error("Could not read images for upload. Try smaller files or add hosted image URLs.")
        return
      }

      let videoUrl: string | null = null
      if (videoAttachment) {
        try {
          videoUrl = await resolveVideoUrlForApi(videoAttachment)
        } catch (e) {
          if (e instanceof Error && e.message === "VIDEO_TOO_LARGE") {
            toast.error("Video file is too large to embed", {
              description: `Use a clip under ${Math.round(MAX_EMBED_VIDEO_BYTES / (1024 * 1024))}MB, or host the video and paste an https URL.`,
            })
            return
          }
          toast.error("Could not read the video file.")
          return
        }
      }

      const payload = {
        date: format(date, "yyyy-MM-dd"),
        question: q || "Memory",
        answer: a,
        status: a ? "answered" : "pending",
        images: imageUrls,
        videoUrl,
      }

      const bodySize = JSON.stringify(payload).length
      if (bodySize > 950_000) {
        toast.error("Request too large for the server", {
          description:
            "Try fewer or smaller photos, a shorter video, or use hosted https URLs.",
        })
        return
      }

      await memoryDetailService.createBookMemory(targetBookId, payload)
      toast.success("Memory saved")
      resetForm()
      onClose()
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to save memory")
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex min-h-0 items-start justify-center overflow-y-auto overscroll-contain bg-black/50 p-3 pt-6 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className="relative my-auto flex w-full min-w-0 max-w-2xl max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-fade-in-up sm:max-h-[calc(100dvh-2rem)]"
        role="dialog"
        aria-label="Add a New Memory"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="min-w-0 font-serif text-lg font-bold text-foreground sm:text-2xl">
            Add a New Memory
          </h2>
          <button
            onClick={handleClose}
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">


          {/* Include in Book & Date */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={includeInBook}
                onCheckedChange={(v) => setIncludeInBook(v as boolean)}
                className="border-vault-gold data-[state=checked]:bg-vault-gold data-[state=checked]:text-accent-foreground"
              />
              <span className="text-sm font-medium text-foreground">
                Include in Book
              </span>
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <button className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-vault-gold/40">
                  <CalendarIcon className="h-4 w-4 text-vault-teal" />
                  {format(date, "yyyy-MM-dd")}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Memory Question */}
          <div className="flex flex-col gap-2">
            <input
              value={memoryQuestion}
              onChange={(e) => {
                setMemoryQuestion(e.target.value)
              }}
              placeholder="Tell us about your memory..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />

          </div>

          {/* Memory Text */}
          <div className="flex flex-col gap-2">
            <textarea
              value={memoryText}
              onChange={(e) => {
                setMemoryText(e.target.value)
                if (isEnhanced) {
                  setIsEnhanced(false)
                  setOriginalText(null)
                }
              }}
              placeholder="Type your memory here..."
              rows={6}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleEnhanceText}
                disabled={!memoryText.trim()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-vault-teal transition-colors hover:text-vault-teal-dark disabled:opacity-40"
              >
                <Sparkles className="h-4 w-4" />
                ENHANCE YOUR TEXT
              </button>
              {isEnhanced && (
                <button
                  onClick={handleUndo}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Undo2 className="h-4 w-4" />
                  UNDO
                </button>
              )}

            </div>
          </div>
          {/* Media Upload Area — no overflow-hidden on outer shell so action rows stay visible */}
          <div className="min-w-0 max-w-full rounded-xl border border-dashed border-border bg-background">
            <div className="relative min-h-[140px] min-w-0">
              <div className="pointer-events-none absolute inset-0 flex flex-wrap items-center justify-center gap-8 overflow-hidden opacity-[0.04]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="rotate-[-15deg] font-serif text-3xl font-bold tracking-widest text-foreground"
                  >
                    MEMORY VAULT
                  </span>
                ))}
              </div>

              {images.length === 0 && !videoAttachment && (
                <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-8">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:border-vault-gold/40 hover:shadow-md"
                  >
                    <ImagePlus className="h-4 w-4 text-vault-gold" />
                    Add Images (max 4)
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    and / or
                  </span>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:border-vault-teal/40 hover:shadow-md"
                  >
                    <Video className="h-4 w-4 text-vault-teal" />
                    Add Video (1 clip)
                  </button>
                </div>
              )}

              {(images.length > 0 || videoAttachment) && (
                <div className="relative z-10 flex min-w-0 flex-col gap-3 p-3 sm:p-4">
                  <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border/70 pb-3">
                    {images.length < 4 ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-vault-gold/40"
                      >
                        <ImagePlus className="h-3.5 w-3.5 shrink-0" />
                        {images.length > 0
                          ? `Add more images (${images.length}/4)`
                          : "Add images (0/4)"}
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Maximum 4 images added
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-vault-teal/40"
                    >
                      <Video className="h-3.5 w-3.5 shrink-0 text-vault-teal" />
                      {videoAttachment ? "Replace video" : "Add video"}
                    </button>
                  </div>

                  {images.length > 0 && (
                    <div className="max-h-[min(50vh,20rem)] w-full min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg sm:max-h-[min(45vh,22rem)]">
                      <div
                        className={cn(
                          "mx-auto grid w-full min-w-0 max-w-full gap-2",
                          images.length === 1 && "grid-cols-1 place-items-center",
                          images.length === 2 && "grid-cols-2",
                          images.length >= 3 && "grid-cols-2"
                        )}
                      >
                        {images.map((img) => (
                          <div
                            key={img.id}
                            className={cn(
                              "group relative h-32 w-full min-w-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-36",
                              images.length === 1 && "max-w-[min(100%,18rem)]"
                            )}
                          >
                            <Image
                              src={img.url}
                              alt={img.name}
                              fill
                              sizes="(max-width: 640px) 42vw, 180px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-100 transition-all group-hover:bg-black/30 sm:opacity-0 sm:group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => removeImage(img.id)}
                                className="rounded-full bg-destructive p-2 text-primary-foreground shadow-lg"
                                aria-label="Remove image"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="rounded-full bg-card p-2 text-foreground shadow-lg"
                                aria-hidden
                              >
                                <GripVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {videoAttachment && (
                    <div className="relative min-w-0 overflow-hidden rounded-lg border border-border bg-muted">
                      <video
                        src={videoAttachment.url}
                        controls
                        playsInline
                        className="max-h-48 w-full bg-black object-contain"
                      />
                      <div className="flex items-center justify-between gap-2 border-t border-border bg-card/80 px-3 py-2">
                        <p className="min-w-0 truncate text-xs text-muted-foreground">
                          {videoAttachment.name}
                        </p>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                        >
                          Remove video
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-vault-teal px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "SAVE"}
          </button>

        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoInputChange}
        />
      </div>
    </div>
  )
}
