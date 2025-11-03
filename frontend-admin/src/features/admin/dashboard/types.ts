/**
 * Dashboard Types
 * Enterprise-grade type definitions for admin dashboard
 */

export interface KpiMetric {
  title: string
  value: string
  delta: string
  tone: 'slate' | 'emerald' | 'cyan' | 'amber'
  icon?: React.ReactNode
}

export interface RevenueData {
  name: string
  value: number
  color: string
}

export interface ActivityItem {
  id: number
  action: string
  count: number
  icon: string
}

export interface TopMember {
  id: number
  name: string
  score: number
  badge: string
  badgeColor: string
}

export interface MatchingDataPoint {
  month: string
  성공: number
  진행중: number
}

export interface DashboardData {
  kpis: KpiMetric[]
  revenue: RevenueData[]
  activities: ActivityItem[]
  topMembers: TopMember[]
  matchingTrends: MatchingDataPoint[]
}



