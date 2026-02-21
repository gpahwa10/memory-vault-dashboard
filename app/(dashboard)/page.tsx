"use client"

import { useRouter } from "next/navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { useAddMemory } from "./add-memory-context"

const idToPath: Record<string, string> = {
  preview: "/preview",
  "edit-vault": "/edit-vault",
  "make-reel": "/make-reel",
  "print-book": "/print-book",
  "give-gift": "/give-gift",
  gallery: "/gallery",
  questions: "/questions",
  "edit-book": "/edit-book",
  "all-books": "/",
  "how-to": "/help",
  tips: "/help",
}

export default function DashboardPage() {
  const router = useRouter()
  const openAddMemory = useAddMemory()

  const handleNavigate = (item: string) => {
    if (item === "add-memory") {
      openAddMemory()
      return
    }
    const path = idToPath[item]
    if (path) router.push(path)
  }

  return <DashboardContent onNavigate={handleNavigate} />
}
