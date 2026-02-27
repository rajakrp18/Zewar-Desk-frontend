// EXACT PATH: src/components/layout/Navbar.tsx
// PURPOSE: Main navigation bar for Landing, Login, Signup pages

import Link from 'next/link'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo size="md" />
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/#features" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/#about" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/#contact" 
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
