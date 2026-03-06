"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMemories, type Memory } from "@/lib/memories"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  category: string
  color: string
}

const memories: Memory[] = getMemories()

const memoryEvents: CalendarEvent[] = memories.map((memory) => {
  let color = "bg-vault-teal"
  if (memory.category === "Celebration") color = "bg-vault-gold"
  if (memory.category === "Daily") color = "bg-vault-warm"
  if (memory.category === "Family") color = "bg-vault-teal"

  return {
    id: memory.id,
    title: memory.title,
    date: memory.date,
    category: memory.category,
    color,
  }
})

export function EventsCalendar({
  onAddMemory,
}: {
  onAddMemory?: () => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [selectedBookId, setSelectedBookId] = useState<string>(
    memories[0]?.id ?? ""
  )

  const books = memories.map((m) => ({ id: m.id, title: m.title }))

  const eventsForBook = selectedBookId
    ? memoryEvents.filter((e) => e.id === selectedBookId)
    : memoryEvents

  const eventsForDate = selectedDate
    ? eventsForBook.filter((e) => isSameDay(e.date, selectedDate))
    : []

  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDayOfWeek = monthStart.getDay()

  const getEventsForDate = (date: Date) =>
    eventsForBook.filter((event) => isSameDay(event.date, date))

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Events Calendar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a memory book and explore its special dates
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Select
            value={selectedBookId}
            onValueChange={(value) => setSelectedBookId(value)}
          >
            <SelectTrigger className="w-full border-border bg-card text-sm">
              <SelectValue placeholder="Select memory book" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        {/* Calendar */}
        <div className="overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
                }
              >
                <span className="sr-only">Previous month</span>
                <span aria-hidden>‹</span>
              </Button>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                {format(month, "MMMM yyyy")}
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
                }
              >
                <span className="sr-only">Next month</span>
                <span aria-hidden>›</span>
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-border bg-background px-3 text-xs font-medium text-foreground hover:border-vault-teal hover:bg-vault-teal/5"
              onClick={() => {
                const today = new Date()
                setSelectedDate(today)
                setMonth(today)
              }}
            >
              Today
            </Button>
          </div>

          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-1 text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty leading cells */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {daysInMonth.map((day) => {
              const events = getEventsForDate(day)
              const hasEvents = events.length > 0
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <motion.button
                  key={day.toISOString()}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-all",
                    isSelected
                      ? "bg-vault-teal text-primary-foreground"
                      : isToday
                      ? "bg-muted text-foreground"
                      : "hover:bg-muted/70 text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isSelected && "text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  {hasEvents && (
                    <div className="mt-1 flex gap-0.5">
                      {events.slice(0, 3).map((event, index) => (
                        <span
                          key={index}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isSelected ? "bg-primary-foreground" : event.color
                          )}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 border-t border-border pt-3">
            <p className="mb-2 text-[11px] text-muted-foreground">Categories</p>
            <div className="flex flex-wrap gap-2">
              {["Milestone", "Celebration", "Daily", "Family"].map((category) => {
                const color =
                  memoryEvents.find((e) => e.category === category)?.color ??
                  "bg-muted-foreground"
                return (
                  <div key={category} className="flex items-center gap-1.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
                    <span className="text-[11px] text-muted-foreground">
                      {category}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Events sidebar */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a date"}
            </h3>
            {eventsForDate.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {eventsForDate.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <div
                      className={cn(
                        "h-3 w-3 shrink-0 rounded-full",
                        event.color
                      )}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {event.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.category}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-muted-foreground">
                No memories recorded for this date.
              </p>
            )}
          </div>

          {/* Capture new memory call-to-action */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Capture a new memory
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedDate
                ? `Add a new memory for ${format(selectedDate, "MMMM d, yyyy")}.`
                : "Pick a date on the calendar to add a new memory."}
            </p>
            {onAddMemory && (
              <Button
                type="button"
                onClick={onAddMemory}
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-vault-teal px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-vault-teal-dark"
              >
                <PlusCircle className="h-4 w-4" />
                Add memory
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
