// EXACT PATH: src/components/inventory/CategoryFilter.tsx
// PURPOSE: Filter dropdown for jewellery categories

'use client'

import { JEWELLERY_CATEGORIES } from '@/lib/constants'

interface CategoryFilterProps {
  value: string
  onChange: (category: string) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 px-4 rounded-md border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
    >
      <option value="all">All Categories</option>
      {JEWELLERY_CATEGORIES.map((cat) => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  )
}
