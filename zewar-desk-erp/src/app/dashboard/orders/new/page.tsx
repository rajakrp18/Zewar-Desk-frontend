// EXACT PATH: src/app/dashboard/orders/new/page.tsx
// PURPOSE: Create new custom order page

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'
import { useCustomers } from '@/hooks/useCustomers'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Customer } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export default function CreateOrderPage() {
  const router = useRouter()
  const { createOrder } = useOrders()
  const { customers } = useCustomers()
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [customerSearch, setCustomerSearch] = useState('')
  
  const [itemDescription, setItemDescription] = useState('')
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [advancePayment, setAdvancePayment] = useState<number>(0)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const filteredCustomers = customers.filter(customer => {
    if (!customerSearch) return true
    const search = customerSearch.toLowerCase()
    return (
      customer.name.toLowerCase().includes(search) ||
      customer.phone.includes(search) ||
      customer.email?.toLowerCase().includes(search)
    )
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCustomer) {
      alert('Please select a customer')
      return
    }
    
    if (!itemDescription.trim()) {
      alert('Please enter item description')
      return
    }
    
    if (totalAmount <= 0) {
      alert('Please enter valid total amount')
      return
    }
    
    if (!deliveryDate) {
      alert('Please select delivery date')
      return
    }
    
    if (advancePayment > totalAmount) {
      alert('Advance payment cannot exceed total amount')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const newOrder = createOrder({
        date: new Date(),
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        itemDescription: itemDescription.trim(),
        status: 'confirmed',
        deliveryDate: new Date(deliveryDate),
        advancePayment,
        totalAmount,
        notes: notes.trim() || undefined,
      })
      
      alert(`✅ Order ${newOrder.orderNumber} created successfully!`)
      router.push('/dashboard/orders')
    } catch (error) {
      console.error('Error creating order:', error)
      alert('❌ Failed to create order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleCancel = () => {
    if (itemDescription || selectedCustomer || totalAmount || advancePayment) {
      if (confirm('Discard this order?')) {
        router.push('/dashboard/orders')
      }
    } else {
      router.push('/dashboard/orders')
    }
  }
  
  const pendingBalance = totalAmount - advancePayment
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Create New Order</h1>
        <p className="text-neutral-600 mt-1">
          Create a custom order for a customer
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCustomer ? (
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-neutral-900">{selectedCustomer.name}</h4>
                        <p className="text-sm text-neutral-600">{selectedCustomer.phone}</p>
                        {selectedCustomer.email && (
                          <p className="text-sm text-neutral-600">{selectedCustomer.email}</p>
                        )}
                        <p className="text-sm text-neutral-600">
                          {selectedCustomer.city}, {selectedCustomer.state}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search customer by name, phone, or email..."
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value)
                        setShowCustomerDropdown(true)
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                    
                    {showCustomerDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                        {filteredCustomers.length === 0 ? (
                          <div className="p-4 text-center text-neutral-600">
                            No customers found
                          </div>
                        ) : (
                          filteredCustomers.map((customer) => (
                            <button
                              key={customer.id}
                              type="button"
                              onClick={() => {
                                setSelectedCustomer(customer)
                                setShowCustomerDropdown(false)
                                setCustomerSearch('')
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                            >
                              <div className="font-semibold text-neutral-900">{customer.name}</div>
                              <div className="text-sm text-neutral-600">
                                {customer.phone} • {customer.city}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                    
                    {showCustomerDropdown && (
                      <div 
                        className="fixed inset-0 z-0" 
                        onClick={() => setShowCustomerDropdown(false)}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Item Description */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Item Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="E.g., Custom gold necklace with emerald stones, 22K, 50 grams"
                    required
                  />
                </div>
                
                {/* Total Amount */}
                <div>
                  <Input
                    label="Total Amount (₹)"
                    type="number"
                    min="0"
                    step="100"
                    value={totalAmount || ''}
                    onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    required
                  />
                </div>
                
                {/* Advance Payment */}
                <div>
                  <Input
                    label="Advance Payment (₹)"
                    type="number"
                    min="0"
                    max={totalAmount}
                    step="100"
                    value={advancePayment || ''}
                    onChange={(e) => setAdvancePayment(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {advancePayment > totalAmount && (
                    <p className="text-sm text-red-600 mt-1">
                      Cannot exceed total amount
                    </p>
                  )}
                </div>
                
                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Expected Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
                
                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="Any special instructions or notes..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-neutral-600">Total Amount:</span>
                      <span className="font-semibold text-neutral-900">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <span className="text-neutral-600">Advance Payment:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(advancePayment)}
                      </span>
                    </div>
                    
                    <div className="border-t-2 border-neutral-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900">Pending Balance:</span>
                        <span className="text-xl font-bold text-orange-600">
                          {formatCurrency(pendingBalance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Form Actions */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting || !selectedCustomer || !itemDescription || totalAmount <= 0}
                >
                  {isSubmitting ? 'Creating Order...' : 'Create Order'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
              
              {/* Validation Messages */}
              {!selectedCustomer && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700">⚠️ Please select a customer</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
