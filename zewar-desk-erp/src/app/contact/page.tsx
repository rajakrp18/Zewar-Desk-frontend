import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@zewardesk.com',
      description: 'Send us a message. We respond within 24 hours.',
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 9876543210',
      description: 'Call us Mon-Sat, 9AM-6PM IST.',
    },
    {
      icon: '📍',
      title: 'Office',
      value: 'Mumbai, India',
      description: 'Visit us at our headquarters.',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      value: 'chat.zewardesk.com',
      description: 'Get instant support from our team.',
    },
  ]

  const socialLinks = [
    { icon: '🔗', name: 'LinkedIn', url: '#' },
    { icon: '𝕏', name: 'Twitter', url: '#' },
    { icon: '📱', name: 'Instagram', url: '#' },
    { icon: '📺', name: 'YouTube', url: '#' },
  ]

  const faqs = [
    {
      question: 'What is the response time for support?',
      answer: 'We aim to respond to all inquiries within 24 hours during business hours. Premium customers get priority support.',
    },
    {
      question: 'Do you have a physical office?',
      answer: 'Yes! Our headquarters is in Mumbai. You can schedule a meeting with our team during business hours.',
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! Email us or use our contact form to schedule a personalized demo.',
    },
    {
      question: 'Do you offer training?',
      answer: 'Yes, we provide comprehensive onboarding and training for all clients.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-gold-50 py-20 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us anytime.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, idx) => (
              <div key={idx} className="border-2 border-neutral-200 rounded-xl p-6 hover:border-gold-300 hover:shadow-lg transition-all text-center">
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{method.title}</h3>
                <p className="text-gold-600 font-semibold mb-3">{method.value}</p>
                <p className="text-sm text-neutral-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-4">Send us a Message</h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-card p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">Phone</label>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Subject</label>
                <Input type="text" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Business Type</label>
                <select className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent">
                  <option value="">Select your business type</option>
                  <option value="jewellery_shop">Jewellery Shop</option>
                  <option value="chain">Jewellery Chain</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-start gap-4">
                <input type="checkbox" id="privacy" className="mt-1" />
                <label htmlFor="privacy" className="text-sm text-neutral-600">
                  I agree to the privacy policy and terms of service
                </label>
              </div>

              <Button variant="gold" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 md:py-32 bg-neutral-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Follow Us</h2>
          <p className="text-neutral-400 mb-10 max-w-xl mx-auto">
            Connect with us on social media for updates, tips, and industry insights.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                className="w-16 h-16 bg-neutral-800 hover:bg-gold-500 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">Contact FAQs</h2>
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 md:py-32">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Not Ready to Contact Us?
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Try Zewar Desk free for 30 days. No credit card required.
          </p>
          <Button variant="gold" size="lg">
            Start Free Demo
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
