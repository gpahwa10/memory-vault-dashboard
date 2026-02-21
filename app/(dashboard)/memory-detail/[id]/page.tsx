import { notFound } from "next/navigation"
import { getMemoryById } from "@/lib/memories"
import { MemoryDetailContent } from "@/app/(dashboard)/memory-detail/[id]/memory-detail-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) return { title: "Memory" }
  return { title: `${memory.title} | Memory Vault` }
}

export default async function MemoryDetailPage({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) notFound()

  return (
    <MemoryDetailContent
      memory={{
        ...memory,
        date: memory.date.toISOString(),
      }}
    />
  )
}
