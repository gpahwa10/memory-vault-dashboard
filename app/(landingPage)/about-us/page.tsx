import localFont from "next/font/local"

const gtSuperDisplay = localFont({
    src: "../../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

export default function AboutUsPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-[24px] overflow-x-hidden bg-[#EDE9DF] px-3 py-8 sm:px-4 sm:py-11 md:px-7 md:py-14 lg:px-10 lg:py-16 xl:px-14 xl:py-20 2xl:px-24 2xl:py-16 min-[1920px]:px-[168px] min-[1920px]:py-[80px]">
            <h1 className={`${gtSuperDisplay.className} text-2xl font-400 text-[#12473A] sm:text-3xl lg:text-4xl`}>About <span className="text-[#CAA64A]">Us</span></h1>
        </div>
    )
}