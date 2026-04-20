'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AuthHeader } from '@/components/auth-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, Sparkles, Shield, Crown, CreditCard, Lock, ChevronRight, ChevronLeft, Eye, EyeOff, Mail, User, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BASE_SUBSCRIPTION_PLANS, type BaseSubscriptionPlan } from '@/lib/subscription-plans'
import CountryList from 'country-list-with-dial-code-and-flag'
import { signupService } from './signupService'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'account' | 'plan' | 'payment' | 'success'

interface Plan extends BaseSubscriptionPlan {
  period: string
  description: string
  features: string[]
  highlight?: boolean
  badge?: string
  icon: typeof Crown
}

// ─── Subscription Plans ───────────────────────────────────────────────────────

const PLANS: Plan[] = BASE_SUBSCRIPTION_PLANS.map((base, index) => {
  const isMostPopular = base.id === '3m'
  const isBestValue = base.id === '12m'

  const icon: typeof Crown =
    base.id === '1m' ? Sparkles : base.id === '3m' ? Shield : base.id === '6m' ? Sparkles : Crown

  const features: string[] = [
    `${base.booksIncluded} memory book${base.booksIncluded > 1 ? 's' : ''} included`,
    `${base.reelsIncluded} highlight reel${base.reelsIncluded > 1 ? 's' : ''} included`,
    'Full access to Memory Vault during this period',
  ]

  return {
    ...base,
    period: base.durationLabel,
    description:
      base.id === '1m'
        ? 'Perfect for trying Memory Vault with a single book and reel'
        : base.id === '3m'
          ? 'Great for capturing a season of memories with multiple books and reels'
          : base.id === '6m'
            ? 'Ideal for families capturing milestones over half a year'
            : 'Best for gifting a full year of books and reels',
    icon,
    highlight: isMostPopular,
    badge: isMostPopular ? 'Most Popular' : isBestValue ? 'Best Value' : undefined,
    features,
  }
})

const DEFAULT_SIGNUP_LOCATION = 'Not Provided'
const DEFAULT_SIGNUP_DOB = '1990-01-01'

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'account', label: 'Account' },
    { key: 'plan', label: 'Choose Plan' },
    { key: 'payment', label: 'Payment' },
  ]
  const currentIdx = steps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = i < currentIdx
        const active = i === currentIdx
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                  done
                    ? 'bg-vault-teal border-vault-teal text-white'
                    : active
                      ? 'bg-vault-teal/10 border-vault-teal text-vault-teal'
                      : 'bg-muted border-border text-muted-foreground'
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap',
                  active ? 'text-vault-teal' : done ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-12 mx-1 mb-5 rounded-full transition-all duration-500',
                  done ? 'bg-vault-teal' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan
  selected: boolean
  onSelect: () => void
}) {
  const Icon = plan.icon
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vault-teal',
        selected
          ? 'border-vault-teal bg-vault-teal/5 shadow-lg shadow-vault-teal/10'
          : plan.highlight
            ? 'border-vault-gold/40 bg-vault-gold/5 hover:border-vault-gold/70'
            : 'border-border bg-card hover:border-vault-teal/40 hover:shadow-md'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Radio */}
          <div
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all',
              selected ? 'border-vault-teal bg-vault-teal' : 'border-border bg-background'
            )}
          >
            {selected && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Icon className={cn('h-4 w-4', plan.highlight ? 'text-vault-gold' : 'text-vault-teal')} />
              <span className="font-bold text-foreground">{plan.name}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{plan.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <div className="text-xl font-extrabold text-foreground">
            ${plan.price}
          </div>
          <div className="text-[10px] text-muted-foreground">/ {plan.period}</div>
        </div>
      </div>

      {/* Features */}
      <ul className="mt-4 space-y-1.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
            <Check className={cn('h-3.5 w-3.5 shrink-0', plan.highlight ? 'text-vault-gold' : 'text-vault-teal')} />
            {f}
          </li>
        ))}
      </ul>
    </button>
  )
}

// ─── Payment Form ─────────────────────────────────────────────────────────────

function PaymentForm({
  plan,
  onBack,
  onSuccess,
}: {
  plan: Plan
  onBack: () => void
  onSuccess: () => void
}) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d
  }

  const handlePay = () => {
    if (!name.trim()) return setError('Please enter cardholder name')
    if (cardNumber.replace(/\s/g, '').length < 16) return setError('Please enter a valid card number')
    if (expiry.replace(/\s/g, '').replace('/', '').length < 4) return setError('Please enter a valid expiry date')
    if (cvv.length < 3) return setError('Please enter a valid CVV')

    setError(null)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
    }, 1800)
  }

  return (
    <div className="space-y-5">
      {/* Plan summary */}
      <div className="flex items-center justify-between rounded-xl border border-vault-teal/30 bg-vault-teal/5 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-vault-teal">Selected Plan</p>
          <p className="font-bold text-foreground">{plan.name}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-foreground">${plan.price}<span className="text-xs font-normal text-muted-foreground">/{plan.period}</span></p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Card fields */}
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-foreground">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM / YY"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-foreground">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="•••"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
            />
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-[11px] text-muted-foreground">
          Your payment is secured with 256-bit SSL encryption. We never store your card details.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={processing}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-vault-teal-dark disabled:opacity-70"
        >
          {processing ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Pay ${plan.price} & Create Account
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const router = useRouter()
  type CountryOption = { code: string; dial_code: string; name: string; flag: string }
  const countryOptions: CountryOption[] = useMemo(() => {
    const list = CountryList.getAll() || []
    const normalized = list
      .map((c: unknown) => (c as { data: CountryOption }).data)
      .filter((d): d is CountryOption => Boolean(d))

    const india = normalized.find((country) => country.code === 'IN' && country.dial_code === '+91')
    const others = normalized.filter((country) => !(country.code === 'IN' && country.dial_code === '+91'))

    return india ? [india, ...others] : normalized
  }, [])
  const defaultDialCode = countryOptions[0]?.dial_code ?? '+1'

  const [step, setStep] = useState<Step>('account')
  const [accountData, setAccountData] = useState<Record<string, string> | null>(null)
  const [selectedPlanId, setSelectedPlanId] = useState<string>('3m')
  const [error, setError] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneDialCode, setPhoneDialCode] = useState(defaultDialCode)
  const [phoneNational, setPhoneNational] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false) 
  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId)!

  // ── Step 1: Account details ──

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedPhone = `${phoneDialCode}${phoneNational}`.replace(/\s+/g, '')
    const data = {
      fullName: fullName.trim(),
      phoneNumber: normalizedPhone,
      email: email.trim(),
      password,
    }

    if (!data.fullName || !data.phoneNumber || !data.email || !data.password) {
      setError('Please fill in all fields')
      return
    }
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const response = await signupService.signup({
        name: data.fullName,
        email: data.email,
        password: data.password,
        location: DEFAULT_SIGNUP_LOCATION,
        dateOfBirth: DEFAULT_SIGNUP_DOB,
        phoneNumber: data.phoneNumber,
        profilePictureUrl: null
      })
      console.log(response)
      localStorage.setItem('accessToken', response.token)
      document.cookie = `accessToken=${encodeURIComponent(response.token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.push('/app')
      // setAccountData(data)
      // setStep('plan')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to create account right now. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ──

  if (step === 'success') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vault-teal/10 ring-4 ring-vault-teal/20">
            <Check className="h-8 w-8 text-vault-teal" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Welcome to Memory Vault!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your account and <span className="font-semibold text-foreground">{selectedPlan.name}</span> plan are now active.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-vault-teal/20 bg-vault-teal/5 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-vault-teal">What's next</p>
          {['Check your email to verify your account', 'Start adding your first memories', 'Create your first memory book'].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vault-teal/15 text-[10px] font-bold text-vault-teal">
                {i + 1}
              </div>
              <p className="text-sm text-foreground/80">{item}</p>
            </div>
          ))}
        </div>

        <Link
          href="/auth/login"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-vault-teal-dark"
        >
          Go to Login
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <StepIndicator current={step} />

      {/* ── Step 1: Account ── */}
      {step === 'account' && (
        <div className="space-y-5">
          <AuthHeader
            title="Create your account"
            subtitle="Join Memory Vault to preserve your precious moments"
          />

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Subscription required notice */}
          {/* <div className="flex items-start gap-2.5 rounded-xl border border-vault-gold/30 bg-vault-gold/8 px-4 py-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-vault-gold" />
            <p className="text-xs text-foreground/80 leading-relaxed">
              Memory Vault is a <span className="font-semibold">subscription-based service</span>. After setting up your account details, you'll choose a plan and complete payment to activate your vault.
            </p>
          </div> */}

          <form onSubmit={handleAccountSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="flex gap-2">
                    <select
                      className="w-fit shrink-0 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20 cursor-pointer"
                      value={phoneDialCode}
                      onChange={(e) => {
                        const dialCode = e.target.value
                        setPhoneDialCode(dialCode)
                        setPhone(`${dialCode} ${phoneNational}`.trim())
                      }}
                    >
                      {countryOptions.map((country, index) => (
                        <option key={`${country.code}-${index}`} value={country.dial_code}>
                          {country.flag} {country.dial_code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        id="phone"
                        type="text"
                        value={phoneNational}
                        onChange={(e) => {
                          const national = e.target.value
                          setPhoneNational(national)
                          setPhone(`${phoneDialCode} ${national}`.trim())
                        }}
                        placeholder="1234567890"
                        required
                        className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-vault-teal hover:underline">
                Sign in
              </Link>
            </div>
          </form>

          <p className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <input
              id="accept-terms"
              type="checkbox"
              className="h-3 w-3 rounded border-border text-vault-teal focus:ring-vault-teal/50"
            />
            <label htmlFor="accept-terms" className="cursor-pointer">
              By creating an account, you agree to our{' '}
              <Link href="#" className="text-vault-teal hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link href="#" className="text-vault-teal hover:underline">Privacy Policy</Link>.
            </label>
          </p>
        </div>
      )}

      {/* ── Step 2: Plan selection ── */}
      {step === 'plan' && (
        <div className="space-y-5">
          <AuthHeader
            title="Choose your plan"
            subtitle="Select the subscription that's right for you. You won't be charged until the next step."
          />

          <Accordion type="single" collapsible className="w-full space-y-3">
            {PLANS.map((plan) => (
              <AccordionItem key={plan.id} value={plan.id} className="border-none">
                <AccordionTrigger className="rounded-xl border border-border bg-muted/50 px-4 py-3 hover:no-underline hover:bg-muted relative">
                  <div className="flex w-full items-center justify-between pr-2 text-left relative pt-3">

                    {/* Badge - top left */}
                    {plan.badge && (
                      <span
                        className={cn(
                          "absolute -top-5 left-1 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                          plan.highlight
                            ? "bg-vault-gold text-white"
                            : "bg-vault-teal text-white"
                        )}
                      >
                        {plan.badge}
                      </span>
                    )}

                    <span className="font-semibold text-foreground">
                      {plan.name}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      ${plan.price} / {plan.period}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-3">
                  <PlanCard
                    plan={plan}
                    selected={selectedPlanId === plan.id}
                    onSelect={() => setSelectedPlanId(plan.id)}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep('account')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep('payment')}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-vault-teal-dark"
            >
              Continue to Payment
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Payment ── */}
      {step === 'payment' && (
        <div className="space-y-5">
          <AuthHeader
            title="Complete payment"
            subtitle="Your account will be activated immediately after payment."
          />
          <PaymentForm
            plan={selectedPlan}
            onBack={() => setStep('plan')}
            onSuccess={() => setStep('success')}
          />
        </div>
      )}
    </div>
  )
}