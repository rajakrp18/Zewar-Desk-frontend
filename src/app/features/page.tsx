import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'

export default function FeaturesPage() {
  const features = [
    {
      icon: '📦',
      title: 'Inventory Management',
      description: 'Track gold, diamonds, and precious stones with real-time weight and purity management. Monitor stock levels, set alerts for low inventory, and maintain detailed item records.',
      benefits: [
        'Real-time inventory tracking',
        'Weight and purity management',
        'Low stock alerts',
        'Category-based organization',
        'Bulk operations support',
      ],
    },
    {
      icon: '💳',
      title: 'Advanced Billing System',
      description: 'Generate detailed invoices with automatic gold rate calculations, tax management, and payment tracking. Support for multiple payment methods and customizable templates.',
      benefits: [
        'Automatic gold rate calculation',
        'Tax management (GST)',
        'Multiple payment methods',
        'Invoice customization',
        'Payment tracking',
      ],
    },
    {
      icon: '👥',
      title: 'Customer Management',
      description: 'Maintain comprehensive customer profiles with purchase history, preferences, and order tracking. Build stronger relationships with loyalty programs and targeted marketing.',
      benefits: [
        'Customer profiles',
        'Purchase history',
        'Custom jewelry orders',
        'Loyalty tracking',
        'Communication history',
      ],
    },
    {
      icon: '📋',
      title: 'Order Management',
      description: 'Track custom orders from creation to delivery. Monitor order status, manage timelines, and maintain delivery schedules with automated notifications.',
      benefits: [
        'Order creation & tracking',
        'Delivery date management',
        'Status notifications',
        'Timeline monitoring',
        'Customer communication',
      ],
    },
    {
      icon: '📊',
      title: 'Comprehensive Analytics',
      description: 'Get deep insights into your business performance with detailed reports on sales, inventory trends, customer behavior, and financial metrics.',
      benefits: [
        'Sales analytics',
        'Inventory analysis',
        'Customer insights',
        'Revenue trending',
        'Custom report generation',
      ],
    },
    {
      icon: '💰',
      title: 'Gold Rate Tracking',
      description: 'Real-time gold and precious metal rate tracking with historical data, trend analysis, and automatic billing calculations based on current rates.',
      benefits: [
        'Real-time rate updates',
        'Multiple purity tracking (22K, 18K, etc)',
        'Historical trends',
        'Automatic calculations',
        'Price alerts',
      ],
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with encrypted data storage, regular backups, and access controls. Ensure your business data is always safe and secure.',
      benefits: [
        'End-to-end encryption',
        'Automatic daily backups',
        'Role-based access control',
        'Audit logs',
        'Data restoration',
      ],
    },
    {
      icon: '📱',
      title: 'Mobile & Cloud Access',
      description: 'Access your business from anywhere with our cloud-based solution. Manage operations on desktop, tablet, or mobile devices seamlessly.',
      benefits: [
        'Cloud-based infrastructure',
        'Mobile responsive design',
        'Offline capabilities',
        '99.9% uptime SLA',
        'Automatic sync',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-gold-50 py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Powerful Features for Your Jewellery Business
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Everything you need to manage inventory, billing, customers, and orders efficiently
            </p>
            <Link href={ROUTES.SIGNUP}>
              <Button variant="gold" size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-6">
                {/* Feature Card */}
                <div className="p-8 rounded-2xl border-2 border-neutral-200 hover:border-gold-300 hover:shadow-xl transition-all bg-white">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">{feature.title}</h2>
                  <p className="text-neutral-600 mb-6">{feature.description}</p>

                  {/* Benefits List */}
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 md:py-32">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Jewellery Business?
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Join 500+ jewellery shops already using Zewar Desk. Get started free today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.SIGNUP}>
              <Button variant="gold" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
