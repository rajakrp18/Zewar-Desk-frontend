import type { Metadata } from 'next'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

export const metadata: Metadata = {
  title: 'Dashboard | Zewar Desk',
  description: 'Zewar Desk dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
