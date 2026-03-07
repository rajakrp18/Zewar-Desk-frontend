// EXACT PATH: src/app/dashboard/orders/page.tsx (REPLACE EXISTING)
// PURPOSE: Main orders list page with search and filters

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useOrders } from '@/hooks/useOrders'
import { OrderTable } from '@/components/orders/OrderTable'
import { OrderCard } from '@/components/orders/OrderCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

export default function OrdersPage() {
  const { 
    orders, 
    isLoading, 
    searchOrders, 
    deleteOrder,
    getPendingOrdersCount,
    getTotalOrderValue,
    getTotalAdvancePayments,
    getPendingBalance,
    getOverdueOrders
  } = useOrders()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  
  // Filter orders based on current filters
  const filteredOrders = searchOrders(
    searchTerm,
    selectedStatus
  )
  
  const pendingCount = getPendingOrdersCount()
  const totalValue = getTotalOrderValue()
  const advanceTotal = getTotalAdvancePayments()
  const pendingBalance = getPendingBalance()
  const overdueOrders = getOverdueOrders()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-neutral-600">Loading orders...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Orders Management</h1>
          <p className="text-neutral-600 mt-1">
            Track and manage custom orders
          </p>
        </div>
        <Link href="/dashboard/orders/new">
          <Button variant="primary">
            ➕ Create New Order
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Pending Orders</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {pendingCount}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Order Value</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(totalValue)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Advance Received</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {formatCurrency(advanceTotal)}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Pending Balance</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {formatCurrency(pendingBalance)}
              </p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </Card>
      </div>
      
      {/* Overdue Alert */}
      {overdueOrders.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <p className="font-semibold text-red-900">
                {overdueOrders.length} Overdue Order{overdueOrders.length > 1 ? 's' : ''}
              </p>
              <p className="text-sm text-red-700">
                These orders have passed their delivery date
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStatus('in-progress')}
              className="text-red-700 hover:bg-red-100"
            >
              View All
            </Button>
          </div>
        </Card>
      )}
      
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-end gap-4">
          {/* Search */}
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by order number, customer name, or item..."
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
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
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
          Showing {filteredOrders.length} of {orders.length} orders
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
      
      {/* Orders List/Cards */}
      {viewMode === 'table' ? (
        <OrderTable 
          orders={filteredOrders}
          onDelete={deleteOrder}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-neutral-200">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No orders found
              </h3>
              <p className="text-neutral-600 mb-6">
                Create your first custom order to get started
              </p>
              <Link href="/dashboard/orders/new">
                <Button variant="primary">Create First Order</Button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onDelete={deleteOrder}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
