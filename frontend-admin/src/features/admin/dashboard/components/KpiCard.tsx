/**
 * KPI Card Component
 * Reusable KPI metric display card
 */

import { memo } from 'react'
import { KpiMetric } from '../types'
import { TONE_MAP, ICON_COLOR_MAP } from '../constants'

interface KpiCardProps extends KpiMetric {
  className?: string
}

export const KpiCard = memo(function KpiCard({
  title,
  value,
  delta,
  tone = 'slate',
  className = '',
  icon,
}: KpiCardProps) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border bg-gradient-to-r ${TONE_MAP[tone]} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500 dark:text-gray-400 text-sm">{title}</div>
        {icon && (
          <div className={ICON_COLOR_MAP[tone]}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{delta}</div>
    </div>
  )
})



