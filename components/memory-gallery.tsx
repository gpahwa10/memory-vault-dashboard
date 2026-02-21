"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import {
  Search,
  Grid3X3,
  List,
  Calendar,
  Heart,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  ImageIcon,
  Video,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface Memory {
  id: string
  title: string
  date: Date
  description: string
  images: string[]
  hasVideo: boolean
  liked: boolean
  category: string
}

const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "First Steps",
    date: new Date(2026, 0, 15),
    description:
      "She took her very first steps today! Three wobbly steps towards daddy, and we all cheered with tears of joy.",
    images: ["/samples/memory-1.jpg"],
    hasVideo: false,
    liked: true,
    category: "Milestone",
  },
  {
    id: "2",
    title: "First Birthday",
    date: new Date(2026, 0, 28),
    description:
      "The most magical day - her first birthday celebration with all the family gathered around.",
    images: ["/samples/memory-2.jpg"],
    hasVideo: true,
    liked: true,
    category: "Celebration",
  },
  {
    id: "3",
    title: "Sunday at the Park",
    date: new Date(2026, 1, 2),
    description:
      "A perfect sunny afternoon at the park. She loved running on the grass and chasing the butterflies.",
    images: ["/samples/memory-3.jpg"],
    hasVideo: false,
    liked: false,
    category: "Daily",
  },
  {
    id: "4",
    title: "Peaceful Nap Time",
    date: new Date(2026, 1, 5),
    description:
      "Found her sleeping so peacefully with her favourite teddy bear. These quiet moments are precious.",
    images: ["/samples/memory-4.jpg"],
    hasVideo: false,
    liked: true,
    category: "Daily",
  },
  {
    id: "5",
    title: "Grandma's Love",
    date: new Date(2026, 1, 10),
    description:
      "The bond between grandma and her granddaughter is truly special. Three generations of love.",
    images: ["/samples/memory-5.jpg"],
    hasVideo: false,
    liked: true,
    category: "Family",
  },
  {
    id: "6",
    title: "Building Blocks",
    date: new Date(2026, 1, 14),
    description:
      "She's becoming such a little architect! Built her tallest tower yet and was so proud of herself.",
    images: ["/samples/memory-6.jpg"],
    hasVideo: false,
    liked: false,
    category: "Daily",
  },
]

type ViewMode = "grid" | "list" | "timeline"

function MemoryDetailView({
  memory,
  onBack,
  onLike,
  onCloseMenu,
}: {
  memory: Memory
  onBack: () => void
  onLike: () => void
  onCloseMenu: () => void
}) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <button
        onClick={onBack}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Memory Vault
      </button>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={memory.images[0]}
            alt={memory.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
            <span className="inline-block rounded-full bg-vault-gold/90 px-3 py-1 text-xs font-semibold uppercase text-accent-foreground">
              {memory.category}
            </span>
            <div className="flex items-center gap-2">
              {memory.hasVideo && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-vault-teal">
                  <Video className="h-4 w-4" />
                </span>
              )}
              {memory.images.length > 1 && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-vault-warm">
                  <ImageIcon className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                {memory.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {format(memory.date, "MMMM d, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onLike}
                className="inline-flex items-center gap-2 rounded-lg bg-vault-teal/10 px-4 py-2 text-sm font-medium text-vault-teal transition-colors hover:bg-vault-teal/20"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    memory.liked
                      ? "fill-destructive text-destructive"
                      : "text-vault-teal"
                  )}
                />
                {memory.liked ? "Liked" : "Like"}
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-vault-gold/10 px-4 py-2 text-sm font-medium text-vault-warm transition-colors hover:bg-vault-gold/20">
                <Edit3 className="h-4 w-4" />
                Edit
              </button>
              <div className="relative">
                <button
                  onClick={() => {
                    setOpenMenu(!openMenu)
                    onCloseMenu()
                  }}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {openMenu && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-border bg-popover p-1 shadow-lg">
                    <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {memory.description}
          </p>
          {memory.images.length > 1 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {memory.images.slice(1, 4).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-lg border border-border"
                >
                  <Image
                    src={img}
                    alt={`${memory.title} ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function MemoryGallery() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [memories, setMemories] = useState(sampleMemories)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null)

  const categories = ["all", "Milestone", "Celebration", "Family", "Daily"]

  const filtered = memories.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || m.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleLike = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
    )
  }

  const selectedMemory = selectedMemoryId
    ? memories.find((m) => m.id === selectedMemoryId)
    : null

  // Memory detail view (same layout as dashboard main area)
  if (selectedMemory) {
    return (
      <MemoryDetailView
        memory={selectedMemory}
        onBack={() => setSelectedMemoryId(null)}
        onLike={() => toggleLike(selectedMemory.id)}
        onCloseMenu={() => setOpenMenu(null)}
      />
    )
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Memory Vault
        </h1>
        <p className="mt-1 text-muted-foreground">
          {memories.length} memories stored in your vault
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all",
                selectedCategory === cat
                  ? "bg-vault-teal text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:border-vault-gold/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {[
            { mode: "grid" as ViewMode, icon: Grid3X3 },
            { mode: "list" as ViewMode, icon: List },
            { mode: "timeline" as ViewMode, icon: Calendar },
          ].map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === mode
                  ? "bg-vault-teal text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={`${mode} view`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((memory) => (
            <div
              key={memory.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedMemoryId(memory.id)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedMemoryId(memory.id)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={memory.images[0]}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-vault-gold/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-accent-foreground">
                      {memory.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {memory.hasVideo && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-vault-teal">
                        <Video className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {memory.images.length > 1 && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-vault-warm">
                        <ImageIcon className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {memory.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {format(memory.date, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(memory.id)
                    }}
                    className="shrink-0 p-1"
                    aria-label={memory.liked ? "Unlike" : "Like"}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        memory.liked
                          ? "fill-destructive text-destructive"
                          : "text-muted-foreground hover:text-destructive"
                      )}
                    />
                  </button>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {memory.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMemoryId(memory.id)
                    }}
                    className="inline-flex items-center gap-1 rounded-md bg-vault-teal/10 px-2.5 py-1 text-xs font-medium text-vault-teal transition-colors hover:bg-vault-teal/20"
                  >
                    <Eye className="h-3 w-3" />
                    View
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-md bg-vault-gold/10 px-2.5 py-1 text-xs font-medium text-vault-warm transition-colors hover:bg-vault-gold/20"
                  >
                    <Edit3 className="h-3 w-3" />
                    Edit
                  </button>
                  <div className="relative ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenMenu(openMenu === memory.id ? null : memory.id)
                      }}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenu === memory.id && (
                      <div className="absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border border-border bg-popover p-1 shadow-lg">
                        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="stagger-children flex flex-col gap-3">
          {filtered.map((memory) => (
            <div
              key={memory.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedMemoryId(memory.id)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedMemoryId(memory.id)}
              className="flex cursor-pointer gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={memory.images[0]}
                  alt={memory.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-serif text-base font-semibold text-foreground">
                    {memory.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-vault-gold/15 px-2 py-0.5 text-[10px] font-semibold text-vault-warm">
                    {memory.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(memory.date, "MMMM d, yyyy")}
                </p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {memory.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(memory.id)
                  }}
                  aria-label={memory.liked ? "Unlike" : "Like"}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-colors",
                      memory.liked
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="relative ml-4 border-l-2 border-vault-gold/30 pl-8">
          {filtered.map((memory, idx) => (
            <div key={memory.id} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-vault-gold bg-card">
                <div className="h-2 w-2 rounded-full bg-vault-gold" />
              </div>
              <p className="mb-2 text-xs font-semibold text-vault-teal">
                {format(memory.date, "MMMM d, yyyy")}
              </p>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedMemoryId(memory.id)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedMemoryId(memory.id)}
                className="cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Image
                    src={memory.images[0]}
                    alt={memory.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {memory.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
