// EXACT PATH: src/lib/mockData.ts
// PURPOSE: Mock data for Phase 1 (before backend integration)
// This provides realistic sample data for testing all features

import { 
  InventoryItem, 
  Customer, 
  Bill, 
  Order, 
  GoldRate 
} from './types'

/**
 * Mock Gold Rates (Updated Daily)
 */
export const mockGoldRates: GoldRate[] = [
  {
    purity: '24K',
    buyPrice: 7200,
    sellPrice: 7250,
    lastUpdated: new Date('2026-03-05T10:30:00'),
  },
  {
    purity: '22K',
    buyPrice: 6600,
    sellPrice: 6650,
    lastUpdated: new Date('2026-03-05T10:30:00'),
  },
  {
    purity: '18K',
    buyPrice: 5400,
    sellPrice: 5450,
    lastUpdated: new Date('2026-03-05T10:30:00'),
  },
  {
    purity: '14K',
    buyPrice: 4200,
    sellPrice: 4250,
    lastUpdated: new Date('2026-03-05T10:30:00'),
  },
]

/**
 * Mock Inventory Items
 */
export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv_001',
    name: 'Gold Necklace Set',
    category: 'necklace',
    weight: 45.5,
    purity: '22K',
    quantity: 5,
    costPrice: 300000,
    sellingPrice: 350000,
    makingCharges: 15000,
    description: 'Traditional gold necklace with intricate design',
    imageUrl: undefined,
    barcode: 'GN22001',
    isActive: true,
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: 'inv_002',
    name: 'Diamond Ring',
    category: 'ring',
    weight: 8.2,
    purity: '18K',
    quantity: 12,
    costPrice: 85000,
    sellingPrice: 95000,
    makingCharges: 5000,
    description: 'Solitaire diamond ring 1 carat',
    barcode: 'DR18001',
    isActive: true,
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-02-28'),
  },
  {
    id: 'inv_003',
    name: 'Gold Bangles (Pair)',
    category: 'bangle',
    weight: 60.0,
    purity: '22K',
    quantity: 8,
    costPrice: 400000,
    sellingPrice: 450000,
    makingCharges: 20000,
    description: 'Traditional design bangles - pair',
    barcode: 'GB22002',
    isActive: true,
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-02'),
  },
  {
    id: 'inv_004',
    name: 'Pearl Earrings',
    category: 'earring',
    weight: 12.5,
    purity: '18K',
    quantity: 15,
    costPrice: 25000,
    sellingPrice: 32000,
    makingCharges: 3000,
    description: 'Pearl drop earrings with gold setting',
    barcode: 'PE18001',
    isActive: true,
    createdAt: new Date('2026-02-25'),
    updatedAt: new Date('2026-03-04'),
  },
  {
    id: 'inv_005',
    name: 'Gold Chain',
    category: 'chain',
    weight: 25.0,
    purity: '22K',
    quantity: 7,
    costPrice: 165000,
    sellingPrice: 185000,
    makingCharges: 8000,
    description: '22K gold chain 24 inches',
    barcode: 'GC22003',
    isActive: true,
    createdAt: new Date('2026-02-18'),
    updatedAt: new Date('2026-03-03'),
  },
  {
    id: 'inv_006',
    name: 'Silver Anklet',
    category: 'anklet',
    weight: 35.0,
    purity: 'silver',
    quantity: 3,
    costPrice: 4500,
    sellingPrice: 6500,
    makingCharges: 1000,
    description: 'Traditional silver anklet with bells',
    barcode: 'SA001',
    isActive: true,
    createdAt: new Date('2026-02-12'),
    updatedAt: new Date('2026-02-28'),
  },
]

/**
 * Mock Customers
 */
export const mockCustomers: Customer[] = [
  {
    id: 'cust_001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    address: '123 MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    gstin: '27AABCU9603R1ZM',
    totalPurchases: 525000,
    totalOrders: 5,
    lastPurchaseDate: new Date('2026-03-01'),
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: 'cust_002',
    name: 'Priya Sharma',
    email: 'priya.s@email.com',
    phone: '9876543211',
    address: '456 Park Street',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    totalPurchases: 285000,
    totalOrders: 3,
    lastPurchaseDate: new Date('2026-02-28'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-02-28'),
  },
  {
    id: 'cust_003',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '9876543212',
    address: '789 Station Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380001',
    gstin: '24AABCU9603R1ZP',
    totalPurchases: 680000,
    totalOrders: 7,
    lastPurchaseDate: new Date('2026-03-04'),
    createdAt: new Date('2025-11-20'),
    updatedAt: new Date('2026-03-04'),
  },
  {
    id: 'cust_004',
    name: 'Sunita Desai',
    phone: '9876543213',
    address: '321 Main Bazaar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    totalPurchases: 125000,
    totalOrders: 2,
    lastPurchaseDate: new Date('2026-02-25'),
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-25'),
  },
  {
    id: 'cust_005',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '9876543214',
    address: '654 Lake View',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    totalPurchases: 950000,
    totalOrders: 9,
    lastPurchaseDate: new Date('2026-03-05'),
    createdAt: new Date('2025-10-05'),
    updatedAt: new Date('2026-03-05'),
  },
]

/**
 * Mock Bills
 */
export const mockBills: Bill[] = [
  {
    id: 'bill_001',
    billNumber: 'INV-2026-001',
    date: new Date('2026-03-05'),
    customerId: 'cust_005',
    customerName: 'Vikram Singh',
    items: [
      {
        id: 'item_1',
        itemId: 'inv_001',
        itemName: 'Gold Necklace Set',
        quantity: 1,
        unitPrice: 350000,
        total: 350000,
      },
    ],
    subtotal: 350000,
    tax: 12600, // 3.6% GST
    discount: 10000,
    total: 352600,
    status: 'paid',
    paymentMethod: 'card',
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    id: 'bill_002',
    billNumber: 'INV-2026-002',
    date: new Date('2026-03-04'),
    customerId: 'cust_003',
    customerName: 'Amit Patel',
    items: [
      {
        id: 'item_2',
        itemId: 'inv_002',
        itemName: 'Diamond Ring',
        quantity: 2,
        unitPrice: 95000,
        total: 190000,
      },
    ],
    subtotal: 190000,
    tax: 6840,
    discount: 5000,
    total: 191840,
    status: 'paid',
    paymentMethod: 'upi',
    createdAt: new Date('2026-03-04'),
    updatedAt: new Date('2026-03-04'),
  },
  {
    id: 'bill_003',
    billNumber: 'INV-2026-003',
    date: new Date('2026-03-01'),
    customerId: 'cust_001',
    customerName: 'Rajesh Kumar',
    items: [
      {
        id: 'item_3',
        itemId: 'inv_003',
        itemName: 'Gold Bangles (Pair)',
        quantity: 1,
        unitPrice: 450000,
        total: 450000,
      },
      {
        id: 'item_4',
        itemId: 'inv_004',
        itemName: 'Pearl Earrings',
        quantity: 1,
        unitPrice: 32000,
        total: 32000,
      },
    ],
    subtotal: 482000,
    tax: 17352,
    discount: 15000,
    total: 484352,
    status: 'pending',
    paymentMethod: 'cash',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
  },
]

/**
 * Mock Orders
 */
export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    orderNumber: 'ORD-2026-001',
    date: new Date('2026-02-28'),
    customerId: 'cust_002',
    customerName: 'Priya Sharma',
    itemDescription: 'Custom gold necklace with emerald stones, 22K, 50 grams',
    status: 'in-progress',
    deliveryDate: new Date('2026-03-15'),
    advancePayment: 150000,
    totalAmount: 450000,
    notes: 'Customer wants traditional design with modern touch',
    createdAt: new Date('2026-02-28'),
    updatedAt: new Date('2026-03-04'),
  },
  {
    id: 'ord_002',
    orderNumber: 'ORD-2026-002',
    date: new Date('2026-03-02'),
    customerId: 'cust_003',
    customerName: 'Amit Patel',
    itemDescription: 'Engagement ring set, 18K white gold with 2ct diamond',
    status: 'confirmed',
    deliveryDate: new Date('2026-03-20'),
    advancePayment: 200000,
    totalAmount: 600000,
    notes: 'Rush order - customer needs before March 25',
    createdAt: new Date('2026-03-02'),
    updatedAt: new Date('2026-03-03'),
  },
  {
    id: 'ord_003',
    orderNumber: 'ORD-2026-003',
    date: new Date('2026-03-04'),
    customerId: 'cust_005',
    customerName: 'Vikram Singh',
    itemDescription: 'Gold chain with pendant, 22K, 30 grams',
    status: 'ready',
    deliveryDate: new Date('2026-03-10'),
    advancePayment: 100000,
    totalAmount: 250000,
    notes: 'Ready for pickup',
    createdAt: new Date('2026-03-04'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    id: 'ord_004',
    orderNumber: 'ORD-2026-004',
    date: new Date('2026-02-25'),
    customerId: 'cust_001',
    customerName: 'Rajesh Kumar',
    itemDescription: 'Antique silver anklets (pair), traditional design',
    status: 'delivered',
    deliveryDate: new Date('2026-03-03'),
    advancePayment: 15000,
    totalAmount: 45000,
    notes: 'Delivered on time',
    createdAt: new Date('2026-02-25'),
    updatedAt: new Date('2026-03-03'),
  },
]

/**
 * Dashboard Statistics (Calculated from mock data)
 */
export const mockDashboardStats = {
  todaySales: 352600, // From bill_001 (today)
  monthlyRevenue: 1028792, // Sum of all bills
  totalStock: 50, // Sum of all inventory quantities
  pendingOrders: 2, // Orders with status != delivered
  totalCustomers: mockCustomers.length,
  lowStockItems: mockInventoryItems.filter(item => item.quantity < 10).length,
}

/**
 * Recent Transactions (Last 5 bills)
 */
export const mockRecentTransactions = mockBills.slice(0, 5)
