'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthHeader } from '@/components/auth-header'
import { AuthForm } from '@/components/auth-form'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  const handleLogin = (data: Record<string, string>) => {
    console.log('[v0] Login attempt:', data)
    if (!data.email || !data.password) {
      setError('Please fill in all fields')
      return
    }
    console.log('[v0] Login successful')
    setError(null)
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your Memory Vault account"
      />

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <AuthForm
        fields={[
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
            placeholder: 'Enter your password',
            required: true,
          },
        ]}
        buttonText="Sign in"
        onSubmit={handleLogin}
        footerText={
          <>
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-vault-teal hover:underline font-medium">
              Sign up
            </Link>
          </>
        }
      />

      <div className="flex items-center justify-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-vault-teal hover:underline font-medium"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  )
}
