import localFont from "next/font/local"
const gtSuperDisplay = localFont({
    src: "../../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

export default function GiveGiftPage() {
    return (
        <div id="gifting" className="flex flex-col items-center justify-center gap-[24px] overflow-x-hidden bg-[#EDE9DF] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-20 xl:py-28 2xl:px-32 2xl:py-24 min-[1920px]:px-[240px] min-[1920px]:py-[116px]">
            <h1>Coming Soon</h1>
            
        </div>
    )
}