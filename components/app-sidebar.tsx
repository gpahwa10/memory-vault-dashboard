"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  Settings,
  LifeBuoy,
  Star,
  User,
  Mail,
  Menu,
  X,
  LogOutIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface AppSidebarProps {
  userName?: string
  userEmail?: string
  books?: { id: string; name: string }[]
  activeBookId?: string
  onBookSelect?: (id: string) => void
  mobileOpen?: boolean
  onMobileToggle?: () => void
  onAddMemory?: () => void
  onAddVault?: () => void
}

const mainNavItems: { id: string; label: string; href: string | null; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard },
  // { id: "add-memory", label: "Add a new memory", href: null, icon: PlusCircle },
  { id: "add-vault", label: "Memory vaults", href: null, icon: PlusCircle },
  { id: "calendar", label: "Events Calendar", href: "/calendar", icon: CalendarDays },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
  { id: "help", label: "FAQs", href: "/help", icon: HelpCircle },
  { id: "review", label: "Rate Us", href: "/review", icon: Star },
  { id: "gift", label: "Give a Gift", href: "/give-gift", icon: Gift },
]


function isActive(pathname: string, item: (typeof mainNavItems)[0]) {
  if (item.href === null) return false
  if (item.href === "/") return pathname === "/"
  return pathname === item.href || pathname.startsWith(item.href + "/")
}

export function AppSidebar({
  userName = "John Doe",
  userEmail = "john@memoryvault.com",
  mobileOpen = false,
  onMobileToggle,
  onAddMemory,
  onAddVault,
}: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
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
          <Link href="/" className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-vault-gold">
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
          </Link>
          <button
            type="button"
            onClick={() => onMobileToggle?.()}
            className="shrink-0 rounded-md p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          {/* Main Navigation */}
          <nav className="px-3">
            <ul className="flex flex-col gap-0.5">
              {mainNavItems.map((item) => {
                const active = isActive(pathname ?? "", item)
                if (item.id === "add-memory") {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onAddMemory?.()
                          onMobileToggle?.()
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-all duration-200 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      >
                        <item.icon className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                        {item.label}
                      </button>
                    </li>
                  )
                }
                if (item.id === "add-vault") {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onAddVault?.()
                          onMobileToggle?.()
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-all duration-200 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      >
                        <item.icon className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                        {item.label}
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href!}
                      onClick={() => onMobileToggle?.()}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-sidebar-accent text-vault-gold"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          active ? "text-vault-gold" : "text-sidebar-foreground/60"
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="border-t border-sidebar-border px-4 py-4">
          <Button
            variant="destructive"
            className="w-full transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99]"
            onClick={() => {
              router.push("/auth/login")
            }}
          >
            <LogOutIcon className="h-4 w-4" />
            Log out
          </Button>
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
