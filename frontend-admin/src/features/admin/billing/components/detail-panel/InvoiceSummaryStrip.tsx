/**
 * Invoice Summary Strip
 * Compact header with key payment info and status
 */

'use client'

import { memo } from 'react'
import { X, CreditCard, Calendar, TrendingUp } from 'lucide-react'
import type { Invoice } from '../../types'
import { STATUS_COLORS, STATUS_LABELS, PAYMENT_METHOD_LABELS, formatCurrency } from '../../constants'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface InvoiceSummaryStripProps {
  invoice: Invoice
  onClose: () => void
}

export const InvoiceSummaryStrip = memo(function InvoiceSummaryStrip({
  invoice,
  onClose
}: InvoiceSummaryStripProps) {
  return (
    <div className="sticky top-0 z-20 bg-gradient-to-r from-teal-600 to-cyan-500 border-b-4 border-l-4 border-teal-700 shadow-lg">
      <div className="px-4 pt-3 pb-2">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold shadow-md">
              💳
            </div>

            {/* Invoice Number & User */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{invoice.invoiceNumber}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-xs text-gray-800 dark:text-white/80">{invoice.user.name}</p>
                <span className="text-xs text-gray-700 dark:text-white/60">•</span>
                <p className="text-xs text-gray-800 dark:text-white/80 font-mono">{invoice.user.email}</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* KPI Cards - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30">
          {/* Amount Card */}
          <div className="flex-shrink-0 text-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur border border-white/30 shadow-sm min-w-[110px]">
            <div className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{formatCurrency(invoice.amount)}</div>
            <div className="text-[11px] text-gray-800 dark:text-white/80 mt-0.5">총 금액</div>
          </div>

          {/* Status Card */}
          <div className="flex-shrink-0 text-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur border border-white/30 shadow-sm min-w-[110px]">
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[invoice.status]}`}>
              {STATUS_LABELS[invoice.status]}
            </div>
            <div className="text-[11px] text-gray-800 dark:text-white/80 mt-0.5">상태</div>
          </div>

          {/* Payment Method Card */}
          <div className="flex-shrink-0 text-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur border border-white/30 shadow-sm min-w-[110px]">
            <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{PAYMENT_METHOD_LABELS[invoice.paymentMethod]}</div>
            <div className="text-[11px] text-gray-800 dark:text-white/80 mt-0.5">결제 수단</div>
          </div>

          {/* Due Date Card */}
          <div className="flex-shrink-0 text-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur border border-white/30 shadow-sm min-w-[110px]">
            <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{format(invoice.dueDate, 'MM/dd', { locale: ko })}</div>
            <div className="text-[11px] text-gray-800 dark:text-white/80 mt-0.5">마감일</div>
          </div>

          {/* Retry Attempts (if any) */}
          {invoice.retryAttempts > 0 && (
            <div className="flex-shrink-0 text-center px-4 py-2 rounded-lg bg-amber-500/30 backdrop-blur border border-amber-400/50 shadow-sm min-w-[110px]">
              <div className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{invoice.retryAttempts}</div>
              <div className="text-[11px] text-gray-800 dark:text-white/80 mt-0.5">재시도</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Elegant Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
})

