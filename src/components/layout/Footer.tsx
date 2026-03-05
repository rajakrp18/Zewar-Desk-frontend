// src/components/layout/Footer.tsx
/**
 * Footer Component
 * 
 * Bottom section of pages with:
 * - Brand/company information
 * - Quick links (navigation shortcuts)
 * - Company links
 * - Legal links (privacy, terms)
 * - Social media links
 * - Copyright notice with dynamic year
 * 
 * Dark theme (neutral-900) for visual separation
 * Responsive grid layout
 */

import Link from 'next/link'
import { Logo } from '@/components/branding/Logo'
import { ROUTES } from '@/lib/constants'

/**
 * Footer Component
 * 
 * Renders:
 * - Company information
 * - Navigation links
 * - Social links
 * - Copyright notice
 */
export function Footer() {
  // Dynamic copyright year
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-16">
        {/* Four column grid: Brand, Product, Company, Legal, Social */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand and description column */}
          <div className="space-y-4">
            {/* Logo with inverted colors for dark background */}
            <div className="invert">
              <Logo size="sm" showText={true} />
            </div>
            <p className="text-neutral-400 text-sm">
              Professional business management solution for jewellery shops
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">License</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>&copy; {currentYear} Zewar Desk. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
