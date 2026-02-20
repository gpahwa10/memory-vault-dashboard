"use client"

import { useState } from "react"
import {
  HelpCircle,
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageSquare,
  ExternalLink,
} from "lucide-react"

const faqs = [
  {
    q: "How do I add a new memory?",
    a: "From the Dashboard, click 'Add a new memory' or use the sidebar. You can upload a photo or video, add a date, title, and description. Memories are automatically organized in your book.",
  },
  {
    q: "Can I reorder pages in my book?",
    a: "Yes. Go to Edit Book Details and use the drag-and-drop order, or open Preview and use the page order tool. Changes save automatically.",
  },
  {
    q: "How do I answer the questions?",
    a: "Open 'All Questions' from the sidebar. Each question shows a sample answer you can keep or edit. Type your own answer in the text box and it will appear in your book.",
  },
  {
    q: "What happens if I run out of storage?",
    a: "You'll see a notice on the Dashboard. You can buy more storage from the 'Want more videos?' card or in Settings → Subscription. We'll never delete your existing memories.",
  },
  {
    q: "How do I gift my book to someone?",
    a: "Use Quick Actions → Give a gift. Choose the book, enter the recipient's email and an optional message, then complete payment. They'll receive a link and can view the book for one year.",
  },
]

const resources = [
  { label: "Getting started guide", icon: BookOpen, href: "#" },
  { label: "Video tutorials", icon: ExternalLink, href: "#" },
  { label: "Community forum", icon: MessageSquare, href: "#" },
]

export function HelpScreen() {
  const [search, setSearch] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Help
        </h1>
        <p className="mt-1 text-muted-foreground">
          Find answers and get support
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help articles..."
          className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50"
              >
                {faq.q}
                {openFaq === i ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
          Resources
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {resources.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-vault-teal/40 hover:bg-vault-teal/5"
            >
              <r.icon className="h-5 w-5 text-vault-teal" />
              <span className="font-medium text-foreground">{r.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-vault-gold/30 bg-vault-gold/5 p-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-vault-gold/20">
            <Mail className="h-6 w-6 text-vault-gold" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground">
              Still need help?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team typically replies within 24 hours. Include your book name and a short description of the issue.
            </p>
            <button className="mt-3 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark">
              Contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
