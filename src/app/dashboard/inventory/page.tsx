'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface InventoryItem {
  id: string
  name: string
  category: 'Gold' | 'Diamond' | 'Silver' | 'Precious Stone'
  weight: number
  purity: string
  quantity: number
  rate: number
  value: number
  lastUpdated: string
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('All')

  // Empty inventory for new users
  const [items] = useState<InventoryItem[]>([])

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalInventoryValue = items.reduce((sum, item) => sum + item.value, 0)
  const categories = ['All', 'Gold', 'Diamond', 'Silver', 'Precious Stone']

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`
    }
    return `₹${value.toLocaleString()}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Inventory</h1>
          <p className="text-neutral-600 mt-2">Manage your jewelry inventory and stock</p>
        </div>
        <Button variant="gold" size="lg" className="md:w-auto w-full">
          ➕ Add New Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Inventory Value</p>
            <p className="text-3xl font-bold text-gold-600">{formatCurrency(totalInventoryValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Items</p>
            <p className="text-3xl font-bold text-neutral-900">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Item Types</p>
            <p className="text-3xl font-bold text-neutral-900">{items.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Last Updated</p>
            <p className="text-lg font-bold text-neutral-900">Today</p>
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
            label="Search Items"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No Inventory Items Yet</h3>
              <p className="text-neutral-600 mb-6">Start by adding your first inventory item to begin tracking</p>
              <Button variant="gold" size="lg">
                ➕ Add First Item
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Item Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Category</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Purity</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Quantity</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Rate</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Total Value</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 text-neutral-900 font-medium">{item.name}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-600">{item.purity}</td>
                      <td className="py-4 px-4 text-neutral-600">{item.quantity}</td>
                      <td className="py-4 px-4 text-neutral-600">{formatCurrency(item.rate)}</td>
                      <td className="py-4 px-4 text-neutral-900 font-semibold">{formatCurrency(item.value)}</td>
                      <td className="py-4 px-4">
                        <button className="text-gold-600 hover:text-gold-700 font-medium text-sm">Edit</button>
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
