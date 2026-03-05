// src/components/ui/Button.tsx
/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes.
 * Variants:
 * - primary: Main CTA button (solid background with premium gold accent)
 * - secondary: Secondary action button
 * - outline: Border-only button
 * - ghost: Text-only button
 * - danger: Destructive action button (red)
 * - gold: Premium gold accent button
 * 
 * Sizes:
 * - sm: Small (padding and text)
 * - md: Medium (default)
 * - lg: Large (prominent)
 * 
 * Features:
 * - Loading state with spinner
 * - Full-width option for forms
 * - Accessible with aria attributes
 * - Forwarded ref for programmatic access
 * - Premium shadow and hover effects
 */

'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button component props interface
 * Extends standard HTML button attributes
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean
  /** Make button full width of container */
  fullWidth?: boolean
}

/**
 * Button Component
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="gold" size="lg">Premium Action</Button>
 * <Button variant="outline" isLoading={isLoading}>Submit</Button>
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
    
    const variants = {
      primary: 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg active:shadow-md focus-visible:ring-neutral-900 shadow-md',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:shadow-base active:shadow-none focus-visible:ring-neutral-500 shadow-sm',
      outline: 'border-2 border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-base active:shadow-none focus-visible:ring-neutral-500',
      ghost: 'text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:shadow-md focus-visible:ring-red-600 shadow-md',
      gold: 'bg-gradient-to-r from-gold-400 to-gold-500 text-white hover:from-gold-500 hover:to-gold-600 hover:shadow-lg active:shadow-md focus-visible:ring-gold-500 shadow-lg font-semibold tracking-wide',
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-10 px-4 text-sm rounded-lg',
      lg: 'h-12 px-6 text-base rounded-lg',
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
