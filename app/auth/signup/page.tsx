'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthHeader } from '@/components/auth-header'
import { AuthForm } from '@/components/auth-form'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSignup = (data: Record<string, string>) => {
    console.log('[v0] Signup attempt:', data)
    if (!data.email || !data.password || !data.confirmPassword) {
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
    console.log('[v0] Signup successful')
    setError(null)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="space-y-6">
        <AuthHeader
          title="Account created"
          subtitle="Your Memory Vault account is ready"
        />
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
          <p className="text-sm text-green-700">
            Welcome to Memory Vault! Please check your email to verify your account.
          </p>
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
        title="Create your account"
        subtitle="Join Memory Vault to preserve your precious moments"
      />

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <AuthForm
        fieldLayout="grid"
        fields={[
          {
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'John Doe',
            required: true,
          },
          {
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
            placeholder: '+1234567890',
            required: true,
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email address',
            placeholder: 'you@example.com',
            required: true,
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Create a strong password',
            required: true,
          },
          {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm password',
            placeholder: 'Confirm your password',
            required: true,
          },
        ]}
        buttonText="Create account"
        onSubmit={handleSignup}
        footerText={
          <>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-vault-teal hover:underline font-medium">
              Sign in
            </Link>
          </>
        }
      />

      <p className="text-xs text-muted-foreground text-center">
        By creating an account, you agree to our{' '}
        <Link href="#" className="text-vault-teal hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="text-vault-teal hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
