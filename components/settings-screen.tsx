'use client'

import { useState, useRef, useEffect } from "react"
import {
  User,
  Mail,
  Lock,
  CreditCard,
  Crown,
  Camera,
  Phone,
  MapPin,
  Calendar,
  Check,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  X,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { BASE_SUBSCRIPTION_PLANS, type SubscriptionPlanId } from "@/lib/subscription-plans"

const subscriptionTiers = BASE_SUBSCRIPTION_PLANS.map((base) => {
  const bookLabel = `${base.booksIncluded} memory book${base.booksIncluded > 1 ? "s" : ""}`
  const reelLabel = `${base.reelsIncluded} highlight reel${base.reelsIncluded > 1 ? "s" : ""}`

  return {
    id: base.id,
    name: base.name,
    price: base.price,
    durationLabel: base.durationLabel,
    features: [
      bookLabel,
      reelLabel,
      "Full access to Memory Vault during this period",
    ],
  }
})

type BillingFlow = "idle" | "extend" | "cancel" | "confirm-cancel" | "cancelled" | "extended"

export function SettingsScreen() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<"account" | "subscription" | "security">("account")
  const [selectedTier, setSelectedTier] = useState<SubscriptionPlanId>("3m")
  const [billingFlow, setBillingFlow] = useState<BillingFlow>("idle")
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatarSrc(reader.result as string)
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    const tab = searchParams.get("tab")
  
    if (
      tab === "account" ||
      tab === "subscription" ||
      tab === "security"
    ) {
      setActiveTab(tab as "account" | "subscription" | "security")
    }
  }, [searchParams])

  const currentTier = subscriptionTiers.find((t) => t.id === selectedTier)!

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {[
          { id: "account" as const, label: "Account", icon: User },
          { id: "subscription" as const, label: "Subscription", icon: CreditCard },
          { id: "security" as const, label: "Security", icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "border-vault-teal bg-vault-teal/15 text-vault-teal"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── ACCOUNT TAB ─────────────────────────────────────────────────── */}
      {activeTab === "account" && (
        <div className="space-y-4">
          {/* Avatar + name hero card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Decorative gradient band */}
            <div className="h-24 w-full bg-gradient-to-br from-vault-teal/20 via-vault-gold/10 to-transparent" />

            {/* Avatar */}
            <div className="absolute left-6 top-10 flex flex-col items-center">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-vault-teal/10">
                      <User className="h-10 w-10 text-vault-teal/50" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-vault-teal text-white shadow transition-transform hover:scale-110"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            {/* Name + plan badge */}
            <div className="flex items-end justify-between px-6 pb-5 pt-4">
              <div className="ml-28">
                <p className="font-serif text-xl font-bold text-foreground">John Doe</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-vault-teal/10 px-2.5 py-0.5 text-xs font-semibold text-vault-teal">
                  <Crown className="h-3 w-3" />
                  Premium
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Member since Jan 2024</p>
            </div>
          </div>

          {/* Profile fields */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-5 font-serif text-lg font-semibold text-foreground">Personal info</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={<User className="h-4 w-4 text-vault-teal" />} label="Display name" type="text" defaultValue="John Doe" />
              <Field icon={<Mail className="h-4 w-4 text-vault-teal" />} label="Email" type="email" defaultValue="john@memoryvault.com" />
              <Field icon={<Phone className="h-4 w-4 text-vault-teal" />} label="Phone number" type="tel" defaultValue="+1 (555) 000-0000" />
              <Field icon={<MapPin className="h-4 w-4 text-vault-teal" />} label="Location" type="text" defaultValue="New York, USA" />
              <Field icon={<Calendar className="h-4 w-4 text-vault-teal" />} label="Date of birth" type="date" defaultValue="1990-06-15" />
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4 text-vault-teal" />
                  Bio
                </label>
                <textarea
                  rows={2}
                  defaultValue="Parent, storyteller, memory keeper."
                  className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                />
              </div>
            </div>
            <button className="mt-5 rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal/90 transition-colors">
              Save changes
            </button>
          </div>
        </div>
      )}

      {/* ── SUBSCRIPTION TAB ────────────────────────────────────────────── */}
      {activeTab === "subscription" && (
        <div className="space-y-5">
          {/* Billing flow overlay */}
          {billingFlow !== "idle" && (
            <BillingModal flow={billingFlow} setFlow={setBillingFlow} planName={currentTier.name} price={currentTier.price} />
          )}

          {/* Current plan card */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-vault-teal/40 bg-vault-teal/5 p-6 shadow-sm">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-vault-teal/10 blur-2xl" />
            <div className="relative flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-vault-teal/20">
                <Crown className="h-7 w-7 text-vault-teal" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-serif text-xl font-bold text-foreground">{currentTier.name}</p>
                  <span className="rounded-full bg-vault-teal px-2 py-0.5 text-xs font-semibold text-white">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {`$${currentTier.price.toFixed(2)} for ${currentTier.durationLabel}`}
                </p>
              </div>
              {currentTier.price > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setBillingFlow("extend")}
                    className="rounded-lg bg-vault-teal px-4 py-2 text-sm font-semibold text-white hover:bg-vault-teal/90 transition-colors"
                  >
                    Manage billing
                  </button>
                </div>
              )}
            </div>

            {/* Feature pills */}
            <div className="relative mt-4 flex flex-wrap gap-2">
              {currentTier.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 rounded-full border border-vault-teal/25 bg-vault-teal/10 px-3 py-1 text-xs font-medium text-vault-teal">
                  <Check className="h-3 w-3" /> {f}
                </span>
              ))}
            </div>
          </div>

          {/* Plan selector */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Choose a plan</h2>
            <p className="mb-5 text-sm text-muted-foreground">Select the plan that fits your needs.</p>

            <div className="grid gap-4 sm:grid-cols-3">
              {subscriptionTiers.map((tier) => {
                const isSelected = selectedTier === tier.id as SubscriptionPlanId
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative overflow-hidden rounded-xl border-2 p-5 text-left transition-all focus:outline-none ${
                      isSelected
                        ? "border-vault-teal bg-vault-teal/8 shadow-lg ring-2 ring-vault-teal/20"
                        : "border-border bg-background hover:border-vault-teal/30 hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-vault-teal">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                    <p className="font-serif text-lg font-bold text-foreground">{tier.name}</p>
                    <p className="mt-1 text-2xl font-extrabold text-vault-teal">
                      {`$${tier.price.toFixed(2)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{tier.durationLabel}</p>
                    <ul className="mt-3 space-y-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-vault-teal" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
              <span className="text-sm text-muted-foreground">Payment method</span>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">•••• 4242</span>
              </div>
            </div>

            <button
              disabled={false}
              className="mt-4 w-full rounded-lg bg-vault-teal py-2.5 text-sm font-semibold text-white transition-colors hover:bg-vault-teal/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {`Switch to ${subscriptionTiers.find(t => t.id === selectedTier)?.name}`}
            </button>
          </div>
        </div>
      )}

      {/* ── SECURITY TAB ────────────────────────────────────────────────── */}
      {activeTab === "security" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Security</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vault-teal/10">
                  <Lock className="h-5 w-5 text-vault-teal" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Reusable form field ───────────────────────────────────────────────────────
function Field({
  icon,
  label,
  type,
  defaultValue,
}: {
  icon: React.ReactNode
  label: string
  type: string
  defaultValue?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
      />
    </div>
  )
}

// ── Billing modal / flow ──────────────────────────────────────────────────────
function BillingModal({
  flow,
  setFlow,
  planName,
  price,
}: {
  flow: BillingFlow
  setFlow: (f: BillingFlow) => void
  planName: string
  price: number
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <button
          onClick={() => setFlow("idle")}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Extend flow */}
        {flow === "extend" && (
          <div className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vault-teal/15">
                <CreditCard className="h-5 w-5 text-vault-teal" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Manage billing</h3>
                <p className="text-xs text-muted-foreground">{planName} · ${price.toFixed(2)}/mo</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setFlow("extended")}
                className="flex w-full items-center gap-4 rounded-xl border border-border bg-background p-4 text-left hover:border-vault-teal/40 hover:bg-vault-teal/5 transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vault-teal/10 group-hover:bg-vault-teal/20">
                  <Sparkles className="h-5 w-5 text-vault-teal" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Extend subscription</p>
                  <p className="text-xs text-muted-foreground">Pre-pay and extend your billing cycle</p>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-vault-teal transition-colors" />
              </button>

              <button
                onClick={() => setFlow("cancel")}
                className="flex w-full items-center gap-4 rounded-xl border border-border bg-background p-4 text-left hover:border-red-300 hover:bg-red-50/50 transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 group-hover:bg-red-100">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Cancel subscription</p>
                  <p className="text-xs text-muted-foreground">Access continues until end of period</p>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-red-400 transition-colors" />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium text-foreground">•••• 4242</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium text-foreground">Jan 15, 2027</span>
              </div>
            </div>
          </div>
        )}

        {/* Cancel confirmation */}
        {flow === "cancel" && (
          <div className="p-6">
            <button onClick={() => setFlow("extend")} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">Cancel subscription?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You'll keep your <span className="font-semibold text-foreground">{planName}</span> benefits until the end of the billing period on <span className="font-semibold text-foreground">Jan 15, 2027</span>. After that, you'll be moved to the Free plan.
              </p>
            </div>
            <div className="space-y-2">
              {["Access to 5 memory books", "50 GB media storage", "AI question generation"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-red-50/60 px-3 py-2 text-sm text-red-600">
                  <X className="h-3.5 w-3.5 shrink-0" />
                  {item} will be lost
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setFlow("extend")}
                className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Keep plan
              </button>
              <button
                onClick={() => setFlow("confirm-cancel")}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        )}

        {/* Confirm cancel done */}
        {flow === "confirm-cancel" && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-muted bg-muted/30">
              <Check className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Subscription cancelled</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your {planName} plan will remain active until <strong>Jan 15, 2027</strong>. No further charges will be made.
            </p>
            <button
              onClick={() => setFlow("idle")}
              className="mt-5 w-full rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Extended success */}
        {flow === "extended" && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vault-teal/15">
              <Crown className="h-8 w-8 text-vault-teal" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Extended!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your {planName} subscription has been extended. Your new renewal date is <strong>Jan 15, 2028</strong>.
            </p>
            <button
              onClick={() => setFlow("idle")}
              className="mt-5 w-full rounded-lg bg-vault-teal py-2.5 text-sm font-semibold text-white hover:bg-vault-teal/90 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}