// src/lib/types.ts

/**
 * User related types
 */
export interface User {
  id: string
  email: string
  name: string
  businessName: string
  phone: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'manager' | 'staff' | 'accountant'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

/**
 * Inventory related types
 */
export interface InventoryItem {
  id: string
  name: string
  category: JewelleryCategory
  weight: number // in grams
  purity: GoldPurity | 'silver' | 'platinum'
  quantity: number
  costPrice: number
  sellingPrice: number
  makingCharges: number
  description?: string
  imageUrl?: string
  barcode?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type JewelleryCategory = 
  | 'ring'
  | 'necklace'
  | 'earring'
  | 'bangle'
  | 'chain'
  | 'pendant'
  | 'bracelet'
  | 'anklet'
  | 'nosering'
  | 'other'

export type GoldPurity = '24K' | '22K' | '18K' | '14K'

/**
 * Customer related types
 */
export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  gstin?: string
  totalPurchases: number
  totalOrders: number
  lastPurchaseDate?: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Order related types
 */
export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customer?: Customer
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  itemId: string
  item?: InventoryItem
  quantity: number
  unitPrice: number
  total: number
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 
  | 'pending'
  | 'partial'
  | 'paid'
  | 'refunded'

export type PaymentMethod = 
  | 'cash'
  | 'card'
  | 'upi'
  | 'netbanking'
  | 'cheque'

/**
 * Dashboard statistics types
 */
export interface DashboardStats {
  todaySales: number
  totalStock: number
  pendingOrders: number
  totalCustomers: number
  monthlyRevenue: number
  lowStockItems: number
}

/**
 * Gold rate types
 */
export interface GoldRate {
  purity: GoldPurity
  buyPrice: number
  sellPrice: number
  lastUpdated: Date
}

export interface MetalRates {
  gold: {
    '24K': GoldRate
    '22K': GoldRate
    '18K': GoldRate
    '14K': GoldRate
  }
  silver: {
    buyPrice: number
    sellPrice: number
    lastUpdated: Date
  }
}

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Form state types
 */
export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
}

/**
 * Navigation types
 */
export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: number
}

export interface SidebarSection {
  title: string
  items: NavItem[]
}

/**
 * Notification types
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}
