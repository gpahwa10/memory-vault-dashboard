import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { MemoryDetailContent } from "@/app/(dashboard)/memory-detail/[id]/memory-detail-content"
import { memoryDetailService } from "../memory-detail-service"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MemoryDetailPage({ params }: PageProps) {
  const { id } = await params
  const accessToken = (await cookies()).get("accessToken")?.value
  let memory = null
  try {
    memory = await memoryDetailService.getMemoryDetail(id, accessToken)
  } catch (error) {
    console.error("Failed to fetch memory detail:", error)
  }
  if (!memory) notFound()

  return <MemoryDetailContent memory={memory} />
}
