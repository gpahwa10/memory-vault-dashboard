"use client"

import { useSearchParams } from "next/navigation"
import { EditVaultContent } from "@/components/edit-vault-content"

export function EditVaultWithBookQuery() {
  const bookId = useSearchParams().get("bookId") ?? undefined
  return <EditVaultContent bookId={bookId} />
}
