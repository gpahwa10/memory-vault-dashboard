'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber = '1234567890',
  message = 'Hello, I have a question about Memory Vault.',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-vault-teal shadow-lg transition-all hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-vault-teal/40"
      title="Chat with us on WhatsApp"
      aria-label="Open WhatsApp chat"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground transition-transform group-hover:scale-110" />
    </Link>
  )
}
