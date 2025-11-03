/**
 * Revenue Growth Chart Component
 * Animated line/area chart with growth visualization
 */

'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface RevenueDataPoint {
  date: string
  revenue: number
  forecast?: number
  change: number
}

interface MiniTrendData {
  title: string
  value: string
  trend: number
  data: number[]
  color: string
  isGood: boolean
}

const MOCK_REVENUE_DATA: RevenueDataPoint[] = [
  { date: '10/01', revenue: 6500000, change: 2.1 },
  { date: '10/05', revenue: 6800000, change: 4.6 },
  { date: '10/10', revenue: 7200000, change: 5.9 },
  { date: '10/15', revenue: 7600000, change: 5.6 },
  { date: '10/20', revenue: 7900000, change: 3.9 },
  { date: '10/25', revenue: 8100000, change: 2.5 },
  { date: '10/31', revenue: 8500000, change: 4.9 },
  { date: '11/05', revenue: 0, forecast: 8800000, change: 3.5 },
  { date: '11/10', revenue: 0, forecast: 9200000, change: 4.5 }
]

const MINI_TRENDS: MiniTrendData[] = [
  {
    title: 'Refund Rate',
    value: '2.3%',
    trend: -0.5,
    data: [3.2, 3.0, 2.8, 2.9, 2.6, 2.5, 2.4, 2.3],
    color: '#10B981',
    isGood: true
  },
  {
    title: 'Failed Payments',
    value: '5.1%',
    trend: -1.2,
    data: [6.8, 6.5, 6.2, 5.9, 5.7, 5.5, 5.3, 5.1],
    color: '#F59E0B',
    isGood: true
  },
  {
    title: 'Chargeback Rate',
    value: '0.8%',
    trend: -0.1,
    data: [1.1, 1.0, 0.95, 0.92, 0.89, 0.86, 0.83, 0.8],
    color: '#EF4444',
    isGood: true
  }
]

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
          ₩{(data.revenue / 1000000).toFixed(1)}M
        </p>
        {data.change !== undefined && (
          <p className={`text-xs font-semibold flex items-center gap-1 mt-1 ${
            data.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {data.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {data.change >= 0 ? '+' : ''}{data.change.toFixed(1)}%
          </p>
        )}
      </div>
    )
  }
  return null
}

export const RevenueGrowthChart = memo(function RevenueGrowthChart() {
  const [showForecast, setShowForecast] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            📊 Revenue Growth & Trends
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            실시간 수익 성장 추이 및 예측
          </p>
        </div>
        
        <button
          onClick={() => setShowForecast(!showForecast)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showForecast
              ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          {showForecast ? '예측 ON' : '예측 OFF'}
        </button>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="#6366F1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              className="dark:stroke-gray-500"
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              className="dark:stroke-gray-500"
              tickFormatter={(value) => `₩${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Actual Revenue */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#14B8A6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            
            {/* Forecast */}
            {showForecast && (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                animationDuration={1500}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Trends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MINI_TRENDS.map((trend, index) => (
          <motion.div
            key={trend.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{trend.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{trend.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                trend.isGood
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {trend.trend >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(trend.trend)}%</span>
              </div>
            </div>

            {/* Mini Sparkline */}
            <div className="h-12 flex items-end gap-0.5">
              {trend.data.map((point, idx) => {
                const max = Math.max(...trend.data)
                const min = Math.min(...trend.data)
                const range = max - min || 1
                const height = ((point - min) / range) * 100
                
                return (
                  <div
                    key={idx}
                    className="flex-1 rounded-sm transition-all hover:opacity-70"
                    style={{
                      height: `${Math.max(height, 10)}%`,
                      backgroundColor: trend.color,
                      opacity: 0.7
                    }}
                  />
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
})

