'use client'

import { useState } from 'react'
import Image from 'next/image'

export function AuthHero() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center bg-gradient-to-br from-vault-teal/10 via-background to-vault-gold/10">
        <div className="h-48 w-48 rounded-full bg-vault-teal/10 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--vault-teal)/0.2),transparent)]" />
      </div>
    )
  }

  return (
    <Image
      src="/auth-hero.gif"
      alt=""
      fill
      className="object-cover"
      sizes="50vw"
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}
