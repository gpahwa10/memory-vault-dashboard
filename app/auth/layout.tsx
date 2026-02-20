import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - Memory Vault',
  description: 'Sign in or create your Memory Vault account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-vault-cream via-background to-vault-cream px-4 py-8">
      <div className="paper-texture absolute inset-0 -z-10" />
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
