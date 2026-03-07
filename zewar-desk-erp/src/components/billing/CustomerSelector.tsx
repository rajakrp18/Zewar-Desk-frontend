// EXACT PATH: src/components/billing/CustomerSelector.tsx
// PURPOSE: Select customer for billing

'use client'

import { useState } from 'react'
import { Customer } from '@/lib/types'
import { useCustomers } from '@/hooks/useCustomers'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPhone } from '@/lib/utils'

interface CustomerSelectorProps {
  selectedCustomerId?: string
  onSelect: (customer: Customer) => void
}

export function CustomerSelector({ selectedCustomerId, onSelect }: CustomerSelectorProps) {
  const { customers } = useCustomers()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId)
  
  const filteredCustomers = customers.filter(customer => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      customer.name.toLowerCase().includes(search) ||
      customer.phone.includes(search) ||
      customer.email?.toLowerCase().includes(search)
    )
  })
  
  const handleSelect = (customer: Customer) => {
    onSelect(customer)
    setShowDropdown(false)
    setSearchTerm('')
  }
  
  const getCustomerTier = (totalPurchases: number): { label: string, variant: 'default' | 'success' | 'warning' | 'info' } => {
    if (totalPurchases >= 500000) return { label: 'VIP', variant: 'success' }
    if (totalPurchases >= 200000) return { label: 'Gold', variant: 'warning' }
    if (totalPurchases >= 50000) return { label: 'Silver', variant: 'info' }
    return { label: 'Regular', variant: 'default' }
  }
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Customer <span className="text-red-500">*</span>
      </label>
      
      {selectedCustomer ? (
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-neutral-900">{selectedCustomer.name}</h4>
                <Badge variant={getCustomerTier(selectedCustomer.totalPurchases).variant}>
                  {getCustomerTier(selectedCustomer.totalPurchases).label}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600">{formatPhone(selectedCustomer.phone)}</p>
              {selectedCustomer.email && (
                <p className="text-sm text-neutral-600">{selectedCustomer.email}</p>
              )}
              <p className="text-sm text-neutral-600">{selectedCustomer.city}, {selectedCustomer.state}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(null as any)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Change
            </button>
          </div>
        </Card>
      ) : (
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search customer by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                {filteredCustomers.length === 0 ? (
                  <div className="p-4 text-center text-neutral-600">
                    No customers found
                  </div>
                ) : (
                  filteredCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalPurchases)
                    return (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleSelect(customer)}
                        className="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-neutral-900">{customer.name}</span>
                          <Badge variant={tier.variant} className="text-xs">
                            {tier.label}
                          </Badge>
                        </div>
                        <div className="text-sm text-neutral-600">
                          {formatPhone(customer.phone)} • {customer.city}
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            )}
          </div>
          
          {showDropdown && (
            <div 
              className="fixed inset-0 z-0" 
              onClick={() => setShowDropdown(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
