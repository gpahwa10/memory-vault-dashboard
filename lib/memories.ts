export interface MemoryQuestionMedia {
  id: string
  type: "image" | "video"
  url: string
  name?: string
}

export interface MemoryQuestion {
  question: string
  answer?: string
  /** Shown as placeholder or sample for unanswered questions */
  sampleAnswer?: string
  media?: MemoryQuestionMedia[]
}

export interface Memory {
  id: string
  title: string
  date: Date
  description: string
  images: string[]
  hasVideo: boolean
  liked: boolean
  category: string
  memoryQuestions?: MemoryQuestion[]
}

export const MEMORY_CATEGORIES = [
  "Wedding Albums",
  "Travel Journey",
  "Baby Milestones",
  "Graduation Books",
] as const

const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "First Steps",
    date: new Date(2026, 0, 15),
    description:
      "She took her very first steps today! Three wobbly steps towards daddy, and we all cheered with tears of joy.",
    images: ["/samples/memory-1.jpg"],
    hasVideo: false,
    liked: true,
    category: "Milestone",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "Seeing her face light up with pride when she reached daddy.", media: [{ id: "mq1", type: "image", url: "/samples/memory-1.jpg", name: "memory-1.jpg" }] },
      { question: "Who was there?", answer: "Mom, dad, and grandma.", media: [] },
      { question: "What would you tell your future self about this day?", answer: "That joy is in the small wins.", media: [] },
    ],
  },
  {
    id: "2",
    title: "First Birthday",
    date: new Date(2026, 0, 28),
    description:
      "The most magical day - her first birthday celebration with all the family gathered around.",
    images: ["/samples/memory-2.jpg"],
    hasVideo: true,
    liked: true,
    category: "Celebration",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "The whole family together for her first cake.", media: [{ id: "mq2a", type: "image", url: "/samples/memory-2.jpg", name: "memory-2.jpg" }, { id: "mq2b", type: "video", url: "#", name: "birthday-clip.mp4" }] },
      { question: "Who was there?", answer: "Family and close friends.", media: [] },
      { question: "What would you tell your future self about this day?", answer: "", sampleAnswer: "That we celebrated with cake and everyone sang. I want to remember her face when we lit the candle.", media: [] },
    ],
  },
  {
    id: "3",
    title: "Sunday at the Park",
    date: new Date(2026, 1, 2),
    description:
      "A perfect sunny afternoon at the park. She loved running on the grass and chasing the butterflies.",
    images: ["/samples/memory-3.jpg"],
    hasVideo: false,
    liked: false,
    category: "Daily",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "", sampleAnswer: "The sun, the grass, and her laughing as she chased butterflies. A simple perfect afternoon." },
      { question: "Who was there?", answer: "Just the three of us." },
      { question: "What would you tell your future self about this day?", answer: "", sampleAnswer: "Days like this are the ones that matter—no plans, just us and the park." },
    ],
  },
  {
    id: "4",
    title: "Peaceful Nap Time",
    date: new Date(2026, 1, 5),
    description:
      "Found her sleeping so peacefully with her favourite teddy bear. These quiet moments are precious.",
    images: ["/samples/memory-4.jpg"],
    hasVideo: false,
    liked: true,
    category: "Daily",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "The calm after a busy morning." },
      { question: "Who was there?", answer: "", sampleAnswer: "Just the two of us—me and her, with her teddy." },
      { question: "What would you tell your future self about this day?", answer: "", sampleAnswer: "These quiet naps are when you catch your breath. Don't rush them." },
    ],
  },
  {
    id: "5",
    title: "Grandma's Love",
    date: new Date(2026, 1, 10),
    description:
      "The bond between grandma and her granddaughter is truly special. Three generations of love.",
    images: ["/samples/memory-5.jpg"],
    hasVideo: false,
    liked: true,
    category: "Family",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "Three generations in one frame." },
      { question: "Who was there?", answer: "Grandma, me, and the baby." },
      { question: "What would you tell your future self about this day?", answer: "Treasure these visits." },
    ],
  },
  {
    id: "6",
    title: "Building Blocks",
    date: new Date(2026, 1, 14),
    description:
      "She's becoming such a little architect! Built her tallest tower yet and was so proud of herself.",
    images: ["/samples/memory-6.jpg"],
    hasVideo: false,
    liked: false,
    category: "Daily",
    memoryQuestions: [
      { question: "What made this moment special?", answer: "", sampleAnswer: "She was so focused and proud when the tower stayed up. Her little face when it didn't fall!" },
      { question: "Who was there?", answer: "", sampleAnswer: "Just us at the living room floor." },
      { question: "What would you tell your future self about this day?", answer: "", sampleAnswer: "She's learning that small steps add up. So are you." },
    ],
  },
]

const defaultMemoryQuestions: MemoryQuestion[] = [
  { question: "What made this moment special?", sampleAnswer: "E.g. The light, the people, or a feeling you want to remember." },
  { question: "Who was there?", sampleAnswer: "List the people or say it was just you." },
  { question: "What would you tell your future self about this day?", sampleAnswer: "A short note to your future self about why this moment matters." },
]

export function getMemories(): Memory[] {
  return sampleMemories
}

export function getMemoryById(id: string): Memory | undefined {
  const memory = sampleMemories.find((m) => m.id === id)
  if (!memory) return undefined
  return {
    ...memory,
    memoryQuestions: memory.memoryQuestions ?? defaultMemoryQuestions,
  }
}
