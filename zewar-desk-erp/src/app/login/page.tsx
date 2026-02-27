'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/lib/constants'
import { isValidEmail } from '@/lib/utils'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
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
      
      console.log('Login form submitted:', {
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      })
      alert('Login successful! (Demo mode)')
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' })
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

    // Clear error for this field
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
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.SIGNUP} className="font-medium text-neutral-900 hover:text-neutral-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-20 max-w-md">
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Welcome back
            </h1>
            <p className="text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleInputChange}
              error={errors.email}
              required
              autoComplete="email"
            />

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-neutral-500 hover:text-neutral-700 text-sm"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Forgot Password Link */}
              <Link 
                href="#"
                className="text-sm font-medium text-neutral-900 hover:text-neutral-700 inline-block"
              >
                Forgot password?
              </Link>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border border-neutral-300 cursor-pointer"
              />
              <span className="text-sm text-neutral-600">Remember me</span>
            </label>

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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Demo Credentials */}
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <p className="text-sm font-medium text-neutral-900 mb-2">Demo Credentials</p>
              <p className="text-sm text-neutral-600">
                Email: <code className="bg-white px-2 py-1 rounded border border-neutral-200">demo@zewardesk.com</code>
              </p>
              <p className="text-sm text-neutral-600">
                Password: <code className="bg-white px-2 py-1 rounded border border-neutral-200">demo123456</code>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" disabled>
              <span className="mr-2">🔵</span> Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              <span className="mr-2">📘</span> Facebook
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
