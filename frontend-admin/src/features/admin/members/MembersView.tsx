/**
 * Members Management View
 * Premium admin members management page
 * Enterprise-grade with FSD architecture
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Users, UserPlus, Activity, Crown, CheckCircle, AlertTriangle, Flag } from 'lucide-react'
import { MemberKpiCard, MemberTable, MemberDetailPanel } from './components'
import { MOCK_MEMBERS } from './constants'
import type { Member } from './types'

export function MembersView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync with URL query parameter
  useEffect(() => {
    const memberId = searchParams.get('member')
    if (memberId) {
      const member = MOCK_MEMBERS.find(m => m.id === memberId)
      if (member) {
        setSelectedMember(member)
        setIsPanelOpen(true)
      }
    } else {
      setIsPanelOpen(false)
      setTimeout(() => setSelectedMember(null), 300)
    }
  }, [searchParams])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalMembers = MOCK_MEMBERS.length
    const newSignups = MOCK_MEMBERS.filter(m => {
      const daysSinceJoin = (Date.now() - m.joinDate.getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceJoin <= 7
    }).length
    const activeToday = MOCK_MEMBERS.filter(m => {
      const hoursSinceActive = (Date.now() - m.lastActive.getTime()) / (1000 * 60 * 60)
      return hoursSinceActive <= 24
    }).length
    const premiumSubscribers = MOCK_MEMBERS.filter(m => m.subscriptionTier === 'premium' || m.subscriptionTier === 'vip').length
    const verifiedPercent = Math.round((MOCK_MEMBERS.filter(m => m.verificationStatus === 'verified').length / totalMembers) * 100)
    const flaggedUsers = MOCK_MEMBERS.filter(m => m.flags && m.flags.length > 0).length
    const reportsPending = MOCK_MEMBERS.filter(m => m.reportsCount > 0).length

    return {
      totalMembers,
      newSignups,
      activeToday,
      premiumSubscribers,
      verifiedPercent,
      flaggedUsers,
      reportsPending
    }
  }, [])

  // Generate sparkline data
  const generateSparkline = (baseValue: number) => {
    return Array.from({ length: 12 }, (_, i) => 
      Math.max(0, baseValue + Math.floor(Math.random() * 20) - 10)
    )
  }

  // Filter members
  const filteredMembers = useMemo(() => {
    if (!searchQuery) return MOCK_MEMBERS
    const query = searchQuery.toLowerCase()
    return MOCK_MEMBERS.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.id.toLowerCase().includes(query) ||
      m.city.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleSelectMember = (member: Member) => {
    // Update URL with member ID
    router.push(`/admin/users?member=${member.id}`, { scroll: false })
  }

  const handleClosePanel = () => {
    // Remove member query parameter to close panel
    router.push('/admin/users', { scroll: false })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/40 to-gray-100/30 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Header Section - Neutral Gray/Slate */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">회원 관리</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">모든 회원 데이터를 한눈에 관리하세요</p>
            </div>
            
            {/* Quick Actions */}
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="회원 이름, ID, 지역으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Section - Soft Gradient Blue/Purple */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            <MemberKpiCard
              title="총 회원"
              value={kpis.totalMembers}
              trend={{ value: '+12%', isPositive: true }}
              sparklineData={generateSparkline(kpis.totalMembers)}
              icon={Users}
              color="from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
              delay={0}
            />
            <MemberKpiCard
              title="신규 가입"
              value={kpis.newSignups}
              trend={{ value: '+8%', isPositive: true }}
              sparklineData={generateSparkline(kpis.newSignups)}
              icon={UserPlus}
              color="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
              delay={0.1}
            />
            <MemberKpiCard
              title="오늘 활성"
              value={kpis.activeToday}
              trend={{ value: '+5%', isPositive: true }}
              sparklineData={generateSparkline(kpis.activeToday)}
              icon={Activity}
              color="from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20"
              delay={0.2}
            />
            <MemberKpiCard
              title="프리미엄"
              value={kpis.premiumSubscribers}
              trend={{ value: '+15%', isPositive: true }}
              sparklineData={generateSparkline(kpis.premiumSubscribers)}
              icon={Crown}
              color="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
              delay={0.3}
            />
            <MemberKpiCard
              title="인증률"
              value={`${kpis.verifiedPercent}%`}
              trend={{ value: '+3%', isPositive: true }}
              sparklineData={generateSparkline(kpis.verifiedPercent)}
              icon={CheckCircle}
              color="from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              delay={0.4}
            />
            <MemberKpiCard
              title="경고 회원"
              value={kpis.flaggedUsers}
              trend={{ value: '-2%', isPositive: true }}
              sparklineData={generateSparkline(kpis.flaggedUsers)}
              icon={AlertTriangle}
              color="from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20"
              delay={0.5}
            />
            <MemberKpiCard
              title="신고 대기"
              value={kpis.reportsPending}
              trend={{ value: '+1', isPositive: false }}
              sparklineData={generateSparkline(kpis.reportsPending)}
              icon={Flag}
              color="from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
              delay={0.6}
            />
          </div>
        </motion.section>

        {/* Main Table Section - White / Light Background */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MemberTable
            members={filteredMembers}
            onSelectMember={handleSelectMember}
            selectedMemberId={selectedMember?.id}
          />
        </motion.section>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            총 <span className="font-semibold">{filteredMembers.length}</span>명의 회원
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              이전
            </button>
            <button className="px-3 py-2 rounded-lg bg-purple-600 text-white font-medium">1</button>
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">2</button>
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">3</button>
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              다음
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detail Panel - Soft Pink/Amber accent */}
      <MemberDetailPanel
        member={selectedMember}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  )
}

