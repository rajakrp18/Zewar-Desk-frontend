// EXACT PATH: src/app/dashboard/billing/page.tsx (REPLACE EXISTING)
// PURPOSE: Main billing list page with search and filters

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBilling } from '@/hooks/useBilling'
import { BillTable } from '@/components/billing/BillTable'
import { BillCard } from '@/components/billing/BillCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

export default function BillingPage() {
  const { 
    bills, 
    isLoading, 
    searchBills, 
    deleteBill,
    getTotalRevenue,
    getPaidAmount,
    getPendingAmount
  } = useBilling()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  // Filter bills based on current filters
  const filteredBills = searchBills(
    searchTerm,
    selectedStatus
  )
  
  const totalRevenue = getTotalRevenue()
  const paidAmount = getPaidAmount()
  const pendingAmount = getPendingAmount()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-neutral-600">Loading bills...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Billing & Invoices</h1>
          <p className="text-neutral-600 mt-1">
            Create and manage customer bills
          </p>
        </div>
        <Link href="/dashboard/billing/new">
          <Button variant="primary">
            ➕ Create New Bill
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <p className="text-sm text-neutral-600">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {formatCurrency(paidAmount)}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Pending Amount</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {formatCurrency(pendingAmount)}
              </p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Bills</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {bills.length}
              </p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-end gap-4">
          {/* Search */}
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by bill number or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
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
          Showing {filteredBills.length} of {bills.length} bills
        </p>
        
        {(searchTerm || selectedStatus !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setSelectedStatus('all')
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Bills List/Cards */}
      {viewMode === 'table' ? (
        <BillTable 
          bills={filteredBills}
          onDelete={deleteBill}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-neutral-200">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No bills found
              </h3>
              <p className="text-neutral-600 mb-6">
                Create your first bill to get started
              </p>
              <Link href="/dashboard/billing/new">
                <Button variant="primary">Create First Bill</Button>
              </Link>
            </div>
          ) : (
            filteredBills.map((bill) => (
              <BillCard
                key={bill.id}
                bill={bill}
                onDelete={deleteBill}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
