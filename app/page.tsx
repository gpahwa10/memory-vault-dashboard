"use client"

import { useState } from "react"
import { AppSidebar, MobileMenuButton } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { AddMemoryModal } from "@/components/add-memory-modal"
import { MemoryGallery } from "@/components/memory-gallery"
import { BookPreview } from "@/components/book-preview"
import { EventsCalendar } from "@/components/events-calendar"
import { GiveGiftScreen } from "@/components/give-gift-screen"
import { MakeReelScreen } from "@/components/make-reel-screen"
import { PrintBookScreen } from "@/components/print-book-screen"
import { SettingsScreen } from "@/components/settings-screen"
import { HelpScreen } from "@/components/help-screen"
import { ReviewScreen } from "@/components/review-screen"

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [memoryModalOpen, setMemoryModalOpen] = useState(false)

  const handleNavigate = (item: string) => {
    if (item === "add-memory") {
      setMemoryModalOpen(true)
      return
    }
    setActiveItem(item)
    setMobileOpen(false)
  }

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardContent onNavigate={handleNavigate} />
      case "gallery":
        return <MemoryGallery />
      case "preview":
        return <BookPreview />
      case "calendar":
        return <EventsCalendar onAddMemory={() => setMemoryModalOpen(true)} />
      case "media":
        return <MediaSection />
      case "questions":
        return <QuestionsSection />
      case "edit-book":
        return <EditBookSection />
      case "give-gift":
        return <GiveGiftScreen />
      case "make-reel":
        return <MakeReelScreen />
      case "print-book":
        return <PrintBookScreen />
      case "settings":
        return <SettingsScreen />
      case "help":
        return <HelpScreen />
      case "review":
        return <ReviewScreen />
      default:
        return <DashboardContent onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="paper-texture flex h-screen overflow-hidden">
      <AppSidebar
        activeItem={activeItem}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen(false)}
      />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <MobileMenuButton onClick={() => setMobileOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
            {renderContent()}
          </div>
        </div>
      </main>

      <AddMemoryModal
        open={memoryModalOpen}
        onClose={() => setMemoryModalOpen(false)}
      />
    </div>
  )
}

// Placeholder sections for remaining pages
function MediaSection() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Photos & Videos
        </h1>
        <p className="mt-1 text-muted-foreground">
          All your uploaded media in one place
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <img
              src={`/samples/memory-${i}.jpg`}
              alt={`Memory ${i}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-vault-gold/40 bg-vault-gold/5 p-8 text-center">
        <p className="text-sm italic text-muted-foreground">
          Also showing low quality media for review
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            2 low quality photos detected
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionsSection() {
  const questions = [
    {
      id: "1",
      question: "What was the first word your baby said?",
      answered: true,
      answer: "She said 'Dada' for the first time at 8 months!",
      sampleAnswer: "She said 'Dada' for the first time at 8 months!",
    },
    {
      id: "2",
      question: "Describe your baby's favourite toy.",
      answered: true,
      answer: "A soft brown teddy bear named Mr. Snuggles.",
      sampleAnswer: "A soft brown teddy bear named Mr. Snuggles.",
    },
    {
      id: "3",
      question: "What is your favourite memory from the first month?",
      answered: false,
      answer: "",
      sampleAnswer: "Holding her for the first time and watching her fall asleep on my chest. The quiet hospital room at 3 a.m. felt like the whole world.",
    },
    {
      id: "4",
      question: "How did you choose your baby's name?",
      answered: true,
      answer: "We named her after her great-grandmother.",
      sampleAnswer: "We named her after her great-grandmother.",
    },
    {
      id: "5",
      question: "What song does your baby love?",
      answered: false,
      answer: "",
      sampleAnswer: "Twinkle, Twinkle, Little Star—she always calms down when we sing it at bedtime.",
    },
    {
      id: "6",
      question: "Describe a funny moment with your baby.",
      answered: true,
      answer: "She tried to eat her own foot during bath time!",
      sampleAnswer: "She tried to eat her own foot during bath time!",
    },
    {
      id: "7",
      question: "What is your baby's favourite food?",
      answered: true,
      answer: "Mashed bananas, without a doubt.",
      sampleAnswer: "Mashed bananas, without a doubt.",
    },
    {
      id: "8",
      question: "How does your baby react when they see themselves in a mirror?",
      answered: false,
      answer: "",
      sampleAnswer: "She smiles and babbles at her reflection, sometimes leaning in to kiss the baby in the mirror.",
    },
    {
      id: "9",
      question: "What is the most surprising thing your baby has done?",
      answered: false,
      answer: "",
      sampleAnswer: "She waved bye-bye on her own at 9 months when grandma left—we had never taught her that.",
    },
    {
      id: "10",
      question: "Describe your baby's bedtime routine.",
      answered: false,
      answer: "",
      sampleAnswer: "Bath, then a bottle, then we read one short book and sing a lullaby. She usually falls asleep with her hand on my cheek.",
    },
  ]

  const answered = questions.filter((q) => q.answered).length
  const total = questions.length

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          All Questions
        </h1>
        <p className="mt-1 text-muted-foreground">
          {answered} of {total} questions answered
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-vault-teal transition-all duration-700"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {total - answered} questions remaining
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
              <div className="flex-1">
                <p className="font-medium text-foreground">{q.question}</p>
                {q.answered ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {q.answer}
                  </p>
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
    </div>
  )
}

function EditBookSection() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Edit Book Details
        </h1>
        <p className="mt-1 text-muted-foreground">
          Customize your memory book
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Book info */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Book Information
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Book Title
              </label>
              <input
                type="text"
                defaultValue="Our Baby Book"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Subtitle
              </label>
              <input
                type="text"
                defaultValue="A Collection of Precious Memories"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <select className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20">
                <option>Baby</option>
                <option>Wedding</option>
                <option>Travel</option>
                <option>Family</option>
              </select>
            </div>
            <button className="mt-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark">
              Save Changes
            </button>
          </div>
        </div>

        {/* Theme selection */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Book Theme
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Classic Cream", bg: "bg-[#faf6ef]", border: "border-vault-gold" },
              { name: "Soft Teal", bg: "bg-vault-teal/10", border: "border-vault-teal" },
              { name: "Warm Gold", bg: "bg-vault-gold/10", border: "border-vault-gold" },
              { name: "Rose", bg: "bg-pink-50", border: "border-pink-300" },
              { name: "Sky Blue", bg: "bg-blue-50", border: "border-blue-300" },
              { name: "Sage", bg: "bg-emerald-50", border: "border-emerald-300" },
            ].map((theme) => (
              <button
                key={theme.name}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  theme.name === "Classic Cream"
                    ? theme.border + " shadow-sm"
                    : "border-border"
                }`}
              >
                <div
                  className={`h-12 w-full rounded-md ${theme.bg} border border-border`}
                />
                <span className="text-xs font-medium text-foreground">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
