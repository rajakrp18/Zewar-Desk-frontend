// EXACT PATH: src/lib/storage.ts
// PURPOSE: LocalStorage helpers for persisting data in Phase 1

/**
 * Storage keys for different data types
 */
export const STORAGE_KEYS = {
  INVENTORY: 'zewar_desk_inventory',
  CUSTOMERS: 'zewar_desk_customers',
  BILLS: 'zewar_desk_bills',
  ORDERS: 'zewar_desk_orders',
  GOLD_RATES: 'zewar_desk_gold_rates',
  BUSINESS_INFO: 'zewar_desk_business',
} as const

/**
 * Get data from localStorage
 */
export function getFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage:`, error)
    return null
  }
}

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error saving to localStorage:`, error)
    return false
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage:`, error)
    return false
  }
}

/**
 * Clear all app data from localStorage
 */
export function clearAllStorage(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error(`Error clearing localStorage:`, error)
    return false
  }
}
