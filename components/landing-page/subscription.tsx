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
        <div className="flex flex-col items-center justify-center bg-[#EDE9DF] gap-[24px] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-20 xl:py-28 2xl:px-32 2xl:py-24 min-[1920px]:px-[240px] min-[1920px]:py-[116px]">
            <h2 className={`${gtSuperDisplay.className} text-center text-3xl font-400 text-[#12473A] sm:text-4xl lg:text-5xl`}>
                Flexible packages for <span className="text-[#CAA64A]">Every Unique Need</span>
            </h2>
            <p className={`${jost.className} text-center text-base font-400 text-[#615F5A] sm:text-lg lg:text-2xl`}>
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
        name: 'Silver',
        pages: 15,
        price: '$29',
        features: ['15 Pages', 'Basic Templates', 'Digital Download','Email support'],
        isPopular: false,
    },
    {
        id: '2',
        name: 'Gold',
        pages: 25,
        price: '$49',
        features: ['25 Pages', 'Premium Templates', 'Digital + Print','Priority support', 'Free Revisions' ],
        isPopular: true,
    },
    {
        id: '3',
        name: 'Platinum',
        pages: 35,
        price: '$29',
        features: ['35 Pages', 'Exclusive Templates', 'Digital + Premium Print','24/7 support'],
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
                    <div className="w-full bg-[#12473A] py-3 text-center text-sm font-600 tracking-widest text-white uppercase">
                        Most Popular
                    </div>
                )}

                {/* Card Body */}
                <div
                    className={`flex h-auto min-h-[560px] w-full flex-col items-start justify-between gap-[16px] bg-white px-[16px] py-6 shadow-[0px_0px_14px_0px_#0000000F] ${
                        !plan.isPopular ? "rounded-[12px]" : ""
                    }`}
                >
                    <div className="flex h-auto w-full flex-col items-start justify-center gap-[16px] rounded-[8px] border border-[#E3DED0] bg-[#F5F2EC] p-5 sm:p-6">
                        <div className="flex flex-col items-start justify-center gap-[10px]">
                            <h3 className={`${jost.className} text-2xl font-500 text-black`}>{plan.name}</h3>
                            <p className={`${jost.className} text-2xl font-400 text-[#615F5A]`}>{plan.pages} Pages</p>
                        </div>

                        <div className="h-[1px] w-full bg-[#E3DED0]"></div>

                        <p className="text-5xl font-bold text-[#CAA64A] sm:text-[64px]">
                            {plan.price}{" "}
                            <span className="text-2xl font-500 text-[#615F5A]">/ Book</span>
                        </p>

                        <ul className="flex flex-col items-start justify-center gap-[16px]">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-base font-400 text-[#615F5A]"
                                >
                                    <Check className="h-4 w-4 shrink-0 text-[#12473A]" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button className="mt-6 w-full rounded-full bg-[#CAA64A] text-black hover:bg-[#b89442]">
                        GET STARTED <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}