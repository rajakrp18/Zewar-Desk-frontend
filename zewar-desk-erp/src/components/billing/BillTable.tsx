// EXACT PATH: src/components/billing/BillTable.tsx
// PURPOSE: Display bills in a table format

'use client'

import Link from 'next/link'
import { Bill } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface BillTableProps {
  bills: Bill[]
  onDelete?: (id: string) => void
}

export function BillTable({ bills, onDelete }: BillTableProps) {
  
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
  
  if (bills.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
        <div className="text-4xl mb-4">📄</div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No bills found
        </h3>
        <p className="text-neutral-600 mb-6">
          Create your first bill to get started
        </p>
        <Link href="/dashboard/billing/new">
          <Button variant="primary">Create First Bill</Button>
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
                Bill Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Payment
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
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <Link 
                    href={`/dashboard/billing/${bill.id}`}
                    className="font-semibold text-neutral-900 hover:text-neutral-700"
                  >
                    {bill.billNumber}
                  </Link>
                </td>
                <td className="px-6 py-4 text-neutral-900">
                  {bill.customerName}
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {formatDate(bill.date)}
                </td>
                <td className="px-6 py-4 text-neutral-900">
                  {bill.items.length}
                </td>
                <td className="px-6 py-4 font-semibold text-neutral-900">
                  {formatCurrency(bill.total)}
                </td>
                <td className="px-6 py-4 text-neutral-600 capitalize">
                  {bill.paymentMethod || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(bill.status)} className="capitalize">
                    {bill.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/billing/${bill.id}`}>
                      <Button variant="ghost" size="sm">
                        View
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
