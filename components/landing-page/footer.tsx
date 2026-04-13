import Link from "next/link"
import localFont from "next/font/local"
import { MapPin } from "lucide-react"
import { Button } from "../ui/button"

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
})

const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
})

export const Footer = () => {
    return (
        <footer className="bg-[#1D453A] px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14 xl:px-20 xl:py-16 2xl:px-32 2xl:py-[56px] min-[1920px]:px-[240px] min-[1920px]:py-[64px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="flex flex-col gap-2">
                    <span className={`${gtSuperDisplay.className} flex flex-row items-center gap-2 text-5xl font-500 text-white`}>
                        <p>Let's Stay </p>
                        <p className="text-[#CAA64A]">in touch!</p>
                    </span>
                    <p className={`${jost.className} text-2xl font-400 text-[#E3DED0]`}>Subscribe to our newsletter to get the latest news and updates.</p>
                </div>

                <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 lg:max-w-xl lg:shrink-0">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="min-h-10 w-full flex-1 rounded-full border-0 bg-white px-4 py-2 text-sm font-400 text-black"
                    />
                    <Button className="w-full shrink-0 rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-sm font-400 text-white hover:bg-[#b89442] sm:w-auto">
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className="h-[1px] w-full bg-[#568C85] my-6"></div>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 xl:gap-12">
                <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-[8px]">
                        <img
                            src="/logo-transparent.svg"
                            alt=""
                            className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px]"
                        />
                        <h1 className={`${gtSuperDisplay.className} truncate font-400 text-white text-xl sm:text-2xl lg:text-[32px]`}>
                            Memory Vault
                        </h1>
                    </div>
                    <p className={`${jost.className} text-2xl font-400 text-white`}>© 2026 Memory Vault. All rights <br /> reserved.</p>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    <div className="flex flex-col gap-4">
                        <h2 className={`${gtSuperDisplay.className} text-3xl font-400 text-[#CAA64A]`}>Useful Links</h2>
                        <nav className={`${jost.className} flex flex-col gap-3`} aria-label="Useful links">
                            <Link href="/about" className="text-2xl font-400 text-white hover:underline">
                                About us
                            </Link>
                            <Link href="/privacy-policy" className="text-2xl font-400 text-white hover:underline">
                                Privacy policy
                            </Link>
                            <Link href="/terms" className="text-2xl font-400 text-white hover:underline">
                                Terms and conditions
                            </Link>
                            <Link href="/contact" className="text-2xl font-400 text-white hover:underline">
                                Contact us
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className={`${gtSuperDisplay.className} text-3xl font-400 text-[#CAA64A]`}>Social Media</h2>
                        <nav className={`${jost.className} flex flex-col gap-3`} aria-label="Social media">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-400 text-white hover:underline"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-400 text-white hover:underline"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-400 text-white hover:underline"
                            >
                                Twitter
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-400 text-white hover:underline"
                            >
                                Youtube
                            </a>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
                        <h2 className={`${gtSuperDisplay.className} text-3xl font-400 text-[#CAA64A]`}>Contact info</h2>
                        <div className={`${jost.className} flex gap-3 text-2xl font-400 text-white`}>
                            <MapPin className="mt-1 h-7 w-7 shrink-0 text-white" aria-hidden />
                            <address className="not-italic font-400">
                                123 Memory Lane, Suite 400
                                <br />
                                San Francisco, CA 94102
                                <br />
                                United States
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
