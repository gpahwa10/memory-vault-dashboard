'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthHeader } from '@/components/auth-header'
import { AuthForm } from '@/components/auth-form'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleForgotPassword = (data: Record<string, string>) => {
    console.log('[v0] Forgot password request:', data)
    if (!data.email) {
      return
    }
    setEmail(data.email)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="space-y-6">
        <AuthHeader
          title="Check your email"
          subtitle="We've sent you a password reset link"
        />
        <div className="rounded-lg border border-border bg-muted/50 p-4 text-center space-y-2">
          <p className="text-sm text-foreground font-medium">
            We've sent a password reset link to:
          </p>
          <p className="text-sm text-muted-foreground break-all">{email}</p>
          <p className="text-xs text-muted-foreground pt-2">
            The link will expire in 24 hours. Check your spam folder if you don't see it.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="block w-full rounded-lg bg-vault-teal px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
        >
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Reset your password"
        subtitle="Enter your email and we'll send you a reset link"
      />

      <AuthForm
        fields={[
          {
            name: 'email',
            type: 'email',
            label: 'Email address',
            placeholder: 'you@example.com',
            required: true,
          },
        ]}
        buttonText="Send reset link"
        onSubmit={handleForgotPassword}
        footerText={
          <>
            Remember your password?{' '}
            <Link href="/auth/login" className="text-vault-teal hover:underline font-medium">
              Sign in
            </Link>
          </>
        }
      />
    </div>
  )
}
