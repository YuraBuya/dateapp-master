/**
 * Payment Timeline
 * Chronological payment events with filters
 */

'use client'

import { memo, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, RefreshCw, AlertTriangle, CreditCard, 
  FileText, CheckCircle, XCircle 
} from 'lucide-react'
import type { Invoice, TimelineEvent } from '../../types'
import { formatCurrency } from '../../constants'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface PaymentTimelineProps {
  invoice: Invoice
}

const eventIcons = {
  payment: CreditCard,
  refund: RefreshCw,
  dispute: AlertTriangle,
  retry: RefreshCw,
  credit: DollarSign,
  note: FileText,
  status_change: CheckCircle
}

const eventColors = {
  payment: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  refund: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  dispute: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  retry: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  credit: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  note: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  status_change: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
}

export const PaymentTimeline = memo(function PaymentTimeline({ invoice }: PaymentTimelineProps) {
  const [filter, setFilter] = useState<string>('all')

  // Build timeline from invoice data
  const timeline: TimelineEvent[] = useMemo(() => {
    const events: TimelineEvent[] = []

    // Created event
    events.push({
      id: `created-${invoice.id}`,
      type: 'status_change',
      title: '청구서 생성',
      description: `${invoice.description} 청구서가 생성되었습니다.`,
      timestamp: invoice.createdDate,
      amount: invoice.amount
    })

    // Payment event
    if (invoice.paidDate) {
      events.push({
        id: `paid-${invoice.id}`,
        type: 'payment',
        title: '결제 완료',
        description: `${PAYMENT_METHOD_LABELS[invoice.paymentMethod]}로 결제되었습니다.`,
        timestamp: invoice.paidDate,
        amount: invoice.amount
      })
    }

    // Payment attempts
    invoice.paymentAttempts?.forEach((attempt, idx) => {
      events.push({
        id: `attempt-${attempt.id}`,
        type: 'retry',
        title: `결제 시도 #${idx + 1}`,
        description: attempt.status === 'failed' ? `실패: ${attempt.failureReason}` : '성공',
        timestamp: attempt.attemptedAt,
        amount: attempt.amount
      })
    })

    // Refunds
    invoice.refunds?.forEach((refund) => {
      events.push({
        id: `refund-${refund.id}`,
        type: 'refund',
        title: '환불 처리',
        description: `${refund.reason} (${refund.type === 'full' ? '전액' : '부분'} 환불)`,
        timestamp: refund.processedAt,
        amount: refund.amount,
        performedBy: refund.processedBy
      })
    })

    // Disputes
    invoice.disputes?.forEach((dispute) => {
      events.push({
        id: `dispute-${dispute.id}`,
        type: 'dispute',
        title: '분쟁 시작',
        description: dispute.reason,
        timestamp: dispute.openedAt,
        amount: dispute.amount
      })
    })

    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [invoice])

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return timeline
    return timeline.filter(event => event.type === filter)
  }, [timeline, filter])

  return (
    <div className="space-y-4">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          전체 ({timeline.length})
        </button>
        <button
          onClick={() => setFilter('payment')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'payment'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          결제 ({timeline.filter(e => e.type === 'payment').length})
        </button>
        <button
          onClick={() => setFilter('refund')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'refund'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          환불 ({timeline.filter(e => e.type === 'refund').length})
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        {/* Events */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const Icon = eventIcons[event.type]

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-16"
              >
                {/* Icon */}
                <div className={`absolute left-3 w-6 h-6 rounded-full flex items-center justify-center ${eventColors[event.type]}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Event Card */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                    </div>
                    <time className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                      {format(event.timestamp, 'yyyy-MM-dd HH:mm', { locale: ko })}
                    </time>
                  </div>
                  
                  {event.amount && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">금액:</span>
                      <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                        {formatCurrency(event.amount)}
                      </span>
                    </div>
                  )}
                  
                  {event.performedBy && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      처리자: {event.performedBy}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
})

const PAYMENT_METHOD_LABELS = {
  credit_card: '신용카드',
  bank_transfer: '계좌이체',
  paypal: 'PayPal',
  other: '기타'
}

