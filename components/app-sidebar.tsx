"use client"

import { useState } from "react"
import Image from "next/image"
import {
  LayoutDashboard,
  PlusCircle,
  Images,
  CalendarDays,
  ImageIcon,
  HelpCircle,
  BookOpen,
  Eye,
  Film,
  Printer,
  Gift,
  ChevronDown,
  Plus,
  Settings,
  LifeBuoy,
  Star,
  User,
  Mail,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  activeItem: string
  onNavigate: (item: string) => void
  userName?: string
  userEmail?: string
  books?: { id: string; name: string }[]
  activeBookId?: string
  onBookSelect?: (id: string) => void
  mobileOpen?: boolean
  onMobileToggle?: () => void
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "add-memory", label: "Add a new memory", icon: PlusCircle },
  { id: "gallery", label: "Memory gallery", icon: Images },
  { id: "calendar", label: "Events Calendar", icon: CalendarDays },
  { id: "media", label: "Photos & Videos", icon: ImageIcon },
  { id: "questions", label: "All Questions", icon: HelpCircle },
  { id: "edit-book", label: "Edit Book Details", icon: BookOpen },
  { id: "preview", label: "Preview Your Book", icon: Eye },
]

const quickActions = [
  { id: "make-reel", label: "Make a reel", icon: Film },
  { id: "print-book", label: "Print your book", icon: Printer },
  { id: "give-gift", label: "Give a gift", icon: Gift },
]

export function AppSidebar({
  activeItem,
  onNavigate,
  userName = "John Doe",
  userEmail = "john@memoryvault.com",
  books = [
    { id: "1", name: "Baby Book 1" },
    { id: "2", name: "Baby Book 2" },
  ],
  activeBookId = "1",
  onBookSelect,
  mobileOpen = false,
  onMobileToggle,
}: AppSidebarProps) {
  const [booksExpanded, setBooksExpanded] = useState(true)

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo section */}
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-vault-gold">
            <Image
              src="/logo.jpg"
              alt="Memory Vault Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="font-serif text-xl font-bold tracking-wide text-vault-gold">
            Memory Vault
          </h1>
          <button
            onClick={onMobileToggle}
            className="ml-auto rounded-md p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          {/* Main Navigation */}
          <nav className="px-3">
            <ul className="flex flex-col gap-0.5">
              {mainNavItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      activeItem === item.id
                        ? "bg-sidebar-accent text-vault-gold"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        activeItem === item.id
                          ? "text-vault-gold"
                          : "text-sidebar-foreground/60"
                      )}
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Actions */}
          <div className="mt-5 px-3">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50">
              Quick Actions
            </p>
            <ul className="flex flex-col gap-0.5">
              {quickActions.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      activeItem === item.id
                        ? "bg-sidebar-accent text-vault-gold"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Your Books */}
          <div className="mt-5 px-3">
            <button
              onClick={() => setBooksExpanded(!booksExpanded)}
              className="mb-2 flex w-full items-center justify-between px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50"
            >
              Your Books
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  booksExpanded ? "rotate-0" : "-rotate-90"
                )}
              />
            </button>
            {booksExpanded && (
              <ul className="flex flex-col gap-0.5">
                {books.map((book) => (
                  <li key={book.id}>
                    <button
                      onClick={() => onBookSelect?.(book.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        activeBookId === book.id
                          ? "bg-sidebar-accent text-vault-gold"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <BookOpen className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                      {book.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => onNavigate("add-book")}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-vault-gold/80 transition-all duration-200 hover:bg-sidebar-accent/50 hover:text-vault-gold"
                  >
                    <Plus className="h-4 w-4 shrink-0" />
                    Add New Book
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Footer links */}
        <div className="border-t border-sidebar-border px-3 py-2">
          <div className="flex items-center justify-center gap-4 text-xs text-sidebar-foreground/50">
            <button
              onClick={() => onNavigate("settings")}
              className="flex items-center gap-1 transition-colors hover:text-sidebar-foreground"
            >
              <Settings className="h-3 w-3" />
              Settings
            </button>
            <span className="text-sidebar-border">|</span>
            <button
              onClick={() => onNavigate("help")}
              className="flex items-center gap-1 transition-colors hover:text-sidebar-foreground"
            >
              <LifeBuoy className="h-3 w-3" />
              Help
            </button>
            <span className="text-sidebar-border">|</span>
            <button
              onClick={() => onNavigate("review")}
              className="flex items-center gap-1 transition-colors hover:text-sidebar-foreground"
            >
              <Star className="h-3 w-3" />
              Review
            </button>
          </div>
        </div>

        {/* User profile */}
        <div className="border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vault-gold/20 text-vault-gold">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                {userName}
              </p>
              <p className="flex items-center gap-1 truncate text-xs text-sidebar-foreground/50">
                <Mail className="h-3 w-3 shrink-0" />
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-30 rounded-lg bg-vault-teal-dark p-2.5 text-vault-cream shadow-lg lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
