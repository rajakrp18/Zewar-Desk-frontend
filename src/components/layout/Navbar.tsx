// src/components/layout/Navbar.tsx
/**
 * Navbar Component
 * 
 * Top navigation bar displayed on all pages.
 * Shows:
 * - Logo/brand (left side)
 * - Navigation links (center) - Features, Pricing, etc.
 * - Auth buttons (right side) - Login, Sign Up
 * - Sticky positioning so always visible when scrolling
 * 
 * Responsive:
 * - Desktop: Full menu with links
 * - Mobile: Simplified menu (can be extended with hamburger)
 */

import Link from 'next/link'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'

/**
 * Navbar Component
 * 
 * Renders:
 * - Brand logo
 * - Navigation menu
 * - Auth action buttons
 */
export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand name */}
          <Logo size="md" />
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href={ROUTES.FEATURES} 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Features
            </Link>
            <Link 
              href={ROUTES.PRICING} 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href={ROUTES.ABOUT} 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href={ROUTES.CONTACT} 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Contact
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="md">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
