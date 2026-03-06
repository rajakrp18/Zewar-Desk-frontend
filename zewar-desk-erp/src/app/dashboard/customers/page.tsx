// EXACT PATH: src/app/dashboard/customers/page.tsx
// PURPOSE: Main customers list page with search and filters

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCustomers } from '@/hooks/useCustomers'
import { CustomerTable } from '@/components/customers/CustomerTable'
import { CustomerCard } from '@/components/customers/CustomerCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

export default function CustomersPage() {
  const { 
    customers, 
    isLoading, 
    searchCustomers, 
    deleteCustomer,
    getTopCustomers,
    getAllCities,
    getAllStates,
    getTotalRevenue
  } = useCustomers()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedState, setSelectedState] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  // Filter customers based on current filters
  const filteredCustomers = searchCustomers(
    searchTerm,
    selectedCity,
    selectedState
  )
  
  const topCustomers = getTopCustomers(3)
  const allCities = getAllCities()
  const allStates = getAllStates()
  const totalRevenue = getTotalRevenue()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-neutral-600">Loading customers...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Customers</h1>
          <p className="text-neutral-600 mt-1">
            Manage your customer relationships
          </p>
        </div>
        <Link href="/dashboard/customers/add">
          <Button variant="primary">
            ➕ Add New Customer
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Customers</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {customers.length}
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Top Customer</p>
              <p className="text-lg font-bold text-neutral-900 mt-1">
                {topCustomers[0]?.name || 'N/A'}
              </p>
              {topCustomers[0] && (
                <p className="text-sm text-neutral-600">
                  {formatCurrency(topCustomers[0].totalPurchases)}
                </p>
              )}
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Avg. Purchase</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(customers.length > 0 ? totalRevenue / customers.length : 0)}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-end gap-4">
          {/* Search */}
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by name, email, phone, or GSTIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* City Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Cities</option>
              {allCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {/* State Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All States</option>
              {allStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>
        
        {(searchTerm || selectedCity !== 'all' || selectedState !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setSelectedCity('all')
              setSelectedState('all')
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Customer List/Cards */}
      {viewMode === 'table' ? (
        <CustomerTable 
          customers={filteredCustomers}
          onDelete={deleteCustomer}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-neutral-200">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No customers found
              </h3>
              <p className="text-neutral-600 mb-6">
                Get started by adding your first customer
              </p>
              <Link href="/dashboard/customers/add">
                <Button variant="primary">Add First Customer</Button>
              </Link>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onDelete={deleteCustomer}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
