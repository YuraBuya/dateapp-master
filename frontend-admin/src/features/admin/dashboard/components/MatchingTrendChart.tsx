/**
 * Matching Trend Chart Component
 * Displays monthly matching performance trends
 */

import { memo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardTitle } from './Card'
import { MatchingDataPoint } from '../types'

interface MatchingTrendChartProps {
  data: MatchingDataPoint[]
  className?: string
}

export const MatchingTrendChart = memo(function MatchingTrendChart({ data, className }: MatchingTrendChartProps) {
  return (
    <Card className={className}>
      <CardTitle>월별 매칭 성과</CardTitle>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line 
              type="monotone" 
              dataKey="성공" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="진행중" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ fill: '#ec4899', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
})



