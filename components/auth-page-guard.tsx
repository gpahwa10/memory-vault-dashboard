"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthPageGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("accessToken")
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1]

    if (tokenFromStorage || tokenFromCookie) {
      router.replace("/app")
      return
    }

    setChecked(true)
  }, [router])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
