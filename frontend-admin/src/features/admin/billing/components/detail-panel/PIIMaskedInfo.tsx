/**
 * PII Masked Information
 * Sensitive data with audited reveal functionality
 */

'use client'

import { memo, useState } from 'react'
import { Eye, EyeOff, Shield, Lock } from 'lucide-react'
import type { Invoice } from '../../types'

interface PIIMaskedInfoProps {
  invoice: Invoice
  onRevealPII: (invoiceId: string) => void
}

export const PIIMaskedInfo = memo(function PIIMaskedInfo({ invoice, onRevealPII }: PIIMaskedInfoProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    if (!isRevealed) {
      // Log to audit trail
      onRevealPII(invoice.id)
      setIsRevealed(true)
    } else {
      setIsRevealed(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">고객 정보 (보호됨)</h4>
        </div>
        <button
          onClick={handleReveal}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-blue-200 dark:border-blue-700 transition-colors text-sm"
        >
          {isRevealed ? (
            <>
              <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">숨기기</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">보기</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-blue-600 dark:text-blue-400">이름:</span>
          <span className="font-mono text-blue-900 dark:text-blue-200">
            {isRevealed ? invoice.user.name : '김**'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 dark:text-blue-400">이메일:</span>
          <span className="font-mono text-blue-900 dark:text-blue-200">
            {isRevealed ? invoice.user.email.replace('***', 'example') : invoice.user.email}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 dark:text-blue-400">회원 ID:</span>
          <span className="font-mono text-blue-900 dark:text-blue-200">
            {isRevealed ? invoice.user.id : '***'}
          </span>
        </div>
      </div>

      {!isRevealed && (
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
          <p className="text-xs text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            PII 조회 시 감사 로그에 기록됩니다
          </p>
        </div>
      )}
    </div>
  )
})

