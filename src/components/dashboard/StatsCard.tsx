// EXACT PATH: src/components/dashboard/StatsCard.tsx
// PURPOSE: Reusable statistics card for dashboard metrics

'use client'

import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: string
  color?: 'gold' | 'blue' | 'green' | 'purple' | 'orange'
  trend?: 'up' | 'down' | 'neutral'
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'blue',
  trend = 'neutral'
}: StatsCardProps) {
  
  const colorClasses = {
    gold: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    green: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white',
  }
  
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-neutral-600 bg-neutral-50',
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div className={cn(
            'w-14 h-14 rounded-lg flex items-center justify-center text-2xl',
            colorClasses[color]
          )}>
            {icon}
          </div>
          
          {/* Change Badge */}
          {change !== undefined && (
            <div className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold',
              trendColors[trend]
            )}>
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
        </div>
      </div>
    </Card>
  )
}
