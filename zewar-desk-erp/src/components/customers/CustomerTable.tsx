// EXACT PATH: src/components/customers/CustomerTable.tsx
// PURPOSE: Display customers in a table format

'use client'

import Link from 'next/link'
import { Customer } from '@/lib/types'
import { formatCurrency, formatDate, formatPhone } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CustomerTableProps {
  customers: Customer[]
  onDelete?: (id: string) => void
}

export function CustomerTable({ customers, onDelete }: CustomerTableProps) {
  
  const getCustomerTier = (totalPurchases: number): { label: string, variant: 'default' | 'success' | 'warning' | 'info' } => {
    if (totalPurchases >= 500000) return { label: 'VIP', variant: 'success' }
    if (totalPurchases >= 200000) return { label: 'Gold', variant: 'warning' }
    if (totalPurchases >= 50000) return { label: 'Silver', variant: 'info' }
    return { label: 'Regular', variant: 'default' }
  }
  
  if (customers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
        <div className="text-4xl mb-4">👥</div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No customers found
        </h3>
        <p className="text-neutral-600 mb-6">
          Get started by adding your first customer
        </p>
        <Link href="/dashboard/customers/add">
          <Button variant="primary">Add First Customer</Button>
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
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Total Purchases
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Last Purchase
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {customers.map((customer) => {
              const tier = getCustomerTier(customer.totalPurchases)
              
              return (
                <tr key={customer.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {customer.name}
                      </div>
                      {customer.gstin && (
                        <div className="text-xs text-neutral-600 font-mono">
                          {customer.gstin}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-neutral-900">{formatPhone(customer.phone)}</div>
                      {customer.email && (
                        <div className="text-neutral-600 text-xs">{customer.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {customer.city}, {customer.state}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-900">
                      {formatCurrency(customer.totalPurchases)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-900">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={tier.variant}>{tier.label}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">
                    {customer.lastPurchaseDate ? formatDate(customer.lastPurchaseDate) : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/customers/${customer.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Delete "${customer.name}"?`)) {
                              onDelete(customer.id)
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
