"use client"

import { useState } from "react"
import { BookOpen, CreditCard, Package } from "lucide-react"
import { cn } from "@/lib/utils"

type BookType = "soft" | "hard"

export function BuyBookCard() {
  const [bookType, setBookType] = useState<BookType>("soft")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate payment redirect or modal
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  const isValid =
    formData.fullName.trim() &&
    formData.addressLine1.trim() &&
    formData.city.trim() &&
    formData.postalCode.trim() &&
    formData.country.trim()

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vault-gold/15 text-vault-gold">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
            Buy your book
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose format and enter delivery details
          </p>
        </div>
      </div>

      <form onSubmit={handleProceedToPayment} className="flex flex-col gap-6">
        {/* Book type */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Book type</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBookType("soft")}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                bookType === "soft"
                  ? "border-vault-teal bg-vault-teal/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-vault-gold/40"
              )}
            >
              <Package className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold">Soft cover</span>
                <p className="text-xs opacity-80">Lightweight, flexible</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setBookType("hard")}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                bookType === "hard"
                  ? "border-vault-teal bg-vault-teal/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-vault-gold/40"
              )}
            >
              <BookOpen className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold">Hard cover</span>
                <p className="text-xs opacity-80">Durable, premium</p>
              </div>
            </button>
          </div>
        </div>

        {/* Delivery details */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Delivery address</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Address line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                placeholder="Street address, P.O. box"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Address line 2 <span className="text-muted-foreground/70">(optional)</span>
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, suite, etc."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                State / Region
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State or region"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Postal code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                placeholder="ZIP / Postal code"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              >
                <option value="">Select country</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="CA">Canada</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Phone <span className="text-muted-foreground/70">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-vault-teal px-6 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark disabled:opacity-50 sm:w-auto sm:min-w-[200px]"
        >
          <CreditCard className="h-5 w-5" />
          {isSubmitting ? "Processing…" : "Proceed to payment"}
        </button>
      </form>
    </div>
  )
}
