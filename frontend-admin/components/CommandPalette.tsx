"use client";

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Users, 
  Heart, 
  CreditCard, 
  Settings, 
  AlertTriangle,
  FileText,
  ChevronRight
} from 'lucide-react'

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const commands = [
  {
    id: 'members',
    title: '회원 관리',
    description: '회원 정보 및 서류 관리',
    icon: Users,
    href: '/members',
    keywords: ['회원', '사용자', '멤버', 'user', 'member']
  },
  {
    id: 'matching',
    title: '매칭 관리', 
    description: '매칭 현황 모니터링',
    icon: Heart,
    href: '/matching',
    keywords: ['매칭', '매치', 'match', 'matching']
  },
  {
    id: 'payments',
    title: '결제 관리',
    description: '결제 및 환불 처리',
    icon: CreditCard,
    href: '/payments',
    keywords: ['결제', '페이먼트', 'payment', 'billing']
  },
  {
    id: 'reports',
    title: '신고 관리',
    description: '사용자 신고 처리',
    icon: AlertTriangle,
    href: '/reports',
    keywords: ['신고', '리포트', 'report', 'complaint']
  },
  {
    id: 'settings',
    title: '시스템 설정',
    description: '시스템 환경 설정',
    icon: Settings,
    href: '/settings',
    keywords: ['설정', 'setting', 'config', 'system']
  }
]

export default function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
      if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
        }
        if (e.key === 'Enter') {
          e.preventDefault()
          handleSelect(filteredCommands[selectedIndex]?.id)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen, selectedIndex])

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  const handleSelect = (commandId: string) => {
    const command = commands.find(cmd => cmd.id === commandId)
    if (command) {
      router.push(command.href)
      setOpen(false)
      setSearchTerm('')
    }
  }

  const handleItemClick = (commandId: string) => {
    handleSelect(commandId)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          
          {/* Command Palette */}
          <motion.div
            className="fixed top-24 left-1/2 z-50 w-full max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/40 dark:border-gray-700/40 shadow-xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-6 py-4 border-b border-gray-100/60 dark:border-gray-800/60">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-400 to-gray-500 rounded-xl mr-4">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <input
                    className="w-full bg-transparent text-lg font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                    placeholder="빠른 검색 및 내비게이션..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">어디로 가고 싶으신가요?</p>
                </div>
              </div>
              
              {/* Command List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">검색 결과가 없습니다</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">다른 검색어를 시도해보세요</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      페이지 내비게이션
                    </div>
                    <div className="space-y-1">
                      {filteredCommands.map((command, index) => {
                        const Icon = command.icon
                        const isSelected = index === selectedIndex
                        return (
                          <motion.div
                            key={command.id}
                            className={`group flex items-center px-4 py-3 text-sm rounded-xl cursor-pointer transition-all duration-200 ${
                              isSelected ? 'bg-slate-50 dark:bg-slate-800/20 border-l-4 border-slate-400' : 'hover:bg-gray-50/60 dark:hover:bg-gray-800/30'
                            }`}
                            onClick={() => handleItemClick(command.id)}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                          >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 transition-colors ${
                              isSelected ? 'bg-slate-400 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-slate-100 group-hover:text-slate-500'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-semibold transition-colors ${
                                isSelected ? 'text-slate-700 dark:text-slate-200' : 'text-gray-900 dark:text-white group-hover:text-slate-600'
                              }`}>
                                {command.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {command.description}
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 transition-all ${
                              isSelected ? 'text-slate-500 transform translate-x-1' : 'text-gray-400 group-hover:text-slate-500 group-hover:transform group-hover:translate-x-1'
                            }`} />
                          </motion.div>
                        )
                      })}
                    </div>
                    
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6">
                      빠른 작업
                    </div>
                    <div className="space-y-1">
                      <motion.div
                        className="group flex items-center px-4 py-3 text-sm rounded-xl cursor-pointer hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-all duration-200"
                        onClick={() => window.location.reload()}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl mr-4 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            데이터 새로고침
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            최신 데이터로 업데이트
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded font-mono text-xs">↑↓</kbd>
                      <span>이동</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded font-mono text-xs">Enter</kbd>
                      <span>선택</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded font-mono text-xs">Esc</kbd>
                    <span>닫기</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}