/**
 * Activity List Component
 * Displays real-time user activities
 */

import { memo } from 'react'
import { Card, CardTitle } from './Card'
import { ActivityItem } from '../types'

interface ActivityListProps {
  activities: ActivityItem[]
  className?: string
}

export const ActivityList = memo(function ActivityList({ activities, className }: ActivityListProps) {
  return (
    <Card className={className}>
      <CardTitle>실시간 사용자 활동</CardTitle>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activity.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{activity.action}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{activity.count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
})



