// EXACT PATH: src/components/dashboard/QuickActions.tsx
// PURPOSE: Quick action buttons on dashboard

'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface QuickAction {
  label: string
  href: string
  icon: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    label: 'New Bill',
    href: '/dashboard/billing/new',
    icon: '📄',
    color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
  },
  {
    label: 'Add Stock',
    href: '/dashboard/inventory/add',
    icon: '📦',
    color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
  },
  {
    label: 'New Customer',
    href: '/dashboard/customers/add',
    icon: '👤',
    color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
  },
  {
    label: 'New Order',
    href: '/dashboard/orders/new',
    icon: '🛍️',
    color: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <button
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${action.color}`}
              >
                <div className="text-3xl mb-2">{action.icon}</div>
                <p className="text-sm font-semibold">{action.label}</p>
              </button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
