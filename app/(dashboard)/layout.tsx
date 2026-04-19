"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar, MobileMenuButton } from "@/components/app-sidebar"
import { AddMemoryModal } from "@/components/add-memory-modal"
import { AddVaultModal } from "@/components/add-vault-modal"
import { AddMemoryProvider, type OpenAddMemoryOptions } from "./add-memory-context"
import { AddVaultProvider } from "./add-vault-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [memoryModalOpen, setMemoryModalOpen] = useState(false)
  const [memoryModalBookId, setMemoryModalBookId] = useState<string | undefined>(
    undefined
  )
  const openAddMemory = useCallback((options?: OpenAddMemoryOptions) => {
    setMemoryModalBookId(options?.bookId)
    setMemoryModalOpen(true)
  }, [])
  const closeMemoryModal = useCallback(() => {
    setMemoryModalOpen(false)
    setMemoryModalBookId(undefined)
  }, [])
  const [vaultModalOpen, setVaultModalOpen] = useState(false)
  const openAddVault = useCallback(() => setVaultModalOpen(true), [])

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("accessToken")
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1]

    if (!tokenFromStorage && !tokenFromCookie) {
      router.replace("/auth/login")
      return
    }

    setAuthChecked(true)
  }, [router])

  if (!authChecked) {
    return null
  }

  return (
    <AddMemoryProvider value={{ openAddMemory }}>
      <AddVaultProvider value={{ openAddVault }}>
        <div className="paper-texture flex h-screen overflow-hidden">
          <AppSidebar
            mobileOpen={mobileOpen}
            onMobileToggle={() => setMobileOpen(false)}
            onAddMemory={openAddMemory}
            onAddVault={openAddVault}
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
            onClose={closeMemoryModal}
            bookId={memoryModalBookId}
          />
          <AddVaultModal
            open={vaultModalOpen}
            onClose={() => setVaultModalOpen(false)}
          />
        </div>
      </AddVaultProvider>
    </AddMemoryProvider>
  )
}
