'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden ml-64 lg:ml-64">
        <div className="h-full overflow-auto">
          <div className="pt-4 lg:pt-6 pb-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

