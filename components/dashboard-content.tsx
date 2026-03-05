"use client"

import {
  PlusCircle,
  Eye,
  Film,
  Printer,
  Gift,
  Images,
  HelpCircle,
  BookOpen,
  Library,
  Lightbulb,
  ArrowRight,
  Camera,
  Video,
  AlertTriangle,
  Crown, Search,
  Sparkles,
  Grid3X3,
  List,
  Calendar,
  Heart,
  MoreHorizontal,
  Edit3,
  Trash2,
  ImageIcon,
  Plus,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
interface DashboardContentProps {
  onNavigate: (item: string) => void
  userName?: string
}

const quickActions = [
  {
    id: "add-memory",
    label: "Add a new memory",
    icon: PlusCircle,
    color: "bg-vault-teal text-primary-foreground",
  },
  {
    id: "preview",
    label: "Preview your book",
    icon: Eye,
    color: "bg-vault-gold text-accent-foreground",
  },
  {
    id: "make-reel",
    label: "Make a reel",
    icon: Film,
    color: "bg-vault-teal text-primary-foreground",
  },
  {
    id: "print-book",
    label: "Print your book",
    icon: Printer,
    color: "bg-vault-warm text-primary-foreground",
  },
  {
    id: "give-gift",
    label: "Give a gift",
    icon: Gift,
    color: "bg-vault-gold text-accent-foreground",
  },
]

const editBookItems = [
  {
    id: "gallery",
    label: "View Memory Vault",
    icon: Images,
    desc: "Browse all your memories",
  },
  {
    id: "questions",
    label: "Unanswered Questions",
    icon: HelpCircle,
    desc: "5 questions pending",
  },
  {
    id: "edit-book",
    label: "Your Book Details",
    icon: BookOpen,
    desc: "Edit title, theme & more",
  },
  {
    id: "all-books",
    label: "All Books Created",
    icon: Library,
    desc: "2 books in your vault",
  },
]

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
    hasVideo: false,
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

type ViewMode = "grid" | "list"

export function DashboardContent({ onNavigate, userName = "John" }: DashboardContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [memories] = useState(sampleMemories)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "title-az">("newest")
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  const router = useRouter();
  const categories = ["all", "Milestone", "Celebration", "Family", "Daily"]

  const filtered = memories.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || m.category === selectedCategory

    const time = m.date.getTime()
    const fromOk = fromDate ? time >= new Date(fromDate).getTime() : true
    const toOk = toDate ? time <= new Date(toDate).getTime() : true

    return matchesSearch && matchesCategory && fromOk && toOk
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "title-az") {
      return a.title.localeCompare(b.title)
    }
    if (sortOption === "newest") {
      return b.date.getTime() - a.date.getTime()
    }
    // oldest
    return a.date.getTime() - b.date.getTime()
  })

  return (
    <div className="animate-fade-in-up flex flex-col gap-8 pb-8">
      {/* Welcome */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Welcome back, <span className="text-vault-teal">{userName}!</span>
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          Start creating your memories!
        </p>
      </div>


      <div
          className="group flex flex-col justify-center items-center w-full
  bg-gradient-to-b from-vault-teal/10 to-vault-gold/5
    py-6 px-4
  border-2 border-dashed border-vault-teal/40
  rounded-2xl
  cursor-pointer
  transition-all duration-300
  hover:border-vault-teal
  hover:bg-vault-gold/10
  hover:scale-[1.01]"
          onClick={() => onNavigate("add-vault")}
        >

          <div className="flex items-center justify-center h-12 w-12 rounded-full
    bg-white/80 backdrop-blur-sm shadow-sm
    group-hover:scale-110 transition-transform duration-300">
            <PlusCircle className="h-6 w-6 text-vault-gold" />
          </div>

          <span className="mt-3 text-sm font-semibold text-foreground tracking-wide">
            Create Memory Book
          </span>

          <span className="text-xs text-muted-foreground mt-1">
            Capture moments that matter
          </span>
        </div>

      <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">Your Memory Books</h1>
          <Button
            className="border border-1 bg-transparent text-foreground hover:bg-vault-gold"
            onClick={() => onNavigate("add-vault")}
          >
            <Plus className="h-4 w-4" /> Create Memory Book
          </Button>
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

          {/* Date filter */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground focus:border-vault-teal focus:outline-none focus:ring-1 focus:ring-vault-teal/30"
              />
            </div>
            <div className="flex items-center gap-1">
              <span>To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground focus:border-vault-teal focus:outline-none focus:ring-1 focus:ring-vault-teal/30"
              />
            </div>
          </div>

          {/* Sort + view toggles */}
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1">
              <span className="text-[11px] text-muted-foreground">Sort</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
                className="h-7 rounded-md bg-transparent text-[11px] font-medium text-foreground focus:outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title-az">Title A–Z</option>
              </select>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {[
              { mode: "grid" as ViewMode, icon: Grid3X3 },
              { mode: "list" as ViewMode, icon: List },
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
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((memory) => (
              <div
                key={memory.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/memory-detail/${memory.id}`)}
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
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/memory-detail/${memory.id}`)
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
                    </button> */}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                    <ProgressMini
                      icon={<HelpCircle className="h-3.5 w-3.5 text-vault-teal" />}
                      current={5}
                      total={10}
                      strokeColor="var(--vault-teal)"
                    />
                    <ProgressMini
                      icon={<Camera className="h-3.5 w-3.5 text-vault-gold" />}
                      current={60}
                      total={100}
                      strokeColor="var(--vault-gold)"
                    />
                    <ProgressMini
                      icon={<Video className="h-3.5 w-3.5 text-vault-teal" />}
                      current={3}
                      total={10}
                      strokeColor="var(--vault-teal)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="stagger-children flex flex-col gap-3">
            {sorted.map((memory) => (
              <div
                key={memory.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/memory-detail/${memory.id}`)}
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
                <div className="flex min-w-0 flex-1 flex-col gap-2">
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
                  <div className="flex items-center gap-3">
                    <ProgressMini
                      icon={<HelpCircle className="h-3.5 w-3.5 text-vault-teal" />}
                      current={5}
                      total={10}
                      strokeColor="var(--vault-teal)"
                    />
                    <ProgressMini
                      icon={<Camera className="h-3.5 w-3.5 text-vault-gold" />}
                      current={60}
                      total={100}
                      strokeColor="var(--vault-gold)"
                    />
                    <ProgressMini
                      icon={<Video className="h-3.5 w-3.5 text-vault-teal" />}
                      current={3}
                      total={10}
                      strokeColor="var(--vault-teal)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}



      </div>
      {/* Your Subscription - full width */}
      {/* <section className="w-full rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
          Your Subscription
        </h2>
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex flex-1 flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Segment</span>
              <span className="font-medium text-foreground">Baby</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Membership</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-vault-gold/15 px-2.5 py-0.5 font-semibold text-vault-warm">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Active since</span>
              <span className="font-medium text-foreground">Jan 2026</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Valid until</span>
              <span className="font-medium text-foreground">Jan 2027</span>
            </div>
          </div>

        </div>
        <button className="shrink-0 rounded-lg bg-vault-teal px-5 py-2.5 mt-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark" onClick={() => router.push("/settings?tab=subscription")}>
          Extend Membership
        </button>
      </section> */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Crown className="h-4 w-4 text-vault-gold" />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Subscription
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-vault-gold/30 bg-vault-gold/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-vault-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-vault-gold animate-pulse" />
            Premium
          </span>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-px border-b border-border bg-border">
          {[
            { label: "Segment", value: "Baby" },
            { label: "Active since", value: "Jan 2026" },
            { label: "Valid until", value: "Jan 2027" },
            { label: "Status", value: "Active" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 bg-card px-5 py-3.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </span>
              <span className="text-sm font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>

        {/* Footer action */}
        <div className="flex items-center justify-between border-t border-border bg-card px-5 py-3.5">
          <p className="text-[11px] tabular-nums text-muted-foreground">
            Renews · <span className="text-foreground">Jan 2027</span>
          </p>
          <button
            onClick={() => router.push("/settings?tab=subscription")}
            className="rounded-lg border border-vault-teal/30 bg-vault-teal/10 px-4 py-1.5 text-[12px] font-semibold text-vault-teal transition-all hover:bg-vault-teal/20 hover:border-vault-teal/50"
          >
            Extend →
          </button>
        </div>
      </section>
    </div>
  )
}


function ProgressMini({
  icon,
  current,
  total,
  strokeColor,
}: {
  icon: React.ReactNode
  current: number
  total: number
  strokeColor: string
}) {
  const percentage = total > 0 ? (current / total) * 100 : 0
  const size = 36
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - percentage / 100)

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
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
        <div className="flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </div>
      </div>
      <span className="text-[10px] font-semibold text-foreground tabular-nums">
        {current}/{total}
      </span>
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
  const percentage = (current / total) * 100
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
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
          />
          {/* Progress */}
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