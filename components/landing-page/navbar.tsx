import Link from "next/link"
import { Button } from "../ui/button"
import localFont from "next/font/local"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const Navbar = () => {
  const linkClass =
    "font-normal text-white/95 transition-colors hover:text-white text-sm sm:text-base"

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
            <h1 className={`${gtSuperDisplay.className} truncate font-normal text-white text-xl sm:text-2xl lg:text-[32px]`}>
              Memory Vault
            </h1>
          </div>
          <Button
            variant="outline"
            className="shrink-0 rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-sm font-normal text-white hover:bg-[#b89442] lg:hidden"
          >
            <Link href="/app">Start Vaulting</Link>
          </Button>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 lg:flex-1 lg:justify-center xl:gap-x-6"
          aria-label="Primary"
        >
          <Link href="" className={`${jost.className} ${linkClass}`}>
            COLLECTIONS
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`}>
            PROCESS
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`}>
            PRICING
          </Link>
          <Link href="" className={`${jost.className} ${linkClass}`}>
            <span className="hidden sm:inline">CUSTOMER STORIES</span>
            <span className="sm:hidden">STORIES</span>
          </Link>
        </nav>

        <Button
          variant="outline"
          className={`${jost.className} hidden rounded-full border-0 bg-[#CAA64A] px-6 py-3 text-base font-normal text-white hover:bg-[#b89442] lg:inline-flex`}
        >
          Start Vaulting
        </Button>
      </div>
    </header>
  )
}
