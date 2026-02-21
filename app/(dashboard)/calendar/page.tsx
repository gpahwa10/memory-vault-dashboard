"use client"

import { EventsCalendar } from "@/components/events-calendar"
import { useAddMemory } from "../add-memory-context"

export default function CalendarPage() {
  const openAddMemory = useAddMemory()
  return <EventsCalendar onAddMemory={openAddMemory} />
}
