// src/app/layout.tsx
/**
 * Root Layout Component
 * 
 * This is the top-level layout wrapper for all pages in the application.
 * It configures:
 * - Global metadata (title, description, SEO)
 * - Font imports and configuration
 * - HTML structure and styling
 * - Global CSS imports
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Load Inter font from Google Fonts with optimization
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use system font while loading
  variable: '--font-inter', // CSS variable for Tailwind
})

// SEO Metadata configuration
export const metadata: Metadata = {
  // Page title template for all pages
  title: {
    default: 'Zewar Desk - Professional Jewellery ERP System',
    template: '%s | Zewar Desk'
  },
  // Meta description for search engines
  description: 'Complete business management solution for jewellery shops. Manage inventory, billing, customers, and orders with ease.',
  keywords: ['jewellery', 'ERP', 'inventory management', 'billing software', 'business management'],
  authors: [{ name: 'Zewar Desk' }],
  creator: 'Zewar Desk',
  
  // Open Graph for social media sharing
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://zewardesk.com',
    title: 'Zewar Desk - Professional Jewellery ERP System',
    description: 'Complete business management solution for jewellery shops',
    siteName: 'Zewar Desk',
  },
  
  // Search engine crawling instructions
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * RootLayout Component
 * 
 * Props:
 *   - children: React components rendered by current route
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Apply font variable and base styling */}
      <body className={`${inter.variable} font-sans antialiased bg-white text-neutral-900`}>
        {/* All page content renders here */}
        {children}
      </body>
    </html>
  )
}
