"use client"

import { useRef, useState, forwardRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Sparkle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface BookPage {
  type: "cover" | "content" | "divider" | "back-cover"
  title?: string
  subtitle?: string
  date?: string
  description?: string
  image?: string
  pageNumber?: number
}

const bookPages: BookPage[] = [
  {
    type: "cover",
    title: "Our Baby Book",
    subtitle: "A Collection of Precious Memories",
  },
  {
    type: "divider",
    title: "Chapter One",
    subtitle: "The Beginning",
  },
  {
    type: "content",
    title: "First Steps",
    date: "January 15, 2026",
    description:
      "She took her very first steps today! Three wobbly steps towards daddy, and we all cheered with tears of joy. This is a moment we will treasure forever.",
    image: "/samples/memory-1.jpg",
    pageNumber: 1,
  },
  {
    type: "content",
    title: "First Birthday",
    date: "January 28, 2026",
    description:
      "The most magical day of the year. Her first birthday celebration with all the family gathered around, singing and laughing. She loved the cake!",
    image: "/samples/memory-2.jpg",
    pageNumber: 2,
  },
  {
    type: "divider",
    title: "Chapter Two",
    subtitle: "Growing Up",
  },
  {
    type: "content",
    title: "Sunday at the Park",
    date: "February 2, 2026",
    description:
      "A perfect sunny afternoon at the park. She loved running on the grass and chasing butterflies. Her laughter echoed through the trees.",
    image: "/samples/memory-3.jpg",
    pageNumber: 3,
  },
  {
    type: "content",
    title: "Peaceful Nap Time",
    date: "February 5, 2026",
    description:
      "Found her sleeping so peacefully with her favourite teddy bear. These quiet moments are the most precious of all.",
    image: "/samples/memory-4.jpg",
    pageNumber: 4,
  },
  {
    type: "content",
    title: "Grandma's Love",
    date: "February 10, 2026",
    description:
      "The bond between grandma and her granddaughter is truly something special. Three generations of love captured in this beautiful moment.",
    image: "/samples/memory-5.jpg",
    pageNumber: 5,
  },
  {
    type: "content",
    title: "Building Blocks",
    date: "February 14, 2026",
    description:
      "She is becoming such a little architect! Built her tallest tower yet and was so proud when she knocked it down.",
    image: "/samples/memory-6.jpg",
    pageNumber: 6,
  },
  {
    type: "back-cover",
    title: "Memory Vault",
    subtitle: "Every moment matters.",
  },
]

// Each page MUST be a forwardRef for react-pageflip
const Page = forwardRef<HTMLDivElement, { page: BookPage }>(
  function PageComponent({ page }, ref) {
    if (page.type === "cover") {
      return (
        <div ref={ref} className="h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#3d6b66] p-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#D7B86A]/60">
                <Image src="/logo.jpg" alt="Memory Vault" fill className="object-cover" />
              </div>
              <div className="h-px w-32 bg-[#D7B86A]/40" />
              <h1 className="text-center font-serif text-3xl font-bold leading-tight text-[#D7B86A]">
                {page.title}
              </h1>
              <p className="text-center text-sm italic text-[#f5efe6]/70">
                {page.subtitle}
              </p>
              <div className="h-px w-32 bg-[#D7B86A]/40" />
              <p className="text-xs text-[#f5efe6]/50">2026</p>
            </div>
          </div>
        </div>
      )
    }

    if (page.type === "back-cover") {
      return (
        <div ref={ref} className="h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#3d6b66] p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#D7B86A]/40">
                <Image src="/logo.jpg" alt="Memory Vault" fill className="object-cover" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#D7B86A]">
                {page.title}
              </h2>
              <p className="text-sm italic text-[#f5efe6]/60">{page.subtitle}</p>
            </div>
          </div>
        </div>
      )
    }

    if (page.type === "divider") {
      return (
        <div ref={ref} className="h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#f5efe6] p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-[#D7B86A]" />
              <h2 className="text-center font-serif text-2xl font-bold text-[#3d6b66]">
                {page.title}
              </h2>
              <p className="text-center text-sm italic text-[#8b7355]">
                {page.subtitle}
              </p>
              <div className="h-px w-24 bg-[#D7B86A]" />
            </div>
          </div>
        </div>
      )
    }

    // Content page
    return (
      <div ref={ref} className="h-full w-full">
        <div className="flex h-full w-full flex-col bg-[#faf6ef] p-5">
          {page.image && (
            <div className="relative mb-4 min-h-0 w-full flex-1 overflow-hidden rounded-lg">
              <Image
                src={page.image}
                alt={page.title || "Memory"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex shrink-0 flex-col gap-1.5">
            <h3 className="font-serif text-lg font-bold leading-tight text-[#2d2418]">
              {page.title}
            </h3>
            {page.date && (
              <p className="text-[11px] font-semibold text-[#6aa09a]">
                {page.date}
              </p>
            )}
            <p className="text-xs leading-relaxed text-[#6b5d4d]">
              {page.description}
            </p>
          </div>
          {page.pageNumber && (
            <p className="mt-2 text-center text-[10px] text-[#d9cdb8]">
              {"- "}{page.pageNumber}{" -"}
            </p>
          )}
        </div>
      </div>
    )
  }
)

export function BookPreview() {
  const flipBookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [FlipBook, setFlipBook] = useState<any>(null)

  const totalPages = bookPages.length

  useEffect(() => {
    let cancelled = false
    import("react-pageflip")
      .then((mod) => {
        if (!cancelled) {
          setFlipBook(() => mod.default)
        }
      })
      .catch((err) => {
        console.log("[v0] Failed to load react-pageflip:", err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data)
  }, [])

  const goNext = () => {
    flipBookRef.current?.pageFlip()?.flipNext()
  }

  const goPrev = () => {
    flipBookRef.current?.pageFlip()?.flipPrev()
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-row justify-between items-center">
       <div>
       <h1 className="font-serif text-3xl font-bold text-foreground">
          Preview Your Book
        </h1>
        <p className="mt-1 text-muted-foreground">
          Flip through your memory book preview
        </p>
       </div>
       <Button className="border border-1 bg-vault-gold text-foreground "> <Sparkles className="h-4 w-4" /> Re-Generate Book </Button>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-10",
          isFullscreen && "bg-card"
        )}
      >
        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-10 rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>

        {/* Book with navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={currentPage <= 0}
            className="hidden rounded-full border border-border bg-background p-3 text-foreground shadow-md transition-all hover:bg-vault-teal hover:text-primary-foreground disabled:opacity-30 sm:flex"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden rounded-lg shadow-2xl" style={{ width: 340, height: 480 }}>
            {FlipBook ? (
              <FlipBook
                ref={flipBookRef}
                width={340}
                height={480}
                size="fixed"
                minWidth={280}
                maxWidth={340}
                minHeight={400}
                maxHeight={480}
                showCover={true}
                mobileScrollSupport={false}
                onFlip={onFlip}
                className=""
                style={{}}
                startPage={0}
                drawShadow={true}
                flippingTime={800}
                usePortrait={true}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.5}
                showPageCorners={true}
                disableFlipByClick={false}
                useMouseEvents={true}
                swipeDistance={30}
                clickEventForward={true}
              >
                {bookPages.map((page, idx) => (
                  <Page key={idx} page={page} />
                ))}
              </FlipBook>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-card">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-vault-gold border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Loading book...</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage >= totalPages - 1}
            className="hidden rounded-full border border-border bg-background p-3 text-foreground shadow-md transition-all hover:bg-vault-teal hover:text-primary-foreground disabled:opacity-30 sm:flex"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile nav buttons */}
        <div className="flex items-center gap-6 sm:hidden">
          <button
            onClick={goPrev}
            disabled={currentPage <= 0}
            className="rounded-full border border-border bg-background p-3 text-foreground shadow-md disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={currentPage >= totalPages - 1}
            className="rounded-full border border-border bg-background p-3 text-foreground shadow-md disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Page indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {bookPages.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentPage === idx
                    ? "w-6 bg-vault-gold"
                    : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  )
}