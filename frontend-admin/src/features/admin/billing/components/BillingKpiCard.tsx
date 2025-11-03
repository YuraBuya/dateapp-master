/**
 * Billing KPI Card
 */

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Info } from 'lucide-react'

interface BillingKpiCardProps {
  title: string
  value: string | number
  trend: { value: string; isPositive: boolean }
  sparklineData: number[]
  icon: LucideIcon
  color: string
  tooltip?: string
  delay?: number
}

export const BillingKpiCard = memo(function BillingKpiCard({
  title, value, trend, sparklineData, icon: Icon, color, tooltip, delay = 0
}: BillingKpiCardProps) {
  const max = Math.max(...sparklineData)
  const min = Math.min(...sparklineData)
  const range = max - min || 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${color} border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all group`}
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
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
              {tooltip && (
                <div className="relative group/tooltip">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {tooltip}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{trend.value}</span>
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{value}</div>

        <div className="h-12 flex items-end gap-0.5">
          {sparklineData.map((point, index) => {
            const height = ((point - min) / range) * 100
            return (
              <div
                key={index}
                className="flex-1 bg-gray-900/20 dark:bg-white/20 rounded-sm hover:bg-gray-900/40 dark:hover:bg-white/40 transition-colors"
                style={{ height: `${Math.max(height, 10)}%` }}
                title={`${point}`}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
})

