/**
 * Dashboard Constants
 * Static data and configuration for dashboard
 */

import { RevenueData, ActivityItem, TopMember, MatchingDataPoint } from './types'

// 로열티 수익 구성 데이터
export const REVENUE_DATA: RevenueData[] = [
  { name: '베이직', value: 15.0, color: '#3b82f6' },
  { name: '프리미엄', value: 13.0, color: '#ec4899' },
  { name: 'VIP', value: 17.0, color: '#a855f7' },
]

// 실시간 사용자 활동
export const ACTIVITY_DATA: ActivityItem[] = [
  { id: 1, action: '새 프로필 등록', count: 47, icon: '👤' },
  { id: 2, action: '매칭시 교환', count: 1284, icon: '💬' },
  { id: 3, action: '선호 보내기', count: 89, icon: '📦' },
  { id: 4, action: '프리미엄 업그레이드', count: 23, icon: '⚡' },
]

// 우수 회원
export const TOP_MEMBERS_DATA: TopMember[] = [
  { id: 1, name: '김민수', score: 95, badge: 'Premium', badgeColor: 'bg-blue-500' },
  { id: 2, name: '이영희', score: 92, badge: 'VIP', badgeColor: 'bg-purple-500' },
  { id: 3, name: '박철수', score: 88, badge: 'Basic', badgeColor: 'bg-gray-500' },
]

// 월별 매칭 성과 데이터
export const MATCHING_TREND_DATA: MatchingDataPoint[] = [
  { month: '1월', 성공: 130, 진행중: 95 },
  { month: '2월', 성공: 145, 진행중: 110 },
  { month: '3월', 성공: 165, 진행중: 125 },
  { month: '4월', 성공: 180, 진행중: 135 },
  { month: '5월', 성공: 210, 진행중: 155 },
  { month: '6월', 성공: 240, 진행중: 180 },
]

// KPI tone 색상 매핑
export const TONE_MAP: Record<string, string> = {
  slate:   "from-slate-50 via-white to-slate-50 border-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 dark:border-slate-700",
  emerald: "from-emerald-50 via-white to-emerald-50 border-emerald-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900 dark:border-emerald-700",
  cyan:    "from-cyan-50 via-white to-cyan-50 border-cyan-100 dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-900 dark:border-cyan-700",
  amber:   "from-amber-50 via-white to-amber-50 border-amber-100 dark:from-amber-900 dark:via-amber-800 dark:to-amber-900 dark:border-amber-700",
}

// KPI 아이콘 색상 매핑
export const ICON_COLOR_MAP: Record<string, string> = {
  slate:   "text-slate-600 dark:text-slate-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  cyan:    "text-cyan-600 dark:text-cyan-400",
  amber:   "text-amber-600 dark:text-amber-400",
}



