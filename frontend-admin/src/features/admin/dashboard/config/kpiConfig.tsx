/**
 * KPI Configuration
 * Icon definitions for KPI cards
 */

import { Users, Heart, Building2, MapPin } from 'lucide-react'
import { KpiMetric } from '../types'

export const KPI_CONFIG: Omit<KpiMetric, 'icon'>[] = [
  {
    title: '총 회원수',
    value: '2,347',
    delta: '+12% from last month',
    tone: 'slate' as const,
  },
  {
    title: '성공 매칭',
    value: '1,284',
    delta: '+8% from last month',
    tone: 'cyan' as const,
  },
  {
    title: '월 매출',
    value: '₩45M',
    delta: '+15% from last month',
    tone: 'amber' as const,
  },
  {
    title: '월별 사용자',
    value: '1,892',
    delta: '+5% from last month',
    tone: 'emerald' as const,
  },
]

export const KPI_ICONS = [
  <Users key="users" className="w-5 h-5" />,
  <Heart key="heart" className="w-5 h-5" />,
  <Building2 key="building" className="w-5 h-5" />,
  <MapPin key="mappin" className="w-5 h-5" />,
]



