"use client"

import { useState } from "react"
import { X, Save, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MEMORY_CATEGORIES } from "@/lib/memories"

const CATEGORY_CONFIG: Record<
  (typeof MEMORY_CATEGORIES)[number],
  { image: string; label: string; emoji: string }
> = {
  "Wedding Albums": {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&fit=crop",
    label: "Wedding Albums",
    emoji: "💍",
  },
  "Travel Journey": {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80&fit=crop",
    label: "Travel Journey",
    emoji: "✈️",
  },
  "Baby Milestones": {
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80&fit=crop",
    label: "Baby Milestones",
    emoji: "🍼",
  },
  "Graduation Books": {
    image: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Graduation Books",
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
  const [travelName, setTravelName] = useState("")
  const [travelDestination, setTravelDestination] = useState("")
  const [travelPurpose, setTravelPurpose] = useState("")
  const [travelDuration, setTravelDuration] = useState("")
  const [weddingCoupleNames, setWeddingCoupleNames] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [weddingVenue, setWeddingVenue] = useState("")
  const [babyName, setBabyName] = useState("")
  const [babyBirthDate, setBabyBirthDate] = useState("")
  const [babyFocus, setBabyFocus] = useState("")
  const [gradName, setGradName] = useState("")
  const [gradInstitution, setGradInstitution] = useState("")
  const [gradYear, setGradYear] = useState("")

  const isTravel = category === "Travel Journey"
  const isWedding = category === "Wedding Albums"
  const isBaby = category === "Baby Milestones"
  const isGraduation = category === "Graduation Books"

  // For now, additional questions are optional – main requirements:
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
    setTravelName("")
    setTravelDestination("")
    setTravelPurpose("")
    setTravelDuration("")
    setWeddingCoupleNames("")
    setWeddingDate("")
    setWeddingVenue("")
    setBabyName("")
    setBabyBirthDate("")
    setBabyFocus("")
    setGradName("")
    setGradInstitution("")
    setGradYear("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        className="relative flex w-full max-w-lg animate-fade-in-up flex-col rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-label="Add a New Memory Book"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Create Memory Book
              </h2>
              <p className="text-sm text-gray-500">
                Add a new collection to preserve your precious moments
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Vault Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Memory Book Name
            </label>
            <input
              type="text"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
              placeholder="e.g., Summer in Santorini 2024"
              maxLength={60}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            {vaultName.length > 0 && (
              <p className="text-xs text-gray-400 text-right tabular-nums">
                {vaultName.length}/60 characters
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Select Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {MEMORY_CATEGORIES.map((cat) => {
                const { image, label, emoji } = CATEGORY_CONFIG[cat]
                const isSelected = category === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "relative group rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
                      isSelected
                        ? "border-teal-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    )}
                  >
                    {/* Radio indicator */}
                    <div className="absolute top-3 right-3 z-10">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                          isSelected
                            ? "border-teal-500 bg-teal-500"
                            : "border-gray-300 bg-white group-hover:border-gray-400"
                        )}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Image thumbnail */}
                      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 10" }}>
                        <img
                          src={image}
                          alt={label}
                          className={cn(
                            "h-full w-full object-cover transition-all duration-300",
                            isSelected ? "scale-105" : "group-hover:scale-105"
                          )}
                        />
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-200",
                          isSelected ? "opacity-30" : "opacity-20 group-hover:opacity-30"
                        )} />
                      </div>

                      {/* Label */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{emoji}</span>
                        <span className={cn(
                          "text-sm font-medium transition-colors duration-200",
                          isSelected ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                        )}>
                          {label}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Additional details by category */}
          {isWedding && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Wedding details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Couple names
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Alex & Priya"
                    value={weddingCoupleNames}
                    onChange={(e) => setWeddingCoupleNames(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Wedding date
                  </label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lakeside Garden, Mumbai"
                  value={weddingVenue}
                  onChange={(e) => setWeddingVenue(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>
          )}

          {isTravel && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Travel details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Trip name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Summer in Santorini"
                    value={travelName}
                    onChange={(e) => setTravelName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Travel destination
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Paris, France"
                    value={travelDestination}
                    onChange={(e) => setTravelDestination(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Purpose of travel
                  </label>
                  <input
                    type="text"
                    placeholder="Family vacation, work trip, etc."
                    value={travelPurpose}
                    onChange={(e) => setTravelPurpose(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 7 days in June 2026"
                    value={travelDuration}
                    onChange={(e) => setTravelDuration(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {isBaby && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Baby details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Baby's name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Aanya"
                    value={babyName}
                    onChange={(e) => setBabyName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Birth date
                  </label>
                  <input
                    type="date"
                    value={babyBirthDate}
                    onChange={(e) => setBabyBirthDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Milestones focus
                </label>
                <input
                  type="text"
                  placeholder="e.g., First year milestones, first words, etc."
                  value={babyFocus}
                  onChange={(e) => setBabyFocus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>
          )}

          {isGraduation && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Graduation details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Graduate's name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Rohan Mehta"
                    value={gradName}
                    onChange={(e) => setGradName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Stanford University"
                    value={gradInstitution}
                    onChange={(e) => setGradInstitution(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Class of / Year
                </label>
                <input
                  type="text"
                  placeholder="e.g., Class of 2026"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!isValid || isSaving}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200",
              isValid && !isSaving
                ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Book
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}