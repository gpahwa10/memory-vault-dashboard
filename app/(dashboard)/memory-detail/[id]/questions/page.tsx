import { notFound } from "next/navigation"
import { getMemoryById } from "@/lib/memories"
import { MemoryQuestionsContent } from "@/components/memory-questions-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) return { title: "Questions" }
  return { title: `${memory.title} · Questions | Memory Vault` }
}

export default async function MemoryQuestionsPage({ params }: PageProps) {
  const { id } = await params
  const memory = getMemoryById(id)
  if (!memory) notFound()

  return (
    <MemoryQuestionsContent
      memory={{
        ...memory,
        date: memory.date.toISOString(),
      }}
    />
  )
}
