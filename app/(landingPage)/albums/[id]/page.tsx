import { AlbumDetailCtaSection } from "@/components/album-output/album-detail-cta-section"
import { AlbumDetailSection } from "@/components/album-output/album-detail-section"
import { AlbumOutputHeroSection } from "@/components/album-output/album-output-hero-section"

type AlbumDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {


  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden">
      <AlbumOutputHeroSection />
      <AlbumDetailSection />
      <AlbumDetailCtaSection />
    </main>
  )
}
