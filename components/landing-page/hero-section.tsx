import { Button } from "../ui/button"
import localFont from "next/font/local"

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

      <div className="relative grid grid-cols-1 lg:grid-cols-2 max-h-[700px] min-h-[600px]">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center px-6 py-[60px] sm:py-[70px] lg:py-[80px] lg:px-16 gap-[24px] lg:gap-[32px]">
    
          <span className={`${gtSuperDisplay.className} flex flex-col text-[34px] sm:text-[44px] md:text-[46px] lg:text-[44px] xl:text-[80px] font-[300] text-white leading-[1.1] xl:leading-[80px] tracking-[0]`}>
            <span className={`${gtSuperDisplayLight.className} font-[300]`}>Some Moments <br />Deserve More Than</span>
            <span className="font-[500] text-[#CAA64A]">
              Your Gallery
            </span>
          </span>

          <p className={`${jost.className} text-[30px] font-[400] leading-[36px] tracking-[0] text-gray-200 max-w-[90%] lg:max-w-[520px]`}>
            Transform your gallery into beautifully crafted keepsakes through WhatsApp — quick, easy, and memorable.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button className="rounded-full border-0 bg-[#CAA64A] px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-normal text-white hover:bg-[#b89442]">
              Start Vaulting
            </Button>

            <Button className="rounded-full border-0 bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-normal text-black hover:bg-gray-200">
              View Demo
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-[28px] flex items-end justify-center sm:mt-8 md:mt-9 lg:mt-10 xl:mt-11">
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