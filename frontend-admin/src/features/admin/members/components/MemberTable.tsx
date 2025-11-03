/**
 * Member Table Component
 * Sortable, paginated table with member list
 */

'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, MoreVertical, Eye, Ban, Mail } from 'lucide-react'
import type { Member } from '../types'
import { TIER_COLORS, RISK_COLORS, STATUS_COLORS, VERIFICATION_COLORS } from '../constants'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MemberTableProps {
  members: Member[]
  onSelectMember: (member: Member) => void
  selectedMemberId?: string
}

export const MemberTable = memo(function MemberTable({
  members,
  onSelectMember,
  selectedMemberId
}: MemberTableProps) {
  const [sortBy, setSortBy] = useState<string>('lastActive')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600 dark:text-green-400'
    if (score < 60) return 'text-yellow-600 dark:text-yellow-400'
    if (score < 80) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left"></th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  ID
                  {sortBy === 'id' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  이름
                  {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">나이</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">성별</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">지역</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">등급</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">인증</th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => handleSort('lastActive')}
              >
                <div className="flex items-center gap-1">
                  최근 활동
                  {sortBy === 'lastActive' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">매칭</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">신고</th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => handleSort('riskScore')}
              >
                <div className="flex items-center gap-1">
                  위험도
                  {sortBy === 'riskScore' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">작업</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <motion.tr
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
                  selectedMemberId === member.id ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                }`}
                onClick={() => onSelectMember(member)}
              >
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {member.name[0]}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{member.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{member.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{member.age}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{member.gender === 'male' ? '남성' : '여성'}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{member.city}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${TIER_COLORS[member.subscriptionTier]}`}>
                    {member.subscriptionTier.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${VERIFICATION_COLORS[member.verificationStatus]}`}>
                    {member.verificationStatus === 'verified' ? '✓' : '⏳'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatDistanceToNow(member.lastActive, { addSuffix: true, locale: ko })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">{member.matchesCount}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${member.reportsCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}>
                    {member.reportsCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${getRiskScoreColor(member.riskScore)}`}>
                    {member.riskScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={(e) => { e.stopPropagation(); onSelectMember(member); }}
                    >
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

