import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import localFont from "next/font/local"
const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

export const GiftingSpecial = () => {
    return (
        <section className="relative bg-[#305c57]">
            <img
                src="/landing-page/gifting-flower.svg"
                alt=""
                width={278}
                height={309}
                className="pointer-events-none absolute top-0 right-0 z-10 h-auto w-[min(278px,45vw)] max-w-full select-none sm:w-[278px]"
                aria-hidden
            />
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-3 py-8 sm:px-4 sm:py-11 md:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-14 xl:px-10">
            <img src="/landing-page/gifting-banner.svg" alt="Gifting Special" className="h-fit w-full max-w-[220px] object-cover sm:max-w-[320px] lg:max-w-[492px]" />
            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
                <h2 className={`${gtSuperDisplay.className} text-center text-2xl font-400 text-white sm:text-3xl lg:text-4xl`}>Gifting <span className="text-[#CAA64A]">Special</span></h2>
                <p className={`${jost.className} max-w-[620px] text-center text-sm font-400 text-white sm:text-base lg:text-lg xl:text-xl`}>Make gifting unforgettable with memory books that shine as brightly as your loved ones.</p>

                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {giftingSpecialItems.map((item) => (
    <GiftingCard key={item.title} step={item} />
  ))}
</div>

                <Button className="rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-xs font-400 text-black hover:bg-[#b89442] sm:px-5 sm:py-2.5 sm:text-sm">Gift Now <ArrowRight className="size-4 shrink-0" /></Button>
            </div>
            </div>
        </section>
    )
}

export const GiftingCard = ({ step }: { step: (typeof giftingSpecialItems)[number] }) => {
    return (
<div className="flex min-w-0 w-full flex-1 basis-[220px] flex-col items-start justify-center gap-4 rounded-[12px] bg-[#13352B] p-4">        <img src={step.image} alt={step.title} className="w-full h-auto rounded-[4px] object-cover max-h-[144px]" />
        <h3 className={`${jost.className} text-base font-500 text-white sm:text-lg`}>{step.title}</h3>
        <p className={`${jost.className} text-sm font-400 text-white sm:text-md`}>{step.description}</p>
       </div>
    )
}

const giftingSpecialItems = [
    {
        title: "Wedding",
        description: "Capture every precious detail of your journey from 'I do' to a lifetime of love.",
        image: "/landing-page/gifting-special-1.svg"
    },
    {
        title: "Baby Shower",
        description: "Record the heartfelt wishes and early moments as you prepare.",
        image: "/landing-page/gifting-special-2.svg"
    },
    {
        title: "Farewell",
        description: "Memory Vault preserves farewell moments, turning emotional good.",
        image: "/landing-page/gifting-special-3.svg"
    },
]