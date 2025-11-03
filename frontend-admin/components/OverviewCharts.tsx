import React from 'react'
import { motion } from 'framer-motion'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar,
  Legend
} from 'recharts'

// Sample time series data
const timeSeriesData = [
  { date: '09-01', signup: 12, active: 100, match: 18, revenue: 120000 },
  { date: '09-02', signup: 18, active: 120, match: 20, revenue: 150000 },
  { date: '09-03', signup: 22, active: 135, match: 25, revenue: 180000 },
  { date: '09-04', signup: 20, active: 140, match: 26, revenue: 160000 },
  { date: '09-05', signup: 28, active: 152, match: 30, revenue: 210000 },
  { date: '09-06', signup: 24, active: 160, match: 29, revenue: 190000 },
  { date: '09-07', signup: 26, active: 172, match: 31, revenue: 220000 },
]

interface OverviewChartsProps {
  data?: typeof timeSeriesData
}

export default function OverviewCharts({ data = timeSeriesData }: OverviewChartsProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* User Metrics Chart */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -4 }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                가입/활성/매칭 추이
              </h3>
              <p className="text-sm text-gray-400 mt-1">사용자 활동 지표 모니터링</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
              <span className="text-xs text-gray-400">최근 7일</span>
            </div>
          </div>
          <div className="h-80 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-gray-50/30 rounded-xl"></div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(8px)'
                  }}
                  labelStyle={{ color: '#374151', fontWeight: 600 }}
                  cursor={{ strokeDasharray: '5 5', stroke: '#6366f1', strokeWidth: 2 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="signup" 
                  stroke="#64748b" 
                  strokeWidth={3}
                  dot={{ fill: '#64748b', strokeWidth: 3, r: 6, stroke: '#fff' }}
                  activeDot={{ r: 8, stroke: '#64748b', strokeWidth: 2, fill: '#fff' }}
                  name="신규가입"
                  fill="url(#blueGradient)"
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 3, r: 6, stroke: '#fff' }}
                  activeDot={{ r: 8, stroke: '#059669', strokeWidth: 2, fill: '#fff' }}
                  name="활성사용자"
                  fill="url(#greenGradient)"
                />
                <Line 
                  type="monotone" 
                  dataKey="match" 
                  stroke="#e11d48" 
                  strokeWidth={3}
                  dot={{ fill: '#e11d48', strokeWidth: 3, r: 6, stroke: '#fff' }}
                  activeDot={{ r: 8, stroke: '#e11d48', strokeWidth: 2, fill: '#fff' }}
                  name="매칭성사"
                  fill="url(#purpleGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -4 }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                일별 매출
              </h3>
              <p className="text-sm text-gray-400 mt-1">매출 성과 및 트렌드 분석</p>
            </div>
            <div className="text-sm text-gray-400 bg-amber-50/60 px-3 py-1 rounded-full">단위: 만원</div>
          </div>
          <div className="h-80 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30 rounded-xl"></div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(8px)'
                  }}
                  labelStyle={{ color: '#374151', fontWeight: 600 }}
                  formatter={(value: number) => [`${(value / 10000).toFixed(1)}만원`, '매출']}
                  cursor={{ fill: 'rgba(245, 158, 11, 0.1)', radius: 8 }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#revenueGradient)"
                  radius={[8, 8, 0, 0]}
                  name="매출"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Conversion Funnel */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 xl:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -4 }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-500 to-gray-500 bg-clip-text text-transparent">
                전환 퍼널 분석
              </h3>
              <p className="text-sm text-gray-400 mt-1">사용자 여정별 전환율 모니터링</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50/60 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 font-medium">이번 주</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[
              { title: '방문자', value: 1250, color: 'from-slate-400 to-slate-500', percentage: 100, icon: '👥' },
              { title: '회원가입', value: 425, color: 'from-emerald-400 to-emerald-500', percentage: 34, icon: '✍️' },
              { title: '프로필 완성', value: 198, color: 'from-rose-400 to-rose-500', percentage: 47, icon: '📝' },
              { title: '첫 매칭', value: 89, color: 'from-amber-400 to-amber-500', percentage: 45, icon: '💖' }
            ].map((step, index) => (
              <motion.div 
                key={step.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`relative p-6 bg-gradient-to-br ${step.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <div className="text-3xl font-black text-white">{step.value.toLocaleString()}</div>
                    <div className="text-sm text-white/80 font-medium mt-1">{step.title}</div>
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity -z-10`}></div>
                </div>
                <div className="relative">
                  <div className={`text-2xl font-bold ${index === 0 ? 'text-gray-500' : 'text-emerald-600'} mb-1`}>
                    {step.percentage}%
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {index === 0 ? '기준점' : '전단계 대비'}
                  </div>
                  {/* Progress bar for conversion */}
                  {index > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={`h-2 bg-gradient-to-r ${step.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${step.percentage}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* Arrow between steps */}
                {index < 3 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}