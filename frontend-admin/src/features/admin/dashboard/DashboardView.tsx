/**
 * Dashboard View Component
 * Main dashboard layout and composition
 * Enterprise-grade modular architecture following FSD principles
 */

'use client'

import { memo } from 'react'
import { useDashboardData } from './hooks/useDashboardData'
import {
  KpiCard,
  RevenueChart,
  ActivityList,
  TopMembersList,
  MatchingTrendChart,
  RegionMap,
} from './components'

export const DashboardView = memo(function DashboardView() {
  const { kpis, revenue, activities, topMembers, matchingTrends } = useDashboardData()

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 container-fluid">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">대시보드</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">관리자 대시보드</p>
      </div>

      {/* KPI 4개 : 12컬럼 그리드, 해상도에 맞춰 자동 반응 */}
      <section className="grid grid-cols-12 gap-6 mb-6">
        {kpis.map((kpi, index) => (
          <KpiCard
            key={index}
            {...kpi}
            className="col-span-12 md:col-span-6 xl:col-span-3"
          />
        ))}
      </section>

      {/* 분석 카드들: 화면 가득 채우도록 배치 */}
      <section className="grid grid-cols-12 gap-6">
        {/* 로열티 수익 구성 (도넛차트) */}
        <RevenueChart
          data={revenue}
          className="col-span-12 xl:col-span-6 min-h-[400px]"
        />

        {/* 실시간 사용자 활동 */}
        <ActivityList
          activities={activities}
          className="col-span-12 xl:col-span-3 min-h-[400px]"
        />

        {/* 월등 점수 기준 (우수 회원) */}
        <TopMembersList
          members={topMembers}
          className="col-span-12 xl:col-span-3 min-h-[400px]"
        />

        {/* 지역별 회원 분포 (지도) */}
        <RegionMap className="col-span-12 xl:col-span-6 min-h-[400px]" />

        {/* 월별 매칭 성과 (라인 차트) */}
        <MatchingTrendChart
          data={matchingTrends}
          className="col-span-12 xl:col-span-6 min-h-[400px]"
        />
      </section>
    </div>
  )
})



