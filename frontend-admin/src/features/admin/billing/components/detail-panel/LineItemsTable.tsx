/**
 * Line Items Table
 * Invoice items breakdown with tax calculation
 */

'use client'

import { memo } from 'react'
import type { Invoice } from '../../types'
import { formatCurrency } from '../../constants'

interface LineItemsTableProps {
  invoice: Invoice
}

export const LineItemsTable = memo(function LineItemsTable({ invoice }: LineItemsTableProps) {
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.total, 0)
  const tax = invoice.lineItems.reduce((sum, item) => sum + (item.total * item.taxRate), 0)
  const total = subtotal + tax

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">청구 항목</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">항목</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400">수량</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400">단가</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400">금액</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {invoice.lineItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.description}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">소계</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">세금 (10%)</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-base pt-2 border-t border-gray-300 dark:border-gray-600">
          <span className="font-bold text-gray-900 dark:text-white">총액</span>
          <span className="font-bold text-teal-600 dark:text-teal-400 text-lg">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
})

