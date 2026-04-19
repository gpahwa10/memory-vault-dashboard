"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardContent } from "@/components/dashboard-content"
import { useAddMemory } from "../add-memory-context"
import { useAddVault } from "../add-vault-context"
import { appService } from "./app-service"

const idToPath: Record<string, string> = {
  preview: "/preview",
  "edit-vault": "/edit-vault",
  "make-reel": "/make-reel",
  "print-book": "/print-book",
  "give-gift": "/give-gift",
  gallery: "/gallery",
  questions: "/questions",
  "edit-book": "/edit-book",
  "all-books": "/app",
  "how-to": "/help",
  tips: "/help",
}

const BOOK_TYPES_STORAGE_KEY = "bookTypes"


export default function DashboardAppPage() {
  const router = useRouter()
  const openAddMemory = useAddMemory()
  const openAddVault = useAddVault()

  useEffect(()=>{
    const bootstrapDashboardData = async ()=>{
      try{
        const bookTypesData = await appService.getBookTypes()

        if(bookTypesData?.bookTypes){
          localStorage.setItem(BOOK_TYPES_STORAGE_KEY, JSON.stringify(bookTypesData.bookTypes))
        }
      }catch(error){
        console.error("Error fetching dashboard bootstrap data:", error)
      }
    }
    bootstrapDashboardData()
  }, [])

  const handleNavigate = (item: string) => {
    if (item === "add-memory") {
      openAddMemory()
      return
    }
    if (item === "add-vault") {
      openAddVault()
      return
    }
    const path = idToPath[item]
    if (path) router.push(path)
  }

  return <DashboardContent onNavigate={handleNavigate} />
}
