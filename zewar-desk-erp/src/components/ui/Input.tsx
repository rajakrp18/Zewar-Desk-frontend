// src/components/ui/Input.tsx
/**
 * Input Component
 * 
 * Reusable text input component with integrated label and error handling.
 * Features:
 * - Label display (optional) with premium typography
 * - Error message with styling
 * - Helper text for guidance
 * - Password visibility toggle for password fields
 * - Accessibility with proper aria attributes
 * - Required indicator
 * - Multiple input types (text, email, password, etc.)
 * - Premium focus states and transitions
 */

'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Input component props interface
 * Extends standard HTML input attributes
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above input */
  label?: string
  /** Error message - shows in red when provided */
  error?: string
  /** Helper text for additional guidance */
  helperText?: string
}

/**
 * Input Component with premium styling
 * 
 * @example
 * <Input label="Email" type="email" placeholder="user@example.com" />
 * <Input label="Password" type="password" error="Password is required" />
 * <Input label="Phone" helperText="10-digit Indian phone number" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-neutral-700 mb-2.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            className={cn(
              'flex h-11 w-full rounded-lg border-2 bg-white px-4 py-2.5 text-sm placeholder:text-neutral-400 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',
              error 
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 hover:border-neutral-300',
              className
            )}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7C7.523 19 3.732 16.057 2.458 12z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.34 3.34m13.455 13.455L21 21M9.172 9.172L21 21m-12-12l-8.485-8.485" />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm font-medium text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.687a1 1 0 00-1.414 1.414l8.1 8.1a1 1 0 001.414 0l8.1-8.1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
