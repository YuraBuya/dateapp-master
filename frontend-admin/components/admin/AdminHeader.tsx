'use client'

import { motion } from 'framer-motion'
import { Search, Bell, Settings, Sparkles, Users, Heart, TrendingUp } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

interface AdminHeaderProps {
  stats?: {
    totalUsers?: number
    activeMatches?: number
    growthRate?: number
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
}

export function AdminHeader({ stats }: AdminHeaderProps) {
  return (
    <motion.header 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-400 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-bold text-gray-900 dark:text-white">언니의 소개</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</span>
            </div>
          </div>

          {/* Center: Quick Stats */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{stats?.totalUsers || 0}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{stats?.activeMatches || 0}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">+{stats?.growthRate || 0}%</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button 
              aria-label="Search" 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button 
              aria-label="Notifications" 
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <ThemeToggle />

            <button 
              aria-label="Settings" 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AD</span>
                </div>
                <div className="hidden lg:flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Admin</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">관리자</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

