// src/components/ui/Badge.tsx
/**
 * Badge Component
 * 
 * Small, colored label component for status or category display.
 * Variants:
 * - default: Neutral gray
 * - success: Green (for positive/completed states)
 * - warning: Yellow (for alerts/pending states)
 * - danger: Red (for errors/critical states)
 * - info: Blue (for informational states)
 * 
 * Useful for tags, status indicators, order states, etc.
 */

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Badge component props interface
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant for different states */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

/**
 * Badge Component
 * 
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Failed</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    // Color styles for each variant
    const variants = {
      default: 'bg-neutral-100 text-neutral-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'
