import localFont from "next/font/local"

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })


export const WhyChooseUs = () => {
    return (
        <div className="bg-[#1D453A] flex w-full flex-col items-center justify-between gap-10 px-3 py-8 sm:gap-12 sm:px-4 sm:py-11 md:px-7 md:py-14 lg:gap-14 lg:px-10 lg:py-16 xl:px-14 xl:py-20 2xl:px-24 2xl:py-16 min-[1920px]:px-[168px] min-[1920px]:py-[80px]">
            <div className="flex w-full max-w-[1479px] flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-[32px]">
                <h2 className={`${gtSuperDisplay.className} text-2xl font-400 text-white sm:text-3xl lg:text-4xl`}>Why Choose <span className="text-[#CAA64A]">Us</span></h2>
                {/* <p className={`${jost.className} flex max-w-[592px] text-sm font-400 text-white sm:text-base lg:text-lg xl:text-xl`}>Every chapter of our process is designed to delight you — from premium materials to smart technology.</p> */}
            </div>
            <div className="flex flex-row items-start justify-between gap-4">
            <img src="/landing-page/why-choose-us-banner.svg" alt="Why Choose Memory Vault" className="flex self-start items-start justify-start w-full h-auto  object-cover max-w-[932px] max-h-[536px]" />
            <div className="grid w-full max-w-[1479px] grid-cols-1 content-start gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                {whyChooseUs.map((item) => (
                    <WhyChooseUsComponent    key={item.title} item={item} />
                ))}
            </div>
            </div>
            <div className="flex w-full max-w-[1479px] flex-row items-stretch justify-start gap-4 sm:gap-6 lg:gap-8 xl:flex-nowrap xl:justify-between">
                {whyChooseUsItems.map((item) => (
                    <WhyChooseUsItem key={item.title} item={item} />
                ))}
            </div>
            
        </div>
    )
}

const WhyChooseUsItem = ({ item }: { item: (typeof whyChooseUsItems)[number] }) => {
    return (
        <div className="flex min-h-[260px] w-full max-w-[345.75px] flex-col items-start justify-center gap-4 rounded-[12px] bg-[#13352B] p-5 sm:min-h-[300px] sm:p-8 lg:h-[331px] lg:p-[42px]">
            <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 shrink-0 object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(75%) sepia(33%) saturate(586%) hue-rotate(9deg) brightness(92%) contrast(89%)" }}
            />
            <h3 className={`${jost.className} text-lg font-500 text-white sm:text-xl`}>{item.title}</h3>
            <p className={`${jost.className} text-sm font-400 text-white sm:text-base`}>{item.description}</p>
        </div>
    )
}

const WhyChooseUsComponent = ({ item }: { item: (typeof whyChooseUs)[number] }) => {
    return (
        <div className="flex w-fit flex-col items-start gap-4 rounded-[12px] bg-[#13352B] p-5 sm:p-8 lg:p-[42px]">
            <img
                src={item.icon}
                alt={item.title}
                className="h-12 w-12 shrink-0 object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(75%) sepia(33%) saturate(586%) hue-rotate(9deg) brightness(92%) contrast(89%)" }}
            />
            <h3 className={`${jost.className} text-lg font-500 text-white sm:text-xl`}>{item.title}</h3>
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
    },
    {
        title: "Text enhancement",
        icon: "/landing-page/why-choose-us-icons/sparkle.svg"
    },
    {
        title: "Live album update",
        icon: "/landing-page/why-choose-us-icons/gallery.svg",
    },
    {
        title: "Video/audio through QR boxes",
        icon: "/landing-page/why-choose-us-icons/qr-code.svg",
    },

]