// EXACT PATH: src/components/dashboard/GoldRateWidget.tsx
// PURPOSE: Display current gold rates

'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import type { GoldRate } from '@/lib/types'

interface GoldRateWidgetProps {
  rates: GoldRate[]
}

export function GoldRateWidget({ rates }: GoldRateWidgetProps) {
  
  const getPurityColor = (purity: string): string => {
    switch (purity) {
      case '24K':
        return 'bg-amber-100 text-amber-900 border-amber-300'
      case '22K':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300'
      case '18K':
        return 'bg-orange-100 text-orange-900 border-orange-300'
      case '14K':
        return 'bg-amber-50 text-amber-800 border-amber-200'
      default:
        return 'bg-neutral-100 text-neutral-900 border-neutral-300'
    }
  }
  
  const lastUpdated = rates.length > 0 ? rates[0].lastUpdated : new Date()
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today's Gold Rates</CardTitle>
          <span className="text-xs text-neutral-500">
            ₹ per gram
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rates.map((rate) => (
            <div
              key={rate.purity}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${getPurityColor(rate.purity)}`}
            >
              {/* Purity Label */}
              <div>
                <p className="font-bold text-lg">{rate.purity}</p>
                <p className="text-xs opacity-75">Gold</p>
              </div>
              
              {/* Prices */}
              <div className="text-right">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs opacity-75">Buy</p>
                    <p className="font-semibold">
                      {formatCurrency(rate.buyPrice)}
                    </p>
                  </div>
                  <div className="w-px h-10 bg-current opacity-20"></div>
                  <div>
                    <p className="text-xs opacity-75">Sell</p>
                    <p className="font-semibold">
                      {formatCurrency(rate.sellPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            Last updated: {formatDateTime(lastUpdated)}
          </p>
          <div className="mt-2 text-center">
            <a 
              href="/dashboard/settings/gold-rates" 
              className="text-sm font-medium text-neutral-900 hover:text-neutral-700"
            >
              Update Rates →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
