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
import type { MemoryQuestion, MemoryQuestionMedia } from "@/lib/memories"
import { Button } from "@/components/ui/button"
import { EditVaultContent } from "@/components/edit-vault-content"
import { useRouter } from "next/navigation"
import type { MemoryBookDetail } from "../memory-detail-service"

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
// const metricColorMap = {
//   teal: {
//     bar: "bg-vault-teal",
//     text: "text-vault-teal",
//     bg: "bg-vault-teal/8",
//     border: "border-vault-teal/15",
//     glow: "hover:shadow-vault-teal/15",
//     track: "bg-vault-teal/12",
//   },
//   gold: {
//     bar: "bg-vault-gold",
//     text: "text-vault-gold",
//     bg: "bg-vault-gold/8",
//     border: "border-vault-gold/15",
//     glow: "hover:shadow-vault-gold/15",
//     track: "bg-vault-gold/12",
//   },
// }

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
export function MemoryDetailContent({ memory }: { memory: MemoryBookDetail }) {
  const openAddMemory = useAddMemory()
  const openAddVault = useAddVault()
  const [fullScreenMedia, setFullScreenMedia] = useState<MemoryQuestionMedia | null>(null)
  const router = useRouter()
  const questions: MemoryQuestion[] = memory.questions.map((q) => ({
    question: q.questionText,
    answer: memory.metadata[q.key] ?? "",
  }))

  const metadataEntries = Object.entries(memory.metadata)

  const answeredCount = questions.filter((q) => q.answer?.trim()).length
  const photoCount = memory.bookType.coverImage ? 1 : 0
  const videoCount = 0

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
    <div className="animate-fade-in-up flex min-w-0 flex-col gap-6 pb-8">
      {/* Sticky: Back link + Page title — does not scroll */}
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background/95 pb-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
        <Link
          href="/app"
          className="inline-flex w-fit min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate sm:whitespace-normal">Back to Memory Vault</span>
        </Link>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex min-w-0 items-start gap-2">
            <h1 className="min-w-0 flex-1 break-words font-serif text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              {memory.bookName}
            </h1>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="shrink-0 border bg-transparent"
              aria-label="Edit book"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
            <Button
              type="button"
              onClick={() => router.push(`/memory-detail/${memory.id}/preview`)}
              className="inline-flex w-full min-w-0 items-center justify-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-2 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10 sm:w-auto sm:min-w-[9rem]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Generate Book</span>
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/make-reel")}
              className="inline-flex w-full min-w-0 items-center justify-center gap-1.5 rounded-lg border border-dashed border-vault-gold/40 bg-vault-gold/5 px-3 py-2 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/10 sm:w-auto sm:min-w-[9rem]"
            >
              <Film className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Create Reel</span>
            </Button>
          </div>
        </header>
      </div>

      {/* ── Memory Progress ───────────────────────── */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Header row */}
        <div className="border-b border-border px-4 py-4 sm:px-5">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <TrendingUp className="h-4 w-4 shrink-0 text-vault-teal" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Memory Progress
            </h2>
          </div>
          <div className="w-full min-w-0 max-w-full space-y-1.5 sm:max-w-md">
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
        </div>

        <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-5">
          {metadataEntries.map(([key, value]) => (
            <div key={key} className="rounded-lg border border-border/70 bg-background/40 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {key.replace(/_/g, " ")}
              </p>
              <p className="mt-1 min-w-0 break-words text-sm font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Questions Answered ────────────────────── */}
      <QuestionsAnsweredSection
        questions={questions}
        setFullScreenMedia={setFullScreenMedia}
      />

      <EditVaultContent bookId={memory.id} />

      {/* ── Full-screen media viewer ──────────────── */}
      <Dialog open={!!fullScreenMedia} onOpenChange={(open) => !open && setFullScreenMedia(null)}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] w-screen max-w-none flex-col border-0 bg-black/95 p-0 sm:h-screen"
        >
          <DialogTitle className="sr-only">View media full screen</DialogTitle>
          {fullScreenMedia && (
            <>
              {fullScreenMedia.type === "image" ? (
                <div className="relative min-h-0 w-full flex-1 touch-pan-y">
                  <Image
                    src={fullScreenMedia.url}
                    alt={fullScreenMedia.name ?? "Full size"}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    unoptimized={fullScreenMedia.url.startsWith("#")}
                    priority
                  />
                </div>
              ) : (
                <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
                  <div className="flex max-h-full max-w-full min-w-0 flex-col items-center gap-2 rounded-lg bg-muted/20 p-4 text-center">
                    <Video className="h-12 w-12 shrink-0 text-vault-teal/80 sm:h-16 sm:w-16" />
                    <p className="max-w-[90vw] break-words text-sm text-muted-foreground">
                      Video: {fullScreenMedia.name ?? "Video"}
                    </p>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setFullScreenMedia(null)}
                className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:p-2"
                aria-label="Close"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
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