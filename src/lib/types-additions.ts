// EXACT PATH: src/lib/types-additions.ts
// PURPOSE: Additional types needed for Bill and Order (add these to your existing types.ts)

/**
 * Bill related types
 */
export interface Bill {
  id: string
  billNumber: string
  date: Date
  customerId: string
  customerName: string
  items: BillItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: 'paid' | 'pending' | 'cancelled'
  paymentMethod?: 'cash' | 'card' | 'upi' | 'netbanking' | 'cheque'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface BillItem {
  id: string
  itemId: string
  itemName: string
  quantity: number
  unitPrice: number
  total: number
}

/**
 * Order related types (for custom orders)
 */
export interface Order {
  id: string
  orderNumber: string
  date: Date
  customerId: string
  customerName: string
  itemDescription: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'ready' | 'delivered' | 'cancelled'
  deliveryDate: Date
  advancePayment: number
  totalAmount: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}
