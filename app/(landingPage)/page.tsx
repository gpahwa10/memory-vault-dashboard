import { HeroSection } from "@/components/landing-page/hero-section"
import { FaqSection } from "@/components/landing-page/faq-section"
import { HowWeWork } from "@/components/landing-page/how-we-work"
import { GiftingSpecial } from "@/components/landing-page/gifting-special"
import { WhyChooseUs } from "@/components/landing-page/why-choose-us"
import { AlbumOutput } from "@/components/landing-page/album-output"
import { Subscription } from "@/components/landing-page/subscription"
import { Reviews } from "@/components/landing-page/reviews"
export default function LandingPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <HeroSection />
      <HowWeWork />
      <AlbumOutput />
      <WhyChooseUs />
      <Subscription />
      <GiftingSpecial />  
      <FaqSection />
      <Reviews />
      
    </main>
  )
}
