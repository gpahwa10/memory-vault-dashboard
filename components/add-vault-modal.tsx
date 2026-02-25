
"use client"

import { useState } from "react"
import { X, Save, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MEMORY_CATEGORIES } from "@/lib/memories"

const CATEGORY_CONFIG: Record<
  (typeof MEMORY_CATEGORIES)[number],
  { image: string; label: string; accent: string; emoji: string }
> = {
  "Wedding Albums": {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&fit=crop",
    label: "Wedding Albums",
    accent: "from-rose-900/80",
    emoji: "💍",
  },
  "Travel Journey": {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80&fit=crop",
    label: "Travel Journey",
    accent: "from-sky-900/80",
    emoji: "✈️",
  },
  "Baby Milestones": {
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80&fit=crop",
    label: "Baby Milestones",
    accent: "from-amber-900/70",
    emoji: "🍼",
  },
  "Graduation Books": {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80&fit=crop",
    label: "Graduation Books",
    accent: "from-emerald-900/80",
    emoji: "🎓",
  },
}

interface AddVaultModalProps {
  open: boolean
  onClose: () => void
}

export function AddVaultModal({ open, onClose }: AddVaultModalProps) {
  const [vaultName, setVaultName] = useState("")
  const [category, setCategory] = useState<(typeof MEMORY_CATEGORIES)[number] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const isValid = vaultName.trim().length > 0 && category !== null

  const handleSave = () => {
    if (!isValid) return
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onClose()
    }, 800)
  }

  const handleClose = () => {
    setVaultName("")
    setCategory(null)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/0 p-4 backdrop-blur-sm">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        className="relative w-full max-w-lg animate-fade-in-up rounded-3xl border border-white/10 bg-secondary shadow-2xl overflow-hidden"
        role="dialog"
        aria-label="Add a New Book"
        style={{
          boxShadow: "0 0 80px -20px rgba(80,220,200,0.15), 0 25px 50px -12px rgba(0,0,0,0.8)",
        }}
      >
        {/* Subtle top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vault-teal/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-vault-teal/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-7 py-5 border-b border-border">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-0.5">
              Memory Book
            </p>
            <h2 className="font-serif text-2xl font-bold text-foreground tracking-tight">
              Add a New Book
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-xl p-2 text-muted-foreground transition-all hover:bg-white/8 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex flex-col gap-7 px-7 py-6">
          {/* Vault Name Input */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Memory Book Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="e.g. Summer in Santorini 2024"
                maxLength={60}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20 transition-all"
              />
              {vaultName.length > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground tabular-nums">
                  {vaultName.length}/60
                </span>
              )}
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {MEMORY_CATEGORIES.map((cat) => {
                const { image, label, accent, emoji } = CATEGORY_CONFIG[cat]
                const isSelected = category === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none",
                      "hover:shadow-lg hover:-translate-y-0.5",
                      isSelected
                        ? "border-vault-teal shadow-vault-teal/20 shadow-lg scale-[1.02]"
                        : "border-border hover:border-vault-gold/40"
                    )}
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    {/* Background image */}
                    <img
                      src={image}
                      alt={label}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-300",
                        accent,
                        isSelected ? "opacity-95" : "opacity-75 group-hover:opacity-85"
                      )}
                    />

                    {/* Selected teal ring */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-[14px] ring-1 ring-inset ring-vault-teal/50" />
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 flex items-end justify-between p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base leading-none">{emoji}</span>
                        <span className="text-xs font-bold text-foreground drop-shadow-sm leading-tight">
                          {label}
                        </span>
                      </div>

                      {/* Checkmark */}
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200",
                          isSelected
                            ? "bg-vault-teal scale-100 opacity-100"
                            : "bg-white/20 scale-75 opacity-0 group-hover:opacity-50 group-hover:scale-90"
                        )}
                      >
                        <Check className="h-3 w-3 text-foreground" strokeWidth={3} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
            <div className="relative flex items-center justify-between px-7 py-5 border-t border-border">
          <button
            onClick={handleClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!isValid || isSaving}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200",
              isValid && !isSaving
                ? "bg-vault-teal text-black hover:bg-vault-teal/90 shadow-lg shadow-vault-teal/25 hover:-translate-y-0.5"
                : "bg-card text-muted-foreground cursor-not-allowed"
            )}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Creating..." : "Create Book"}
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </div>
  )
}