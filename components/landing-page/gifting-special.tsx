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
        <section className="relative bg-[#1D453A]">
            <img
                src="/landing-page/gifting-flower.svg"
                alt=""
                width={278}
                height={309}
                className="pointer-events-none absolute top-0 right-0 z-10 h-auto w-[min(278px,45vw)] max-w-full select-none sm:w-[278px]"
                aria-hidden
            />
            <div className="flex flex-row items-center justify-center gap-[48px] px-[240px] py-[124px]">
            <img src="/landing-page/gifting-banner.svg" alt="Gifting Special" className="max-w-[592px] w-full h-fit object-cover" />
            <div className="flex flex-col items-center justify-center gap-[32px]">
                <h2 className={`${gtSuperDisplay.className} text-5xl font-400 text-white`}>Gifting <span className="text-[#CAA64A]">Special</span></h2>
                <p className={`${jost.className} text-2xl font-400 text-white text-center`}>Make gifting unforgettable with memory books that shine as brightly as your loved ones.</p>

                <div className="flex w-full min-w-0 flex-row flex-wrap items-stretch justify-center gap-6 lg:gap-[32px]">
                    {giftingSpecialItems.map((item) => (
                        <GiftingCard key={item.title} step={item} />
                    ))}
                </div>

                <Button className="rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-sm font-400 text-black hover:bg-[#b89442]">Gift Now <ArrowRight className="size-4 shrink-0" /></Button>
            </div>
            </div>
        </section>
    )
}

export const GiftingCard = ({ step }: { step: (typeof giftingSpecialItems)[number] }) => {
    return (
       <div className="flex min-w-0 w-full max-w-[280px] flex-1 flex-col items-start justify-center gap-[16px] rounded-[12px] bg-[#13352B] p-[16px] basis-[200px] sm:min-w-[200px]">
        <img src={step.image} alt={step.title} className="w-full h-auto rounded-[4px] object-cover max-h-[144px]" />
        <h3 className={`${jost.className} text-xl font-500 text-white`}>{step.title}</h3>
        <p className={`${jost.className} text-base font-400 text-white`}>{step.description}</p>
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