import { Navbar } from "@/components/landing-page/navbar"
import { ShippingBanner } from "@/components/landing-page/shipping-banner"
import { Footer } from "@/components/landing-page/footer"

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">

      {/* Sticky wrapper */}
      <div className="sticky top-0 z-50">
        <ShippingBanner />
        <Navbar />
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-[1440px]">
        {children}
        <Footer />
      </div>

    </div>
  )
}
