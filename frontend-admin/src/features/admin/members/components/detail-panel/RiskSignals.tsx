/**
 * Risk & Signals Panel
 * Display automated risk flags and recommendations
 */

'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import type { RiskSignal } from '../../types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface RiskSignalsProps {
  signals: RiskSignal[]
}

const severityColors = {
  low: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
  medium: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300',
  high: 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300',
  critical: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
}

const severityBadges = {
  low: 'bg-blue-500 text-white',
  medium: 'bg-amber-500 text-white',
  high: 'bg-orange-500 text-white',
  critical: 'bg-red-500 text-white'
}

export const RiskSignals = memo(function RiskSignals({ signals }: RiskSignalsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (signals.length === 0) {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-300">위험 신호 없음</h4>
            <p className="text-sm text-green-700 dark:text-green-400">이 회원은 현재 위험 신호가 감지되지 않았습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white">위험 신호 감지</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{signals.length}개의 경고가 발견되었습니다</p>
          </div>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Content */}
      {!isCollapsed && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="p-4 space-y-3"
        >
          {signals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border-l-4 rounded-r-lg ${severityColors[signal.severity]}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${severityBadges[signal.severity]}`}>
                      {signal.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      신뢰도 {Math.round(signal.confidence * 100)}%
                    </span>
                  </div>
                  <h5 className="font-semibold mb-1">
                    {signal.type === 'photo_mismatch' && '사진 불일치'}
                    {signal.type === 'spam_score' && '스팸 의심'}
                    {signal.type === 'multiple_accounts' && '다중 계정'}
                    {signal.type === 'suspicious_payment' && '의심스러운 결제'}
                    {signal.type === 'behavior_anomaly' && '비정상 행동'}
                  </h5>
                  <p className="text-sm mb-2">{signal.description}</p>
                </div>
                <time className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                  {format(signal.detectedAt, 'MM/dd HH:mm', { locale: ko })}
                </time>
              </div>

              {/* Recommendation */}
              <div className="mt-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">권장 조치:</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{signal.recommendation}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
})

