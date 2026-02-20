"use client"

import { useState } from "react"
import { format, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  category: string
  color: string
}

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "First Steps",
    date: new Date(2026, 0, 15),
    category: "Milestone",
    color: "bg-vault-teal",
  },
  {
    id: "2",
    title: "First Birthday",
    date: new Date(2026, 0, 28),
    category: "Celebration",
    color: "bg-vault-gold",
  },
  {
    id: "3",
    title: "Sunday at the Park",
    date: new Date(2026, 1, 2),
    category: "Daily",
    color: "bg-vault-warm",
  },
  {
    id: "4",
    title: "Peaceful Nap Time",
    date: new Date(2026, 1, 5),
    category: "Daily",
    color: "bg-vault-warm",
  },
  {
    id: "5",
    title: "Grandma Visit",
    date: new Date(2026, 1, 10),
    category: "Family",
    color: "bg-vault-teal",
  },
  {
    id: "6",
    title: "Building Blocks",
    date: new Date(2026, 1, 14),
    category: "Daily",
    color: "bg-vault-warm",
  },
]

export function EventsCalendar({
  onAddMemory,
}: {
  onAddMemory?: () => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  const eventsForDate = selectedDate
    ? sampleEvents.filter((e) => isSameDay(e.date, selectedDate))
    : []

  const datesWithEvents = sampleEvents.map((e) => e.date)

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Events Calendar
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your memory timeline at a glance
          </p>
        </div>
        <button
          onClick={onAddMemory}
          className="inline-flex items-center gap-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark"
        >
          <PlusCircle className="h-4 w-4" />
          Add Memory
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Calendar */}
        <div className="overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            modifiers={{
              hasEvent: datesWithEvents,
            }}
            modifiersClassNames={{
              hasEvent: "ring-2 ring-vault-gold ring-offset-1 ring-offset-card",
            }}
            className="mx-auto"
          />
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

          {/* Upcoming events */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 font-serif text-base font-semibold text-foreground">
              Recent Memories
            </h3>
            <ul className="flex flex-col gap-2">
              {sampleEvents.slice(-4).reverse().map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                >
                  <span className="font-medium text-foreground">
                    {event.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(event.date, "MMM d")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
