'use client'

import Image from 'next/image'

interface AuthHeaderProps {
  title: string
  subtitle?: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <div className="mb-6 flex justify-center">
        {/* <h2 className="text-2xl font-serif font-bold text-vault-teal">
          Memory Vault
        </h2> */}
        <Image src="/logo.jpg" alt="Memory Vault Logo" width={100} height={100} className='rounded-full' />
      </div>
      <h1 className="font-serif text-3xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-md text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
