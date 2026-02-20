'use client'

import { Check, Zap, Crown, Users } from 'lucide-react'
import { useState } from 'react'

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    icon: Zap,
    features: [
      'Up to 1 memory book',
      '1 GB storage',
      'Basic editing tools',
      'Standard print quality',
      'Community support',
    ],
    books: 1,
    storage: '1 GB',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For dedicated memory keepers',
    price: 9.99,
    icon: Crown,
    features: [
      'Up to 5 memory books',
      '50 GB storage',
      'Advanced editing with filters',
      'Premium print quality',
      'Priority email support',
      'Custom covers & layouts',
      'Monthly reel generation',
    ],
    books: 5,
    storage: '50 GB',
    current: true,
  },
  {
    id: 'family',
    name: 'Family',
    description: 'For families and teams',
    price: 19.99,
    icon: Users,
    features: [
      'Up to 20 memory books',
      '200 GB storage',
      'Unlimited advanced editing',
      'Premium print quality',
      'Priority 24/7 support',
      'Custom covers & layouts',
      'Unlimited reel generation',
      'Family collaboration',
      'Admin dashboard',
    ],
    books: 20,
    storage: '200 GB',
    popular: false,
  },
]

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>('premium')

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-bold text-foreground">
          Choose your plan
        </h2>
        <p className="text-muted-foreground">
          Select the perfect plan for your memory preservation needs. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const Icon = plan.icon
          const isSelected = selectedPlan === plan.id
          const isCurrent = plan.current

          return (
            <div
              key={plan.id}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                isSelected || isCurrent
                  ? 'border-vault-teal bg-vault-teal/8 shadow-lg ring-2 ring-vault-teal/20'
                  : 'border-border bg-card hover:border-vault-teal/40 hover:shadow-md'
              }`}
            >
              {/* Background accent element for selected card */}
              {(isSelected || isCurrent) && (
                <div className="absolute top-0 right-0 h-32 w-32 bg-vault-teal/5 rounded-full blur-2xl" />
              )}

              <div className="relative space-y-6 p-6">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vault-teal/15">
                          <Icon className="h-5 w-5 text-vault-teal" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-foreground">
                          {plan.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="inline-flex items-center rounded-full bg-vault-teal px-3 py-1 text-xs font-semibold text-primary-foreground">
                      <span className="h-2 w-2 rounded-full bg-primary-foreground mr-1.5" />
                      Your current plan
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-foreground">
                      ${plan.price.toFixed(2)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm font-medium text-muted-foreground">/month</span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <p className="text-xs text-muted-foreground">Get started for free</p>
                  )}
                </div>

                {/* Storage & Books Info */}
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/30 p-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Books</p>
                    <p className="font-semibold text-foreground">{plan.books}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Storage</p>
                    <p className="font-semibold text-foreground">{plan.storage}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Features included
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 flex-shrink-0 text-vault-teal mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    isCurrent
                      ? 'border border-vault-teal/30 bg-background text-vault-teal hover:bg-vault-teal/5'
                      : isSelected
                      ? 'bg-vault-teal text-primary-foreground hover:bg-vault-teal-dark'
                      : 'border border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {isCurrent
                    ? 'Current plan'
                    : isSelected
                    ? plan.price === 0
                      ? 'Downgrade to Free'
                      : 'Upgrade to ' + plan.name
                    : 'Select plan'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info section */}
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vault-teal/15">
            <Zap className="h-5 w-5 text-vault-teal" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Flexible billing</p>
            <p className="text-sm text-muted-foreground">
              Change or cancel your plan anytime. No hidden fees or long-term commitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
