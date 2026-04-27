"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import localFont from "next/font/local"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import type { MouseEvent } from "react"
import { usePathname, useRouter } from "next/navigation"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const linkClass =
    "font-normal text-white/95 transition-colors hover:text-white text-xs sm:text-sm md:text-base"
  const handleSmoothScroll = (sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      setIsMobileMenuOpen(false)
      return
    }

    event.preventDefault()
    const section = document.getElementById(sectionId)
    if (!section) {
      router.push(`/#${sectionId}`)
      return
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${sectionId}`)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#3d6b66] px-2 py-2 sm:px-4 lg:px-6 xl:px-8 sm:py-2 lg:py-2 w-full">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-center gap-3 lg:justify-start lg:gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-[8px] cursor-pointer" onClick={() => router.push("/")}>
            <img
              src="/logo-transparent.svg"
              alt=""
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px]"
            />
            <h1 className={`${gtSuperDisplay.className} truncate font-normal text-white text-lg sm:text-xl lg:text-[1.65rem]`}>
              Memory Vault
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav
          className={`${isMobileMenuOpen ? "flex" : "hidden"
            } w-full flex-col items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 
  lg:absolute lg:left-1/2 lg:-translate-x-1/2 
  lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-x-6 
  lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {/* Occasions, Pricing , Give a gift & Sign In */}
          <Link href="/#album-output" className={`${jost.className} ${linkClass}`} onClick={handleSmoothScroll("album-output")}>
            OUR PHOTOBOOKS
          </Link>
          <Link href="/#pricing" className={`${jost.className} ${linkClass}`} onClick={handleSmoothScroll("pricing")}>
            PRICING
          </Link>
          <Link href="/gift-page" className={`${jost.className} ${linkClass}`} onClick={() => setIsMobileMenuOpen(false)}>
            GIVE A GIFT
          </Link>
          <Button
            asChild
            variant="outline"
            className={`${jost.className} mt-2 w-full rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-xs font-normal text-white hover:bg-[#b89442] sm:text-sm lg:hidden`}
          >
            <Link href="/app" onClick={() => setIsMobileMenuOpen(false)}>Start Vaulting</Link>
          </Button>
        </nav>

        <Button
          asChild
          variant="outline"
          className={`${jost.className} hidden rounded-full border-0 bg-[#CAA64A] px-6 py-3 text-sm font-normal text-white hover:bg-[#b89442] lg:inline-flex`}
        >
          <Link href="/app">Sign In</Link>
        </Button>
      </div>
    </header>
  )
}
