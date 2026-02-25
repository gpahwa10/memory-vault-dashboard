export type SubscriptionPlanId = '1m' | '3m' | '6m' | '12m'

export interface BaseSubscriptionPlan {
  id: SubscriptionPlanId
  /** Display name, e.g. '1 Month' */
  name: string
  /** Human label for duration, e.g. '1 month', '3 months' */
  durationLabel: string
  /** One-line label suitable for gifting copy, e.g. '1‑month Memory Vault pass' */
  giftLabel: string
  /** Price for the full duration (not per month) */
  price: number
  /** How many books are included in this plan */
  booksIncluded: number
  /** How many reels are included in this plan */
  reelsIncluded: number
}

export const BASE_SUBSCRIPTION_PLANS: BaseSubscriptionPlan[] = [
  {
    id: '1m',
    name: '1 Month',
    durationLabel: '1 month',
    giftLabel: '1‑month Memory Vault pass',
    price: 9.99,
    booksIncluded: 1,
    reelsIncluded: 1,
  },
  {
    id: '3m',
    name: '3 Months',
    durationLabel: '3 months',
    giftLabel: '3‑month Memory Vault pass',
    price: 24.99,
    booksIncluded: 2,
    reelsIncluded: 2,
  },
  {
    id: '6m',
    name: '6 Months',
    durationLabel: '6 months',
    giftLabel: '6‑month Memory Vault pass',
    price: 44.99,
    booksIncluded: 3,
    reelsIncluded: 3,
  },
  {
    id: '12m',
    name: '1 Year',
    durationLabel: '12 months',
    giftLabel: '1‑year Memory Vault pass',
    price: 79.99,
    booksIncluded: 5,
    reelsIncluded: 5,
  },
]

