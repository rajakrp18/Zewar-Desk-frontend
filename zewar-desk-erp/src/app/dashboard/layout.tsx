/**
 * Dashboard Layout Component
 * 
 * Layout wrapper for all dashboard/authenticated pages.
 * Provides:
 * - Sidebar navigation with menu items
 * - Main content area with overflow handling
 * - Premium responsive two-column layout
 * - Metadata for dashboard section
 * 
 * Protected route (in Phase 2, requires authentication)
 */

import type { Metadata } from 'next'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

/** SEO metadata for dashboard pages */
export const metadata: Metadata = {
  title: 'Dashboard | Zewar Desk',
  description: 'Zewar Desk dashboard - manage your jewellery business',
}

/**
 * Dashboard Layout Component
 * 
 * Props:
 *   - children: Pages rendered within dashboard (/dashboard/*)
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <div className="container-custom py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
