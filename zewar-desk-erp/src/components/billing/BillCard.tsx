// EXACT PATH: src/components/billing/BillCard.tsx
// PURPOSE: Display bill info in card format

'use client'

import Link from 'next/link'
import { Bill } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface BillCardProps {
  bill: Bill
  onDelete?: (id: string) => void
}

export function BillCard({ bill, onDelete }: BillCardProps) {
  
  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link 
              href={`/dashboard/billing/${bill.id}`}
              className="text-lg font-bold text-neutral-900 hover:text-neutral-700"
            >
              {bill.billNumber}
            </Link>
            <p className="text-sm text-neutral-600 mt-1">
              {formatDate(bill.date)}
            </p>
          </div>
          <Badge variant={getStatusVariant(bill.status)} className="capitalize">
            {bill.status}
          </Badge>
        </div>
        
        {/* Customer Info */}
        <div className="mb-4 pb-4 border-b border-neutral-200">
          <p className="text-sm text-neutral-600 mb-1">Customer:</p>
          <p className="font-semibold text-neutral-900">{bill.customerName}</p>
        </div>
        
        {/* Items & Amount */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-neutral-600 mb-1">Items:</p>
            <p className="font-semibold text-neutral-900">{bill.items.length}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Payment:</p>
            <p className="font-semibold text-neutral-900 capitalize">
              {bill.paymentMethod || 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Total */}
        <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600 mb-1">Total Amount:</p>
          <p className="text-2xl font-bold text-neutral-900">
            {formatCurrency(bill.total)}
          </p>
          {bill.discount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Saved: {formatCurrency(bill.discount)}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/billing/${bill.id}`} className="flex-1">
            <Button variant="primary" className="w-full" size="sm">
              View Details
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete bill ${bill.billNumber}?`)) {
                  onDelete(bill.id)
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
