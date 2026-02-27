'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Sales',
      value: formatCurrency(245000),
      change: '+12.5%',
      icon: '💰',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(1500000),
      change: '+4.2%',
      icon: '📦',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Bills',
      value: '24',
      change: '-8%',
      icon: '📋',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Customers',
      value: '342',
      change: '+15%',
      icon: '👥',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Welcome back to Zewar Desk</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`text-2xl ${stat.bgColor} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '#INV-001', customer: 'Rajesh Kumar', amount: '₹45,000', date: '2 hours ago' },
                { id: '#INV-002', customer: 'Priya Singh', amount: '₹32,500', date: '5 hours ago' },
                { id: '#INV-003', customer: 'Amit Patel', amount: '₹78,900', date: '1 day ago' },
              ].map((txn, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div>
                    <p className="font-medium text-neutral-900">{txn.customer}</p>
                    <p className="text-sm text-neutral-500">{txn.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neutral-900">{txn.amount}</p>
                    <p className="text-sm text-neutral-500">{txn.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Gold Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-neutral-600">22K Gold</p>
              <p className="text-2xl font-bold text-neutral-900">₹5,850/gm</p>
              <p className="text-xs text-green-600">↑ ₹120 today</p>
            </div>
            <div className="border-t border-neutral-200 pt-4">
              <p className="text-sm text-neutral-600">18K Gold</p>
              <p className="text-2xl font-bold text-neutral-900">₹4,780/gm</p>
              <p className="text-xs text-red-600">↓ ₹50 today</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
