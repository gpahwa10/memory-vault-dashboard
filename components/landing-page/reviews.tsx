"use client"

import localFont from "next/font/local";

const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })
    
export const Reviews = () => {
    const reviews = [
        {
            type: "image",
            src: "/wedding-photo.jpg",
            alt: "Wedding couple",
            rotation: "-rotate-2",
            emoji: "💛"
        },
        {
            type: "testimonial",
            text: "Memory Vault beautifully preserved our family's most precious moments with care and detail, turning them into timeless keepsakes we can cherish and relive for generations to come.",
            author: "Sarah Johnson",
            rotation: "rotate-1"
        },
        {
            type: "image",
            src: "/birthday-cake.jpg",
            alt: "Birthday cake celebration",
            rotation: "rotate-2",
            emoji: "🍼"
        },
        {
            type: "testimonial",
            text: "I highly recommend Memory Vault to all my clients—the quality is exceptional, and the entire process is smooth, professional, and completely hassle-free from start to finish.",
            author: "Michael Chen",
            rotation: "-rotate-1"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center bg-[#EDE9DF] gap-[24px] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-20 xl:py-28 2xl:px-32 2xl:py-24 min-[1920px]:px-[240px] min-[1920px]:py-[116px]">
            <h2 className={`${gtSuperDisplay.className} text-5xl font-400 text-[#12473A]`}>
                What our Happy <span className="text-[#CAA64A]">Families Say</span>
            </h2>
            <p className={`${jost.className} text-2xl font-400 text-[#615F5A]`}>
                Real stories from families who treasure their memories
            </p>

            {/* Testimonials Carousel Row */}
            <div className="relative w-full mt-8">
                {/* Dashed connecting line */}
                <div
                    className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t-2 border-dashed border-[#CAA64A] opacity-60 z-0"
                    style={{ borderSpacing: "8px" }}
                />

                <div className="relative z-10 flex items-center justify-center gap-6 overflow-x-auto pb-4">
                    {reviews.map((item, index) =>
                        item.type === "image" ? (
                            /* Polaroid Photo Card */
                            <div
                                key={index}
                                className={`flex-shrink-0 bg-white p-3 pb-10 shadow-md ${item.rotation} w-[220px] relative`}
                                style={{ boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }}
                            >
                                <div className="w-full h-[200px] bg-gray-200 overflow-hidden">
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
                                <div className="absolute bottom-3 left-3 text-xl">{item.emoji}</div>
                            </div>
                        ) : (
                            /* Testimonial Card */
                            <div
                                key={index}
                                className={`flex-shrink-0 bg-[#12473A] rounded-2xl p-7 ${item.rotation} w-[260px] flex flex-col justify-between min-h-[240px]`}
                            >
                                <p className={`${jost.className} text-white text-sm leading-relaxed font-normal`}>
                                    {item.text}
                                </p>
                                <p className={`${jost.className} text-[#CAA64A] text-sm font-medium mt-4`}>
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