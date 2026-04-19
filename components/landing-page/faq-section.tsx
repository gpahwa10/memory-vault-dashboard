"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion"
import localFont from "next/font/local"
const gtSuperDisplay = localFont({
    src: "../../public/fonts/gt-super-ds-trial/GT-Super-Display-Regular-Trial.otf",
    display: "swap",
  })
  
  const jost = localFont({
    src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
    display: "swap",
  })

const faqs = [
    {
        id: "1",
        question: "What is Memory Vault?",
        answer:
            "Memory Vault helps you turn photos and stories from your phone into beautiful keepsakes—organized, private, and easy to share with the people who matter most.",
    },
    {
        id: "2",
        question: "How do I get started?",
        answer:
            "Create an account, connect WhatsApp or upload your media, and follow the guided steps to build your vault. You can invite family and order print products when you are ready.",
    },
    {
        id: "3",
        question: "Is my content secure?",
        answer:
            "We use industry-standard encryption and access controls. Your memories stay private to you and anyone you explicitly invite.",
    },
    {
        id: "4",
        question: "Can I order a printed book?",
        answer:
            "Yes. Once your vault is ready, you can preview layouts and order high-quality printed books shipped to your door.",
    },
]

export const FaqSection = () => {
    return (
        <div className="flex flex-col gap-8 bg-[#E5E1D7] px-4 py-12 sm:gap-10 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-14 lg:py-16 xl:px-20 2xl:px-32 min-[1920px]:px-[240px]">
            <div className="flex min-w-0 flex-1 flex-col gap-6 lg:max-w-md">
                <span className={`${gtSuperDisplay.className} flex flex-row text-3xl font-500 text-black sm:text-4xl lg:text-5xl`}>
                    <p>FAQ</p>
                    <p className="text-[#CAA64A]">s</p>
                </span>
                <p className={`${jost.className} text-base font-400 text-[#615F5A] sm:text-lg lg:text-2xl`}>
                    Got questions? We’re here with clear answers to help you every step of the way.
                </p>
                <p className={`${jost.className} text-lg font-500 text-black sm:text-xl lg:text-2xl`}>Still have questions?</p>
                <Button className="max-w-fit rounded-full border-0 bg-[#CAA64A] px-4 py-2 text-sm font-400 text-black hover:bg-[#b89442]">
                    Contact us <Mail className="size-4" />
                </Button>
            </div>

            <Accordion
                type="single"
                collapsible
                className="flex w-full max-w-[907px] shrink-0 flex-col gap-4 lg:flex-1"
            >
                {faqs.map((item) => (
                    <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="border-none rounded-[20px] border border-solid border-[#E3DED0] bg-white p-4 sm:p-6"
                    >
                        <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger
                                className={cn(
                                    "group flex min-h-[42px] w-full flex-1 items-center justify-between gap-3 rounded-md border-0 bg-transparent p-0 text-left outline-none transition-none",
                                    "hover:no-underline focus-visible:ring-2 focus-visible:ring-[#CAA64A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                                    "disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]]:no-underline",
                                )}
                            >
                                <span className={`${jost.className} min-w-0 flex-1 text-base font-400 text-[#2d2418]`}>
                                    {item.question}
                                </span>
                                <span
                                    className={cn(
                                        "flex size-[42px] shrink-0 items-center justify-center rounded-[50px] border border-solid border-[#E3DED0] bg-white transition-colors",
                                        "group-data-[state=open]:border-transparent group-data-[state=open]:bg-[#CAA64A]",
                                    )}
                                    aria-hidden
                                >
                                    <ChevronDownIcon className="size-5 shrink-0 text-[#615F5A] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white" />
                                </span>
                            </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>
                        <AccordionContent className="border-0 pb-0 pt-4 text-base font-400 leading-relaxed text-[#615F5A]">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
