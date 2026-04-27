import { Button } from "../ui/button"
import localFont from "next/font/local"
import Link from "next/link"
import AlbumFlipbook from "./album-flipbook"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const AlbumOutputHeroSection = () => {
  return (
    <section className="relative w-full min-w-0 overflow-hidden bg-[#305c57]">
      {/* 🔲 Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
          backgroundSize: "1.5px",
          backgroundColor: "#00000026",
          mixBlendMode: "overlay",
        }}
      />

      <div className="mx-auto flex min-h-[520px] w-full max-w-[1400px] flex-col items-center justify-center gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:min-h-[600px] lg:gap-14 lg:px-16 xl:px-24">
        <div className="flex w-full min-w-0 flex-col items-center justify-center gap-5 sm:gap-6">
          <h1
            className={`${gtSuperDisplay.className} text-center text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl`}
          >
            Wedding <span className="text-[#CAA64A]">Memories</span>
          </h1>
          <p
            className={`${jost.className} max-w-2xl text-center text-sm leading-relaxed text-white/90 sm:text-base md:text-lg`}
          >
            Turn your wedding moments into a timeless, beautifully crafted keepsake.
          </p>
          <Button
            asChild
            className="w-fit rounded-full border-0 bg-[#CAA64A] px-5 py-2.5 text-sm font-normal text-white hover:bg-[#b89442] sm:px-6 sm:py-3 sm:text-base"
          >
            <Link href="/app">Create Book Now</Link>
          </Button>
        </div>
        <div className="flex w-full min-w-0 items-center justify-center">
          <div className="w-full max-w-[840px]">
            <AlbumFlipbook />
          </div>
        </div>
      </div>
    </section>
  )
}