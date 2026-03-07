// EXACT PATH: src/components/orders/OrderTable.tsx
// PURPOSE: Display orders in table format

'use client'

import Link from 'next/link'
import { Order } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { OrderStatusBadge } from './OrderStatusBadge'

interface OrderTableProps {
  orders: Order[]
  onDelete?: (id: string) => void
}

export function OrderTable({ orders, onDelete }: OrderTableProps) {
  
  const isOverdue = (order: Order) => {
    const today = new Date()
    return (
      order.status !== 'delivered' && 
      order.status !== 'cancelled' &&
      new Date(order.deliveryDate) < today
    )
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No orders found
        </h3>
        <p className="text-neutral-600 mb-6">
          Create your first custom order to get started
        </p>
        <Link href="/dashboard/orders/new">
          <Button variant="primary">Create First Order</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Item Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Delivery Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {orders.map((order) => {
              const overdue = isOverdue(order)
              
              return (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link 
                      href={`/dashboard/orders/${order.id}`}
                      className="font-semibold text-neutral-900 hover:text-neutral-700"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="text-xs text-neutral-500">
                      {formatDate(order.date)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-neutral-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-neutral-900 line-clamp-2 max-w-xs">
                      {order.itemDescription}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${overdue ? 'text-red-600' : 'text-neutral-900'}`}>
                        {formatDate(order.deliveryDate)}
                      </span>
                      {overdue && (
                        <span className="text-xs text-red-600 font-medium">OVERDUE</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Advance: {formatCurrency(order.advancePayment)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status as any} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          View
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
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
