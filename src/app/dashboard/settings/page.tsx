'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SettingsPage() {
  const [shopName, setShopName] = useState('My Jewellery Shop')
  const [email, setEmail] = useState('owner@jewelleryshop.com')
  const [phone, setPhone] = useState('+91-9876543210')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [gstNumber, setGstNumber] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const settingsSections = [
    {
      title: 'Business Information',
      icon: '🏪',
      description: 'Update your shop details',
    },
    {
      title: 'Account Settings',
      icon: '👤',
      description: 'Manage your account',
    },
    {
      title: 'Notifications',
      icon: '🔔',
      description: 'Control notification preferences',
    },
    {
      title: 'Security',
      icon: '🔒',
      description: 'Password and security settings',
    },
    {
      title: 'Billing & Subscription',
      icon: '💳',
      description: 'Manage your subscription plan',
    },
    {
      title: 'API & Integrations',
      icon: '🔗',
      description: 'Third-party integrations',
    },
  ]

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600 mt-2">Manage your account and preferences</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Enter your shop name"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shop@email.com"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91-9876543210"
            />
          </div>
          <Input
            label="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main Street"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai"
            />
            <Input
              label="GST Number"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              placeholder="18AAPCU1234H1Z0"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="gold" size="lg">
              💾 Save Changes
            </Button>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
            <div>
              <p className="font-semibold text-neutral-900">Email Notifications</p>
              <p className="text-sm text-neutral-600">Receive email alerts for important updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
            <div>
              <p className="font-semibold text-neutral-900">Dark Mode</p>
              <p className="text-sm text-neutral-600">Use dark theme for the dashboard</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
            <div>
              <p className="font-semibold text-neutral-900">Change Password</p>
              <p className="text-sm text-neutral-600">Update your account password</p>
            </div>
            <Button variant="outline" size="md">
              Update
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
            <div>
              <p className="font-semibold text-neutral-900">Two-Factor Authentication</p>
              <p className="text-sm text-neutral-600">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="md">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Billing & Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gold-50 rounded-lg border-2 border-gold-200">
              <div>
                <p className="font-bold text-neutral-900">Premium Plan</p>
                <p className="text-sm text-neutral-600">₹999/month • Renews on March 28, 2026</p>
              </div>
              <Button variant="outline" size="md">
                Manage Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <div>
              <p className="font-semibold text-neutral-900">Delete Account</p>
              <p className="text-sm text-neutral-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger" size="md">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
