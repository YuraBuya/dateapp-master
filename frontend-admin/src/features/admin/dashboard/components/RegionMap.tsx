/**
 * Region Map Component
 * Displays regional member distribution
 */

import { memo } from 'react'
import { MapPin } from 'lucide-react'
import { Card, CardTitle } from './Card'

interface RegionMapProps {
  className?: string
}

export const RegionMap = memo(function RegionMap({ className }: RegionMapProps) {
  return (
    <Card className={className}>
      <CardTitle>지역별 회원 분포</CardTitle>
      <div className="h-[300px] rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-blue-400/30 absolute top-10 left-20" />
          <MapPin className="w-12 h-12 text-purple-400/30 absolute top-20 right-24" />
          <MapPin className="w-20 h-20 text-pink-400/30 absolute bottom-16 left-32" />
          <MapPin className="w-14 h-14 text-cyan-400/30 absolute bottom-20 right-20" />
        </div>
        <div className="text-center z-10">
          <p className="text-sm text-gray-500 dark:text-gray-400">지역별 회원 현황</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">실제 지도 데이터를 데이터베이스 메타데이터</p>
        </div>
      </div>
    </Card>
  )
})



