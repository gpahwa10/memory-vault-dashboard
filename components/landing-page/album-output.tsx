"use client"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import localFont from "next/font/local"

const albums = [
    {
        id: 1,
        title: "Travel Stories",
        image: "/landing-page/album-output-1.svg",
    },
    {
        id: 2,
        title: "Baby's First Year",
        image: "/landing-page/album-output-2.svg",
    },
    {
        id: 3,
        title: "Wedding Memories",
        image: "/landing-page/album-output-3.svg",
    },
    {
        id: 4,
        title: "Anniversaries",
        image: "/landing-page/album-output-4.svg",
    },
    {
        id: 5,
        title: "Special Moments",
        image: "/landing-page/album-output-5.svg",
    },
]

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })


export const AlbumOutput = () => {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState(2)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)
    const [touchEndX, setTouchEndX] = useState<number | null>(null)
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)")
        const updateSize = () => setIsSmallScreen(mediaQuery.matches)

        updateSize()
        mediaQuery.addEventListener("change", updateSize)
        return () => mediaQuery.removeEventListener("change", updateSize)
    }, [])

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % albums.length)
    }

    const goToPrev = () => {
        setActiveIndex((prev) => (prev - 1 + albums.length) % albums.length)
    }

    const minSwipeDistance = 50

    const handleTouchStart = (x: number | null) => {
        if (x === null) return
        setTouchEndX(null)
        setTouchStartX(x)
    }

    const handleTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) return

        const distance = touchStartX - touchEndX
        if (Math.abs(distance) < minSwipeDistance) return

        if (distance > 0) {
            goToNext()
        } else {
            goToPrev()
        }
    }

    const getCardStyle = (index: number) => {
        const offset = index - activeIndex
        const absOffset = Math.abs(offset)

        if (absOffset > 2) return { display: "none" }

        const zIndex = 10 - absOffset
        const scale = offset === 0 ? 1 : absOffset === 1 ? (isSmallScreen ? 0.84 : 0.9) : isSmallScreen ? 0.72 : 0.78
        const translateX = offset * (isSmallScreen ? 130 : 260)
        const translateY = offset === 0 ? -20 : absOffset === 1 ? 0 : 10
        const opacity = absOffset === 2 ? 0.6 : 1

        return {
            zIndex,
            transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            opacity,
            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 bg-[#EDE9DF]e px-4 py-12 sm:gap-6 sm:px-6 sm:py-16 md:px-10 lg:px-14 xl:px-20 2xl:px-32 min-[1920px]:px-[240px]">
            {/* Heading */}
            <h2 className={`${gtSuperDisplay.className} text-center text-3xl font-normal text-[#12473A] sm:text-4xl lg:text-5xl`}>
                Album <span className="text-[#CAA64A]">Output</span>
            </h2>
            <p className={`${jost.className} max-w-[680px] text-center text-sm text-[#615F5A] sm:text-base lg:text-lg`}>
                Explore our range of professionally crafted memory books for every occasion
            </p>

            {/* Cards Fan */}
            <div
                className="relative flex w-full touch-pan-y items-center justify-center"
                style={{ height: isSmallScreen ? "400px" : "520px" }}
                onTouchStart={(event) => handleTouchStart(event.targetTouches[0]?.clientX ?? null)}
                onTouchMove={(event) => setTouchEndX(event.targetTouches[0]?.clientX ?? null)}
                onTouchEnd={handleTouchEnd}
            >
                {albums.map((album, index) => {
                    const offset = index - activeIndex
                    const absOffset = Math.abs(offset)
                    if (absOffset > 2) return null

                    return (
                        <div
                            key={album.id}
                            onClick={() => setActiveIndex(index)}
                            className="absolute cursor-pointer overflow-hidden rounded-2xl"
                            style={{
                                width: offset === 0 ? (isSmallScreen ? "220px" : "340px") : absOffset === 1 ? (isSmallScreen ? "190px" : "300px") : isSmallScreen ? "150px" : "220px",
                                height: offset === 0 ? (isSmallScreen ? "320px" : "460px") : absOffset === 1 ? (isSmallScreen ? "280px" : "400px") : isSmallScreen ? "240px" : "360px",
                                ...getCardStyle(index),
                            }}
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-gray-400"
                                style={{ backgroundImage: `url(${album.image})` }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Title + Arrow (active card) */}
                            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                                <span className={`${jost.className} text-lg font-500 text-white drop-shadow sm:text-xl`}>
                                    {album.title}
                                </span>
                                {offset === 0 && (
                                    <button
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md transition-colors hover:bg-gray-100"
                                        aria-label={`View details for ${album.title}`}
                                        // onClick={(event) => {
                                        //     event.stopPropagation()
                                        //     router.push(`/albums/${album.id}`)
                                        // }}
                                    >
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-2">
                {albums.map((album, index) => (
                    <button
                        key={album.id}
                        onClick={() => setActiveIndex(index)}
                        className={`rounded-full transition-all duration-300 ${
                            index === activeIndex
                                ? "h-3 w-3 bg-[#CAA64A]"
                                : "h-2.5 w-2.5 bg-[#C5BFAF]"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}