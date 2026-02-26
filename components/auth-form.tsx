'use client'

import { useState, ReactNode } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

interface AuthFormProps {
  title?: string
  subtitle?: string
  fields: {
    name: string
    type: 'email' | 'password' | 'text'
    label: string
    placeholder: string
    required?: boolean
  }[]
  buttonText: string
  footerText?: ReactNode
  onSubmit?: (data: Record<string, string>) => void
  /** 'stack' = one column, 'grid' = 2 columns on sm+ */
  fieldLayout?: 'stack' | 'grid' | 'column'
  /** When set, shows a "Sign up with Google" (or custom label) button above the form */
  onGoogleClick?: () => void
  googleButtonLabel?: string
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export function AuthForm({
  title,
  subtitle,
  fields,
  buttonText,
  footerText,
  onSubmit,
  fieldLayout = 'stack',
  onGoogleClick,
  googleButtonLabel = 'Continue with Google',
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      onSubmit?.(formData)
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldIcon = (field: { type: string }) => {
    if (field.type === 'email') return <Mail className="h-4 w-4" />
    if (field.type === 'password') return <Lock className="h-4 w-4" />
    return null
  }

  const isPasswordField = (fieldName: string) => {
    return fields.find((f) => f.name === fieldName)?.type === 'password'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}

      {onGoogleClick && (
        <>
          <button
            type="button"
            onClick={onGoogleClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <GoogleIcon className="text-[#4285F4]" />
            {googleButtonLabel}
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>
        </>
      )}

      <div
        className={
          fieldLayout === 'grid' || fieldLayout === 'column'
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
            : 'space-y-3'
        }
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={`flex flex-col gap-2 ${fieldLayout === 'grid' && field.name === 'confirmPassword' ? 'sm:col-span-2' : ''}`}
          >
            <label htmlFor={field.name} className="text-sm font-medium text-foreground">
              {field.label}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                {getFieldIcon(field)}
              </div>
              <input
                id={field.name}
                type={
                  isPasswordField(field.name) && !showPassword[field.name] ? 'password' : 'text'
                }
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required !== false}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
              {isPasswordField(field.name) && (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name],
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword[field.name] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>

      {footerText && <div className="text-center text-sm text-muted-foreground">{footerText}</div>}
    </form>
  )
}
