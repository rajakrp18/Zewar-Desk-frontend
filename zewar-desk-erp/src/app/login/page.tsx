// src/app/login/page.tsx
/**
 * Login Page Component
 * 
 * Allows users to authenticate with email and password.
 * Features:
 * - Email and password form validation
 * - Remember me checkbox for user convenience
 * - Demo account login with auto-fill
 * - Forgot password link
 * - Sign up link for new users
 * - Responsive design for mobile and desktop
 * - Premium UI with gold accents
 * 
 * Currently validates on client-side.
 * Phase 2 will add backend authentication with JWT tokens.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/branding/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/lib/constants'
import { isValidEmail } from '@/lib/utils'

/**
 * Form state interface for login form
 */
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  [key: string]: string
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@zewardesk.com',
  password: 'demo123456'
}

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
    setSuccessMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo, check if it's demo credentials or any credentials
      if (form.email === DEMO_CREDENTIALS.email && form.password === DEMO_CREDENTIALS.password) {
        setSuccessMessage('Demo account login successful! Redirecting to dashboard...')
        setTimeout(() => {
          router.push(ROUTES.DASHBOARD)
        }, 1000)
      } else {
        // Allow any email/password for demo purposes to reach dashboard
        setSuccessMessage('Login successful! Redirecting to dashboard...')
        setTimeout(() => {
          router.push(ROUTES.DASHBOARD)
        }, 1000)
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setForm({
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
      rememberMe: false,
    })
    setErrors({})
    
    setIsLoading(true)
    setSuccessMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccessMessage('Demo account login successful! Redirecting to dashboard...')
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD)
      }, 1000)
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
    <main className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-gold-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
        <div className="container-custom h-16 flex items-center justify-between">
          <Link href={ROUTES.HOME}>
            <Logo size="sm" showText={true} />
          </Link>
          <p className="text-sm text-neutral-600">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.SIGNUP} className="font-semibold text-gold-600 hover:text-gold-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-20 min-h-[calc(100vh-64px)] flex items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-neutral-900">
                Welcome back
              </h1>
              <p className="text-lg text-neutral-600">
                Sign in to your Zewar Desk account
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-700 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {successMessage}
                </p>
              </div>
            )}

            {/* Demo Login Section */}
            <div className="p-6 bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl border-2 border-gold-200">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gold-900 mb-1">🎭 Try Demo Account</h3>
                <p className="text-sm text-gold-700">Quick access to explore all features</p>
              </div>
              <Button
                type="button"
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                {isLoading && form.email === DEMO_CREDENTIALS.email ? 'Logging in...' : 'Login with Demo Account'}
              </Button>
              <div className="mt-3 text-xs text-gold-700 space-y-1">
                <p><strong>Email:</strong> demo@zewardesk.com</p>
                <p><strong>Password:</strong> demo123456</p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-white via-neutral-50 to-gold-50 text-neutral-500">Or sign in with your account</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleInputChange}
                error={errors.password}
                required
                autoComplete="current-password"
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link 
                  href="#"
                  className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 cursor-pointer py-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded-md border-2 border-neutral-300 cursor-pointer accent-gold-500"
                />
                <span className="text-sm font-medium text-neutral-700">Remember me for 30 days</span>
              </label>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-700 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && form.email !== DEMO_CREDENTIALS.email ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Footer Links */}
            <p className="text-center text-sm text-neutral-600">
              By signing in, you agree to our{' '}
              <Link href="#" className="text-gold-600 hover:text-gold-700 font-medium">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="#" className="text-gold-600 hover:text-gold-700 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
