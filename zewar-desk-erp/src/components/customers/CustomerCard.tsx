// EXACT PATH: src/components/customers/CustomerCard.tsx
// PURPOSE: Display customer info card

'use client'

import Link from 'next/link'
import { Customer } from '@/lib/types'
import { formatCurrency, formatDate, formatPhone } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CustomerCardProps {
  customer: Customer
  onDelete?: (id: string) => void
}

export function CustomerCard({ customer, onDelete }: CustomerCardProps) {
  
  const getCustomerTier = (totalPurchases: number): { label: string, variant: 'default' | 'success' | 'warning' | 'info' } => {
    if (totalPurchases >= 500000) return { label: 'VIP', variant: 'success' }
    if (totalPurchases >= 200000) return { label: 'Gold', variant: 'warning' }
    if (totalPurchases >= 50000) return { label: 'Silver', variant: 'info' }
    return { label: 'Regular', variant: 'default' }
  }
  
  const tier = getCustomerTier(customer.totalPurchases)
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-neutral-900">
                {customer.name}
              </h3>
              <Badge variant={tier.variant}>{tier.label}</Badge>
            </div>
            <p className="text-sm text-neutral-600">{customer.city}, {customer.state}</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-600">📞</span>
            <span className="text-neutral-900">{formatPhone(customer.phone)}</span>
          </div>
          {customer.email && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-600">✉️</span>
              <span className="text-neutral-900">{customer.email}</span>
            </div>
          )}
          {customer.gstin && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-600">🏢</span>
              <span className="text-neutral-900 font-mono text-xs">{customer.gstin}</span>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-neutral-50 rounded-lg">
          <div>
            <p className="text-xs text-neutral-600 mb-1">Total Purchases</p>
            <p className="text-lg font-bold text-neutral-900">
              {formatCurrency(customer.totalPurchases)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 mb-1">Total Orders</p>
            <p className="text-lg font-bold text-neutral-900">
              {customer.totalOrders}
            </p>
          </div>
        </div>
        
        {/* Last Purchase */}
        {customer.lastPurchaseDate && (
          <div className="mb-4 pb-4 border-b border-neutral-200">
            <p className="text-xs text-neutral-600 mb-1">Last Purchase</p>
            <p className="text-sm font-semibold text-neutral-900">
              {formatDate(customer.lastPurchaseDate)}
            </p>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/customers/${customer.id}`} className="flex-1">
            <Button variant="primary" className="w-full" size="sm">
              View Details
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete customer "${customer.name}"?`)) {
                  onDelete(customer.id)
                }
              }}
              className="text-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
