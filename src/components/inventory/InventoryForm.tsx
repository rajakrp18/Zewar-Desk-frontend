// EXACT PATH: src/components/inventory/InventoryForm.tsx
// PURPOSE: Reusable form for add/edit inventory items with validation

'use client'

import { useState } from 'react'
import { InventoryItem } from '@/lib/types'
import { JEWELLERY_CATEGORIES, GOLD_PURITY_OPTIONS } from '@/lib/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface InventoryFormProps {
  initialData?: Partial<InventoryItem>
  onSubmit: (data: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  submitLabel?: string
}

export function InventoryForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  submitLabel = 'Save Item'
}: InventoryFormProps) {
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'ring',
    weight: initialData?.weight?.toString() || '',
    purity: initialData?.purity || '22K',
    quantity: initialData?.quantity?.toString() || '',
    costPrice: initialData?.costPrice?.toString() || '',
    sellingPrice: initialData?.sellingPrice?.toString() || '',
    makingCharges: initialData?.makingCharges?.toString() || '',
    description: initialData?.description || '',
    barcode: initialData?.barcode || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required'
    }
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Weight must be greater than 0'
    }
    
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater'
    }
    
    if (!formData.costPrice || parseFloat(formData.costPrice) <= 0) {
      newErrors.costPrice = 'Cost price must be greater than 0'
    }
    
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Selling price must be greater than 0'
    }
    
    if (parseFloat(formData.sellingPrice) < parseFloat(formData.costPrice)) {
      newErrors.sellingPrice = 'Selling price should be greater than cost price'
    }
    
    if (!formData.makingCharges || parseFloat(formData.makingCharges) < 0) {
      newErrors.makingCharges = 'Making charges must be 0 or greater'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const itemData: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name.trim(),
        category: formData.category as any,
        weight: parseFloat(formData.weight),
        purity: formData.purity as any,
        quantity: parseInt(formData.quantity),
        costPrice: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        makingCharges: parseFloat(formData.makingCharges),
        description: formData.description.trim(),
        barcode: formData.barcode.trim() || undefined,
        isActive: formData.isActive,
        imageUrl: initialData?.imageUrl,
      }
      
      onSubmit(itemData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Item Details Section */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Item Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Item Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
            placeholder="e.g., Gold Necklace Set"
          />
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            >
              {JEWELLERY_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <Input
            label="Weight (grams)"
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            error={errors.weight}
            required
            placeholder="e.g., 45.5"
          />
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Purity <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.purity}
              onChange={(e) => handleChange('purity', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            >
              {GOLD_PURITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          
          <Input
            label="Barcode / SKU"
            value={formData.barcode}
            onChange={(e) => handleChange('barcode', e.target.value)}
            placeholder="Optional"
          />
          
          <Input
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            error={errors.quantity}
            required
            placeholder="e.g., 5"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            placeholder="Item description..."
          />
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Pricing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Cost Price (₹)"
            type="number"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) => handleChange('costPrice', e.target.value)}
            error={errors.costPrice}
            required
            placeholder="e.g., 300000"
          />
          
          <Input
            label="Selling Price (₹)"
            type="number"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => handleChange('sellingPrice', e.target.value)}
            error={errors.sellingPrice}
            required
            placeholder="e.g., 350000"
          />
          
          <Input
            label="Making Charges (₹)"
            type="number"
            step="0.01"
            value={formData.makingCharges}
            onChange={(e) => handleChange('makingCharges', e.target.value)}
            error={errors.makingCharges}
            required
            placeholder="e.g., 15000"
          />
        </div>
        
        {/* Profit Calculation */}
        {formData.sellingPrice && formData.costPrice && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-900">
                Profit per item:
              </span>
              <span className="text-lg font-bold text-green-900">
                ₹{(parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-green-700">
                Profit margin:
              </span>
              <span className="text-sm font-semibold text-green-700">
                {(((parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Active Status */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => handleChange('isActive', e.target.checked)}
            className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-neutral-700">
            Item is active and available for sale
          </label>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
