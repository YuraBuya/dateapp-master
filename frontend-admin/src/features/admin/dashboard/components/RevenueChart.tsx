/**
 * Revenue Chart Component
 * Displays revenue composition as a donut chart
 */

import { memo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardTitle } from './Card'
import { RevenueData } from '../types'

interface RevenueChartProps {
  data: RevenueData[]
  className?: string
}

export const RevenueChart = memo(function RevenueChart({ data, className }: RevenueChartProps) {
  return (
    <Card className={className}>
      <CardTitle>로열티 수익 구성</CardTitle>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">₩{item.value}M</span>
          </div>
        ))}
      </div>
    </Card>
  )
})



