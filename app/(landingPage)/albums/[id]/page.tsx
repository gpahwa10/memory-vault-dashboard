import Link from "next/link"
import { notFound } from "next/navigation"

const albums = [
  {
    id: "1",
    title: "Travel Stories",
    image: "/landing-page/album-output-1.svg",
    description: "A timeless collection for your journeys, adventures, and unforgettable destinations.",
  },
  {
    id: "2",
    title: "Baby's First Year",
    image: "/landing-page/album-output-2.svg",
    description: "Capture your baby's milestones from first smile to first steps in one beautiful keepsake.",
  },
  {
    id: "3",
    title: "Wedding Memories",
    image: "/landing-page/album-output-3.svg",
    description: "Preserve your special day with a premium album crafted for your most cherished wedding moments.",
  },
  {
    id: "4",
    title: "Anniversaries",
    image: "/landing-page/album-output-4.svg",
    description: "Celebrate love and togetherness with an album that tells your anniversary story.",
  },
  {
    id: "5",
    title: "Special Moments",
    image: "/landing-page/album-output-5.svg",
    description: "From family gatherings to personal wins, keep every meaningful memory close.",
  },
]

type AlbumDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { id } = await params
  const album = albums.find((item) => item.id === id)

  if (!album) {
    notFound()
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#EDE9DF] px-4 py-10 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-32 min-[1920px]:px-[240px]">
      <div className="grid w-full max-w-6xl gap-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div
          className="min-h-[280px] w-full rounded-xl bg-cover bg-center sm:min-h-[360px] lg:min-h-[460px]"
          style={{ backgroundImage: `url(${album.image})` }}
        />

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[#CAA64A]">Album Detail</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#12473A] sm:text-4xl">{album.title}</h1>
          <p className="mt-4 text-base leading-7 text-[#615F5A]">{album.description}</p>

          <Link
            href="/"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#12473A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0E3A2F]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
