import type { Metadata } from 'next'
import {BackgroundVideo} from '@/components/background-video'

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
    <>
      <BackgroundVideo />
      {/* Semi-transparent overlay so the video is visible underneath */}
      <div
        className="fixed inset-0 z-[5] bg-gradient-to-br from-vault-cream/75 via-background/75 to-vault-cream/75"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
