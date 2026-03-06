// EXACT PATH: src/components/dashboard/TransactionsList.tsx
// PURPOSE: Display recent transactions on dashboard

'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Bill } from '@/lib/types'

interface TransactionsListProps {
  transactions: Bill[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                {/* Left: Customer & Date */}
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900">
                    {transaction.customerName}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {transaction.billNumber}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                
                {/* Middle: Items Count */}
                <div className="hidden sm:block text-center px-4">
                  <p className="text-sm text-neutral-600">
                    {transaction.items.length} {transaction.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                
                {/* Right: Amount & Status */}
                <div className="text-right">
                  <p className="font-bold text-neutral-900">
                    {formatCurrency(transaction.total)}
                  </p>
                  <Badge 
                    variant={getStatusVariant(transaction.status)}
                    className="mt-1"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* View All Link */}
        {transactions.length > 0 && (
          <div className="mt-4 text-center">
            <a 
              href="/dashboard/billing" 
              className="text-sm font-medium text-neutral-900 hover:text-neutral-700"
            >
              View All Transactions →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
