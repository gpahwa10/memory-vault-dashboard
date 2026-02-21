"use client"

import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  Camera,
  Edit3,
  Eye,
  Film,
  Gift,
  HelpCircle,
  Images,
  Library,
  Lightbulb,
  PlusCircle,
  Printer,
  Sparkles,
  Video,
} from "lucide-react"
import { useAddMemory } from "../../add-memory-context"
import type { Memory as MemoryType } from "@/lib/memories"

interface SerializedMemory extends Omit<MemoryType, "date"> {
  date: string
}

const quickActions = [
  { id: "add-memory", label: "Add a new memory", icon: PlusCircle, color: "bg-vault-teal text-primary-foreground", href: null },
  { id: "preview", label: "Preview your book", icon: Eye, color: "bg-vault-gold text-accent-foreground", href: "/preview" },
  { id: "edit-vault", label: "Edit the vault", icon: Edit3, color: "bg-vault-teal text-primary-foreground", href: "/edit-vault" },
  { id: "print-book", label: "Print your book", icon: Printer, color: "bg-vault-warm text-primary-foreground", href: "/print-book" },
  { id: "give-gift", label: "Give a gift", icon: Gift, color: "bg-vault-gold text-accent-foreground", href: "/give-gift" },
]

const editBookItems = [
  { id: "gallery", label: "View Memory Vault", icon: Images, desc: "Browse all your memories", href: "/gallery" },
  { id: "questions", label: "Unanswered Questions", icon: HelpCircle, desc: "5 questions pending", href: "/questions" },
  { id: "edit-book", label: "Your Book Details", icon: BookOpen, desc: "Edit title, theme & more", href: "/edit-book" },
  { id: "all-books", label: "All Books Created", icon: Library, desc: "2 books in your vault", href: "/" },
]

export function MemoryDetailContent({ memory }: { memory: SerializedMemory }) {
  const openAddMemory = useAddMemory()
  const questions = memory.memoryQuestions ?? [
    { question: "What made this moment special?" },
    { question: "Who was there?" },
    { question: "What would you tell your future self about this day?" },
  ]
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <Link
        href="/gallery"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Memory Vault
      </Link>

      {/* Header: title left, Generate book & Make reel right */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {memory.title}
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 rounded-lg border border-vault-gold/40 bg-vault-gold/10 px-4 py-2.5 text-sm font-semibold text-vault-warm transition-colors hover:bg-vault-gold/20"
          >
            <BookOpenCheck className="h-4 w-4" />
            Generate a book
          </Link>
          <Link
            href="/make-reel"
            className="inline-flex items-center gap-2 rounded-lg border border-vault-teal/40 bg-vault-teal/10 px-4 py-2.5 text-sm font-semibold text-vault-teal transition-colors hover:bg-vault-teal/20"
          >
            <Film className="h-4 w-4" />
            Make a reel
          </Link>
        </div>
      </header>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((action) => {
            if (action.id === "add-memory") {
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => openAddMemory()}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vault-gold/40 hover:shadow-md"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.color} transition-transform duration-300 group-hover:scale-110`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-center text-sm font-medium text-card-foreground">
                    {action.label}
                  </span>
                </button>
              )
            }
            return (
              <Link
                key={action.id}
                href={action.href!}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vault-gold/40 hover:shadow-md"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.color} transition-transform duration-300 group-hover:scale-110`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-center text-sm font-medium text-card-foreground">
                  {action.label}
                </span>
              </Link>
            )
          })}
        </div>
      </section>
      {/* Progress card: inverted triangle metrics + action buttons */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-center font-serif text-xl font-semibold text-foreground">
          Memory progress
        </h2>
        {/* Inverted triangle: one top-center, two bottom left/right */}
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-2 place-items-center gap-y-4 gap-x-8 px-4">
          <div className="row-start-1 col-start-2">
            <ProgressItem
              icon={<HelpCircle className="h-8 w-8 text-vault-teal" />}
              label="Questions"
              current={questions.filter((q) => q.answer?.trim()).length}
              total={questions.length}
              strokeColor="var(--vault-teal)"
            />
          </div>
          <div className="row-start-2 col-start-1 justify-self-center">
            <ProgressItem
              icon={<Camera className="h-8 w-8 text-vault-gold" />}
              label="Photos"
              current={memory.images?.length ?? 0}
              total={100}
              suffix="max"
              strokeColor="var(--vault-gold)"
            />
          </div>
          <div className="row-start-2 col-start-3 justify-self-center">
            <ProgressItem
              icon={<Video className="h-8 w-8 text-vault-teal" />}
              label="Videos"
              current={memory.hasVideo ? 1 : 0}
              total={10}
              strokeColor="var(--vault-teal)"
            />
          </div>
        </div>
        {/* Bottom action buttons: dynamic routes for this memory */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href={`/memory-detail/${memory.id}/questions`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-vault-teal/50 bg-vault-teal/10 px-5 py-3 text-sm font-semibold text-vault-teal transition-all hover:border-vault-teal hover:bg-vault-teal/20 focus:outline-none focus:ring-2 focus:ring-vault-teal/30"
          >
            <HelpCircle className="h-4 w-4" />
            View all questions
          </Link>
          <Link
            href={`/memory-detail/${memory.id}/media`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-vault-gold/50 bg-vault-gold/10 px-5 py-3 text-sm font-semibold text-vault-warm transition-all hover:border-vault-gold hover:bg-vault-gold/20 focus:outline-none focus:ring-2 focus:ring-vault-gold/30"
          >
            <Camera className="h-4 w-4" />
            View all pictures
          </Link>
        </div>
      </section>
      {/* Memory questions – progress bars + list (same layout as questions page) */}
      {/* <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
          Memory questions
        </h2>
        
        <div className="flex flex-col gap-3">
          {questions.map((q, idx) => {
            const answered = !!q.answer?.trim()
            return (
              <div
                key={idx}
                className={`rounded-xl border p-5 transition-all ${
                  answered
                    ? "border-border bg-card"
                    : "border-vault-gold/30 bg-vault-gold/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      answered
                        ? "bg-vault-teal text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{q.question}</p>
                    {answered ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {q.answer}
                      </p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Your answer (optional):
                        </p>
                        <textarea
                          placeholder="Type your answer here..."
                          rows={3}
                          defaultValue={q.answer ?? ""}
                          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section> */}

      {/* Edit Your Book */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">
          Edit Your Book
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {editBookItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-4 text-left transition-all duration-200 hover:border-vault-gold/40 hover:shadow-sm"
            >
              <item.icon className="h-5 w-5 text-vault-teal transition-colors group-hover:text-vault-gold" />
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/help"
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-vault-teal/40"
          >
            <Lightbulb className="h-4 w-4 text-vault-gold" />
            How to create your book
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-2 rounded-lg border border-vault-gold/30 bg-vault-gold/10 px-4 py-3 text-sm font-semibold text-vault-warm transition-all hover:bg-vault-gold/20"
          >
            <Sparkles className="h-4 w-4 text-vault-gold" />
            Tips & Tricks
          </Link>
        </div>
      </section>
    </div>
  )
}

function ProgressItem({
  icon,
  label,
  current,
  total,
  suffix,
  strokeColor,
}: {
  icon: React.ReactNode
  label: string
  current: number
  total: number
  suffix?: string
  strokeColor: string
}) {
  const percentage = total > 0 ? (current / total) * 100 : 0
  const size = 88
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - percentage / 100)

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative flex h-[88px] w-[88px] items-center justify-center">
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="flex items-center justify-center">{icon}</div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-bold text-foreground">
          {current}/{total}
          {suffix && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
