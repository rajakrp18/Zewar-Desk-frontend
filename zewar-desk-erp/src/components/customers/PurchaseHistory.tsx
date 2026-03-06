// EXACT PATH: src/components/customers/PurchaseHistory.tsx
// PURPOSE: Display customer purchase history from bills

'use client'

import { useEffect, useState } from 'react'
import { Bill } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { getFromStorage, STORAGE_KEYS } from '@/lib/storage'

interface PurchaseHistoryProps {
  customerId: string
}

export function PurchaseHistory({ customerId }: PurchaseHistoryProps) {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load bills from localStorage
    const stored = getFromStorage<Bill[]>(STORAGE_KEYS.BILLS)
    if (stored) {
      // Filter bills for this customer
      const customerBills = stored.filter(bill => bill.customerId === customerId)
      setBills(customerBills)
    }
    setIsLoading(false)
  }, [customerId])
  
  const getStatusVariant = (status: string): 'success' | 'warning' | 'default' => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      default:
        return 'default'
    }
  }
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-neutral-500">
            Loading purchase history...
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (bills.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🛍️</div>
            <p className="text-neutral-600">No purchases yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // Calculate totals
  const totalSpent = bills.reduce((sum, bill) => sum + bill.total, 0)
  const totalBills = bills.length
  const paidBills = bills.filter(b => b.status === 'paid').length
  const pendingAmount = bills
    .filter(b => b.status === 'pending')
    .reduce((sum, bill) => sum + bill.total, 0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700 mb-1">Total Spent</p>
            <p className="text-lg font-bold text-blue-900">
              {formatCurrency(totalSpent)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700 mb-1">Total Orders</p>
            <p className="text-lg font-bold text-green-900">{totalBills}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700 mb-1">Paid Bills</p>
            <p className="text-lg font-bold text-purple-900">{paidBills}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-700 mb-1">Pending</p>
            <p className="text-lg font-bold text-orange-900">
              {formatCurrency(pendingAmount)}
            </p>
          </div>
        </div>
        
        {/* Bills List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-neutral-900 mb-3">Recent Purchases</h4>
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-neutral-900">
                    {bill.billNumber}
                  </p>
                  <Badge variant={getStatusVariant(bill.status)}>
                    {bill.status}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-600">
                  {formatDate(bill.date)} • {bill.items.length} {bill.items.length === 1 ? 'item' : 'items'}
                </p>
                {bill.paymentMethod && (
                  <p className="text-xs text-neutral-500 mt-1 capitalize">
                    Payment: {bill.paymentMethod}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-neutral-900">
                  {formatCurrency(bill.total)}
                </p>
                {bill.discount > 0 && (
                  <p className="text-xs text-green-600">
                    Saved: {formatCurrency(bill.discount)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
