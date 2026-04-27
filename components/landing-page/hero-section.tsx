import { Button } from "../ui/button"
import localFont from "next/font/local"
import Link from "next/link"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const gtSuperDisplayLight = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Light-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#305c57] overflow-hidden">


      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0 min-h-[520px] sm:min-h-[560px] lg:max-h-[700px] lg:min-h-[600px]">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start justify-center gap-5 px-3 py-7 text-left sm:gap-6 sm:px-4 sm:py-8 lg:gap-8 lg:px-11 lg:py-11">

          {/* Heading */}
          <h1
            className={`${gtSuperDisplay.className} flex flex-col leading-[1.12] text-2xl font-[300] text-white tracking-[0] sm:text-3xl sm:leading-[1.1] md:text-4xl lg:text-[2.25rem] xl:text-5xl 2xl:text-6xl`}
          >
            <span className={`${gtSuperDisplayLight.className} font-[300]`}>
              Your Memories Beautifully Told
            </span>
            <span className="font-[500] text-[#CAA64A]">
              Not Just Stored
            </span>
          </h1>

          {/* Description */}
          <p
            className={`${jost.className} max-w-[520px] text-sm font-[400] leading-6 text-gray-200 sm:text-base sm:leading-7 lg:text-lg lg:leading-8 xl:text-xl`}
          >
            Transform your gallery into beautifully crafted album through WhatsApp — quick, easy, and memorable.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              asChild
              className="rounded-full border-0 bg-[#CAA64A] px-5 py-2.5 text-xs font-normal text-white hover:bg-[#b89442] sm:px-6 sm:py-3 sm:text-sm"
            >
              <Link href="/app">Start Vaulting</Link>
            </Button>

            <Button className="rounded-full border-0 bg-white px-5 py-2.5 text-xs font-normal text-black hover:bg-gray-200 sm:px-6 sm:py-3 sm:text-sm">
              View Demo
            </Button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-0 flex items-end justify-center px-3 pb-4 sm:px-4 lg:mt-10 lg:px-0 lg:pb-0 xl:mt-11">
          <img
            src="/landing-page/hero-section.png"
            alt="hero-section"
            className="
              w-[140px] 
              sm:w-[180px] 
              md:w-[220px] 
              lg:w-[320px] 
              xl:w-[360px]
              h-auto 
              object-contain
            "
          />
        </div>

      </div>
    </section>
  )
}