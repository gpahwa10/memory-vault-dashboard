"use client"

import { useState } from "react"
import { Printer, BookOpen, Truck, CreditCard, Check } from "lucide-react"

const formatOptions = [
  { id: "hardcover", label: "Hardcover", price: 49.99, desc: "Premium lay-flat binding" },
  { id: "softcover", label: "Softcover", price: 29.99, desc: "Matte finish, durable" },
]

export function PrintBookScreen() {
  const [format, setFormat] = useState("hardcover")
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState<"choose" | "address" | "payment" | "done">("choose")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const selectedFormat = formatOptions.find((f) => f.id === format) ?? formatOptions[0]
  const subtotal = selectedFormat.price * quantity
  const shipping = quantity === 1 ? 5.99 : 7.99
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setStep("done")
  }

  if (step === "done" && orderPlaced) {
    return (
      <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Print Your Book
          </h1>
          <p className="mt-1 text-muted-foreground">
            Order a physical copy of your memory book
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vault-teal/20 text-vault-teal">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Order confirmed!
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your {selectedFormat.label} book ({quantity} {quantity === 1 ? "copy" : "copies"}) will be printed and shipped within 5–7 business days. We&apos;ll email you tracking details.
          </p>
          <button
            onClick={() => { setOrderPlaced(false); setStep("choose"); }}
            className="mt-6 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Order another book
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Print Your Book
        </h1>
        <p className="mt-1 text-muted-foreground">
          Get a professional printed copy of your memory book
        </p>
      </div>

      {step === "choose" && (
        <>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Book & format
            </h2>
            <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="h-16 w-20 rounded bg-muted" />
              <div>
                <p className="font-medium text-foreground">Our Baby Book</p>
                <p className="text-xs text-muted-foreground">24 pages · A4</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {formatOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex flex-col gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                    format === f.id
                      ? "border-vault-teal bg-vault-teal/10"
                      : "border-border bg-background hover:border-vault-teal/40"
                  }`}
                >
                  <BookOpen className="h-6 w-6 text-vault-teal" />
                  <span className="font-semibold text-foreground">{f.label}</span>
                  <span className="text-sm text-muted-foreground">{f.desc}</span>
                  <span className="mt-1 font-bold text-vault-teal">${f.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setStep("address")}
              className="mt-6 flex items-center gap-2 rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
            >
              <Truck className="h-4 w-4" />
              Continue to shipping
            </button>
          </div>
        </>
      )}

      {step === "address" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Shipping address
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <input
              type="text"
              placeholder="Address line 1"
              className="col-span-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <input
              type="text"
              placeholder="City"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <input
              type="text"
              placeholder="Postal code"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setStep("choose")}
              className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Back
            </button>
            <button
              onClick={() => setStep("payment")}
              className="rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
            >
              Continue to payment
            </button>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Payment
          </h2>
          <div className="mb-4 rounded-lg border border-border bg-muted/50 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({quantity} × ${selectedFormat.price.toFixed(2)})</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold">
              <span>Total</span>
              <span className="text-vault-teal">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card number"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
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
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep("address")}
              className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex items-center gap-2 rounded-lg bg-vault-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-vault-gold/90"
            >
              <Printer className="h-4 w-4" />
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
