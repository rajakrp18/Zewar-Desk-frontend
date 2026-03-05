// src/app/dashboard/page.tsx
/**
 * Dashboard Home Page
 * 
 * Main dashboard view showing business overview and key metrics.
 * Components:
 * - Statistics cards (Sales, Inventory, Orders, Customers)
 * - Recent transactions table
 * - Gold rate tracker (22K and 18K rates)
 * 
 * Client component using React hooks for interactivity
 * Currently displays mock data for demonstration
 * Phase 2 will fetch real data from backend API
 */

'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

/**
 * Dashboard Page Component
 * 
 * Renders:
 * - Key business statistics
 * - Recent transactions
 * - Gold rate information
 * - Quick action buttons
 */
export default function DashboardPage() {
  // Mock statistics data - will be replaced with API data in Phase 2
  const stats = [
    {
      title: 'Total Sales',
      value: formatCurrency(245000),
      change: '+12.5%',
      icon: '💰',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(1500000),
      change: '+4.2%',
      icon: '📦',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Pending Bills',
      value: '24',
      change: '-8%',
      icon: '📋',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'Total Customers',
      value: '342',
      change: '+15%',
      icon: '👥',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Welcome back! 👋</h1>
          <p className="text-neutral-600 mt-2">Here's your business overview at a glance</p>
        </div>
        <div className="flex gap-3">
          <Link href={ROUTES.BILLING}>
            <Button variant="outline" size="lg">
              Create Invoice
            </Button>
          </Link>
          <Link href={ROUTES.INVENTORY}>
            <Button variant="gold" size="lg">
              ➕ Add Inventory
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className={`border-2 ${stat.borderColor} hover:shadow-xl transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`text-3xl ${stat.bgColor} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href={ROUTES.BILLING} className="text-sm font-medium text-gold-600 hover:text-gold-700">
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '#INV-001', customer: 'Rajesh Kumar', amount: '₹45,000', date: '2 hours ago', status: 'Completed' },
                { id: '#INV-002', customer: 'Priya Singh', amount: '₹32,500', date: '5 hours ago', status: 'Completed' },
                { id: '#INV-003', customer: 'Amit Patel', amount: '₹78,900', date: '1 day ago', status: 'Pending' },
              ].map((txn, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 px-2 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">{txn.customer}</p>
                    <p className="text-sm text-neutral-500">{txn.id} • {txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold-600">{txn.amount}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      txn.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats - Gold Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Gold Rate Update</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-gold-50 to-gold-100 rounded-xl border-2 border-gold-200">
              <p className="text-sm text-neutral-600 font-medium mb-2">22K Gold</p>
              <p className="text-3xl font-bold text-gold-700">₹6,500</p>
              <p className="text-xs text-neutral-600 mt-2">per gram</p>
              <div className="mt-3 flex items-center gap-2 text-green-600 font-medium text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clipRule="evenodd" /></svg>
                ↑ ₹120 today
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200">
              <p className="text-sm text-neutral-600 font-medium mb-2">18K Gold</p>
              <p className="text-3xl font-bold text-amber-700">₹5,200</p>
              <p className="text-xs text-neutral-600 mt-2">per gram</p>
              <div className="mt-3 flex items-center gap-2 text-red-600 font-medium text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 110-2h5zm0-6a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clipRule="evenodd" /></svg>
                ↓ ₹50 today
              </div>
            </div>

            <Link href={ROUTES.BILLING} className="block">
              <Button variant="outline" size="lg" className="w-full">
                Update Rates
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href={ROUTES.INVENTORY}>
              <div className="p-4 rounded-xl border-2 border-neutral-200 hover:border-gold-300 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="text-4xl mb-2">📦</div>
                <p className="font-semibold text-neutral-900 text-sm">Manage Inventory</p>
              </div>
            </Link>
            <Link href={ROUTES.BILLING}>
              <div className="p-4 rounded-xl border-2 border-neutral-200 hover:border-gold-300 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="text-4xl mb-2">📃</div>
                <p className="font-semibold text-neutral-900 text-sm">Create Invoice</p>
              </div>
            </Link>
            <Link href={ROUTES.CUSTOMERS}>
              <div className="p-4 rounded-xl border-2 border-neutral-200 hover:border-gold-300 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="text-4xl mb-2">👥</div>
                <p className="font-semibold text-neutral-900 text-sm">View Customers</p>
              </div>
            </Link>
            <Link href={ROUTES.ORDERS}>
              <div className="p-4 rounded-xl border-2 border-neutral-200 hover:border-gold-300 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="text-4xl mb-2">📦</div>
                <p className="font-semibold text-neutral-900 text-sm">Track Orders</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
