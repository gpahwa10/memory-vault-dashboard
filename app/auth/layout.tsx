import type { Metadata } from 'next'
import { BackgroundVideo } from '@/components/background-video'

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
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left half: background video (exact 50%) */}
      <div className="relative hidden min-h-screen w-1/2 min-w-0 overflow-hidden md:block">
        <BackgroundVideo contained size="reduced" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"
          aria-hidden
        />
      </div>

      {/* Right half: form (exact 50%) */}
      <div className="relative z-10 flex min-h-screen w-full min-w-0 flex-col items-center justify-center px-4 py-8 md:w-1/2 md:px-10">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm shadow-black/5">
          {children}
        </div>
      </div>
    </div>
  )
}
