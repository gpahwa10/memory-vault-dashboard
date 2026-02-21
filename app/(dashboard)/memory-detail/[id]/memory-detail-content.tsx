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
  PlusCircle,
  TrendingUp,
  Video,
  X,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAddMemory } from "../../add-memory-context"
import { useAddVault } from "../../add-vault-context"
import { cn } from "@/lib/utils"
import type { Memory as MemoryType, MemoryQuestion, MemoryQuestionMedia } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

// ─────────────────────────────────────────────
// Quick Actions config
// ─────────────────────────────────────────────
const quickActions = [
  { id: "add-memory",  label: "Add a new memory",    icon: PlusCircle, color: "teal" as const, href: null },
  // { id: "preview",     label: "Preview your book",   icon: Eye,        color: "gold" as const, href: "/preview" },
  { id: "generate",    label: "Generate your book",  icon: BookOpen,   color: "gold" as const, href: "/preview" },
  { id: "edit-vault",  label: "Edit the vault",      icon: Edit3,      color: "teal" as const, href: "/edit-vault" },
  { id: "create-reel", label: "Create a reel",       icon: Film,       color: "teal" as const, href: "/make-reel" },
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
    bar:    "bg-vault-teal",
    text:   "text-vault-teal",
    bg:     "bg-vault-teal/8",
    border: "border-vault-teal/15",
    glow:   "hover:shadow-vault-teal/15",
    track:  "bg-vault-teal/12",
  },
  gold: {
    bar:    "bg-vault-gold",
    text:   "text-vault-gold",
    bg:     "bg-vault-gold/8",
    border: "border-vault-gold/15",
    glow:   "hover:shadow-vault-gold/15",
    track:  "bg-vault-gold/12",
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
  const openAddVault  = useAddVault()
  const [fullScreenMedia, setFullScreenMedia] = useState<MemoryQuestionMedia | null>(null)

  const questions: MemoryQuestion[] = memory.memoryQuestions ?? [
    { question: "What made this moment special?" },
    { question: "Who was there?" },
    { question: "What would you tell your future self about this day?" },
  ]

  const answeredCount = questions.filter((q) => q.answer?.trim()).length
  const photoCount    = memory.images?.length ?? 0
  const videoCount    = memory.hasVideo ? 1 : 0

  const overallPct = Math.round(
    ((answeredCount / Math.max(questions.length, 1)) * 0.5 +
      (photoCount / 100) * 0.35 +
      (videoCount / 10) * 0.15) * 100
  )

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      {/* Back link */}
      <Link
        href="/gallery"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Memory Vault
      </Link>

      {/* Page title */}
      <header>
        <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {memory.title}
        </h1>
      </header>

      {/* ── Quick Actions ─────────────────────────── */}
      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((action) => {
            const colors = actionColorMap[action.color]

            const content = (
              <>
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110", colors.icon)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-center text-[13px] font-medium text-foreground/80">
                  {action.label}
                </span>
              </>
            )

            const baseClass = cn(
              "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-5",
              "shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              colors.hover
            )

            if (action.id === "add-memory") {
              return (
                <button key={action.id} type="button" onClick={() => openAddMemory()} className={baseClass}>
                  {content}
                </button>
              )
            }
            if (action.id === "add-vault") {
              return (
                <button key={action.id} type="button" onClick={() => openAddVault()} className={baseClass}>
                  {content}
                </button>
              )
            }
            return (
              <Link key={action.id} href={action.href!} className={baseClass}>
                {content}
              </Link>
            )
          })}
        </div>
      </section>

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
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-vault-teal to-vault-gold transition-all duration-700"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <span className="text-sm font-bold tabular-nums text-foreground">{overallPct}%</span>
          </div>
        </div>

        {/* Metric rows */}
        <div className="flex flex-col gap-2.5 p-4">
          <ProgressMetric
            icon={<HelpCircle className="h-3.5 w-3.5" />}
            label="Questions"
            current={answeredCount}
            total={questions.length}
            color="teal"
            // href={`/memory-detail/${memory.id}/questions`}
          />
          <ProgressMetric
            icon={<Camera className="h-3.5 w-3.5" />}
            label="Photos"
            current={photoCount}
            total={100}
            suffix="max"
            color="gold"
            // href={`/memory-detail/${memory.id}/media`}
          />
          <ProgressMetric
            icon={<Video className="h-3.5 w-3.5" />}
            label="Videos"
            current={videoCount}
            total={10}
            color="teal"
          />
        </div>
      </section>

      {/* ── Questions Answered ────────────────────── */}
      <QuestionsAnsweredSection
        questions={questions}
        setFullScreenMedia={setFullScreenMedia}
      />

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
  if (questions.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">Questions answered</h2>
        <p className="text-sm text-muted-foreground">No questions for this memory yet.</p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">Questions answered</h2>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((q, idx) => {
          const answered = !!q.answer?.trim()
          return (
            <AccordionItem
              key={idx}
              value={`q-${idx}`}
              className={cn(
                "mb-2 rounded-lg border border-border px-4 last:mb-0 transition-colors",
                answered ? "bg-card" : "bg-muted/30"
              )}
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      answered
                        ? "bg-vault-teal text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-medium text-foreground">{q.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {answered ? (
                  <>
                    <p className="text-sm leading-relaxed text-muted-foreground">{q.answer}</p>
                    {q.media && q.media.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Media attached</p>
                        <div className="flex flex-wrap gap-2">
                          {q.media.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setFullScreenMedia(item) }}
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
                  <p className="text-xs text-muted-foreground">Not answered</p>
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}