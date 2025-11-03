'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Heart, 
  CreditCard, 
  TrendingUp,
  UserPlus,
  Activity,
  DollarSign,
  AlertCircle,
  Search,
  Bell,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'
import { useAdminDashboardStore } from '../stores/useAdminDashboardStore'
import KpiCard from './KpiCard'
import OverviewCharts from './OverviewCharts'
import { ThemeToggle } from './ThemeToggle'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
}

export default function Dashboard() {
  const { stats, isLoading, fetchStats, fetchNotifications } = useAdminDashboardStore()

  // Sample sparkline data for KPI cards
  const generateSparklineData = (baseValue: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
      x: `Day ${i + 1}`,
      y: baseValue + Math.floor(Math.random() * 20) - 10
    }))
  }

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchStats()
    fetchNotifications()
  }, [])

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // stats가 없을 경우 처리 (추가 안전장치)
  if (!stats) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50/80 via-slate-50/40 to-gray-100/30 dark:from-gray-900 dark:via-gray-950 dark:to-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Title Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-slate-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                대시보드
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                언니의 소개 서비스 현황을 실시간으로 모니터링하세요
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Activity className="w-4 h-4" />
              <span>실시간 업데이트</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Stats Bar */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '전체 사용자', value: stats.totalUsers, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-50/60 dark:bg-slate-900/20' },
            { label: '오늘 신규가입', value: stats.newSignupsToday, color: 'text-emerald-600', bgColor: 'bg-emerald-50/60' },
            { label: '성공 매칭', value: stats.successfulMatches, color: 'text-rose-600', bgColor: 'bg-rose-50/60' },
            { label: '월 매출', value: `${(stats.monthlyRevenue / 10000).toFixed(0)}만`, color: 'text-amber-600', bgColor: 'bg-amber-50/60' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.bgColor} rounded-xl p-4 text-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* KPI Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
        <KpiCard
          icon={Users}
          title="전체 회원 수"
          value={stats.totalUsers}
          subtitle="가입 완료된 전체 회원"
          trend={{
            value: "12%",
            isPositive: true
          }}
          color="bg-blue-500"
          delay={0}
          sparklineData={generateSparklineData(stats.totalUsers - 50)}
        />
        
        <KpiCard
          icon={Activity}
          title="활성 회원 수"
          value={stats.activeUsers}
          subtitle="최근 30일 내 활동"
          trend={{
            value: "8%",
            isPositive: true
          }}
          color="bg-green-500"
          delay={0.1}
          sparklineData={generateSparklineData(stats.activeUsers - 20)}
        />
        
        <KpiCard
          icon={Heart}
          title="성공 매칭"
          value={stats.successfulMatches}
          subtitle="이번 달 성사된 매칭"
          trend={{
            value: "15%",
            isPositive: true
          }}
          color="bg-pink-500"
          delay={0.2}
          sparklineData={generateSparklineData(stats.successfulMatches - 5)}
        />
        
        <KpiCard
          icon={DollarSign}
          title="월 수익"
          value={`${(stats.monthlyRevenue / 10000).toFixed(0)}만원`}
          subtitle="이번 달 총 수익"
          trend={{
            value: "22%",
            isPositive: true
          }}
          color="bg-purple-500"
          delay={0.3}
          sparklineData={generateSparklineData(Math.floor(stats.monthlyRevenue / 1000))}
        />
        </motion.div>

        {/* Analytics Charts Section */}
        <motion.div
          variants={itemVariants}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            분석 차트
          </h2>
          <OverviewCharts />
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
        <KpiCard
          icon={UserPlus}
          title="신규 가입"
          value={stats.newSignupsToday}
          subtitle="오늘 신규 가입자"
          color="bg-indigo-500"
          delay={0.4}
          sparklineData={generateSparklineData(stats.newSignupsToday)}
        />
        
        <KpiCard
          icon={TrendingUp}
          title="활성 매칭"
          value={stats.activeMatchesToday}
          subtitle="진행 중인 매칭"
          color="bg-emerald-500"
          delay={0.5}
          sparklineData={generateSparklineData(stats.activeMatchesToday)}
        />
        
        <KpiCard
          icon={CreditCard}
          title="오늘 결제"
          value={stats.completedPaymentsToday}
          subtitle="완료된 결제 건수"
          color="bg-violet-500"
          delay={0.6}
          sparklineData={generateSparklineData(stats.completedPaymentsToday)}
        />
        
        <KpiCard
          icon={AlertCircle}
          title="대기 중인 검토"
          value={stats.pendingVerifications}
          subtitle="서류 검토 대기"
          color="bg-orange-500"
          delay={0.7}
          sparklineData={generateSparklineData(stats.pendingVerifications)}
        />
        </motion.div>

        {/* Quick Actions - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-8">
            빠른 작업
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '서류 검토',
              description: '대기 중인 회원 서류를 검토하세요',
              icon: '📝',
              color: 'from-slate-400 to-slate-500',
              hoverColor: 'hover:from-slate-500 hover:to-slate-600'
            },
            {
              title: '매칭 승인',
              description: '새로운 매칭 요청을 확인하세요',
              icon: '❤️',
              color: 'from-emerald-400 to-emerald-500',
              hoverColor: 'hover:from-emerald-500 hover:to-emerald-600'
            },
            {
              title: '신고 처리',
              description: '사용자 신고를 검토하고 처리하세요',
              icon: '⚠️',
              color: 'from-rose-400 to-rose-500',
              hoverColor: 'hover:from-rose-500 hover:to-rose-600'
            }
          ].map((action, index) => (
            <motion.button
              key={action.title}
              className={`group relative p-8 bg-gradient-to-br ${action.color} ${action.hoverColor} rounded-2xl text-left shadow-xl hover:shadow-2xl transition-all duration-500 text-white overflow-hidden`}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-white transition-colors">
                  {action.title}
                </h3>
                <p className="text-white/90 group-hover:text-white transition-colors leading-relaxed">
                  {action.description}
                </p>
              </div>
              
              {/* Softer Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
              
              {/* Arrow Icon */}
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
        </motion.div>
      </div>
    </motion.div>
  )
}