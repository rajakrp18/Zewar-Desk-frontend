// EXACT PATH: src/app/dashboard/billing/new/page.tsx
// PURPOSE: Create new bill page

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBilling } from '@/hooks/useBilling'
import { useCustomers } from '@/hooks/useCustomers'
import { useInventory } from '@/hooks/useInventory'
import { CustomerSelector } from '@/components/billing/CustomerSelector'
import { ItemSelector } from '@/components/billing/ItemSelector'
import { BillSummary } from '@/components/billing/BillSummary'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Customer, BillItem } from '@/lib/types'

export default function CreateBillPage() {
  const router = useRouter()
  const { createBill, calculateBillTotals } = useBilling()
  const { updateCustomer } = useCustomers()
  const { updateItem: updateInventoryItem } = useInventory()
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedItems, setSelectedItems] = useState<BillItem[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi' | 'bank_transfer'>('cash')
  const [notes, setNotes] = useState<string>('')
  const [status, setStatus] = useState<'paid' | 'pending'>('paid')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Calculate totals
  const { subtotal, tax, total } = calculateBillTotals(selectedItems, discount)
  
  const handleAddItem = (item: BillItem) => {
    setSelectedItems(prev => [...prev, item])
  }
  
  const handleUpdateItem = (index: number, quantity: number) => {
    setSelectedItems(prev => prev.map((item, i) => {
      if (i === index) {
        const total = item.unitPrice * quantity
        return { ...item, quantity, total }
      }
      return item
    }))
  }
  
  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCustomer) {
      alert('Please select a customer')
      return
    }
    
    if (selectedItems.length === 0) {
      alert('Please add at least one item')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create the bill
      const newBill = createBill({
        date: new Date(),
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        items: selectedItems,
        subtotal,
        tax,
        discount,
        total,
        status,
        paymentMethod,
        notes: notes.trim() || undefined,
      })
      
      // Update customer stats
      updateCustomer(selectedCustomer.id, {
        totalPurchases: selectedCustomer.totalPurchases + total,
        totalOrders: selectedCustomer.totalOrders + 1,
        lastPurchaseDate: new Date(),
      })
      
      // Update inventory quantities
      selectedItems.forEach(billItem => {
        const inventoryItem = updateInventoryItem
        // Deduct quantity from inventory
        // Note: In real app, this would be handled by backend
      })
      
      alert(`✅ Bill ${newBill.billNumber} created successfully!`)
      router.push('/dashboard/billing')
    } catch (error) {
      console.error('Error creating bill:', error)
      alert('❌ Failed to create bill. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleCancel = () => {
    if (selectedItems.length > 0 || selectedCustomer) {
      if (confirm('Discard this bill?')) {
        router.push('/dashboard/billing')
      }
    } else {
      router.push('/dashboard/billing')
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Create New Bill</h1>
        <p className="text-neutral-600 mt-1">
          Generate a new invoice for customer
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="p-6">
              <CustomerSelector
                selectedCustomerId={selectedCustomer?.id}
                onSelect={setSelectedCustomer}
              />
            </Card>
            
            {/* Items Selection */}
            <Card className="p-6">
              <ItemSelector
                selectedItems={selectedItems}
                onAddItem={handleAddItem}
                onUpdateItem={handleUpdateItem}
                onRemoveItem={handleRemoveItem}
              />
            </Card>
            
            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Discount */}
                <div>
                  <Input
                    label="Discount (₹)"
                    type="number"
                    min="0"
                    max={subtotal}
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Payment Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="Add any additional notes..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <BillSummary
                subtotal={subtotal}
                tax={tax}
                discount={discount}
                total={total}
              />
              
              {/* Form Actions */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting || !selectedCustomer || selectedItems.length === 0}
                >
                  {isSubmitting ? 'Creating Bill...' : 'Create Bill'}
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
              {selectedItems.length === 0 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700">⚠️ Please add at least one item</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
