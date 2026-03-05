import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        'Basic inventory management',
        'Simple billing system',
        'Limited customers (up to 50)',
        'Basic reports',
        'Email support',
        'Community access',
      ],
      notIncluded: [
        'Advanced analytics',
        'Custom templates',
        'Priority support',
        'API access',
      ],
      cta: 'Start Free',
      badge: null,
      color: 'neutral',
    },
    {
      name: 'Professional',
      price: '₹999',
      period: 'per month',
      description: 'For growing businesses',
      features: [
        'Unlimited inventory items',
        'Advanced billing with GST',
        'Unlimited customers',
        'Detailed analytics & reports',
        'Priority email support',
        'Custom invoice templates',
        'Gold rate tracking',
        'Backup & security',
      ],
      notIncluded: [
        'Phone support',
        'API access',
        'Custom integrations',
      ],
      cta: 'Start Free Trial',
      badge: 'Most Popular',
      color: 'gold',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large operations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'API access & webhooks',
        'White-label solution',
        'Advanced security',
        'SLA guarantee',
        'Training & onboarding',
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      badge: null,
      color: 'neutral',
    },
  ]

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect at the next billing cycle.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and bank transfers. UPI and digital wallets coming soon.',
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees. You only pay the monthly subscription. Professional onboarding is included.',
    },
    {
      question: 'What if I cancel?',
      answer: 'You can cancel anytime with no penalty. Your data will be available for download for 30 days.',
    },
    {
      question: 'Do you offer discounts?',
      answer: 'Yes! Annual plans get 20% discount. Contact sales for volume discounts and special pricing.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, daily backups, and comply with all data protection regulations.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-gold-50 py-20 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your jewellery business. Start free, upgrade as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div key={idx} className={`relative rounded-2xl border-2 transition-all hover:shadow-2xl ${
                plan.color === 'gold'
                  ? 'border-gold-400 bg-gradient-to-br from-white to-gold-50 ring-2 ring-gold-400 ring-offset-2'
                  : 'border-neutral-200 bg-white'
              }`}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <p className="text-neutral-600 mb-6 text-sm">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-600 ml-2">/{plan.period}</span>
                  </div>

                  {/* CTA Button */}
                  <Link href={ROUTES.SIGNUP} className="block mb-8">
                    <Button
                      variant={plan.color === 'gold' ? 'gold' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  {/* Features */}
                  <div className="space-y-4 mb-8 border-t-2 border-neutral-200 pt-8">
                    <h4 className="font-bold text-neutral-900">Includes:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-3">
                          <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            plan.color === 'gold' ? 'text-gold-600' : 'text-green-600'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-neutral-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  {plan.notIncluded.length > 0 && (
                    <div className="space-y-3 border-t-2 border-neutral-200 pt-8">
                      <h4 className="font-bold text-neutral-900">Not included:</h4>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-neutral-500 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-600">Got questions? We have answers.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border-2 border-neutral-200 rounded-xl p-6 hover:border-gold-300 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-neutral-900 group-open:text-gold-600">
                  {faq.question}
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </summary>
                <p className="mt-4 text-neutral-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 md:py-32">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Free Trial Today
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            No credit card required. Cancel anytime. Full access to all professional features.
          </p>
          <Link href={ROUTES.SIGNUP}>
            <Button variant="gold" size="lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
