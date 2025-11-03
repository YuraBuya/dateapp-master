'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Mock stats - 실제로는 API에서 가져와야 함
  const stats = {
    totalUsers: 1247,
    activeMatches: 342,
    growthRate: 12
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden ml-64 lg:ml-64">
        <div className="h-full overflow-auto">
          {/* Admin Header - Fixed at top */}
          <AdminHeader stats={stats} />
          
          {/* Page Content */}
          <div className="pb-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

