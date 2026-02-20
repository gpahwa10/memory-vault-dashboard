"use client"

import { useState } from "react"
import { Gift, Mail, MessageSquare, CreditCard, ArrowRight, Check } from "lucide-react"

export function GiveGiftScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
  }

  if (sent) {
    return (
      <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Give a Gift
          </h1>
          <p className="mt-1 text-muted-foreground">
            Share your memory book with someone special
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vault-teal/20 text-vault-teal">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Gift sent successfully!
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We&apos;ve sent an email to the recipient with a link to view your memory book. They can unlock it with the gift code you provided.
          </p>
          <button
            onClick={() => { setSent(false); setStep(1); setRecipientEmail(""); setMessage(""); }}
            className="mt-6 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Send another gift
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Give a Gift
        </h1>
        <p className="mt-1 text-muted-foreground">
          Send your memory book as a gift to a loved one
        </p>
      </div>

      {/* Steps */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              step >= s ? "bg-vault-teal" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Choose your book
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Our Baby Book", "Wedding Memories"].map((name, i) => (
                <button
                  key={name}
                  className="flex items-center gap-3 rounded-lg border-2 border-vault-teal bg-vault-teal/10 p-4 text-left transition-all hover:bg-vault-teal/15"
                >
                  <div className="h-12 w-16 rounded bg-muted" />
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "Baby · 24 pages" : "Wedding · 18 pages" }
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Recipient details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4 text-vault-teal" />
                  Email address
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MessageSquare className="h-4 w-4 text-vault-teal" />
                  Personal message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a note to your gift..."
                  rows={3}
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!recipientEmail.trim()}
                className="flex items-center gap-2 rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Payment & send
            </h2>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gift type</span>
                <span className="font-medium text-foreground">Digital access · 1 year</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium text-foreground">{recipientEmail || "—"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
                <span>Total</span>
                <span className="text-vault-teal">$24.99</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CreditCard className="h-4 w-4 text-vault-teal" />
                Card details
              </label>
              <input
                type="text"
                placeholder="Card number"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                className="flex items-center gap-2 rounded-lg bg-vault-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-vault-gold/90"
              >
                <Gift className="h-4 w-4" />
                Send gift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
