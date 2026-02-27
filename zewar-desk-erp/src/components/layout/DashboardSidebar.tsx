'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/branding/Logo'
import { ROUTES } from '@/lib/constants'

const menuItems = [
  { label: 'Dashboard', icon: '📊', href: ROUTES.DASHBOARD },
  { label: 'Inventory', icon: '📦', href: ROUTES.INVENTORY },
  { label: 'Billing', icon: '💳', href: ROUTES.BILLING },
  { label: 'Customers', icon: '👥', href: ROUTES.CUSTOMERS },
  { label: 'Orders', icon: '📋', href: ROUTES.ORDERS },
  { label: 'Reports', icon: '📈', href: ROUTES.REPORTS },
  { label: 'Settings', icon: '⚙️', href: ROUTES.SETTINGS },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="h-16 border-b border-neutral-200 flex items-center px-6">
        <Logo size="sm" />
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-neutral-200 p-4 space-y-4">
        <button className="w-full px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors text-left">
          👤 Profile
        </button>
        <button className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          🚪 Logout
        </button>
      </div>
    </aside>
  )
}
