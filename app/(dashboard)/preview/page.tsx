import { BookPreview } from "@/components/book-preview"
import { BuyBookCard } from "@/components/buy-book-card"

export default function PreviewPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <BookPreview />
      <BuyBookCard />
    </div>
  )
}
