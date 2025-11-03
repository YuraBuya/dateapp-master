import React, { useState, useEffect } from 'react'
import { Search, Bell, Sun, Moon } from 'lucide-react'
import CommandPalette from './CommandPalette'

interface AdminHeaderProps {
  onSearch?: (query: string) => void
  onRangeChange?: (range: '7d' | '30d' | '90d') => void
}

export default function AdminHeader({ onSearch, onRangeChange }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    // Apply dark mode to document
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    // Add keyboard shortcut for global search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearchClick = () => {
    setCommandPaletteOpen(true)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = e.target.value as '7d' | '30d' | '90d'
    setDateRange(newRange)
    onRangeChange?.(newRange)
  }

  return (
    <>
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Title with gradient */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 via-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
              <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 dark:from-gray-300 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                대시보드
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">실시간 모니터링</p>
            </div>
          </div>

          {/* Right: Enhanced Controls */}
          <div className="flex items-center gap-4">
            {/* Enhanced Global Search */}
            <button
              onClick={handleSearchClick}
              className="group relative flex items-center px-4 py-2.5 w-64 text-sm bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/60 dark:border-gray-700/50 rounded-xl 
                         hover:bg-white/80 hover:shadow-sm dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-300
                         transition-all duration-200 ease-out"
            >
              <Search className="w-4 h-4 mr-3 text-gray-300 group-hover:text-slate-400 transition-colors" />
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                전역 검색
              </span>
              <div className="ml-auto flex items-center space-x-1 text-xs text-gray-400">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">K</kbd>
              </div>
            </button>

            {/* Enhanced Date Range Filter */}
            <div className="relative">
              <select
                className="appearance-none h-10 pl-4 pr-10 text-sm bg-white/70 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-300 shadow-sm hover:shadow-sm
                           transition-all duration-200 cursor-pointer"
                value={dateRange}
                onChange={handleRangeChange}
              >
                <option value="7d">최근 7일</option>
                <option value="30d">최근 30일</option>
                <option value="90d">최근 90일</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Enhanced Control Buttons */}
            <div className="flex items-center space-x-2">
              {/* Notifications Button */}
              <button
                className="relative p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl 
                           hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                           transition-all duration-200 ease-out group"
                title="알림"
              >
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-slate-500 transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>

              {/* Enhanced Dark Mode Toggle */}
              <button
                className="relative p-2.5 bg-white/70 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 rounded-xl 
                           hover:bg-gray-50/80 dark:hover:bg-gray-700/50 hover:shadow-sm hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-slate-400/20 
                           transition-all duration-200 ease-out group"
                onClick={() => {
                  setIsDarkMode(!isDarkMode)
                  document.documentElement.classList.toggle('dark')
                }}
                title={isDarkMode ? '라이트 모드' : '다크 모드'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500 group-hover:text-slate-500 transition-colors" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Command Palette */}
      <CommandPalette open={commandPaletteOpen} setOpen={setCommandPaletteOpen} />
    </>
  )
}