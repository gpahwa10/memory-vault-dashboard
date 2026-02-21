import { getMemories } from "@/lib/memories"
import { QuestionsLandingContent } from "@/components/questions-landing-content"

export default function QuestionsPage() {
  const memories = getMemories().map((m) => ({
    ...m,
    date: m.date.toISOString(),
  }))
  return <QuestionsLandingContent memories={memories} />
}
