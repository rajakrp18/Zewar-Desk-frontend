// EXACT PATH: src/hooks/useOrders.ts
// PURPOSE: Custom hook for orders management with localStorage

'use client'

import { useState, useEffect } from 'react'
import { Order } from '@/lib/types'
import { mockOrders } from '@/lib/mockData'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load orders from localStorage on mount
  useEffect(() => {
    const stored = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS)
    
    if (stored && stored.length > 0) {
      setOrders(stored)
    } else {
      // Initialize with mock data if nothing in storage
      setOrders(mockOrders)
      saveToStorage(STORAGE_KEYS.ORDERS, mockOrders)
    }
    
    setIsLoading(false)
  }, [])
  
  // Save to localStorage whenever orders change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.ORDERS, orders)
    }
  }, [orders, isLoading])
  
  /**
   * Generate next order number
   */
  const generateOrderNumber = (): string => {
    const year = new Date().getFullYear()
    const existingOrders = orders.filter(o => 
      o.orderNumber.startsWith(`ORD-${year}`)
    )
    const nextNumber = existingOrders.length + 1
    return `ORD-${year}-${String(nextNumber).padStart(3, '0')}`
  }
  
  /**
   * Create new order
   */
  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>
  ): Order => {
    const newOrder: Order = {
      ...orderData,
      id: generateId('ord'),
      orderNumber: generateOrderNumber(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }
  
  /**
   * Update existing order
   */
  const updateOrder = (id: string, updates: Partial<Order>): boolean => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, ...updates, updatedAt: new Date() }
        : order
    ))
    return true
  }
  
  /**
   * Delete order
   */
  const deleteOrder = (id: string): boolean => {
    setOrders(prev => prev.filter(order => order.id !== id))
    return true
  }
  
  /**
   * Get single order by ID
   */
  const getOrder = (id: string): Order | undefined => {
    return orders.find(order => order.id === id)
  }
  
  /**
   * Search and filter orders
   */
  const searchOrders = (
    searchTerm?: string,
    status?: string,
    customerId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Order[] => {
    return orders.filter(order => {
      // Search by order number or customer name
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          order.orderNumber.toLowerCase().includes(search) ||
          order.customerName.toLowerCase().includes(search) ||
          order.itemDescription.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // Filter by status
      if (status && status !== 'all' && order.status !== status) {
        return false
      }
      
      // Filter by customer
      if (customerId && order.customerId !== customerId) {
        return false
      }
      
      // Filter by date range
      if (fromDate && new Date(order.date) < fromDate) {
        return false
      }
      if (toDate && new Date(order.date) > toDate) {
        return false
      }
      
      return true
    })
  }
  
  /**
   * Get orders for a specific customer
   */
  const getCustomerOrders = (customerId: string): Order[] => {
    return orders.filter(order => order.customerId === customerId)
  }
  
  /**
   * Get orders by status
   */
  const getOrdersByStatus = (status: string): Order[] => {
    return orders.filter(order => order.status === status)
  }
  
  /**
   * Get pending orders count
   */
  const getPendingOrdersCount = (): number => {
    return orders.filter(order => 
      order.status === 'confirmed' || order.status === 'in-progress'
    ).length
  }
  
  /**
   * Get total advance payments
   */
  const getTotalAdvancePayments = (): number => {
    return orders.reduce((total, order) => total + order.advancePayment, 0)
  }
  
  /**
   * Get total order value
   */
  const getTotalOrderValue = (): number => {
    return orders.reduce((total, order) => total + order.totalAmount, 0)
  }
  
  /**
   * Get pending balance (total - advance)
   */
  const getPendingBalance = (): number => {
    return orders
      .filter(order => order.status !== 'delivered' && order.status !== 'cancelled')
      .reduce((total, order) => total + (order.totalAmount - order.advancePayment), 0)
  }
  
  /**
   * Get recent orders
   */
  const getRecentOrders = (limit: number = 5): Order[] => {
    return [...orders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }
  
  /**
   * Get overdue orders (delivery date passed but not delivered)
   */
  const getOverdueOrders = (): Order[] => {
    const today = new Date()
    return orders.filter(order => 
      order.status !== 'delivered' && 
      order.status !== 'cancelled' &&
      new Date(order.deliveryDate) < today
    )
  }
  
  return {
    orders,
    isLoading,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    searchOrders,
    getCustomerOrders,
    getOrdersByStatus,
    getPendingOrdersCount,
    getTotalAdvancePayments,
    getTotalOrderValue,
    getPendingBalance,
    getRecentOrders,
    getOverdueOrders,
    generateOrderNumber,
  }
}
