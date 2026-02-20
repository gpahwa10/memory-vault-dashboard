'use client'

import Link from 'next/link'

interface AuthHeaderProps {
  title: string
  subtitle?: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <div className="mb-6 flex justify-center">
        <Link href="/" className="text-2xl font-serif font-bold text-vault-teal">
          Memory Vault
        </Link>
      </div>
      <h1 className="font-serif text-3xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
