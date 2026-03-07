// EXACT PATH: src/hooks/useInventory.ts
// PURPOSE: Custom hook for inventory state management with localStorage

'use client'

import { useState, useEffect } from 'react'
import { InventoryItem } from '@/lib/types'
import { mockInventoryItems } from '@/lib/mockData'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load inventory from localStorage on mount
  useEffect(() => {
    const stored = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY)
    
    if (stored && stored.length > 0) {
      setItems(stored)
    } else {
      // Initialize with mock data if nothing in storage
      setItems(mockInventoryItems)
      saveToStorage(STORAGE_KEYS.INVENTORY, mockInventoryItems)
    }
    
    setIsLoading(false)
  }, [])
  
  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.INVENTORY, items)
    }
  }, [items, isLoading])
  
  /**
   * Add new inventory item
   */
  const addItem = (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): InventoryItem => {
    const newItem: InventoryItem = {
      ...item,
      id: generateId('inv'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setItems(prev => [...prev, newItem])
    return newItem
  }
  
  /**
   * Update existing inventory item
   */
  const updateItem = (id: string, updates: Partial<InventoryItem>): boolean => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ))
    return true
  }
  
  /**
   * Delete inventory item
   */
  const deleteItem = (id: string): boolean => {
    setItems(prev => prev.filter(item => item.id !== id))
    return true
  }
  
  /**
   * Get single item by ID
   */
  const getItem = (id: string): InventoryItem | undefined => {
    return items.find(item => item.id === id)
  }
  
  /**
   * Search and filter items
   */
  const searchItems = (
    searchTerm?: string,
    category?: string,
    purity?: string,
    lowStock?: boolean
  ): InventoryItem[] => {
    return items.filter(item => {
      // Search by name, description, or barcode
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          item.name.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search) ||
          item.barcode?.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // Filter by category
      if (category && category !== 'all' && item.category !== category) {
        return false
      }
      
      // Filter by purity
      if (purity && purity !== 'all' && item.purity !== purity) {
        return false
      }
      
      // Filter low stock items (quantity < 10)
      if (lowStock && item.quantity >= 10) {
        return false
      }
      
      return item.isActive
    })
  }
  
  /**
   * Get low stock items
   */
  const getLowStockItems = (): InventoryItem[] => {
    return items.filter(item => item.quantity < 10 && item.isActive)
  }
  
  /**
   * Get total stock value
   */
  const getTotalStockValue = (): number => {
    return items.reduce((total, item) => 
      total + (item.sellingPrice * item.quantity), 0
    )
  }
  
  return {
    items,
    isLoading,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    searchItems,
    getLowStockItems,
    getTotalStockValue,
  }
}
