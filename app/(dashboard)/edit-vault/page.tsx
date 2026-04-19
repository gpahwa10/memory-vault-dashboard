import { Suspense } from "react"
import { EditVaultWithBookQuery } from "./edit-vault-client"

export default function EditVaultPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm text-muted-foreground">Loading…</div>
      }
    >
      <EditVaultWithBookQuery />
    </Suspense>
  )
}
