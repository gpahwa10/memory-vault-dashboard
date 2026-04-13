import localFont from "next/font/local"
const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const ShippingBanner = () => {
  return (
    <div className="flex justify-center border-t border-border bg-[#EDE9DF] px-4 py-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
        <img
          src="/landing-page/truck.svg"
          alt=""
          className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
        />
        <h2 className={`${jost.className} text-center text-xs font-normal leading-snug text-foreground sm:text-sm md:text-base`}>
          Free Shipping Across India – No Hidden Charges.
        </h2>
      </div>
    </div>
  )
}
