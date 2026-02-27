// src/lib/constants.ts

/**
 * Application Constants
 */

export const APP_NAME = 'Zewar Desk'
export const APP_DESCRIPTION = 'Professional Jewellery ERP System'
export const APP_VERSION = '1.0.0'

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  INVENTORY: '/dashboard/inventory',
  CUSTOMERS: '/dashboard/customers',
  ORDERS: '/dashboard/orders',
  BILLING: '/dashboard/billing',
  REPORTS: '/dashboard/reports',
  SETTINGS: '/dashboard/settings',
} as const

/**
 * API endpoints (for Phase 2)
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    VERIFY: '/api/auth/verify',
  },
  INVENTORY: {
    LIST: '/api/inventory',
    CREATE: '/api/inventory/create',
    UPDATE: '/api/inventory/update',
    DELETE: '/api/inventory/delete',
  },
  CUSTOMERS: {
    LIST: '/api/customers',
    CREATE: '/api/customers/create',
    UPDATE: '/api/customers/update',
    DELETE: '/api/customers/delete',
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders/create',
    UPDATE: '/api/orders/update',
    DELETE: '/api/orders/delete',
  },
} as const

/**
 * Jewellery categories
 */
export const JEWELLERY_CATEGORIES = [
  { value: 'ring', label: 'Ring' },
  { value: 'necklace', label: 'Necklace' },
  { value: 'earring', label: 'Earring' },
  { value: 'bangle', label: 'Bangle' },
  { value: 'chain', label: 'Chain' },
  { value: 'pendant', label: 'Pendant' },
  { value: 'bracelet', label: 'Bracelet' },
  { value: 'anklet', label: 'Anklet' },
  { value: 'nosering', label: 'Nose Ring' },
  { value: 'other', label: 'Other' },
] as const

/**
 * Gold purity options
 */
export const GOLD_PURITY_OPTIONS = [
  { value: '24K', label: '24 Karat (99.9%)' },
  { value: '22K', label: '22 Karat (91.6%)' },
  { value: '18K', label: '18 Karat (75%)' },
  { value: '14K', label: '14 Karat (58.5%)' },
] as const

/**
 * User roles
 */
export const USER_ROLES = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'staff', label: 'Staff' },
  { value: 'accountant', label: 'Accountant' },
] as const

/**
 * Order statuses
 */
export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'processing', label: 'Processing', color: 'purple' },
  { value: 'ready', label: 'Ready', color: 'green' },
  { value: 'delivered', label: 'Delivered', color: 'gray' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const

/**
 * Payment statuses
 */
export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'partial', label: 'Partial', color: 'orange' },
  { value: 'paid', label: 'Paid', color: 'green' },
  { value: 'refunded', label: 'Refunded', color: 'gray' },
] as const

/**
 * Payment methods
 */
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'netbanking', label: 'Net Banking' },
  { value: 'cheque', label: 'Cheque' },
] as const

/**
 * Validation constants
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_LENGTH: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const

/**
 * Date formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  TIMESTAMP: 'YYYY-MM-DD HH:mm:ss',
} as const

/**
 * Indian states
 */
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const

/**
 * Dashboard navigation items
 */
export const DASHBOARD_NAV_ITEMS = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    ],
  },
  {
    section: 'Inventory',
    items: [
      { label: 'Stock', href: '/dashboard/inventory', icon: 'inventory' },
      { label: 'Add Item', href: '/dashboard/inventory/add', icon: 'add' },
    ],
  },
  {
    section: 'Sales',
    items: [
      { label: 'Billing', href: '/dashboard/billing', icon: 'billing' },
      { label: 'Orders', href: '/dashboard/orders', icon: 'orders' },
      { label: 'Customers', href: '/dashboard/customers', icon: 'customers' },
    ],
  },
  {
    section: 'Reports',
    items: [
      { label: 'Sales Report', href: '/dashboard/reports/sales', icon: 'reports' },
      { label: 'Stock Report', href: '/dashboard/reports/stock', icon: 'reports' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { label: 'Gold Rates', href: '/dashboard/settings/rates', icon: 'settings' },
      { label: 'Business', href: '/dashboard/settings/business', icon: 'settings' },
      { label: 'Users', href: '/dashboard/settings/users', icon: 'users' },
    ],
  },
] as const
