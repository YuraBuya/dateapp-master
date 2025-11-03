/**
 * Invoice Table Component
 */

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Eye, MoreVertical, RefreshCw } from 'lucide-react'
import type { Invoice } from '../types'
import { STATUS_COLORS, STATUS_LABELS, PAYMENT_METHOD_LABELS, PAYMENT_METHOD_ICONS, formatCurrency } from '../constants'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface InvoiceTableProps {
  invoices: Invoice[]
  onSelectInvoice: (invoice: Invoice) => void
  selectedInvoiceId?: string
}

export const InvoiceTable = memo(function InvoiceTable({
  invoices, onSelectInvoice, selectedInvoiceId
}: InvoiceTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">청구서 #</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">회원</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">이메일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">금액</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">상태</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">결제수단</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">생성일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">재시도</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">작업</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
                  selectedInvoiceId === invoice.id ? 'bg-teal-50 dark:bg-teal-900/10' : ''
                } ${
                  invoice.status === 'failed' ? 'bg-red-50/30 dark:bg-red-900/5' :
                  invoice.status === 'disputed' ? 'bg-orange-50/30 dark:bg-orange-900/5' : ''
                }`}
                onClick={() => onSelectInvoice(invoice)}
              >
                <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{invoice.invoiceNumber}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{invoice.user.avatar}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{invoice.user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{invoice.user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{invoice.user.email}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[invoice.status]}`}>
                    {STATUS_LABELS[invoice.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{PAYMENT_METHOD_ICONS[invoice.paymentMethod]}</span>
                    <span>{PAYMENT_METHOD_LABELS[invoice.paymentMethod]}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatDistanceToNow(invoice.createdDate, { addSuffix: true, locale: ko })}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${
                    invoice.retryAttempts > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'
                  }`}>
                    {invoice.retryAttempts}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={(e) => { e.stopPropagation(); onSelectInvoice(invoice); }}
                    >
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    {invoice.status === 'failed' && (
                      <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                    )}
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

