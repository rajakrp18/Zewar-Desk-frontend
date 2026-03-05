// src/app/page.tsx
/**
 * Landing Page (Home)
 * 
 * The main landing page visible when users visit the application.
 * Includes:
 * - Hero section with value proposition
 * - Feature showcase (6 key features)
 * - Statistics demonstrating traction
 * - Call-to-action buttons for sign up and login
 * - Footer with company information
 */

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ROUTES } from '@/lib/constants'

/**
 * Landing Page Component
 * 
 * Server-side rendered (SSR) page component
 * Shows to unauthenticated users as entry point
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Premium Styling */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-gold-50 opacity-60"></div>
        <div className="container-custom py-20 md:py-40 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold">✨ Premium ERP Solution</span>
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight tracking-tight">
                  Professional Jewellery Business Management
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Zewar Desk is a comprehensive ERP solution designed specifically for jewellery shops. Manage inventory, billing, customers, and orders with premium features.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={ROUTES.SIGNUP}>
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Demo Account
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex items-center gap-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>500+ Active Shops</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 bg-gradient-to-br from-gold-100 to-gold-50 rounded-2xl border-2 border-gold-200 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-gold-200/30 to-transparent"></div>
              <div className="text-center relative z-10">
                <div className="text-7xl mb-4 drop-shadow-lg">💎</div>
                <h3 className="text-2xl font-bold text-gold-900 mb-2">Dashboard Preview</h3>
                <p className="text-gold-700">Coming Soon...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Powerful Features for Modern Jewellery Shops</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">Complete suite of tools to manage every aspect of your jewellery business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Smart Inventory</h3>
              <p className="text-neutral-600 leading-relaxed">Track gold, diamonds, and precious stones with real-time weight and purity management</p>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💷</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Accurate Billing</h3>
              <p className="text-neutral-600 leading-relaxed">Generate detailed bills with automatic gold rate calculation and tax management</p>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Customer Management</h3>
              <p className="text-neutral-600 leading-relaxed">Maintain customer profiles, purchase history, and custom jewelry orders</p>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Analytics & Reports</h3>
              <p className="text-neutral-600 leading-relaxed">Get insights into sales, inventory trends, and business performance</p>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💻</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Cloud Based</h3>
              <p className="text-neutral-600 leading-relaxed">Access your business from anywhere, anytime with secure cloud storage</p>
            </div>

            <div className="group p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-gold-300 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Secure & Reliable</h3>
              <p className="text-neutral-600 leading-relaxed">Enterprise-grade security with automatic backups and data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-4">500+</div>
              <p className="text-neutral-300 text-lg">Active Shops</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-4">₹500Cr+</div>
              <p className="text-neutral-300 text-lg">Total Sales Managed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-4">50K+</div>
              <p className="text-neutral-300 text-lg">Invoices Generated</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-4">99.9%</div>
              <p className="text-neutral-300 text-lg">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50 to-white opacity-60"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Ready to Transform Your Jewellery Business?</h2>
          <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">Start managing your inventory, billing, and customers with Zewar Desk. First month free for all new users!</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.SIGNUP}>
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Demo Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
