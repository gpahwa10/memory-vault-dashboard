import { ArrowRight } from "lucide-react"
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

export const HowWeWork = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#EDE9DF] px-3 py-8 sm:px-4 sm:py-11 md:px-6 md:py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-18">
                <h2 className={`${gtSuperDisplay.className} max-w-4xl text-center text-2xl font-500 leading-tight text-[#12473A] sm:text-3xl lg:text-4xl mb-2`}>
                    How It <span className="text-[#CAA64A]">Works</span>
                </h2>
            
            <div className="grid w-full max-w-[1320px] grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
                {howWeWorkSteps.map((step) => (
                    <HowWeWorkStep key={step.id} step={step} />
                ))}
            </div>

            <Button className="mt-8 inline-flex items-center gap-2 rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-xs font-400 text-black hover:bg-[#b89442] sm:text-sm lg:mt-10">
                See A Demo <ArrowRight className="size-4 shrink-0" />
            </Button>
        </div>
    )
}

export const HowWeWorkStep = ({ step }: { step: (typeof howWeWorkSteps)[number] }) => {
    return (
        <div className="mx-auto flex h-full min-w-0 w-full max-w-[460px] flex-col rounded-[20px] border border-solid border-[#E3DED0] bg-white p-5 sm:p-6 md:mx-0 md:max-w-none lg:p-8">
            <div className="flex w-full min-w-0 flex-row items-start justify-between gap-3">
                <h3 className={`${gtSuperDisplay.className} min-w-0 flex-1 text-left text-lg font-500 leading-snug text-[#12473A] sm:text-xl md:text-xl`}>
                    {step.title}
                </h3>
                <p
                    className={`${jost.className} shrink-0 text-4xl leading-none font-bold tabular-nums text-[#CAA64A]/20 sm:text-5xl lg:text-6xl`}
                    aria-hidden
                >
                    {step.id}
                </p>
            </div>
            <div className="mt-4 flex w-full justify-center">
                <img
                    src={step.image}
                    alt={step.title}
                    className="h-auto w-auto max-w-full"
                />
            </div>
            <p className={`${jost.className} mt-6 text-left text-sm font-400 leading-relaxed text-[#615F5A] sm:text-base lg:mt-8 lg:text-md`}>
                {step.description}
            </p>
        </div>
    )
}

const howWeWorkSteps = [
    {
        id: "01",
        title: "Share Your Memories",
        description:
            "Choose your occasion and Share your memories through whatsapp ",
        image: "/landing-page/how-we-work-1.svg",
    },
    {
        id: "02",
        title: "Preview Your Album",
        description:
            "Preview and edit your album in real time.",
        image: "/landing-page/how-we-work-2.svg",
    },
    {
        id: "03",
        title: "Cherish Forever",
        description:
            "Enjoy a customised, zero effort photo album, digital keepsake and a shareable reel of your journey.",
        image: "/landing-page/how-we-work-3.svg",
    },
]
