'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  totalPurchase: number
  ordersCount: number
  lastPurchase: string
  status: 'Active' | 'Inactive'
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')

  // Empty customers for new users
  const [customers] = useState<Customer[]>([])

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'Active').length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalPurchase, 0)
  const avgCustomerValue = Math.round(totalRevenue / totalCustomers)

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    }
    return `₹${value.toLocaleString()}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Customers</h1>
          <p className="text-neutral-600 mt-2">Manage your customer relationships</p>
        </div>
        <Button variant="gold" size="lg" className="md:w-auto w-full">
          👤 Add New Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Customers</p>
            <p className="text-3xl font-bold text-neutral-900">{totalCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Active Customers</p>
            <p className="text-3xl font-bold text-green-600">{activeCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-gold-600">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Avg. Customer Value</p>
            <p className="text-3xl font-bold text-neutral-900">{formatCurrency(avgCustomerValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Search Customers"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">Status</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No Customers Yet</h3>
              <p className="text-neutral-600 mb-6">Add your first customer to start managing relationships</p>
              <Button variant="gold" size="lg">
                👤 Add First Customer
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Contact</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">City</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Orders</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Total Purchase</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Last Purchase</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 text-neutral-900 font-medium">{customer.name}</td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-neutral-600">{customer.email}</p>
                          <p className="text-neutral-500">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-neutral-600">{customer.city}</td>
                      <td className="py-4 px-4 text-neutral-600">{customer.ordersCount}</td>
                      <td className="py-4 px-4 text-neutral-900 font-semibold">{formatCurrency(customer.totalPurchase)}</td>
                      <td className="py-4 px-4 text-neutral-600">{new Date(customer.lastPurchase).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          customer.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-gold-600 hover:text-gold-700 font-medium text-sm">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
