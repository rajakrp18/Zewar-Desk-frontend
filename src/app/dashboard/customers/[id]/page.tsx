// EXACT PATH: src/app/dashboard/customers/[id]/page.tsx
// PURPOSE: View/Edit customer details page

'use client'

import { useRouter } from 'next/navigation'
import { useCustomers } from '@/hooks/useCustomers'
import { CustomerForm } from '@/components/customers/CustomerForm'
import { PurchaseHistory } from '@/components/customers/PurchaseHistory'
import { Customer } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ViewCustomerPageProps {
  params: {
    id: string
  }
}

export default function ViewCustomerPage({ params }: ViewCustomerPageProps) {
  const router = useRouter()
  const { getCustomer, updateCustomer, deleteCustomer } = useCustomers()
  
  const customer = getCustomer(params.id)
  
  if (!customer) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Customer Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The customer you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/dashboard/customers')}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800"
          >
            Back to Customers
          </button>
        </Card>
      </div>
    )
  }
  
  const handleSubmit = (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalPurchases' | 'totalOrders'>) => {
    try {
      updateCustomer(params.id, data)
      
      alert('✅ Customer updated successfully!')
      router.push('/dashboard/customers')
    } catch (error) {
      console.error('Error updating customer:', error)
      alert('❌ Failed to update customer. Please try again.')
    }
  }
  
  const handleCancel = () => {
    router.push('/dashboard/customers')
  }
  
  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete "${customer.name}"? This action cannot be undone.`)) {
      return
    }
    
    try {
      deleteCustomer(params.id)
      alert('✅ Customer deleted successfully!')
      router.push('/dashboard/customers')
    } catch (error) {
      console.error('Error deleting customer:', error)
      alert('❌ Failed to delete customer. Please try again.')
    }
  }
  
  const getCustomerTier = (totalPurchases: number): { label: string, variant: 'default' | 'success' | 'warning' | 'info' } => {
    if (totalPurchases >= 500000) return { label: 'VIP', variant: 'success' }
    if (totalPurchases >= 200000) return { label: 'Gold', variant: 'warning' }
    if (totalPurchases >= 50000) return { label: 'Silver', variant: 'info' }
    return { label: 'Regular', variant: 'default' }
  }
  
  const tier = getCustomerTier(customer.totalPurchases)
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              {customer.name}
            </h1>
            <Badge variant={tier.variant}>{tier.label}</Badge>
          </div>
          <p className="text-neutral-600">
            Customer since {formatDate(customer.createdAt)}
          </p>
        </div>
        
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 border border-red-200"
        >
          🗑️ Delete Customer
        </button>
      </div>
      
      {/* Customer Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Customer ID</p>
          <p className="font-semibold text-neutral-900 font-mono text-sm">
            {customer.id}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Total Purchases</p>
          <p className="text-xl font-bold text-neutral-900">
            {formatCurrency(customer.totalPurchases)}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Total Orders</p>
          <p className="text-xl font-bold text-neutral-900">
            {customer.totalOrders}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Last Purchase</p>
          <p className="text-sm font-semibold text-neutral-900">
            {customer.lastPurchaseDate ? formatDate(customer.lastPurchaseDate) : 'Never'}
          </p>
        </Card>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Edit Form */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Customer Information
          </h2>
          <CustomerForm
            initialData={customer}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Customer"
          />
        </div>
        
        {/* Right: Purchase History */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Activity
          </h2>
          <PurchaseHistory customerId={params.id} />
        </div>
      </div>
    </div>
  )
}
