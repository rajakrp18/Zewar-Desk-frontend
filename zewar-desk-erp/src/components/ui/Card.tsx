// src/components/ui/Card.tsx
/**
 * Card Component System
 * 
 * Compound component pattern for flexible card layouts.
 * Includes:
 * - Card: Main container with premium styling
 * - CardHeader: Header section with padding
 * - CardTitle: Heading text with premium typography
 * - CardDescription: Subtitle/description text
 * - CardContent: Main content area
 * - CardFooter: Footer section for actions
 * 
 * Useful for data containers, stats, forms, etc.
 * Features premium shadows, borders, and hover effects
 */

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Card component props interface
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Main Card Container
 * Premium styling with shadow and border
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-neutral-200 bg-white shadow-card hover:shadow-lg transition-shadow duration-200',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-2 p-6 border-b border-neutral-100', className)}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight text-neutral-900', className)}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-neutral-500', className)}
        {...props}
      />
    )
  }
)

CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      />
    )
  }
)

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between p-6 pt-4 border-t border-neutral-100', className)}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'
