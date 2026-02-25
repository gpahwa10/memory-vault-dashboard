"use client"

import { useState, useCallback, useRef } from "react"
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
  LayoutGrid,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { MEMORY_CATEGORIES } from "@/lib/memories"

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
}

interface UploadedImage {
  id: string
  url: string
  name: string
}

type MediaMode = "images" | "video" | null

export function AddMemoryModal({ open, onClose }: AddMemoryModalProps) {
  const [category, setCategory] = useState<(typeof MEMORY_CATEGORIES)[number] | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [includeInBook, setIncludeInBook] = useState(true)
  const [mediaMode, setMediaMode] = useState<MediaMode>(null)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [memoryText, setMemoryText] = useState("")
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [showCollage, setShowCollage] = useState(false)
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
      }))
      setImages((prev) => [...prev, ...newImages])
      setMediaMode("images")
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [images.length]
  )

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      if (updated.length === 0) setMediaMode(null)
      return updated
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

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onClose()
    }, 800)
  }

  const handleClose = () => {
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-8 backdrop-blur-sm sm:items-center sm:pt-4">
      <div
        className="relative w-full max-w-2xl animate-fade-in-up rounded-2xl border border-border bg-card shadow-2xl"
        role="dialog"
        aria-label="Add a New Memory"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Add a New Memory
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">


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
          {/* Media Upload Area */}
          <div className="overflow-hidden rounded-xl border border-dashed border-border bg-background">
            <div className="relative min-h-[140px]">
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

              {mediaMode === null && (
                <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-8">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:border-vault-gold/40 hover:shadow-md"
                  >
                    <ImagePlus className="h-4 w-4 text-vault-gold" />
                    Add Images (max 4)
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    or
                  </span>
                  <button
                    onClick={() => {
                      setMediaMode("video")
                      videoInputRef.current?.click()
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:border-vault-teal/40 hover:shadow-md"
                  >
                    <Video className="h-4 w-4 text-vault-teal" />
                    Add Video (only 1)
                  </button>
                </div>
              )}

              {mediaMode === "images" && images.length > 0 && (
                <div className="relative z-10 p-4">
                  <div
                    className={cn(
                      "grid gap-2",
                      images.length === 1 && "grid-cols-1",
                      images.length === 2 && "grid-cols-2",
                      images.length >= 3 && "grid-cols-2"
                    )}
                  >
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <Image
                          src={img.url}
                          alt={img.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
                          <button
                            onClick={() => removeImage(img.id)}
                            className="rounded-full bg-destructive p-2 text-primary-foreground shadow-lg"
                            aria-label="Remove image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="rounded-full bg-card p-2 text-foreground shadow-lg">
                            <GripVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {images.length < 4 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-vault-gold/40"
                      >
                        <ImagePlus className="h-3.5 w-3.5" />
                        Add Images (max 4)
                      </button>
                    )}
                    {images.length > 1 && (
                      <button
                        onClick={() => setShowCollage(!showCollage)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                          showCollage
                            ? "border-vault-gold bg-vault-gold/10 text-vault-warm"
                            : "border-border bg-card text-foreground hover:border-vault-gold/40"
                        )}
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                        Collage
                      </button>
                    )}
                  </div>
                </div>
              )}

              {mediaMode === "video" && (
                <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-8">
                  <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-border bg-muted">
                    <Video className="h-10 w-10 text-vault-teal/40" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Step 1: Trim & save your video | Step 2: Upload thumbnail |
                    Step 3: Crop & save
                  </p>
                  <button
                    onClick={() => setMediaMode(null)}
                    className="text-xs text-vault-teal underline"
                  >
                    Switch to images instead
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-vault-teal px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark disabled:opacity-70"
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
          onChange={() => setMediaMode("video")}
        />
      </div>
    </div>
  )
}
