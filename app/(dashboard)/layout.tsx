"use client"

import { useState, useCallback } from "react"
import { AppSidebar, MobileMenuButton } from "@/components/app-sidebar"
import { AddMemoryModal } from "@/components/add-memory-modal"
import { AddMemoryProvider } from "./add-memory-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [memoryModalOpen, setMemoryModalOpen] = useState(false)
  const openAddMemory = useCallback(() => setMemoryModalOpen(true), [])

  return (
    <AddMemoryProvider value={{ openAddMemory }}>
      <div className="paper-texture flex h-screen overflow-hidden">
        <AppSidebar
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen(false)}
          onAddMemory={() => setMemoryModalOpen(true)}
        />

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <MobileMenuButton onClick={() => setMobileOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </div>
        </main>

        <AddMemoryModal
          open={memoryModalOpen}
          onClose={() => setMemoryModalOpen(false)}
        />
      </div>
    </AddMemoryProvider>
  )
}
