// EXACT PATH: src/app/dashboard/customers/add/page.tsx
// PURPOSE: Add new customer page

'use client'

import { useRouter } from 'next/navigation'
import { useCustomers } from '@/hooks/useCustomers'
import { CustomerForm } from '@/components/customers/CustomerForm'
import { Customer } from '@/lib/types'

export default function AddCustomerPage() {
  const router = useRouter()
  const { addCustomer } = useCustomers()
  
  const handleSubmit = (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalPurchases' | 'totalOrders'>) => {
    try {
      addCustomer(data)
      
      // Show success message
      alert('✅ Customer added successfully!')
      
      // Redirect back to customers list
      router.push('/dashboard/customers')
    } catch (error) {
      console.error('Error adding customer:', error)
      alert('❌ Failed to add customer. Please try again.')
    }
  }
  
  const handleCancel = () => {
    router.push('/dashboard/customers')
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Add New Customer</h1>
        <p className="text-neutral-600 mt-1">
          Create a new customer profile
        </p>
      </div>
      
      {/* Form */}
      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Customer"
      />
    </div>
  )
}
