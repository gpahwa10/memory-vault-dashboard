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
  Crown,
  Sparkles,
} from "lucide-react"

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
    label: "View Memory Gallery",
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

export function DashboardContent({ onNavigate, userName = "John" }: DashboardContentProps) {
  return (
    <div className="animate-fade-in-up flex flex-col gap-8 pb-8">
      {/* Welcome */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Welcome back, <span className="text-vault-teal">{userName}!</span>
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          Start vaulting your memories!
        </p>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="stagger-children grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vault-gold/40 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${action.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-center text-sm font-medium text-card-foreground">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Book Progress & Edit Your Book */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Book Progress */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">
            Current Book Progress
          </h2>
          <div className="flex flex-col gap-4">
            <ProgressItem
              icon={<HelpCircle className="h-4 w-4 text-vault-teal" />}
              label="Questions answered"
              current={5}
              total={10}
              color="bg-vault-teal"
            />
            <ProgressItem
              icon={<Camera className="h-4 w-4 text-vault-gold" />}
              label="Photos uploaded"
              current={60}
              total={100}
              color="bg-vault-gold"
            />
            <ProgressItem
              icon={<Video className="h-4 w-4 text-vault-teal" />}
              label="Videos uploaded"
              current={3}
              total={10}
              suffix="(400mb)"
              color="bg-vault-teal"
            />
            <div className="flex items-center gap-3 rounded-lg bg-destructive/10 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Low Quality Photos
                </p>
                <p className="text-xs text-muted-foreground">
                  2 of 60 photos are low quality
                </p>
              </div>
              <span className="text-sm font-bold text-destructive">2/60</span>
            </div>
          </div>
        </section>

        {/* Edit Your Book */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">
            Edit Your Book
          </h2>
          <div className="stagger-children grid grid-cols-2 gap-3">
            {editBookItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-4 text-left transition-all duration-200 hover:border-vault-gold/40 hover:shadow-sm"
              >
                <item.icon className="h-5 w-5 text-vault-teal transition-colors group-hover:text-vault-gold" />
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("how-to")}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-vault-teal/40"
            >
              <Lightbulb className="h-4 w-4 text-vault-gold" />
              How to create your book
            </button>
            <button
              onClick={() => onNavigate("tips")}
              className="flex items-center gap-2 rounded-lg border border-vault-gold/30 bg-vault-gold/10 px-4 py-3 text-sm font-semibold text-vault-warm transition-all hover:bg-vault-gold/20"
            >
              <Sparkles className="h-4 w-4 text-vault-gold" />
              Tips & Tricks
            </button>
          </div>
        </section>
      </div>

      {/* Subscription & Explore */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Your Subscription */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
            Your Subscription
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Segment</span>
              <span className="font-medium text-foreground">Baby</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Membership</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-vault-gold/15 px-2.5 py-0.5 font-semibold text-vault-warm">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active since</span>
              <span className="font-medium text-foreground">Jan 2026</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Valid until</span>
              <span className="font-medium text-foreground">Jan 2027</span>
            </div>
            <button className="mt-2 w-full rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark">
              Extend Membership
            </button>
          </div>
        </section>

        {/* Want more videos? */}
        <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-vault-gold/40 bg-vault-gold/5 p-6 text-center">
          <Video className="mb-3 h-8 w-8 text-vault-gold" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Want to add more videos?
          </h3>
          <p className="mt-1 text-sm italic text-vault-warm">
            You can buy more storage here.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-vault-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-vault-gold/90">
            Buy Storage
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        {/* Explore Other Segments */}
        <section className="rounded-xl border border-foreground/20 bg-foreground/5 p-6 shadow-sm">
          <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">
            Explore
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">
            (our other segments)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {["Wedding", "Travel", "Family", "Pet"].map((segment) => (
              <button
                key={segment}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-xs font-medium text-foreground transition-all hover:border-vault-gold/40 hover:shadow-sm"
              >
                <div className="h-10 w-10 rounded-md bg-muted" />
                {segment}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ProgressItem({
  icon,
  label,
  current,
  total,
  suffix,
  color,
}: {
  icon: React.ReactNode
  label: string
  current: number
  total: number
  suffix?: string
  color: string
}) {
  const percentage = (current / total) * 100
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-sm font-bold text-foreground">
          {current}/{total}
          {suffix && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              {suffix}
            </span>
          )}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
