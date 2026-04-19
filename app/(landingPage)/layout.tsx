import { Navbar } from "@/components/landing-page/navbar"
import { ShippingBanner } from "@/components/landing-page/shipping-banner"
import { Footer } from "@/components/landing-page/footer"

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col overflow-x-hidden">
        <ShippingBanner />
        <Navbar />
        <div className="flex flex-1 flex-col overflow-x-hidden">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}
// px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12