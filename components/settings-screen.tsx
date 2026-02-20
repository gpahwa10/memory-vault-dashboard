"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Bell,
  Lock,
  CreditCard,
  Crown,
  ChevronRight,
} from "lucide-react"

const subscriptionTiers = [
  { id: "free", name: "Free", price: 0, books: 1, storage: "1 GB" },
  { id: "premium", name: "Premium", price: 9.99, books: 5, storage: "50 GB", current: true },
  { id: "family", name: "Family", price: 19.99, books: 20, storage: "200 GB" },
]

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<"account" | "subscription" | "notifications" | "security">("account")

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {[
          { id: "account" as const, label: "Account", icon: User },
          { id: "subscription" as const, label: "Subscription", icon: CreditCard },
          { id: "notifications" as const, label: "Notifications", icon: Bell },
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

      {activeTab === "account" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Profile
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-vault-teal" />
                Display name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-vault-teal" />
                Email
              </label>
              <input
                type="email"
                defaultValue="john@memoryvault.com"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
          </div>
          <button className="mt-4 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark">
            Save changes
          </button>
        </div>
      )}

      {activeTab === "subscription" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Your current plan
            </h2>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border-2 border-vault-teal/40 bg-vault-teal/10 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vault-teal/20">
                <Crown className="h-6 w-6 text-vault-teal" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Premium</p>
                <p className="text-sm text-muted-foreground">$9.99/month · Renews Jan 2027</p>
              </div>
              <button className="ml-auto rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
                Manage billing
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
              View all plans
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Browse all available subscription tiers and upgrade or downgrade as needed.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {subscriptionTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative overflow-hidden rounded-xl border-2 p-5 transition-all ${
                    tier.current
                      ? "border-vault-teal bg-vault-teal/8 shadow-lg"
                      : "border-border bg-background hover:border-vault-teal/40 hover:shadow-md"
                  }`}
                >
                  {tier.current && (
                    <div className="absolute top-0 right-0 h-20 w-20 bg-vault-teal/5 rounded-full blur-xl" />
                  )}
                  <div className="relative space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-xl font-bold text-foreground">{tier.name}</h3>
                      {tier.current && (
                        <span className="rounded-full bg-vault-teal px-2 py-0.5 text-xs font-semibold text-primary-foreground flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-vault-teal">
                      ${tier.price.toFixed(2)}
                      {tier.price > 0 && <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {tier.books} books · {tier.storage} storage
                    </p>
                    {!tier.current && (
                      <button className="mt-4 w-full rounded-lg border border-vault-teal/40 bg-vault-teal/5 py-2 text-sm font-semibold text-vault-teal hover:bg-vault-teal/15 transition-colors">
                        {tier.price === 0 ? "Downgrade" : "Upgrade"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Payment method</span>
              <span className="font-medium text-foreground">•••• 4242</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: "Email when a memory is added", key: "memory" },
              { label: "Weekly digest", key: "digest" },
              { label: "Reminders for unanswered questions", key: "questions" },
              { label: "Product updates and tips", key: "updates" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="h-6 w-11 rounded-full bg-muted after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-vault-teal peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
          <button className="mt-4 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark">
            Save preferences
          </button>
        </div>
      )}

      {activeTab === "security" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
                Change password
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
                Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
