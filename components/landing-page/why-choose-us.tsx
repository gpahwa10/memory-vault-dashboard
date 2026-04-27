"use client"
import localFont from "next/font/local"
import { useState } from "react"

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
})

const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
})


export const WhyChooseUs = () => {
    const [activeFeature, setActiveFeature] = useState<(typeof whyChooseUs)[number]>(
        whyChooseUs[0]
    )

    return (
        <div className="bg-[#305c57] flex w-full flex-col items-center justify-between gap-10 px-3 py-8 sm:gap-12 sm:px-4 sm:py-11 md:px-6 md:py-14 lg:gap-14 lg:px-8 lg:py-16 xl:px-10 xl:py-18">
            <div className="flex w-full max-w-[1320px] flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-[32px]">
                <h2 className={`${gtSuperDisplay.className} text-2xl font-400 text-white sm:text-3xl lg:text-4xl`}>Why Choose <span className="text-[#CAA64A]">Us</span></h2>
            </div>
            <div className="flex w-full max-w-[1320px] flex-row items-start justify-between gap-4">
                <div className="relative flex w-full max-w-[632px] min-h-[280px] overflow-hidden rounded-[12px] border border-white/10 sm:min-h-[340px] lg:min-h-[436px]">
                    {whyChooseUs.map((feature) => (
                        <img
                            key={feature.title}
                            src={feature.image}
                            alt={feature.title}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFeature.title === feature.title ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex w-full max-w-[520px] flex-col divide-y divide-white/20 rounded-[12px] border border-white/10 bg-[#244743]/40">
                    {whyChooseUs.map((item) => (
                        <WhyChooseUsComponent
                            key={item.title}
                            item={item}
                            isActive={activeFeature.title === item.title}
                            onHover={() => setActiveFeature(item)}
                        />
                    ))}
                </div>
            </div>
            <div className="grid w-full max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                {whyChooseUsItems.map((item) => (
                    <WhyChooseUsItem key={item.title} item={item} />
                ))}
            </div>

        </div>
    )
}

const WhyChooseUsItem = ({ item }: { item: (typeof whyChooseUsItems)[number] }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="group flex h-full min-h-[220px] w-full cursor-default flex-col items-center justify-start gap-4 rounded-[12px] bg-[#244743] p-5 text-center transition-all duration-300 sm:min-h-[240px] sm:p-6 lg:min-h-[260px] lg:p-7"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Left: icon pill + text */}
            <div className="flex min-w-0 flex-col items-center gap-4">
                <img
                    src={item.image}
                    alt=""
                    className={`h-16 w-16 object-contain p-1 transition-all duration-500 sm:h-20 sm:w-20 ${hovered ? "scale-100 opacity-100" : "scale-75 opacity-25"
                        }`}
                    style={{
                        filter:
                            "brightness(0) saturate(100%) invert(75%) sepia(33%) saturate(586%) hue-rotate(9deg) brightness(92%) contrast(89%)",
                    }}
                />
                {/* Text */}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span
                        className={`${jost.className} text-base font-500 text-white/80 transition-colors duration-300 group-hover:text-white sm:text-lg`}
                    >
                        {item.title}
                    </span>
                    <p
                        className={`${jost.className} text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/70`}
                    >
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const WhyChooseUsComponent = ({
    item,
    isActive,
    onHover,
}: {
    item: (typeof whyChooseUs)[number]
    isActive: boolean
    onHover: () => void
}) => {
    return (
        <div
            className="group flex cursor-default items-center gap-4 px-4 py-4 transition-all duration-300 sm:px-5 sm:py-5"
            onMouseEnter={onHover}
        >
            {/* Left: icon pill + title */}
            <div className="flex min-w-0 items-center gap-4">
                <div
                    className={`relative hidden h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-all duration-500 sm:flex ${isActive
                        ? "border-[#CAA64A]/50 bg-[#CAA64A]/10 shadow-[0_0_20px_rgba(202,166,74,0.12)]"
                        : "border-[#CAA64A]/20 bg-[#CAA64A]/5"
                        }`}
                >
                    <img
                        src={item.icon}
                        alt=""
                        className={`h-full w-full object-contain p-2 transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-75 opacity-25"
                            }`}
                        style={{
                            filter:
                                "brightness(0) saturate(100%) invert(75%) sepia(33%) saturate(586%) hue-rotate(9deg) brightness(92%) contrast(89%)",
                        }}
                    />
                </div>
                {/* Title */}
                <span
                    className={`${jost.className} text-left text-base font-400 transition-colors duration-300 ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}
                >
                    {item.title}
                </span>
            </div>
        </div>
    )
}
const whyChooseUsItems = [
    {
        title: "Premium Paper",
        description: "Hard Cover",
        image: "/landing-page/why-choose-us-icons/book.svg"
    },
    {
        title: "WhatsApp-native",
        description: "No app to download. No login to remember. Just reply to a message, like you do every day.",
        image: "/landing-page/why-choose-us-icons/whatsapp.svg"
    },
    {
        title: "We ask the right questions",
        description: "500+ prompts written specifically to make you remember things you'd have forgotten.",
        image: "/landing-page/why-choose-us-icons/question-circle.svg"
    },
    {
        title: "Your words, beautifully kept",
        description: "ext enhancement means your casual replies become album-ready entries. Your voice, just polished.",
        image: "/landing-page/why-choose-us-icons/sparkle.svg"
    },
]

const whyChooseUs = [
    {
        title: "Add Reel",
        icon: "/landing-page/why-choose-us-icons/reel.svg",
        image: "/landing-page/why-choose-us-icons/images/add-reel.png"
    },  
    {
        title: "Text enhancement",
        icon: "/landing-page/why-choose-us-icons/sparkle.svg",
        image: "/landing-page/why-choose-us-icons/images/text-enhancement.png"
    },
    {
        title: "Live album update",
        icon: "/landing-page/why-choose-us-icons/gallery.svg",
        image: "/landing-page/why-choose-us-icons/images/live-album-update.png"
    },
    {
        title: "Video/audio through QR boxes",
        icon: "/landing-page/why-choose-us-icons/qr-code.svg",
        image: "/landing-page/why-choose-us-icons/images/video-qr.png"
    },

]