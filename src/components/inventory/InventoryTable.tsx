// EXACT PATH: src/components/inventory/InventoryTable.tsx
// PURPOSE: Display inventory items in a table with actions

'use client'

import Link from 'next/link'
import { InventoryItem } from '@/lib/types'
import { formatCurrency, formatWeight } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface InventoryTableProps {
  items: InventoryItem[]
  onDelete?: (id: string) => void
}

export function InventoryTable({ items, onDelete }: InventoryTableProps) {
  
  const getStockStatus = (quantity: number): { variant: 'success' | 'warning' | 'danger', label: string } => {
    if (quantity === 0) return { variant: 'danger', label: 'Out of Stock' }
    if (quantity < 10) return { variant: 'warning', label: 'Low Stock' }
    return { variant: 'success', label: 'In Stock' }
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No items found
        </h3>
        <p className="text-neutral-600 mb-6">
          Get started by adding your first inventory item
        </p>
        <Link href="/dashboard/inventory/add">
          <Button variant="primary">Add First Item</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Item Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Purity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {items.map((item) => {
              const stockStatus = getStockStatus(item.quantity)
              
              return (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {item.name}
                      </div>
                      {item.barcode && (
                        <div className="text-sm text-neutral-600">
                          {item.barcode}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-neutral-900">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-900">
                    {formatWeight(item.weight)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="default">{item.purity}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      item.quantity === 0 ? 'text-red-600' :
                      item.quantity < 10 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-900">
                    {formatCurrency(item.sellingPrice)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/inventory/${item.id}`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Delete "${item.name}"?`)) {
                              onDelete(item.id)
                            }
                          }}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
