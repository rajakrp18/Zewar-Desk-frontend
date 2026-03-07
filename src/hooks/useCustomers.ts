// EXACT PATH: src/hooks/useCustomers.ts
// PURPOSE: Custom hook for customer state management with localStorage

'use client'

import { useState, useEffect } from 'react'
import { Customer } from '@/lib/types'
import { mockCustomers } from '@/lib/mockData'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load customers from localStorage on mount
  useEffect(() => {
    const stored = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS)
    
    if (stored && stored.length > 0) {
      setCustomers(stored)
    } else {
      // Initialize with mock data if nothing in storage
      setCustomers(mockCustomers)
      saveToStorage(STORAGE_KEYS.CUSTOMERS, mockCustomers)
    }
    
    setIsLoading(false)
  }, [])
  
  // Save to localStorage whenever customers change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    }
  }, [customers, isLoading])
  
  /**
   * Add new customer
   */
  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalPurchases' | 'totalOrders'>): Customer => {
    const newCustomer: Customer = {
      ...customer,
      id: generateId('cust'),
      totalPurchases: 0,
      totalOrders: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setCustomers(prev => [...prev, newCustomer])
    return newCustomer
  }
  
  /**
   * Update existing customer
   */
  const updateCustomer = (id: string, updates: Partial<Customer>): boolean => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id 
        ? { ...customer, ...updates, updatedAt: new Date() }
        : customer
    ))
    return true
  }
  
  /**
   * Delete customer
   */
  const deleteCustomer = (id: string): boolean => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
    return true
  }
  
  /**
   * Get single customer by ID
   */
  const getCustomer = (id: string): Customer | undefined => {
    return customers.find(customer => customer.id === id)
  }
  
  /**
   * Search and filter customers
   */
  const searchCustomers = (
    searchTerm?: string,
    city?: string,
    state?: string
  ): Customer[] => {
    return customers.filter(customer => {
      // Search by name, email, or phone
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          customer.name.toLowerCase().includes(search) ||
          customer.email?.toLowerCase().includes(search) ||
          customer.phone.includes(search) ||
          customer.gstin?.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // Filter by city
      if (city && city !== 'all' && customer.city !== city) {
        return false
      }
      
      // Filter by state
      if (state && state !== 'all' && customer.state !== state) {
        return false
      }
      
      return true
    })
  }
  
  /**
   * Get top customers by purchase amount
   */
  const getTopCustomers = (limit: number = 5): Customer[] => {
    return [...customers]
      .sort((a, b) => b.totalPurchases - a.totalPurchases)
      .slice(0, limit)
  }
  
  /**
   * Get recent customers
   */
  const getRecentCustomers = (limit: number = 5): Customer[] => {
    return [...customers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }
  
  /**
   * Get all unique cities
   */
  const getAllCities = (): string[] => {
    const cities = new Set(customers.map(c => c.city).filter(Boolean))
    return Array.from(cities).sort()
  }
  
  /**
   * Get all unique states
   */
  const getAllStates = (): string[] => {
    const states = new Set(customers.map(c => c.state).filter(Boolean))
    return Array.from(states).sort()
  }
  
  /**
   * Get total revenue from all customers
   */
  const getTotalRevenue = (): number => {
    return customers.reduce((total, customer) => total + customer.totalPurchases, 0)
  }
  
  return {
    customers,
    isLoading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    searchCustomers,
    getTopCustomers,
    getRecentCustomers,
    getAllCities,
    getAllStates,
    getTotalRevenue,
  }
}
