/**
 * Invoice Detail Panel - Premium Version
 * Complete financial operations panel with PII protection
 */

'use client'

import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Clock, DollarSign, Users } from 'lucide-react'
import type { Invoice } from '../types'
import {
  InvoiceSummaryStrip,
  PaymentKPIs,
  LineItemsTable,
  PaymentTimeline,
  PaymentActions,
  PIIMaskedInfo
} from './detail-panel'

interface InvoiceDetailPanelProps {
  invoice: Invoice | null
  isOpen: boolean
  onClose: () => void
}

export const InvoiceDetailPanel = memo(function InvoiceDetailPanel({
  invoice,
  isOpen,
  onClose
}: InvoiceDetailPanelProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'timeline' | 'actions'>('overview')

  // Admin action handlers
  const handleRefund = useCallback((invoiceId: string, amount: number, reason: string, type: 'full' | 'partial') => {
    console.log('Refund:', { invoiceId, amount, reason, type })
    // TODO: Implement refund API call with audit logging
  }, [])

  const handleRetry = useCallback((invoiceId: string) => {
    console.log('Retry payment:', invoiceId)
    // TODO: Implement retry payment API call
  }, [])

  const handleCredit = useCallback((invoiceId: string, amount: number, reason: string) => {
    console.log('Issue credit:', { invoiceId, amount, reason })
    // TODO: Implement credit issuance with audit logging
  }, [])

  const handleCancel = useCallback((invoiceId: string, reason: string) => {
    console.log('Cancel invoice:', { invoiceId, reason })
    // TODO: Implement invoice cancellation with audit logging
  }, [])

  const handleRevealPII = useCallback((invoiceId: string) => {
    console.log('Reveal PII:', invoiceId)
    // TODO: Log to audit trail
  }, [])

  if (!invoice) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Summary Strip (Sticky Header) */}
            <InvoiceSummaryStrip invoice={invoice} onClose={onClose} />

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {/* Premium Section Navigation - Sticky */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm">
                <div className="flex gap-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-teal-300 dark:scrollbar-thumb-teal-600">
                  <button
                    onClick={() => setActiveSection('overview')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'overview'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <FileText className={`w-5 h-5 ${activeSection === 'overview' ? 'text-teal-600 dark:text-teal-400' : ''}`} />
                    <span>상세정보</span>
                    {activeSection === 'overview' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('timeline')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'timeline'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Clock className={`w-5 h-5 ${activeSection === 'timeline' ? 'text-teal-600 dark:text-teal-400' : ''}`} />
                    <span>타임라인</span>
                    {activeSection === 'timeline' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('actions')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'actions'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <DollarSign className={`w-5 h-5 ${activeSection === 'actions' ? 'text-teal-600 dark:text-teal-400' : ''}`} />
                    <span>관리 작업</span>
                    {activeSection === 'actions' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                {/* Overview Section */}
                {activeSection === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* PII Masked Info */}
                    <PIIMaskedInfo invoice={invoice} onRevealPII={handleRevealPII} />

                    {/* Payment KPIs */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">결제 요약</h3>
                      <PaymentKPIs invoice={invoice} />
                    </div>

                    {/* Line Items */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">청구 내역</h3>
                      <LineItemsTable invoice={invoice} />
                    </div>

                    {/* Payment Method & Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="text-xs text-gray-600 dark:text-gray-400 mb-2">결제 수단</h4>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {invoice.paymentMethod === 'credit_card' && '💳 신용카드'}
                          {invoice.paymentMethod === 'bank_transfer' && '🏦 계좌이체'}
                          {invoice.paymentMethod === 'paypal' && '💰 PayPal'}
                          {invoice.paymentMethod === 'other' && '💵 기타'}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="text-xs text-gray-600 dark:text-gray-400 mb-2">생성일</h4>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {invoice.createdDate.toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Timeline Section */}
                {activeSection === 'timeline' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PaymentTimeline invoice={invoice} />
                  </motion.div>
                )}

                {/* Actions Section */}
                {activeSection === 'actions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">관리자 작업</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        모든 작업은 감사 로그에 기록되며 되돌릴 수 없습니다.
                      </p>
                    </div>
                    <PaymentActions
                      invoice={invoice}
                      onRefund={handleRefund}
                      onRetry={handleRetry}
                      onCredit={handleCredit}
                      onCancel={handleCancel}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})
