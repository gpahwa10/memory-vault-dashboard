import { notFound } from "next/navigation"
import { getMemoryById } from "@/lib/memories"
import { MemoryMediaContent } from "@/components/memory-media-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) return { title: "Media" }
  return { title: `${memory.title} · Photos & Videos | Memory Vault` }
}

export default async function MemoryMediaPage({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) notFound()

  return (
    <MemoryMediaContent
      memory={{
        ...memory,
        date: memory.date.toISOString(),
      }}
    />
  )
}
