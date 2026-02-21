import { getMemories } from "@/lib/memories"
import { MediaLandingContent } from "@/components/media-landing-content"

export default function MediaPage() {
  const memories = getMemories().map((m) => ({
    ...m,
    date: m.date.toISOString(),
  }))
  return <MediaLandingContent memories={memories} />
}
