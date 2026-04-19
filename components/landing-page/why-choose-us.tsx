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
        <div className="bg-[#1D453A] flex w-full flex-col items-center justify-between gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:gap-14 lg:px-14 lg:py-24 xl:px-20 xl:py-28 2xl:px-32 2xl:py-24 min-[1920px]:px-[240px] min-[1920px]:py-[116px]">
            <div className="flex w-full max-w-[1479px] flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-[32px]">
                <h2 className={`${gtSuperDisplay.className} text-2xl font-400 text-white sm:text-3xl lg:text-4xl`}>Why Choose <span className="text-[#CAA64A]">Memory Vault</span></h2>
                <p className={`${jost.className} flex max-w-[592px] text-sm font-400 text-white sm:text-base lg:text-lg xl:text-xl`}>Every chapter of our process is designed to delight you — from premium materials to smart technology.</p>
            </div>
            <img src="/landing-page/why-choose-us-banner.svg" alt="Why Choose Memory Vault" className="w-full h-auto object-cover max-w-[932px] max-h-[536px]" />
            <div className="flex w-full max-w-[1479px] flex-wrap items-stretch justify-center gap-4 sm:gap-6 lg:gap-8 xl:flex-nowrap xl:justify-between">
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
            <img src={item.image} alt={item.title} className="w-full h-auto object-cover max-w-[64px] max-h-[64px]" />
            <h3 className={`${jost.className} text-lg font-500 text-white sm:text-xl`}>{item.title}</h3>
            <p className={`${jost.className} text-sm font-400 text-white sm:text-base`}>{item.description}</p>
        </div>
    )
}
const whyChooseUsItems = [
    {
        title: "Premium Quality",
        description: "Made with archival-grade materials to keep your memories safe, vibrant, and lasting for a lifetime.",
        image: "/landing-page/diamond.svg"
    },
    {
        title: "Eco-Friendly",
        description: "We use responsibly sourced, archival materials and carbon-neutral shipping.",
        image: "/landing-page/eco-friendly.svg"
    },
    {
        title: "Smart Features",
        description: "Technology that enhances your creativity — so you can focus on what matters most.",
        image: "/landing-page/favorites.svg"
    },
    {
        title: "Hassle-Free Service",
        description: "We make it easy from start to finish — so you can focus on what matters most: your memories.",
        image: "/landing-page/customer-support.svg"
    },
]