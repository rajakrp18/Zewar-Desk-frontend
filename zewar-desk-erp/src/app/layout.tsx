// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Zewar Desk - Professional Jewellery ERP System',
    template: '%s | Zewar Desk'
  },
  description: 'Complete business management solution for jewellery shops. Manage inventory, billing, customers, and orders with ease.',
  keywords: ['jewellery', 'ERP', 'inventory management', 'billing software', 'business management'],
  authors: [{ name: 'Zewar Desk' }],
  creator: 'Zewar Desk',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://zewardesk.com',
    title: 'Zewar Desk - Professional Jewellery ERP System',
    description: 'Complete business management solution for jewellery shops',
    siteName: 'Zewar Desk',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
