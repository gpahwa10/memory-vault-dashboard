import { Suspense } from "react"
import { SettingsScreen } from "@/components/settings-screen"

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading settings…</div>}>
      <SettingsScreen />
    </Suspense>
  )
}
