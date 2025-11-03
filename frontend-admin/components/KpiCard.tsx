import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line } from 'recharts'

interface KpiCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  color: string
  delay?: number
  sparklineData?: { x: string; y: number }[]
  loading?: boolean
}

export default function KpiCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  trend, 
  color, 
  delay = 0,
  sparklineData = [],
  loading = false
}: KpiCardProps) {
  if (loading) {
    return (
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/60 overflow-hidden hover:shadow-xl hover:shadow-slate-500/5 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
    >
      <div className="p-6 relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`w-full h-full ${color} rounded-full transform translate-x-16 -translate-y-16`}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 group-hover:text-slate-500 transition-colors">
                {title}
              </p>
              <p className="text-4xl font-black text-gray-800 mb-3 group-hover:text-slate-700 transition-colors">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              {subtitle && (
                <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors">
                  {subtitle}
                </p>
              )}
              {trend && (
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                    trend.isPositive 
                      ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border border-rose-200'
                  }`}>
                    <span className={`mr-1 text-base ${
                      trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {trend.isPositive ? '↗️' : '↘️'}
                    </span>
                    {trend.value}
                  </span>
                  <span className="text-xs text-gray-500 ml-3 font-medium">전월 대비</span>
                </div>
              )}
            </div>
            <div className={`relative p-4 rounded-2xl ${color} shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
              <Icon className="w-8 h-8 text-white drop-shadow-sm" />
              {/* Softer Glow Effect */}
              <div className={`absolute inset-0 ${color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Sparkline Chart */}
      {sparklineData.length > 0 && (
        <div className="px-6 pb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 to-gray-50/50 rounded-lg opacity-60"></div>
            <div className="relative h-16 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color.includes('blue') ? '#3b82f6' : 
                                color.includes('green') ? '#10b981' : 
                                color.includes('purple') ? '#8b5cf6' : 
                                color.includes('red') ? '#ef4444' : '#6b7280'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={color.includes('blue') ? '#3b82f6' : 
                                color.includes('green') ? '#10b981' : 
                                color.includes('purple') ? '#8b5cf6' : 
                                color.includes('red') ? '#ef4444' : '#6b7280'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Line 
                    type="monotone" 
                    dataKey="y" 
                    stroke={color.includes('blue') ? '#3b82f6' : 
                            color.includes('green') ? '#10b981' : 
                            color.includes('purple') ? '#8b5cf6' : 
                            color.includes('red') ? '#ef4444' : '#6b7280'}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: '#fff', stroke: color.includes('blue') ? '#3b82f6' : 
                               color.includes('green') ? '#10b981' : 
                               color.includes('purple') ? '#8b5cf6' : 
                               color.includes('red') ? '#ef4444' : '#6b7280', strokeWidth: 2 }}
                    fill={`url(#gradient-${color})`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-medium text-center">최근 7일 데이터 트렌드</p>
        </div>
      )}

      {/* Enhanced Bottom accent line */}
      <motion.div 
        className={`h-2 bg-gradient-to-r ${color.replace('bg-', 'from-').replace('-500', '-400')} to-${color.split('-')[1]}-600 relative overflow-hidden`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}