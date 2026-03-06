// EXACT PATH: src/app/dashboard/inventory/[id]/page.tsx
// PURPOSE: View/Edit single inventory item

'use client'

import { useRouter } from 'next/navigation'
import { useInventory } from '@/hooks/useInventory'
import { InventoryForm } from '@/components/inventory/InventoryForm'
import { InventoryItem } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { formatCurrency, formatWeight, formatDate } from '@/lib/utils'

interface EditInventoryPageProps {
  params: {
    id: string
  }
}

export default function EditInventoryPage({ params }: EditInventoryPageProps) {
  const router = useRouter()
  const { getItem, updateItem, deleteItem } = useInventory()
  
  const item = getItem(params.id)
  
  if (!item) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Item Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The item you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/dashboard/inventory')}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800"
          >
            Back to Inventory
          </button>
        </Card>
      </div>
    )
  }
  
  const handleSubmit = (data: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      updateItem(params.id, data)
      
      alert('✅ Item updated successfully!')
      router.push('/dashboard/inventory')
    } catch (error) {
      console.error('Error updating item:', error)
      alert('❌ Failed to update item. Please try again.')
    }
  }
  
  const handleCancel = () => {
    router.push('/dashboard/inventory')
  }
  
  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      return
    }
    
    try {
      deleteItem(params.id)
      alert('✅ Item deleted successfully!')
      router.push('/dashboard/inventory')
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('❌ Failed to delete item. Please try again.')
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Edit Item</h1>
          <p className="text-neutral-600 mt-1">
            Update details for {item.name}
          </p>
        </div>
        
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 border border-red-200"
        >
          🗑️ Delete Item
        </button>
      </div>
      
      {/* Item Info Card */}
      <Card className="p-6 bg-neutral-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-neutral-600">Item ID</p>
            <p className="font-semibold text-neutral-900 mt-1">{item.id}</p>
          </div>
          <div>
            <p className="text-neutral-600">Created</p>
            <p className="font-semibold text-neutral-900 mt-1">
              {formatDate(item.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-neutral-600">Last Updated</p>
            <p className="font-semibold text-neutral-900 mt-1">
              {formatDate(item.updatedAt)}
            </p>
          </div>
          <div>
            <p className="text-neutral-600">Total Value</p>
            <p className="font-semibold text-neutral-900 mt-1">
              {formatCurrency(item.sellingPrice * item.quantity)}
            </p>
          </div>
        </div>
      </Card>
      
      {/* Edit Form */}
      <InventoryForm
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Item"
      />
    </div>
  )
}
