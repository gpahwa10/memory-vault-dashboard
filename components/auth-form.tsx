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
  fieldLayout?: 'stack' | 'grid'
}

export function AuthForm({
  title,
  subtitle,
  fields,
  buttonText,
  footerText,
  onSubmit,
  fieldLayout = 'stack',
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

      <div
        className={
          fieldLayout === 'grid'
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
