/**
 * Member Summary Strip
 * Sticky header with key KPIs and risk score
 */

'use client'

import { memo } from 'react'
import { X, Shield, AlertTriangle } from 'lucide-react'
import type { Member } from '../../types'
import { TIER_COLORS, RISK_COLORS, STATUS_COLORS } from '../../constants'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MemberSummaryStripProps {
  member: Member
  onClose: () => void
}

export const MemberSummaryStrip = memo(function MemberSummaryStrip({
  member,
  onClose
}: MemberSummaryStripProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-500'
    if (score >= 50) return 'text-amber-500'
    return 'text-green-500'
  }

  const getRiskRingColor = (score: number) => {
    if (score >= 80) return 'stroke-red-500'
    if (score >= 50) return 'stroke-amber-500'
    return 'stroke-green-500'
  }

  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b-4 border-l-4 border-purple-500 shadow-lg">
      <div className="px-4 pt-3 pb-2">
        {/* Header Row - Compact */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar with animated risk ring - Smaller */}
            <div className="relative">
              <svg className="absolute -inset-0.5 w-14 h-14 animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={getRiskRingColor(member.riskScore)}
                  strokeDasharray={`${(member.riskScore / 100) * 283} 283`}
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                {member.name[0]}
              </div>
            </div>

            {/* Name & ID - Compact */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{member.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">#{member.id}</p>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${TIER_COLORS[member.subscriptionTier]}`}>
                  {member.subscriptionTier.toUpperCase()}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${STATUS_COLORS[member.status]}`}>
                  {member.status === 'active' ? '활성' : member.status === 'suspended' ? '정지' : member.status === 'flagged' ? '경고' : '비활성'}
                </span>
                {member.verificationStatus === 'verified' && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <Shield className="w-2.5 h-2.5" />
                    인증
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Close Button - Compact */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Compact KPI Cards - Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* Risk Score Card with Animated Progress Ring */}
          <div className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm min-w-[140px]">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className={getRiskRingColor(member.riskScore)}
                  strokeDasharray={`${(member.riskScore / 100) * 100} 100`}
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{member.riskScore}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className={`text-sm font-bold ${getRiskColor(member.riskScore)} leading-tight`}>
                {member.riskScore >= 80 ? '🔴 높음' : member.riskScore >= 50 ? '🟡 중간' : '🟢 낮음'}
              </div>
              <div className="text-[11px] text-gray-600 dark:text-gray-400">위험도</div>
            </div>
          </div>

          {/* Matches Card */}
          <div className="flex-shrink-0 text-center px-3 py-2 rounded-lg bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm min-w-[85px]">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 leading-tight">{member.matchesCount}</div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">매칭</div>
          </div>

          {/* Messages Card */}
          <div className="flex-shrink-0 text-center px-3 py-2 rounded-lg bg-purple-50/80 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 shadow-sm min-w-[85px]">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 leading-tight">{member.messagesLast30d || 0}</div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">메시지</div>
          </div>

          {/* Reports Card */}
          <div className="flex-shrink-0 text-center px-3 py-2 rounded-lg bg-red-50/80 dark:bg-red-900/20 border border-red-100 dark:border-red-800 shadow-sm min-w-[85px]">
            <div className="text-xl font-bold text-red-600 dark:text-red-400 leading-tight">{member.reportsCount}</div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">신고</div>
          </div>

          {/* Last Active Card */}
          <div className="flex-shrink-0 text-center px-3 py-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shadow-sm min-w-[85px]">
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">{format(member.lastActive, 'MM/dd', { locale: ko })}</div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">활동</div>
          </div>
        </div>
      </div>

      {/* Elegant Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
    </div>
  )
})

