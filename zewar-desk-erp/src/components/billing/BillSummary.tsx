// EXACT PATH: src/components/billing/BillSummary.tsx
// PURPOSE: Display bill calculations summary

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

interface BillSummaryProps {
  subtotal: number
  tax: number
  discount: number
  total: number
  taxRate?: number
}

export function BillSummary({ 
  subtotal, 
  tax, 
  discount, 
  total,
  taxRate = 3.6 
}: BillSummaryProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between py-2">
            <span className="text-neutral-600">Subtotal:</span>
            <span className="font-semibold text-neutral-900">
              {formatCurrency(subtotal)}
            </span>
          </div>
          
          {/* GST */}
          <div className="flex items-center justify-between py-2">
            <span className="text-neutral-600">
              GST ({taxRate}%):
            </span>
            <span className="font-semibold text-neutral-900">
              {formatCurrency(tax)}
            </span>
          </div>
          
          {/* Discount */}
          {discount > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="text-neutral-600">Discount:</span>
              <span className="font-semibold text-green-600">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}
          
          {/* Divider */}
          <div className="border-t-2 border-neutral-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-neutral-900">Total Amount:</span>
              <span className="text-2xl font-bold text-neutral-900">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
          
          {/* Savings */}
          {discount > 0 && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">You saved:</span>
                <span className="font-semibold text-green-700">
                  {formatCurrency(discount)}
                </span>
              </div>
            </div>
          )}
          
          {/* Calculation Breakdown */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="text-xs text-neutral-500 space-y-1">
              <div className="flex justify-between">
                <span>Items Total:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax Added:</span>
                <span>+{formatCurrency(tax)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount Applied:</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-neutral-700 pt-1 border-t border-neutral-200">
                <span>Final Amount:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
