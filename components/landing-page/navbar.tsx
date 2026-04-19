"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import localFont from "next/font/local"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const linkClass =
    "font-normal text-white/95 transition-colors hover:text-white text-xs sm:text-sm md:text-base"

  return (
    <header className="bg-[#1D453A] px-4 py-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 sm:py-5 lg:py-6">
      <div className="mx-auto flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-between gap-3 lg:justify-start lg:gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-[8px]">
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
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } w-full flex-col items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-x-4 lg:gap-y-2 lg:border-0 lg:bg-transparent lg:p-0 xl:gap-x-6`}
          aria-label="Primary"
        >
          <Link href="" className={`${jost.className} ${linkClass}`} onClick={() => setIsMobileMenuOpen(false)}>
            COLLECTIONS
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`} onClick={() => setIsMobileMenuOpen(false)}>
            PROCESS
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`} onClick={() => setIsMobileMenuOpen(false)}>
            PRICING
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span className="hidden sm:inline">CUSTOMER STORIES</span>
            <span className="sm:hidden">STORIES</span>
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
          <Link href="/app">Start Vaulting</Link>
        </Button>
      </div>
    </header>
  )
}
