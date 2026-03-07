// EXACT PATH: src/hooks/useBilling.ts
// PURPOSE: Custom hook for billing/invoice management with localStorage

'use client'

import { useState, useEffect } from 'react'
import { Bill, BillItem } from '@/lib/types'
import { mockBills } from '@/lib/mockData'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export function useBilling() {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load bills from localStorage on mount
  useEffect(() => {
    const stored = getFromStorage<Bill[]>(STORAGE_KEYS.BILLS)
    
    if (stored && stored.length > 0) {
      setBills(stored)
    } else {
      // Initialize with mock data if nothing in storage
      setBills(mockBills)
      saveToStorage(STORAGE_KEYS.BILLS, mockBills)
    }
    
    setIsLoading(false)
  }, [])
  
  // Save to localStorage whenever bills change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.BILLS, bills)
    }
  }, [bills, isLoading])
  
  /**
   * Generate next bill number
   */
  const generateBillNumber = (): string => {
    const year = new Date().getFullYear()
    const existingBills = bills.filter(b => 
      b.billNumber.startsWith(`INV-${year}`)
    )
    const nextNumber = existingBills.length + 1
    return `INV-${year}-${String(nextNumber).padStart(3, '0')}`
  }
  
  /**
   * Create new bill
   */
  const createBill = (
    billData: Omit<Bill, 'id' | 'billNumber' | 'createdAt' | 'updatedAt'>
  ): Bill => {
    const newBill: Bill = {
      ...billData,
      id: generateId('bill'),
      billNumber: generateBillNumber(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setBills(prev => [newBill, ...prev])
    return newBill
  }
  
  /**
   * Update existing bill
   */
  const updateBill = (id: string, updates: Partial<Bill>): boolean => {
    setBills(prev => prev.map(bill => 
      bill.id === id 
        ? { ...bill, ...updates, updatedAt: new Date() }
        : bill
    ))
    return true
  }
  
  /**
   * Delete bill
   */
  const deleteBill = (id: string): boolean => {
    setBills(prev => prev.filter(bill => bill.id !== id))
    return true
  }
  
  /**
   * Get single bill by ID
   */
  const getBill = (id: string): Bill | undefined => {
    return bills.find(bill => bill.id === id)
  }
  
  /**
   * Search and filter bills
   */
  const searchBills = (
    searchTerm?: string,
    status?: string,
    customerId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Bill[] => {
    return bills.filter(bill => {
      // Search by bill number or customer name
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          bill.billNumber.toLowerCase().includes(search) ||
          bill.customerName.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // Filter by status
      if (status && status !== 'all' && bill.status !== status) {
        return false
      }
      
      // Filter by customer
      if (customerId && bill.customerId !== customerId) {
        return false
      }
      
      // Filter by date range
      if (fromDate && new Date(bill.date) < fromDate) {
        return false
      }
      if (toDate && new Date(bill.date) > toDate) {
        return false
      }
      
      return true
    })
  }
  
  /**
   * Get bills for a specific customer
   */
  const getCustomerBills = (customerId: string): Bill[] => {
    return bills.filter(bill => bill.customerId === customerId)
  }
  
  /**
   * Get total revenue
   */
  const getTotalRevenue = (): number => {
    return bills.reduce((total, bill) => total + bill.total, 0)
  }
  
  /**
   * Get paid amount
   */
  const getPaidAmount = (): number => {
    return bills
      .filter(bill => bill.status === 'paid')
      .reduce((total, bill) => total + bill.total, 0)
  }
  
  /**
   * Get pending amount
   */
  const getPendingAmount = (): number => {
    return bills
      .filter(bill => bill.status === 'pending')
      .reduce((total, bill) => total + bill.total, 0)
  }
  
  /**
   * Get recent bills
   */
  const getRecentBills = (limit: number = 5): Bill[] => {
    return [...bills]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }
  
  /**
   * Calculate bill totals
   */
  const calculateBillTotals = (
    items: BillItem[],
    discount: number = 0,
    taxRate: number = 3.6
  ): { subtotal: number; tax: number; total: number } => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const tax = (subtotal * taxRate) / 100
    const total = subtotal + tax - discount
    
    return { subtotal, tax, total }
  }
  
  return {
    bills,
    isLoading,
    createBill,
    updateBill,
    deleteBill,
    getBill,
    searchBills,
    getCustomerBills,
    getTotalRevenue,
    getPaidAmount,
    getPendingAmount,
    getRecentBills,
    calculateBillTotals,
    generateBillNumber,
  }
}
