/**
 * Top Members List Component
 * Displays top-performing members
 */

import { memo } from 'react'
import { Card, CardTitle } from './Card'
import { TopMember } from '../types'

interface TopMembersListProps {
  members: TopMember[]
  className?: string
}

export const TopMembersList = memo(function TopMembersList({ members, className }: TopMembersListProps) {
  return (
    <Card className={className}>
      <CardTitle>월등 점수 기준</CardTitle>
      <div className="space-y-4">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                👤
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{member.score}점 기준</div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${member.badgeColor}`}>
              {member.badge}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
})



