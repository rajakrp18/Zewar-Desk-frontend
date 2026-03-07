// EXACT PATH: src/components/orders/OrderStatusBadge.tsx
// PURPOSE: Display order status with color-coded badges

'use client'

import { Badge } from '@/components/ui/Badge'

type OrderStatus = 'confirmed' | 'in-progress' | 'ready' | 'delivered' | 'cancelled'

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  
  const getStatusConfig = (status: OrderStatus): {
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info'
    label: string
    icon: string
  } => {
    switch (status) {
      case 'confirmed':
        return {
          variant: 'info',
          label: 'Confirmed',
          icon: '✓'
        }
      case 'in-progress':
        return {
          variant: 'warning',
          label: 'In Progress',
          icon: '⚙️'
        }
      case 'ready':
        return {
          variant: 'success',
          label: 'Ready',
          icon: '✅'
        }
      case 'delivered':
        return {
          variant: 'default',
          label: 'Delivered',
          icon: '📦'
        }
      case 'cancelled':
        return {
          variant: 'danger',
          label: 'Cancelled',
          icon: '❌'
        }
      default:
        return {
          variant: 'default',
          label: status,
          icon: ''
        }
    }
  }
  
  const config = getStatusConfig(status)
  
  return (
    <Badge variant={config.variant} className={className}>
      {config.icon} {config.label}
    </Badge>
  )
}
