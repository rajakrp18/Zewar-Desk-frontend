import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'

export default function AboutPage() {
  const stats = [
    { number: '5,000+', label: 'Jewellery Shops' },
    { number: '₹500Cr+', label: 'Managed Daily' },
    { number: '50,000+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
  ]

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      bio: 'Former jewellery manager with 15+ years industry expertise. Built Zewar Desk to solve real business problems.',
    },
    {
      name: 'Priya Desai',
      role: 'CTO',
      bio: 'Full-stack engineer with fintech background. Leading product innovation and technical excellence.',
    },
    {
      name: 'Arjun Patel',
      role: 'Product Head',
      bio: 'Product strategist focused on jewellery retail. Previously led digital transformation for 200+ shops.',
    },
    {
      name: 'Neha Kapoor',
      role: 'Head of Operations',
      bio: 'Customer success specialist ensuring every client thrives with Zewar Desk.',
    },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'Every feature built with jewellery retailers in mind. Your success is our success.',
    },
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Bank-level encryption, daily backups, compliance with all regulations.',
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Constantly evolving with market needs and emerging technologies.',
    },
    {
      icon: '🤝',
      title: 'Transparency',
      description: 'Open communication, clear pricing, no hidden fees or surprises.',
    },
  ]

  const milestones = [
    { year: '2021', event: 'Zewar Desk founded' },
    { year: '2022', event: 'Reached 1,000 shops' },
    { year: '2023', event: 'Apps launched (iOS & Android)' },
    { year: '2024', event: '5,000+ shops using Zewar Desk' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-gold-50 py-20 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            About Zewar Desk
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Empowering jewellery retailers with modern technology since 2021.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 mb-4">
                To revolutionize jewellery retail management by providing affordable, reliable, and innovative technology solutions that help businesses grow and thrive.
              </p>
              <p className="text-lg text-neutral-600">
                We believe every jewellery shop, no matter the size, deserves enterprise-grade software without the enterprise price tag.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Vision</h2>
              <p className="text-lg text-neutral-600 mb-4">
                To become the most trusted business management platform for jewellery retailers across India and beyond.
              </p>
              <p className="text-lg text-neutral-600">
                In a digital-first world, we're enabling traditional businesses to compete and win with modern tools and data-driven insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">{stat.number}</div>
                <div className="text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="border-2 border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:border-gold-300 transition-all">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-neutral-50 py-20 md:py-32">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-card p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-gold-600 font-semibold mb-4">{member.role}</p>
                <p className="text-neutral-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">Our Journey</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gold-500 rounded-full mt-2" />
                    {idx < milestones.length - 1 && <div className="w-1 h-12 bg-gold-200" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-bold text-gold-600 mb-2">{milestone.year}</h3>
                    <p className="text-lg text-neutral-600">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-neutral-50 py-20 md:py-32">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">Why Choose Zewar Desk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Industry Expert</h3>
              <p className="text-neutral-600">Built by people who understand jewellery retail inside-out.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Affordable</h3>
              <p className="text-neutral-600">Enterprise features at a fraction of the cost.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Reliable</h3>
              <p className="text-neutral-600">99.9% uptime. Your data is always safe and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 md:py-32">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Thousands of Jewellery Retailers
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Start managing your business smarter today.
          </p>
          <Link href={ROUTES.SIGNUP}>
            <Button variant="gold" size="lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
