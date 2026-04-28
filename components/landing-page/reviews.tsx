"use client"

import localFont from "next/font/local";
import { useEffect, useRef } from "react";

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })
    
type ReviewImage = {
    type: "image"
    src: string
    alt: string
    rotation: string
    emoji: string
    /** Distinct key when the same asset repeats before different quotes */
    instanceId: string
}

type ReviewTestimonial = {
    type: "testimonial"
    text: string
    author: string
    rotation: string
}

type ReviewItem = ReviewImage | ReviewTestimonial

const polaroidTemplates: Omit<ReviewImage, "instanceId">[] = [
    {
        type: "image",
        src: "/landing-page/review-image-2.svg",
        alt: "Wedding couple",
        rotation: "-rotate-2",
        emoji: "/landing-page/review-illustration-1.svg",
    },
    {
        type: "image",
        src: "/landing-page/review-image-1.svg",
        alt: "Birthday cake celebration",
        rotation: "rotate-2",
        emoji: "/landing-page/review-illustration-2.svg",
    },
]

const testimonials: ReviewTestimonial[] = [
    {
        type: "testimonial",
        text: "Memory Vault beautifully preserved our family's most precious moments with care and detail, turning them into timeless keepsakes we can cherish and relive for generations to come.",
        author: "Aarav Patel",
        rotation: "rotate-1",
    },
    {
        type: "testimonial",
        text: "I highly recommend Memory Vault to all my clients—the quality is exceptional, and the entire process is smooth, professional, and completely hassle-free from start to finish.",
        author: "Hansika Mahajan",
        rotation: "-rotate-1",
    },
    {
        type: "testimonial",
        text: "From old photographs to special milestones, Memory Vault helped us relive our journey in the most beautiful way possible. The attention to detail truly exceeded our expectations.",
        author: "Rohan Mehta",
        rotation: "rotate-2",
    },
    {
        type: "testimonial",
        text: "The entire experience felt premium and personal. Every memory was handled with such care that it felt like we were seeing our life story unfold again.",
        author: "Neha Kapoor",
        rotation: "-rotate-2",
    },
    {
        type: "testimonial",
        text: "Absolutely loved the final outcome! It’s not just a service, it’s an emotional experience that every family should go through at least once.",
        author: "Vikram Singh",
        rotation: "rotate-1",
    },
]

const interleavedReviews: ReviewItem[] = (() => {
    const out: ReviewItem[] = []
    for (let i = 0; i < testimonials.length; i++) {
        const template = polaroidTemplates[i % polaroidTemplates.length]
        const quote = testimonials[i]
        out.push({
            ...template,
            instanceId: `polaroid-${quote.author}`,
        })
        out.push(quote)
    }
    return out
})()

export const Reviews = () => {
    const reviewsContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = reviewsContainerRef.current
        if (!container) return

        const autoScrollInterval = window.setInterval(() => {
            const maxScrollLeft = container.scrollWidth - container.clientWidth
            if (maxScrollLeft <= 0) return

            const nextScrollLeft = container.scrollLeft + 280
            if (nextScrollLeft >= maxScrollLeft - 4) {
                container.scrollTo({ left: 0, behavior: "smooth" })
                return
            }

            container.scrollTo({ left: nextScrollLeft, behavior: "smooth" })
        }, 2000)

        return () => window.clearInterval(autoScrollInterval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-6 bg-[#EDE9DF] px-3 py-8 sm:px-4 sm:py-11 md:px-6 md:py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-18">
            <h2 className={`${gtSuperDisplay.className} text-center text-2xl font-400 text-[#12473A] sm:text-3xl lg:text-4xl`}>
                What our Happy <span className="text-[#CAA64A]">Families Say</span>
            </h2>
            <p className={`${jost.className} text-center text-sm font-400 text-[#615F5A] sm:text-base lg:text-lg xl:text-xl`}>
                Real stories from families who treasure their memories
            </p>

            {/* Testimonials Carousel Row */}
            <div className="relative mt-8 w-full max-w-[1320px]">
                {/* Dashed connecting line */}
                <div
                    className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t-2 border-dashed border-[#CAA64A] opacity-60 z-0"
                    style={{ borderSpacing: "8px" }}
                />

                <div
                    ref={reviewsContainerRef}
                    className="reviews-scroll relative z-10 flex items-center justify-start gap-4 overflow-x-auto pb-4 sm:gap-6"
                >
                    {interleavedReviews.map((item) =>
                        item.type === "image" ? (
                            /* Polaroid Photo Card */
                            <div
                                key={item.instanceId}
                                className={`relative w-[200px] flex-shrink-0 bg-white p-3 pb-8 shadow-md sm:w-[220px] sm:pb-10 ${item.rotation}`}
                                style={{ boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }}
                            >
                                <div className="h-[180px] w-full overflow-hidden bg-gray-200 sm:h-[200px]">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                                {/* Emoji decoration */}
                                <div className="absolute bottom-3 left-3 text-xl">
                                    <img
                                        src={item.emoji}
                                        alt={item.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ) : (
                            /* Testimonial Card */
                            <div
                                key={item.author}
                                className={`flex w-[220px] min-h-[220px] flex-shrink-0 flex-col justify-between rounded-2xl bg-[#12473A] p-5 sm:w-[260px] sm:min-h-[240px] sm:p-7 ${item.rotation}`}
                            >
                                <p className={`${jost.className} text-white text-xs leading-relaxed font-normal sm:text-sm`}>
                                    {item.text}
                                </p>
                                <p className={`${jost.className} text-[#CAA64A] text-xs font-medium mt-4 sm:text-sm`}>
                                    {item.author}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};