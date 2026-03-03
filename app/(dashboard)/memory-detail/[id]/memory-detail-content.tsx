"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  BookOpen,
  Camera,
  Edit3,
  Eye,
  Film,
  HelpCircle,
  Pencil,
  Plus,
  PlusCircle,
  Sparkles,
  Trash2,
  TrendingUp,
  Video,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { useAddMemory } from "../../add-memory-context"
import { useAddVault } from "../../add-vault-context"
import { cn } from "@/lib/utils"
import type { Memory as MemoryType, MemoryQuestion, MemoryQuestionMedia } from "@/lib/memories"
import { Button } from "@/components/ui/button"
import { EditVaultContent } from "@/components/edit-vault-content"
import { useRouter } from "next/navigation"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

// ─────────────────────────────────────────────
// Quick Actions config
// ─────────────────────────────────────────────
const quickActions = [
  { id: "add-memory", label: "Add a new memory", icon: PlusCircle, color: "teal" as const, href: null },
  // { id: "preview",     label: "Preview your book",   icon: Eye,        color: "gold" as const, href: "/preview" },
  { id: "generate", label: "Generate your book", icon: BookOpen, color: "gold" as const, href: "/preview" },
  { id: "edit-vault", label: "Edit the vault", icon: Edit3, color: "teal" as const, href: "/edit-vault" },
  { id: "create-reel", label: "Create a reel", icon: Film, color: "teal" as const, href: "/make-reel" },
]

const actionColorMap = {
  teal: {
    icon: "bg-vault-teal/15 text-vault-teal border border-vault-teal/25",
    hover: "hover:border-vault-teal/40 hover:bg-vault-teal/5",
  },
  gold: {
    icon: "bg-vault-gold/15 text-vault-gold border border-vault-gold/25",
    hover: "hover:border-vault-gold/40 hover:bg-vault-gold/5",
  },
}

// ─────────────────────────────────────────────
// Progress metric helpers
// ─────────────────────────────────────────────
const metricColorMap = {
  teal: {
    bar: "bg-vault-teal",
    text: "text-vault-teal",
    bg: "bg-vault-teal/8",
    border: "border-vault-teal/15",
    glow: "hover:shadow-vault-teal/15",
    track: "bg-vault-teal/12",
  },
  gold: {
    bar: "bg-vault-gold",
    text: "text-vault-gold",
    bg: "bg-vault-gold/8",
    border: "border-vault-gold/15",
    glow: "hover:shadow-vault-gold/15",
    track: "bg-vault-gold/12",
  },
}

interface ProgressMetricProps {
  icon: React.ReactNode
  label: string
  current: number
  total: number
  suffix?: string
  color: "teal" | "gold"
  href?: string
}

function ProgressMetric({ icon, label, current, total, suffix, color, href }: ProgressMetricProps) {
  const pct = Math.min((current / total) * 100, 100)
  const c = metricColorMap[color]
  const displayTotal = suffix ? `${total} ${suffix}` : total

  const inner = (
    <div
      className={cn(
        "group flex flex-col gap-2.5 rounded-xl border px-4 py-3.5 transition-all duration-200 hover:shadow-md",
        c.border, c.bg, c.glow
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg border", c.bg, c.border)}>
            <span className={c.text}>{icon}</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-lg font-bold tabular-nums leading-none", c.text)}>{current}</span>
          <span className="text-xs leading-none text-muted-foreground">/ {displayTotal}</span>
        </div>
      </div>

      <div className={cn("h-1.5 w-full overflow-hidden rounded-full", c.track)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", c.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs tabular-nums text-muted-foreground">{Math.round(pct)}% complete</span>
        {href && (
          <span className={cn("text-xs font-medium opacity-70 transition-opacity group-hover:opacity-100", c.text)}>
            View all →
          </span>
        )}
      </div>
    </div>
  )

  if (href) return <Link href={href} className="block">{inner}</Link>
  return inner
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
export function MemoryDetailContent({ memory }: { memory: SerializedMemory }) {
  const openAddMemory = useAddMemory()
  const openAddVault = useAddVault()
  const [fullScreenMedia, setFullScreenMedia] = useState<MemoryQuestionMedia | null>(null)
  const router = useRouter()
  const questions: MemoryQuestion[] = memory.memoryQuestions ?? [
    { question: "What made this moment special?" },
    { question: "Who was there?" },
    { question: "What would you tell your future self about this day?" },
  ]

  const answeredCount = questions.filter((q) => q.answer?.trim()).length
  const photoCount = memory.images?.length ?? 0
  const videoCount = memory.hasVideo ? 1 : 0

  const overallPct = Math.round(
    ((answeredCount / Math.max(questions.length, 1)) * 0.5 +
      (photoCount / 100) * 0.35 +
      (videoCount / 10) * 0.15) * 100
  )

  const questionsPct = Math.min(
    (answeredCount / Math.max(questions.length, 1)) * 100,
    100
  )
  const photosPct = Math.min((photoCount / 100) * 100, 100)
  const videosPct = Math.min((videoCount / 10) * 100, 100)

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      {/* Sticky: Back link + Page title — does not scroll */}
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background pb-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Memory Vault
        </Link>

        <header className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {memory.title}
            </h1>
            <Button className="border border-1 bg-transparent text-foreground"> <Edit3 className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              onClick={() => router.push(`/memory-detail/${memory.id}/preview`)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-1.5 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate Book
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/make-reel")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-1.5 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10"
            >
              <Film className="h-3.5 w-3.5" />
              Create Reel
            </Button>
          </div>
        </header>
      </div>

      {/* ── Memory Progress ───────────────────────── */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-4 w-4 text-vault-teal" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Memory Progress
            </h2>
          </div>

          {/* Overall progress pill */}
          {/* <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-vault-teal to-vault-gold transition-all duration-700"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <span className="text-sm font-bold tabular-nums text-foreground">{overallPct}%</span>
          </div> */}
        </div>

        {/* Compact accordion metrics */}
        <Accordion type="single" collapsible className="px-4 py-3 space-y-1">
          <AccordionItem value="questions" className="border-none">
            <AccordionTrigger className="rounded-lg px-2 py-1.5 text-xs hover:no-underline hover:bg-muted">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vault-teal/10">
                    <HelpCircle className="h-3.5 w-3.5 text-vault-teal" />
                  </span>
                  <span className="font-medium text-foreground">Questions</span>
                </div>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {answeredCount}/{questions.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-2">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-vault-teal transition-all"
                    style={{ width: `${questionsPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {Math.round(questionsPct)}% of questions answered
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
{/* 
          <AccordionItem value="photos" className="border-none">
            <AccordionTrigger className="rounded-lg px-2 py-1.5 text-xs hover:no-underline hover:bg-muted">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vault-gold/10">
                    <Camera className="h-3.5 w-3.5 text-vault-gold" />
                  </span>
                  <span className="font-medium text-foreground">Photos</span>
                </div>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {photoCount}/100 max
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-2">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-vault-gold transition-all"
                    style={{ width: `${photosPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {photoCount} of 100 photos used
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="videos" className="border-none">
            <AccordionTrigger className="rounded-lg px-2 py-1.5 text-xs hover:no-underline hover:bg-muted">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vault-teal/10">
                    <Video className="h-3.5 w-3.5 text-vault-teal" />
                  </span>
                  <span className="font-medium text-foreground">Videos</span>
                </div>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {videoCount}/10
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-2">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-vault-teal transition-all"
                    style={{ width: `${videosPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {videoCount} of 10 videos added
                </p>
              </div>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </section>

      {/* ── Questions Answered ────────────────────── */}
      <QuestionsAnsweredSection
        questions={questions}
        setFullScreenMedia={setFullScreenMedia}
      />

      <EditVaultContent />

      {/* ── Full-screen media viewer ──────────────── */}
      <Dialog open={!!fullScreenMedia} onOpenChange={(open) => !open && setFullScreenMedia(null)}>
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
                    <p className="text-sm text-muted-foreground">Video: {fullScreenMedia.name ?? "Video"}</p>
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

// ─────────────────────────────────────────────
// Questions Answered Section
// ─────────────────────────────────────────────
function QuestionsAnsweredSection({
  questions,
  setFullScreenMedia,
}: {
  questions: MemoryQuestion[]
  setFullScreenMedia: (m: MemoryQuestionMedia | null) => void
}) {
  const [localQuestions, setLocalQuestions] = useState<MemoryQuestion[]>(questions)
  const [selectedQuestion, setSelectedQuestion] = useState<{
    index: number
    question: MemoryQuestion
  } | null>(null)

  const handleEnhanceText = (index: number) => {
    const current = localQuestions[index]
    const raw = current?.answer?.trim()
    if (!current || !raw) return

    const base = raw.charAt(0).toUpperCase() + raw.slice(1).replace(/\s+/g, " ")
    const enhanced = /[.!?]$/.test(base) ? base : `${base}.`

    const updated = [...localQuestions]
    updated[index] = { ...current, answer: enhanced }
    setLocalQuestions(updated)

    if (selectedQuestion && selectedQuestion.index === index) {
      setSelectedQuestion({ index, question: updated[index] })
    }
  }

  const handleDeleteMedia = (questionIndex: number, mediaId: string) => {
    const current = localQuestions[questionIndex]
    if (!current || !current.media) return

    const updated = [...localQuestions]
    updated[questionIndex] = {
      ...current,
      media: current.media.filter((m) => m.id !== mediaId),
    }
    setLocalQuestions(updated)

    if (selectedQuestion && selectedQuestion.index === questionIndex) {
      setSelectedQuestion({ index: questionIndex, question: updated[questionIndex] })
    }
  }

  const handleEditMedia = (questionIndex: number, mediaId: string) => {
    const current = localQuestions[questionIndex]
    if (!current || !current.media) return
    const media = current.media.find((m) => m.id === mediaId)
    if (!media) return

    // Simple inline rename using prompt for now
    // (could be replaced with a nicer UI later)
    // eslint-disable-next-line no-alert
    const nextName = window.prompt("Edit media caption", media.name ?? "") ?? undefined
    if (nextName === undefined) return

    const updated = [...localQuestions]
    updated[questionIndex] = {
      ...current,
      media: current.media.map((m) =>
        m.id === mediaId ? { ...m, name: nextName || undefined } : m
      ),
    }
    setLocalQuestions(updated)

    if (selectedQuestion && selectedQuestion.index === questionIndex) {
      setSelectedQuestion({ index: questionIndex, question: updated[questionIndex] })
    }
  }

  const handleSaveQuestion = (index: number) => {
    // Placeholder for future persistence hook/API; for now just close modal.
    const current = localQuestions[index]
    if (selectedQuestion && selectedQuestion.index === index && current) {
      setSelectedQuestion({ index, question: current })
    }
    setSelectedQuestion(null)
  }

  if (questions.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">Questions answered</h2>
        <p className="text-sm text-muted-foreground">No questions for this memory yet.</p>
      </section>
    )
  }
}