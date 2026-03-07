// EXACT PATH: src/app/dashboard/inventory/page.tsx
// PURPOSE: Main inventory list page with search and filters

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { useInventory } from '@/hooks/useInventory'
import { InventoryTable } from '@/components/inventory/InventoryTable'
import { CategoryFilter } from '@/components/inventory/CategoryFilter'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { GOLD_PURITY_OPTIONS } from '@/lib/constants'

export default function InventoryPage() {
  const { 
    items, 
    isLoading, 
    searchItems, 
    deleteItem,
    getLowStockItems,
    getTotalStockValue
  } = useInventory()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPurity, setSelectedPurity] = useState('all')
  const [showLowStock, setShowLowStock] = useState(false)
  
  // Filter items based on current filters
  const filteredItems = searchItems(
    searchTerm,
    selectedCategory,
    selectedPurity,
    showLowStock
  )
  
  const lowStockCount = getLowStockItems().length
  const totalValue = getTotalStockValue()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-neutral-600">Loading inventory...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Inventory</h1>
          <p className="text-neutral-600 mt-1">
            Manage your jewellery stock and items
          </p>
        </div>
        <Link href="/dashboard/inventory/add">
          <Button variant="primary">
            ➕ Add New Item
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Items</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {items.length}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Stock Value</p>
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
              <p className="text-sm text-neutral-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {lowStockCount}
              </p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name, description, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <CategoryFilter
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          
          {/* Purity Filter */}
          <select
            value={selectedPurity}
            onChange={(e) => setSelectedPurity(e.target.value)}
            className="h-10 px-4 rounded-md border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value="all">All Purities</option>
            {GOLD_PURITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Low Stock Toggle */}
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="lowStock"
            checked={showLowStock}
            onChange={(e) => setShowLowStock(e.target.checked)}
            className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
          />
          <label htmlFor="lowStock" className="ml-2 text-sm text-neutral-700">
            Show only low stock items (quantity &lt; 10)
          </label>
        </div>
      </Card>
      
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          Showing {filteredItems.length} of {items.length} items
        </p>
        
        {(searchTerm || selectedCategory !== 'all' || selectedPurity !== 'all' || showLowStock) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedPurity('all')
              setShowLowStock(false)
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Inventory Table */}
      <InventoryTable 
        items={filteredItems}
        onDelete={deleteItem}
      />
    </div>
  )
}
