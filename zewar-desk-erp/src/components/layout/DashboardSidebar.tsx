// src/components/layout/DashboardSidebar.tsx
/**
 * Dashboard Sidebar Component
 * 
 * Premium sidebar navigation for authenticated users.
 * Features:
 * - Logo at top with branding
 * - Main menu with active state highlighting color
 * - User profile section
 * - Logout button
 * - Active route indicator using current pathname
 * - Premium styling with gold accents
 * 
 * Client component (uses usePathname hook)
 * Responsive navigation for dashboard pages
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/branding/Logo'
import { ROUTES } from '@/lib/constants'

/**
 * Main navigation menu items
 * Each item has emoji icon, label, and route path
 */
const menuItems = [
  { label: 'Dashboard', icon: '📊', href: ROUTES.DASHBOARD },
  { label: 'Inventory', icon: '📦', href: ROUTES.INVENTORY },
  { label: 'Billing', icon: '💳', href: ROUTES.BILLING },
  { label: 'Customers', icon: '👥', href: ROUTES.CUSTOMERS },
  { label: 'Orders', icon: '📋', href: ROUTES.ORDERS },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-r border-gold-600 flex flex-col h-screen shadow-2xl">
      {/* Logo Section */}
      <div className="border-b border-neutral-700 flex items-center px-6 py-6 bg-gradient-to-r from-neutral-900 to-neutral-800">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl">✨</div>
          <div className="text-white">
            <h3 className="text-sm font-bold">Zewar Desk</h3>
            <p className="text-xs text-gold-300">Pro</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== ROUTES.DASHBOARD && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-700 p-4 space-y-3 bg-neutral-900">
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors font-medium">
          <span className="text-lg">⚙️</span>
          <span className="text-sm">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:text-red-200 hover:bg-red-900/30 transition-colors font-medium">
          <span className="text-lg">🚪</span>
          <span className="text-sm">Logout</span>
        </button>

        {/* Premium Badge */}
        <div className="mt-4 p-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/30 rounded-xl text-center">
          <p className="text-xs text-gold-200 font-semibold">💎 Premium Plan</p>
          <p className="text-xs text-neutral-400 mt-1">Full Features Access</p>
        </div>
      </div>
    </aside>
  )
}
