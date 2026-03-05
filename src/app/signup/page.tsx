// src/app/signup/page.tsx
/**
 * Signup Page Component
 * 
 * Handles user registration with comprehensive validation.
 * Multi-step form with sections:
 * 1. Business Information (business name, owner name)
 * 2. Contact Details (email, phone number)
 * 3. Security Credentials (password, password confirmation)
 * 
 * Features:
 * - Real-time form validation
 * - Custom validation for Indian phone numbers
 * - Password confirmation matching
 * - Terms and conditions agreement
 * - Loading state during submission
 * - Error messages for invalid inputs
 * 
 * Currently validates on client-side.
 * Phase 2 will add backend validation and user creation.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/lib/constants'
import { isValidEmail, isValidPhone } from '@/lib/utils'

/**
 * Form state interface for signup form
 * Tracks all user input and validation state
 */
interface SignupForm {
  businessName: string
  ownerName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }

    if (!form.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian number'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally make an API call to your backend
      console.log('Form submitted:', form)
      alert('Account created successfully! (Demo mode)')
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200">
        <div className="container-custom h-16 flex items-center justify-between">
          <Link href={ROUTES.HOME}>
            <Logo size="sm" />
          </Link>
          <p className="text-sm text-neutral-600">
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className="font-medium text-neutral-900 hover:text-neutral-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-20 max-w-2xl">
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Create your Zewar Desk account
            </h1>
            <p className="text-neutral-600">
              Start managing your jewellery shop efficiently in minutes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900">Business Information</h3>
              
              <Input
                label="Business Name"
                name="businessName"
                placeholder="Enter your jewellery shop name"
                value={form.businessName}
                onChange={handleInputChange}
                error={errors.businessName}
                required
              />

              <Input
                label="Owner Name"
                name="ownerName"
                placeholder="Your full name"
                value={form.ownerName}
                onChange={handleInputChange}
                error={errors.ownerName}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900">Contact Information</h3>
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                placeholder="10-digit number (e.g., 9876543210)"
                value={form.phone}
                onChange={handleInputChange}
                error={errors.phone}
                helperText="Indian phone number required"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900">Security</h3>
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-neutral-500 hover:text-neutral-700 text-sm"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 text-neutral-500 hover:text-neutral-700 text-sm"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={form.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border border-neutral-300 cursor-pointer"
                />
                <span className="text-sm text-neutral-600">
                  I agree to the{' '}
                  <a href="#" className="text-neutral-900 font-medium hover:underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-neutral-900 font-medium hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            {/* Demo Info */}
            <p className="text-center text-sm text-neutral-600">
              Demo mode active. No actual account will be created.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
