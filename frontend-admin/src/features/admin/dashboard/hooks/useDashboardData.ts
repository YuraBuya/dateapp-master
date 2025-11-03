/**
 * Dashboard Data Hook
 * Custom hook for managing dashboard data
 * In production, this would fetch from API
 */

import { useMemo } from 'react'
import { DashboardData } from '../types'
import { REVENUE_DATA, ACTIVITY_DATA, TOP_MEMBERS_DATA, MATCHING_TREND_DATA } from '../constants'
import { KPI_CONFIG, KPI_ICONS } from '../config/kpiConfig'

export function useDashboardData(): DashboardData {
  return useMemo(() => ({
    kpis: KPI_CONFIG.map((kpi, index) => ({
      ...kpi,
      icon: KPI_ICONS[index],
    })),
    revenue: REVENUE_DATA,
    activities: ACTIVITY_DATA,
    topMembers: TOP_MEMBERS_DATA,
    matchingTrends: MATCHING_TREND_DATA,
  }), [])
}

