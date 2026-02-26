import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BookPreview } from "@/components/book-preview"
import { BuyBookCard } from "@/components/buy-book-card"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MemoryPreviewPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Link
        href={`/memory-detail/${id}`}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Memory
      </Link>
      <BookPreview />
      <BuyBookCard />
    </div>
  )
}

