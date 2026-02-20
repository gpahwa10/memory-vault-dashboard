'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AuthHeader } from '@/components/auth-header'
import { AuthForm } from '@/components/auth-form'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = (data: Record<string, string>) => {
    console.log('[v0] Reset password attempt:', data)
    if (!data.password || !data.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    console.log('[v0] Password reset successful')
    setError(null)
    setSuccess(true)
  }

  if (!token) {
    return (
      <div className="space-y-6">
        <AuthHeader title="Invalid reset link" subtitle="The reset link is missing or expired" />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          The password reset link is invalid or has expired. Please request a new one.
        </div>
        <Link
          href="/auth/forgot-password"
          className="block w-full rounded-lg bg-vault-teal px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
        >
          Request new reset link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="space-y-6">
        <AuthHeader
          title="Password reset successful"
          subtitle="Your password has been updated"
        />
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
          <p className="text-sm text-green-700">You can now sign in with your new password.</p>
        </div>
        <Link
          href="/auth/login"
          className="block w-full rounded-lg bg-vault-teal px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
        >
          Go to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Create new password"
        subtitle="Enter your new password below"
      />

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <AuthForm
        fields={[
          {
            name: 'password',
            type: 'password',
            label: 'New password',
            placeholder: 'Enter your new password',
            required: true,
          },
          {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm password',
            placeholder: 'Confirm your new password',
            required: true,
          },
        ]}
        buttonText="Reset password"
        onSubmit={handleResetPassword}
      />
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <AuthHeader
            title="Create new password"
            subtitle="Loading..."
          />
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}
