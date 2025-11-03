'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminAuthStore } from '../stores/useAdminAuthStore'
import { useAdminDashboardStore } from '../stores/useAdminDashboardStore'
import Sidebar from './admin/Sidebar'
import AdminHeader from './AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
  title?: string
}

export default function AdminLayout({ children, title = '관리자 패널' }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { admin, signOut, isSessionValid } = useAdminAuthStore()
  const { 
    notifications, 
    refreshData, 
    autoRefresh, 
    setAutoRefresh,
    lastUpdated 
  } = useAdminDashboardStore()

  // localStorage에서 사이드바 상태 로드
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved) {
        setSidebarCollapsed(JSON.parse(saved))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // 주기적으로 localStorage 확인 (같은 탭에서의 변경 감지)
    const interval = setInterval(handleStorageChange, 100)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // Check session validity
    if (!isSessionValid()) {
      signOut()
      // For App Router, redirect logic would be handled differently
      // router.push('/login')
      return
    }

    // Auto refresh setup
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(refreshData, 30000) // Refresh every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, isSessionValid, signOut, refreshData])

  const handleSearch = (query: string) => {
    console.log('Global search:', query)
    // Implement global search logic here
    // Could search across users, transactions, reports, etc.
  }

  const handleDateRangeChange = (range: '7d' | '30d' | '90d') => {
    console.log('Date range changed:', range)
    // Implement date range filtering logic here
    // Update dashboard data based on selected range
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* New Redesigned Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Enhanced Admin Header */}
        <AdminHeader 
          onSearch={handleSearch}
          onRangeChange={handleDateRangeChange}
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}