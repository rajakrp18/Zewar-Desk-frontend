// EXACT PATH: src/components/customers/CustomerForm.tsx
// PURPOSE: Reusable form for add/edit customers with validation

'use client'

import { useState } from 'react'
import { Customer } from '@/lib/types'
import { INDIAN_STATES } from '@/lib/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { isValidEmail, isValidPhone } from '@/lib/utils'

interface CustomerFormProps {
  initialData?: Partial<Customer>
  onSubmit: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalPurchases' | 'totalOrders'>) => void
  onCancel: () => void
  submitLabel?: string
}

export function CustomerForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  submitLabel = 'Save Customer'
}: CustomerFormProps) {
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || 'Maharashtra',
    pincode: initialData?.pincode || '',
    gstin: initialData?.gstin || '',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation (optional but must be valid if provided)
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    
    // State validation
    if (!formData.state) {
      newErrors.state = 'State is required'
    }
    
    // Pincode validation (optional but must be valid if provided)
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits'
    }
    
    // GSTIN validation (optional but must be valid if provided)
    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 27AABCU9603R1ZM)'
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
      const customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalPurchases' | 'totalOrders'> = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode || undefined,
        gstin: formData.gstin.trim() || undefined,
        lastPurchaseDate: initialData?.lastPurchaseDate,
      }
      
      onSubmit(customerData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              placeholder="e.g., Rajesh Kumar"
            />
          </div>
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            required
            placeholder="9876543210"
            maxLength={10}
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="customer@email.com (optional)"
          />
        </div>
      </div>
      
      {/* Address Information */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Address Information
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Street Address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address}
            required
            placeholder="e.g., 123 MG Road"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              error={errors.city}
              required
              placeholder="e.g., Mumbai"
            />
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              >
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>
            
            <Input
              label="Pincode"
              value={formData.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              error={errors.pincode}
              placeholder="400001 (optional)"
              maxLength={6}
            />
          </div>
        </div>
      </div>
      
      {/* Business Information (Optional) */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Business Information
          <span className="text-sm font-normal text-neutral-600 ml-2">(Optional)</span>
        </h3>
        
        <Input
          label="GSTIN"
          value={formData.gstin}
          onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
          error={errors.gstin}
          placeholder="e.g., 27AABCU9603R1ZM"
          maxLength={15}
          helperText="15-character GST Identification Number"
        />
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
