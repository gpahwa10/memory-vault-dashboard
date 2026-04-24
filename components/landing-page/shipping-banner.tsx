import localFont from "next/font/local"
const jost = localFont({
  src: "../../public/fonts/Jost/static/Jost-Regular.ttf",
  display: "swap",
})

export const ShippingBanner = () => {
  return (
    <div className="flex justify-center border-t border-border bg-[#EDE9DF] px-3 py-1.5 sm:px-4 lg:px-6 xl:px-8">
      <div className="flex w-full max-w-[1320px] items-center justify-center gap-2 sm:gap-3">
        <img
          src="/landing-page/sale.svg"
          alt=""
          className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
        />
        <h2 className={`${jost.className} text-center text-[11px] font-normal leading-snug text-foreground sm:text-xs md:text-sm lg:text-base`}>
          Early Bird Discounts Live - Use Code “StartVaulting”
        </h2>
      </div>
    </div>
  )
}
