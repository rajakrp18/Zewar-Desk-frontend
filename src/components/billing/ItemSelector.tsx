// EXACT PATH: src/components/billing/ItemSelector.tsx
// PURPOSE: Select items from inventory for billing

'use client'

import { useState } from 'react'
import { InventoryItem, BillItem } from '@/lib/types'
import { useInventory } from '@/hooks/useInventory'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatWeight } from '@/lib/utils'

interface ItemSelectorProps {
  selectedItems: BillItem[]
  onAddItem: (item: BillItem) => void
  onUpdateItem: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
}

export function ItemSelector({ 
  selectedItems, 
  onAddItem, 
  onUpdateItem, 
  onRemoveItem 
}: ItemSelectorProps) {
  const { items: inventoryItems } = useInventory()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  
  const availableItems = inventoryItems.filter(item => 
    item.isActive && item.quantity > 0
  )
  
  const filteredItems = availableItems.filter(item => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(search) ||
      item.barcode?.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    )
  })
  
  const handleAddItem = (inventoryItem: InventoryItem) => {
    const billItem: BillItem = {
      id: `item_${Date.now()}`,
      itemId: inventoryItem.id,
      itemName: inventoryItem.name,
      quantity: 1,
      unitPrice: inventoryItem.sellingPrice,
      total: inventoryItem.sellingPrice,
    }
    
    onAddItem(billItem)
    setSearchTerm('')
    setShowDropdown(false)
  }
  
  const getStockStatus = (quantity: number): { variant: 'success' | 'warning' | 'danger', label: string } => {
    if (quantity === 0) return { variant: 'danger', label: 'Out of Stock' }
    if (quantity < 10) return { variant: 'warning', label: 'Low Stock' }
    return { variant: 'success', label: 'In Stock' }
  }
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Add Items <span className="text-red-500">*</span>
      </label>
      
      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search items by name, category, or barcode..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
        
        {showDropdown && searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="p-4 text-center text-neutral-600">
                No items found
              </div>
            ) : (
              filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.quantity)
                const isAlreadyAdded = selectedItems.some(si => si.itemId === item.id)
                
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => !isAlreadyAdded && handleAddItem(item)}
                    disabled={isAlreadyAdded}
                    className={`w-full text-left px-4 py-3 border-b border-neutral-100 last:border-b-0 ${
                      isAlreadyAdded 
                        ? 'bg-neutral-50 cursor-not-allowed opacity-60' 
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-neutral-900">{item.name}</span>
                          <Badge variant="default" className="text-xs">{item.purity}</Badge>
                        </div>
                        <div className="text-sm text-neutral-600">
                          {formatWeight(item.weight)} • {formatCurrency(item.sellingPrice)}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge variant={stockStatus.variant} className="text-xs mb-1">
                          {item.quantity} available
                        </Badge>
                        {isAlreadyAdded && (
                          <div className="text-xs text-neutral-500">Added</div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        )}
        
        {showDropdown && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
      
      {/* Selected Items Table */}
      {selectedItems.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Total</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {selectedItems.map((item, index) => {
                  const inventoryItem = inventoryItems.find(i => i.id === item.itemId)
                  const maxQuantity = inventoryItem?.quantity || 0
                  
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-neutral-900">{item.itemName}</div>
                      </td>
                      <td className="px-4 py-3 text-neutral-900">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          max={maxQuantity}
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 1
                            if (newQty <= maxQuantity && newQty > 0) {
                              onUpdateItem(index, newQty)
                            }
                          }}
                          className="w-20 px-2 py-1 border border-neutral-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                        <div className="text-xs text-neutral-500 mt-1">
                          Max: {maxQuantity}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">
                        {formatCurrency(item.total)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {selectedItems.length === 0 && (
        <div className="text-center py-8 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-neutral-600">No items added yet</p>
          <p className="text-sm text-neutral-500 mt-1">Search and add items to the bill</p>
        </div>
      )}
    </div>
  )
}
