import localFont from "next/font/local"

const gtSuperDisplay = localFont({
  src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
  display: "swap",
})

const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const AlbumDetailCtaSection = () => {
  return (
    <section className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col items-center justify-center gap-10 overflow-x-hidden bg-[#12473A] px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 md:gap-14 md:px-10 md:py-24 lg:gap-16 lg:px-16 lg:py-28 xl:gap-[64px] xl:px-20 xl:py-32 2xl:px-32">
      <h1
        className={`${gtSuperDisplay.className} w-full max-w-2xl px-1 text-balance text-center text-2xl font-normal leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
      >
        Real Reactions. <span className="text-[#CAA64A]">Real Memories</span>
      </h1>
      <p
        className={`${jost.className} max-w-xl text-pretty text-center text-md font-normal leading-relaxed text-white/95 sm:text-lg md:text-xl lg:text-lg xl:text-xl`}
      >
        Watch families open their Memory Books and relive unforgettable, heartfelt moments together.
      </p>
    </section>
  )
}