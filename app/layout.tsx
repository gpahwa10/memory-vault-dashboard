import type { Metadata } from 'next'
import { Lora, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Memory Vault - Capture Your Precious Memories',
  description: 'A digital memory capturing platform that transforms your cherished moments into beautifully crafted storybooks.',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton phoneNumber="1234567890" message="Hello, I have a question about Memory Vault." />
        <Analytics />
      </body>
    </html>
  )
}
