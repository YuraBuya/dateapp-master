/**
 * Payment Admin Actions
 * Refund, Retry, Credit flows with confirm modals
 */

'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, DollarSign, Ban, CheckCircle, AlertTriangle, X } from 'lucide-react'
import type { Invoice } from '../../types'
import { formatCurrency } from '../../constants'

interface PaymentActionsProps {
  invoice: Invoice
  onRefund: (invoiceId: string, amount: number, reason: string, type: 'full' | 'partial') => void
  onRetry: (invoiceId: string) => void
  onCredit: (invoiceId: string, amount: number, reason: string) => void
  onCancel: (invoiceId: string, reason: string) => void
}

export const PaymentActions = memo(function PaymentActions({
  invoice,
  onRefund,
  onRetry,
  onCredit,
  onCancel
}: PaymentActionsProps) {
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  
  const [refundType, setRefundType] = useState<'full' | 'partial'>('full')
  const [refundAmount, setRefundAmount] = useState(invoice.amount)
  const [refundReason, setRefundReason] = useState('')
  
  const [creditAmount, setCreditAmount] = useState(0)
  const [creditReason, setCreditReason] = useState('')
  
  const [cancelReason, setCancelReason] = useState('')

  const handleRefund = () => {
    if (refundReason.trim() && refundAmount > 0) {
      onRefund(invoice.id, refundAmount, refundReason, refundType)
      setShowRefundModal(false)
      setRefundReason('')
      setRefundAmount(invoice.amount)
    }
  }

  const handleCredit = () => {
    if (creditReason.trim() && creditAmount > 0) {
      onCredit(invoice.id, creditAmount, creditReason)
      setShowCreditModal(false)
      setCreditReason('')
      setCreditAmount(0)
    }
  }

  const handleCancel = () => {
    if (cancelReason.trim()) {
      onCancel(invoice.id, cancelReason)
      setShowCancelModal(false)
      setCancelReason('')
    }
  }

  return (
    <>
      <div className="space-y-3">
        {/* Refund Button */}
        {(invoice.status === 'paid' || invoice.status === 'disputed') && (
          <button
            onClick={() => setShowRefundModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <DollarSign className="w-5 h-5" />
            환불 처리
          </button>
        )}

        {/* Retry Button */}
        {(invoice.status === 'failed' || invoice.status === 'pending') && (
          <button
            onClick={() => onRetry(invoice.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            결제 재시도
          </button>
        )}

        {/* Credit Button */}
        <button
          onClick={() => setShowCreditModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <DollarSign className="w-5 h-5" />
          크레딧 지급
        </button>

        {/* Cancel Button */}
        {invoice.status === 'pending' && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Ban className="w-5 h-5" />
            청구 취소
          </button>
        )}
      </div>

      {/* Refund Modal */}
      <AnimatePresence>
        {showRefundModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowRefundModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">환불 처리</h3>
              </div>

              <div className="space-y-4">
                {/* Refund Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">환불 유형</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setRefundType('full'); setRefundAmount(invoice.amount); }}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                        refundType === 'full'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      전액 환불
                    </button>
                    <button
                      onClick={() => setRefundType('partial')}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                        refundType === 'partial'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      부분 환불
                    </button>
                  </div>
                </div>

                {/* Refund Amount */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    환불 금액 (최대: {formatCurrency(invoice.amount)})
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Math.min(invoice.amount, parseInt(e.target.value) || 0))}
                    disabled={refundType === 'full'}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-900"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">환불 사유 *</label>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="환불 사유를 입력하세요..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleRefund}
                  disabled={!refundReason.trim() || refundAmount <= 0}
                  className="flex-1 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  환불 실행
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit Modal */}
      <AnimatePresence>
        {showCreditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCreditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">크레딧 지급</h3>
              </div>

              <div className="space-y-4">
                {/* Credit Amount */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">크레딧 금액 *</label>
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">지급 사유 *</label>
                  <textarea
                    value={creditReason}
                    onChange={(e) => setCreditReason(e.target.value)}
                    placeholder="크레딧 지급 사유를 입력하세요..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreditModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCredit}
                  disabled={!creditReason.trim() || creditAmount <= 0}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  지급 실행
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">청구 취소 확인</h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                청구서 <strong>{invoice.invoiceNumber}</strong>를 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="취소 사유를 입력하세요..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!cancelReason.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  취소 실행
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

