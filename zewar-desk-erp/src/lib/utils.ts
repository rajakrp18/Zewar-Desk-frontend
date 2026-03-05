// src/lib/utils.ts
/**
 * Utility functions for common operations in Zewar Desk ERP
 * Includes formatting, validation, and helper functions
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with conflict resolution
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts
 * 
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged class string with resolved Tailwind conflicts
 * @example
 * cn('px-2 py-1', { 'px-4': isLarge }) => 'py-1 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency amount in Indian Rupees (₹)
 * Uses Indian numbering system with commas as thousand separators
 * 
 * @param amount - Numeric amount to format
 * @returns Formatted currency string (e.g., "₹1,23,456.50")
 * @example
 * formatCurrency(123456.50) => "₹1,23,456.50"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date in Indian format (DD/MM/YYYY)
 * 
 * @param date - Date object or ISO date string
 * @returns Formatted date string (e.g., "27/02/2026")
 * @example
 * formatDate(new Date(2026, 1, 27)) => "27/02/2026"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj)
}

/**
 * Format date and time in Indian format (DD/MM/YYYY HH:MM)
 * 
 * @param date - Date object or ISO date string
 * @returns Formatted datetime string (e.g., "27/02/2026 14:30")
 * @example
 * formatDateTime(new Date()) => "27/02/2026 14:30"
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

/**
 * Validate email format using regex
 * Simple validation - for production, use backend validation
 * 
 * @param email - Email string to validate
 * @returns true if email format is valid, false otherwise
 * @example
 * isValidEmail('user@example.com') => true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Indian phone number format
 * Accepts 10-digit numbers starting with 6-9
 * 
 * @param phone - Phone number (can include formatting)
 * @returns true if valid Indian phone number, false otherwise
 * @example
 * isValidPhone('9876543210') => true
 * isValidPhone('1234567890') => false
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Format phone number for display
 * Converts 10-digit number to international format: +91 XXXXX XXXXX
 * 
 * @param phone - Raw phone number or already formatted number
 * @returns Formatted phone string
 * @example
 * formatPhone('9876543210') => "+91 98765 43210"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

/**
 * Generate a unique ID with prefix and timestamp
 * Useful for demo purposes and client-side ID generation
 * 
 * @param prefix - Optional prefix for the ID (default: 'id')
 * @returns Unique identifier string
 * @example
 * generateId('order') => "order_1677484523456_a1b2c3d4e"
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sleep/delay utility for async operations
 * Useful for rate limiting, testing, or sequential operations
 * 
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after specified duration
 * @example
 * await sleep(1000) // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Truncate text to specified length with ellipsis
 * 
 * @param text - Text to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated text with "..." if exceeds length
 * @example
 * truncate('Hello World', 5) => "Hello..."
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Calculate percentage of value relative to total
 * 
 * @param value - The part value
 * @param total - The whole value
 * @returns Percentage as decimal (0-100)
 * @example
 * calculatePercentage(25, 100) => 25
 * calculatePercentage(1, 3) => 33.33...
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Format weight in appropriate unit
 * Converts grams to kg if weight >= 1000 grams
 * 
 * @param grams - Weight in grams
 * @returns Formatted weight string (e.g., "50 g" or "2.50 kg")
 * @example
 * formatWeight(500) => "500 g"
 * formatWeight(2500) => "2.50 kg"
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`
  }
  return `${grams} g`
}

/**
 * Debounce function to delay execution of a function
 * Useful for search inputs, resize events, and other frequent triggers
 * 
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait before executing
 * @returns Debounced function
 * @example
 * const handleSearch = debounce((query) => {
 *   // Search API call
 * }, 500)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
