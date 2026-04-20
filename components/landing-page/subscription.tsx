"use client"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, Check } from "lucide-react"
import localFont from "next/font/local"
const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

export const Subscription = () => {
    return (
        <div id="pricing" className="flex flex-col items-center justify-center gap-[24px] overflow-x-hidden bg-[#EDE9DF] px-3 py-8 sm:px-4 sm:py-11 md:px-7 md:py-14 lg:px-10 lg:py-16 xl:px-14 xl:py-20 2xl:px-24 2xl:py-16 min-[1920px]:px-[168px] min-[1920px]:py-[80px]">
            <h2 className={`${gtSuperDisplay.className} text-center text-2xl font-400 text-[#12473A] sm:text-3xl lg:text-4xl`}>
                Flexible packages for <span className="text-[#CAA64A]">Every Unique Need</span>
            </h2>
            <p className={`${jost.className} text-center text-sm font-400 text-[#615F5A] sm:text-base lg:text-lg xl:text-xl`}>
            Choose the perfect plan to beautifully preserve and celebrate your most cherished memories.
            </p>
            <div className="grid w-full max-w-[1470px] grid-cols-1 place-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
                {subscriptionPlans.map((plan) => (
                    <SubscriptionPlan key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    )
}

const subscriptionPlans = [
    {
        id: '1',
        name: 'Quick',
        pages: 10,
        duration: '3 Months',
        price: '₹1,499',
        features: ["Reel Generation", "Text Enhancements"],
        isPopular: false,
    },
    {
        id: '2',
        name: 'Half',
        pages: 25,
        duration: '6 Months',
        price: '₹2,499',
        features: [ "Reel Generation", "Text Enhancements" ],
        isPopular: false,
    },
    {
        id: '3',
        name: 'Complete',
        pages: 35,
        duration: '9 Months',
        price: '₹3,499',
        features: [ "Reel Generation", "Text Enhancements" ],
        isPopular: true,
    },
    {
        id: '4',
        name: 'Full',
        pages: 50,
        duration: '12 Months',
        price: '₹4,499',
        features: [ "Reel Generation", "Text Enhancements" ],
        isPopular: false,
    },
]

const SubscriptionPlan = ({ plan }: { plan: (typeof subscriptionPlans)[number] }) => {
    return (
        <div className="flex w-full max-w-[468px] flex-col items-center">
            <div
                className={`w-full rounded-[16px] overflow-hidden ${
                    plan.isPopular
                        ? "border-2 border-[#1D453A]"
                        : ""
                }`}
                style={plan.isPopular ? { boxShadow: "0px 0px 0px 4px rgba(29,69,58,0.15)" } : {}}
            >
                {/* Most Popular Banner */}
                {plan.isPopular && (
                    <div className="w-full bg-[#12473A] py-2.5 text-center text-[11px] font-600 tracking-widest text-white uppercase sm:py-3 sm:text-xs md:text-sm">
                        Most Popular
                    </div>
                )}

                {/* Card Body */}
                <div
                    className={`flex w-full flex-col items-start gap-[16px] bg-white px-[16px] py-6 shadow-[0px_0px_14px_0px_#0000000F] ${
                        !plan.isPopular ? "rounded-[12px]" : ""
                    }`}
                >
                    <div className="flex h-auto w-full flex-col items-start justify-center gap-[16px] rounded-[8px] border border-[#E3DED0] bg-[#F5F2EC] p-5 sm:p-6">
                        <div className="flex flex-col items-start justify-center gap-[10px]">
                            <h3 className={`${jost.className} text-xl font-500 text-black sm:text-2xl`}>{plan.name}</h3>
                            <p className={`${jost.className} text-lg font-400 text-[#615F5A] sm:text-xl`}>{plan.pages} Pages</p>
                            <p className={`${jost.className} text-sm font-400 text-[#615F5A] sm:text-base`}>{plan.duration}</p>
                        </div>

                        <div className="h-[1px] w-full bg-[#E3DED0]"></div>

                        <p className="text-3xl font-bold text-[#CAA64A] sm:text-4xl lg:text-5xl">
                            {plan.price}{" "}
                            <span className="text-base font-500 text-[#615F5A] sm:text-lg lg:text-xl">/ Book</span>
                        </p>

                        <ul className="flex flex-col items-start justify-center gap-[16px]">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-sm font-400 text-[#615F5A] sm:text-base"
                                >
                                    <Check className="h-4 w-4 shrink-0 text-[#12473A]" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button className="mt-6 w-full rounded-full bg-[#CAA64A] text-xs text-black hover:bg-[#b89442] sm:text-sm">
                        GET STARTED <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}