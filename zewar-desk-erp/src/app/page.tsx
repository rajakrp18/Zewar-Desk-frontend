import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ROUTES } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="border-b border-neutral-200">
        <div className="container-custom py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
                Professional Jewellery Business Management
              </h1>
              <p className="text-lg text-neutral-600">
                Zewar Desk is a comprehensive ERP solution designed specifically for jewellery shops. Manage inventory, billing, customers, and orders with ease.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={ROUTES.SIGNUP}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💎</div>
                <p className="text-neutral-600">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-neutral-200 py-20 md:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Jewellery Shops</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Everything you need to manage your jewellery business efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-3">Smart Inventory</h3>
              <p className="text-neutral-600">Track gold, diamonds, and precious stones with real-time weight and purity management</p>
            </div>

            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">💷</div>
              <h3 className="text-xl font-bold mb-3">Accurate Billing</h3>
              <p className="text-neutral-600">Generate detailed bills with automatic gold rate calculation and tax management</p>
            </div>

            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Customer Management</h3>
              <p className="text-neutral-600">Maintain customer profiles, purchase history, and custom jewelry orders</p>
            </div>

            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Analytics & Reports</h3>
              <p className="text-neutral-600">Get insights into sales, inventory trends, and business performance</p>
            </div>

            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3">Cloud Based</h3>
              <p className="text-neutral-600">Access your business from anywhere, anytime with secure cloud storage</p>
            </div>

            <div className="p-8 rounded-xl border border-neutral-200 bg-white">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
              <p className="text-neutral-600">Enterprise-grade security with automatic backups and data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-neutral-200 py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">500+</div>
              <p className="text-neutral-600">Active Shops</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">₹500Cr+</div>
              <p className="text-neutral-600">Total Sales Managed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">50K+</div>
              <p className="text-neutral-600">Invoices Generated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">99.9%</div>
              <p className="text-neutral-600">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Jewellery Business?</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">Start managing your inventory, billing, and customers with Zewar Desk. Free for the first month!</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.SIGNUP}>
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
