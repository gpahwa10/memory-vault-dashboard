import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LandingParallelAppSlot } from '@/components/landing-parallel-app-slot'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
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
  app,
}: Readonly<{
  children: React.ReactNode
  app: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <LandingParallelAppSlot>{app}</LandingParallelAppSlot>
        {children}
        <WhatsAppButton phoneNumber="+91-9217976689" message="Hello, I have a question about Memory Vault." />
        <Analytics />
      </body>
    </html>
  )
}
