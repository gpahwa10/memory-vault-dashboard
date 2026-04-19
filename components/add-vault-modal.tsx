"use client"

import { useEffect, useMemo, useState } from "react"
import { X, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { appService, BookType, CreateBookRequest } from "@/app/(dashboard)/app/app-service"
import { toast } from "sonner"

const BOOK_TYPES_STORAGE_KEY = "bookTypes"


const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&fit=crop"

interface AddVaultModalProps {
  open: boolean
  onClose: () => void
}

export function AddVaultModal({ open, onClose }: AddVaultModalProps) {
  const [bookTypesData, setBookTypesData] = useState<BookType[] | null>(null)
  const [vaultName, setVaultName] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadBookTypes = async () => {
      // Try cache first
      const cached = localStorage.getItem(BOOK_TYPES_STORAGE_KEY)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (Array.isArray(parsed)) {
            setBookTypesData(parsed)
            return
          }
        } catch {
          // fall through to fetch
        }
      }

      // Fetch from API and cache
      try {
        setIsLoading(true)
        const response = await appService.getBookTypes()
        const types = response.bookTypes
        setBookTypesData(types)
        localStorage.setItem(BOOK_TYPES_STORAGE_KEY, JSON.stringify(types))
      } catch (error) {
        console.error("Failed to fetch book types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (open) loadBookTypes()
  }, [open])

  const availableCategories = useMemo(() => {
    if (!bookTypesData) return []
    return bookTypesData.map((item) => ({
      value: item.typeName,
      label: item.typeName,
      image: item.coverImage ?? FALLBACK_IMAGE,
    }))
  }, [bookTypesData])

  const selectedBookType = useMemo(
    () => bookTypesData?.find((item) => item.typeName === category) ?? null,
    [category, bookTypesData]
  )

  const sortedQuestions = useMemo(() => {
    const questions = selectedBookType?.questions ?? []
    return [...questions].sort((a, b) => Number(a.order) - Number(b.order))
  }, [selectedBookType])

  const isValid = vaultName.trim().length > 0 && category !== null

  const handleSave = async () => {
    if (!isValid) return
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onClose()
    }, 800)

    const request: CreateBookRequest = {
      bookName: vaultName,
      bookTypeId: selectedBookType?.id ?? "",
      metadata: dynamicAnswers,
    }
    console.log(request)
    const response = await appService.createBook(request)
    console.log(response)
    if (response.book) {
      toast.success("Book created successfully")
      onClose()
    } else {
      toast.error("Failed to create book")
    }
  }

  const handleClose = () => {
    setVaultName("")
    setCategory(null)
    setDynamicAnswers({})
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create Memory Book</h2>
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
          {/* Vault Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Memory Book Name</label>
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
            <label className="text-sm font-medium text-gray-700">Select Category</label>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border-2 border-gray-200 bg-gray-100 animate-pulse"
                    style={{ height: 130 }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableCategories.map((cat) => {
                  const isSelected = category === cat.value
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setCategory(cat.value)
                        setDynamicAnswers({}) // reset answers on category switch
                      }}
                      className={cn(
                        "relative group rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
                        isSelected
                          ? "border-teal-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      )}
                    >
                      <div className="absolute top-3 right-3 z-10">
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                            isSelected
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300 bg-white group-hover:border-gray-400"
                          )}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div
                          className="relative overflow-hidden rounded-lg"
                          style={{ aspectRatio: "16 / 10" }}
                        >
                          <img
                            src={cat.image}
                            alt={cat.label}
                            className={cn(
                              "h-full w-full object-cover transition-all duration-300",
                              isSelected ? "scale-105" : "group-hover:scale-105"
                            )}
                          />
                          <div
                            className={cn(
                              "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-200",
                              isSelected
                                ? "opacity-30"
                                : "opacity-20 group-hover:opacity-30"
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-sm font-medium transition-colors duration-200",
                              isSelected
                                ? "text-gray-900"
                                : "text-gray-700 group-hover:text-gray-900"
                            )}
                          >
                            {cat.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Dynamic questions for selected category only */}
          {sortedQuestions.length > 0 && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Additional details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {sortedQuestions.map((question) => (
                  <div key={question.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      {question.questionText}
                      {question.isRequired ? " *" : ""}
                    </label>
                    <input
                      type={question.inputType === "date" ? "date" : "text"}
                      value={dynamicAnswers[question.key] ?? ""}
                      required={question.isRequired}
                      onChange={(e) =>
                        setDynamicAnswers((prev) => ({
                          ...prev,
                          [question.key]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                ))}
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