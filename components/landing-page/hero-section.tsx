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
    <section className="relative w-full bg-[#1D453A] overflow-hidden">
      
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

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0 min-h-[520px] sm:min-h-[560px] lg:max-h-[700px] lg:min-h-[600px]">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center gap-5 px-4 py-10 sm:gap-6 sm:px-6 sm:py-12 lg:gap-8 lg:px-16 lg:py-16">
    
          <span className={`${gtSuperDisplay.className} flex flex-col text-[30px] sm:text-[38px] md:text-[46px] lg:text-[44px] xl:text-[80px] font-[300] text-white leading-[1.1] xl:leading-[80px] tracking-[0]`}>
            <span className={`${gtSuperDisplayLight.className} font-[300]`}>Some Moments <br />Deserve More Than</span>
            <span className="font-[500] text-[#CAA64A]">
              Your Gallery
            </span>
          </span>

          <p className={`${jost.className} max-w-full text-base font-[400] leading-7 tracking-[0] text-gray-200 sm:max-w-[90%] sm:text-xl sm:leading-8 lg:max-w-[520px] lg:text-[30px] lg:leading-[36px]`}>
            Transform your gallery into beautifully crafted keepsakes through WhatsApp — quick, easy, and memorable.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button asChild className="rounded-full border-0 bg-[#CAA64A] px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-normal text-white hover:bg-[#b89442]">
              <Link href="/app">Start Vaulting</Link>
            </Button>

            <Button className="rounded-full border-0 bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-normal text-black hover:bg-gray-200">
              View Demo
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-0 flex items-end justify-center px-4 pb-6 sm:px-6 lg:mt-10 lg:px-0 lg:pb-0 xl:mt-11">
          <img
            src="/landing-page/hero-mobile.svg"
            alt="hero-section"
            className="
              w-[180px] 
              sm:w-[220px] 
              md:w-[260px] 
              lg:w-[360px] 
              xl:w-[420px]
              h-auto 
              object-contain
            "
          />
        </div>

      </div>
    </section>
  )
}