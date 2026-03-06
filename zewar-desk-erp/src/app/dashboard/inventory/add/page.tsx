// EXACT PATH: src/app/dashboard/inventory/add/page.tsx
// PURPOSE: Add new inventory item page

'use client'

import { useRouter } from 'next/navigation'
import { useInventory } from '@/hooks/useInventory'
import { InventoryForm } from '@/components/inventory/InventoryForm'
import { InventoryItem } from '@/lib/types'

export default function AddInventoryPage() {
  const router = useRouter()
  const { addItem } = useInventory()
  
  const handleSubmit = (data: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      addItem(data)
      
      // Show success message (we'll add toast notifications later)
      alert('✅ Item added successfully!')
      
      // Redirect back to inventory list
      router.push('/dashboard/inventory')
    } catch (error) {
      console.error('Error adding item:', error)
      alert('❌ Failed to add item. Please try again.')
    }
  }
  
  const handleCancel = () => {
    router.push('/dashboard/inventory')
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Add New Item</h1>
        <p className="text-neutral-600 mt-1">
          Add a new item to your inventory
        </p>
      </div>
      
      {/* Form */}
      <InventoryForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Item"
      />
    </div>
  )
}
