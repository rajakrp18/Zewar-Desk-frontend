// EXACT PATH: src/components/orders/OrderCard.tsx
// PURPOSE: Display order info in card format

'use client'

import Link from 'next/link'
import { Order } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { OrderStatusBadge } from './OrderStatusBadge'

interface OrderCardProps {
  order: Order
  onDelete?: (id: string) => void
}

export function OrderCard({ order, onDelete }: OrderCardProps) {
  
  const isOverdue = () => {
    const today = new Date()
    return (
      order.status !== 'delivered' && 
      order.status !== 'cancelled' &&
      new Date(order.deliveryDate) < today
    )
  }
  
  const pendingAmount = order.totalAmount - order.advancePayment
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link 
              href={`/dashboard/orders/${order.id}`}
              className="text-lg font-bold text-neutral-900 hover:text-neutral-700"
            >
              {order.orderNumber}
            </Link>
            <p className="text-sm text-neutral-600 mt-1">
              {formatDate(order.date)}
            </p>
          </div>
          <OrderStatusBadge status={order.status as any} />
        </div>
        
        {/* Customer */}
        <div className="mb-4 pb-4 border-b border-neutral-200">
          <p className="text-sm text-neutral-600 mb-1">Customer:</p>
          <p className="font-semibold text-neutral-900">{order.customerName}</p>
        </div>
        
        {/* Item Description */}
        <div className="mb-4">
          <p className="text-sm text-neutral-600 mb-1">Item:</p>
          <p className="text-neutral-900 line-clamp-2">{order.itemDescription}</p>
        </div>
        
        {/* Delivery Date */}
        <div className="mb-4">
          <p className="text-sm text-neutral-600 mb-1">Delivery Date:</p>
          <div className="flex items-center gap-2">
            <p className={`font-semibold ${isOverdue() ? 'text-red-600' : 'text-neutral-900'}`}>
              {formatDate(order.deliveryDate)}
            </p>
            {isOverdue() && (
              <span className="text-xs text-red-600 font-medium">OVERDUE</span>
            )}
          </div>
        </div>
        
        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-neutral-50 rounded-lg">
          <div>
            <p className="text-xs text-neutral-600 mb-1">Total Amount:</p>
            <p className="font-semibold text-neutral-900">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 mb-1">Advance Paid:</p>
            <p className="font-semibold text-green-600">
              {formatCurrency(order.advancePayment)}
            </p>
          </div>
        </div>
        
        {/* Pending Amount */}
        {pendingAmount > 0 && (
          <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Pending Balance:</p>
            <p className="text-lg font-bold text-orange-700">
              {formatCurrency(pendingAmount)}
            </p>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/orders/${order.id}`} className="flex-1">
            <Button variant="primary" className="w-full" size="sm">
              View Details
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete order ${order.orderNumber}?`)) {
                  onDelete(order.id)
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
