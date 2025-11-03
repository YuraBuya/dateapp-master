/**
 * Matching View Component
 * Main view for matching management with detail panel
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  MessageCircle,
  MoreVertical
} from 'lucide-react'
import { MatchingDetailPanel } from './components'
import { MOCK_MATCHINGS } from './constants'
import type { Matching } from './types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function MatchingView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedMatching, setSelectedMatching] = useState<Matching | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync with URL query parameter
  useEffect(() => {
    const matchingId = searchParams.get('matching')
    if (matchingId) {
      const matching = MOCK_MATCHINGS.find(m => m.id === matchingId)
      if (matching) {
        setSelectedMatching(matching)
        setIsPanelOpen(true)
      }
    } else {
      setIsPanelOpen(false)
      setTimeout(() => setSelectedMatching(null), 300)
    }
  }, [searchParams])

  const handleSelectMatching = (matching: Matching) => {
    router.push(`/admin/matching?matching=${matching.id}`, { scroll: false })
  }

  const handleClosePanel = () => {
    router.push('/admin/matching', { scroll: false })
  }

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'matched': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      case 'cancelled': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return '성공'
      case 'matched': return '매칭됨'
      case 'pending': return '대기중'
      case 'cancelled': return '취소됨'
      default: return status
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'meeting': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
      case 'conversation': return 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/30'
      case 'initial': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'meeting': return '만남'
      case 'conversation': return '대화중'
      case 'initial': return '초기'
      default: return stage
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 80) return 'text-blue-600 dark:text-blue-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-orange-600 dark:text-orange-400'
  }

  // Generate sparkline data
  const generateSparkline = (baseValue: number) => {
    return Array.from({ length: 12 }, (_, i) => 
      Math.max(0, baseValue + Math.floor(Math.random() * 20) - 10)
    )
  }

  // KPI Card Component
  const KpiCard = ({ title, value, trend, icon: Icon, color, sparklineData, delay = 0 }: any) => {
    const max = Math.max(...sparklineData)
    const min = Math.min(...sparklineData)
    const range = max - min || 1

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${color} border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full bg-white dark:bg-black rounded-full transform translate-x-16 -translate-y-16"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
            </div>
            
            <div className={`flex items-center gap-1 text-xs font-semibold ${
              trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
          </div>

          <div className="h-12 flex items-end gap-0.5">
            {sparklineData.map((point: number, index: number) => {
              const height = ((point - min) / range) * 100
              return (
                <div
                  key={index}
                  className="flex-1 bg-gray-900/20 dark:bg-white/20 rounded-sm hover:bg-gray-900/40 dark:hover:bg-white/40 transition-colors"
                  style={{ height: `${Math.max(height, 10)}%` }}
                />
              )
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/40 to-gray-100/30 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        {/* Header Section */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">매칭 관리</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">회원간의 매칭 현황을 모니터링하고 관리하세요</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                  <Filter className="w-4 h-4" />
                  필터
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium transition-all shadow-md hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  내보내기
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="매칭 ID, 회원 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard
                title="총 매칭"
                value="1,247"
                trend={{ value: '+15%', isPositive: true }}
                icon={Heart}
                color="from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20"
                sparklineData={generateSparkline(1247)}
                delay={0}
              />
              <KpiCard
                title="성공률"
                value="73%"
                trend={{ value: '+2%', isPositive: true }}
                icon={TrendingUp}
                color="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                sparklineData={generateSparkline(73)}
                delay={0.1}
              />
              <KpiCard
                title="활성 대화"
                value="342"
                trend={{ value: '+8%', isPositive: true }}
                icon={Users}
                color="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                sparklineData={generateSparkline(342)}
                delay={0.2}
              />
              <KpiCard
                title="실제 만남"
                value="89"
                trend={{ value: '+12%', isPositive: true }}
                icon={Calendar}
                color="from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
                sparklineData={generateSparkline(89)}
                delay={0.3}
              />
            </div>
          </motion.section>

          {/* Table Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">매칭 ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">회원 1</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">회원 2</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">매칭 점수</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">상태</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">단계</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">메시지</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">매칭일</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_MATCHINGS.map((match, index) => (
                      <motion.tr
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => handleSelectMatching(match)}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{match.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{match.user1.avatar}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{match.user1.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{match.user1.age}세</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{match.user2.avatar}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{match.user2.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{match.user2.age}세</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${getScoreColor(match.score)}`}>{match.score}%</span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  match.score >= 90 ? 'bg-green-500' :
                                  match.score >= 80 ? 'bg-blue-500' :
                                  match.score >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${match.score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                            {getStatusText(match.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(match.stage)}`}>
                            {getStageText(match.stage)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>{match.messagesCount}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {format(match.matchDate, 'yyyy-MM-dd', { locale: ko })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectMatching(match)
                              }}
                              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-between"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              총 <span className="font-semibold">{MOCK_MATCHINGS.length}</span>개의 매칭
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                이전
              </button>
              <button className="px-3 py-2 rounded-lg bg-purple-600 text-white font-medium">1</button>
              <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                다음
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detail Panel */}
      <MatchingDetailPanel
        matching={selectedMatching}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  )
}

