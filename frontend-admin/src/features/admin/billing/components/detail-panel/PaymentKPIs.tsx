/**
 * Payment KPIs Row
 * Small revenue sparkline and key metrics
 */

'use client'

import { memo } from 'react'
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from 'lucide-react'
import type { Invoice } from '../../types'
import { formatCurrency } from '../../constants'

interface PaymentKPIsProps {
  invoice: Invoice
}

export const PaymentKPIs = memo(function PaymentKPIs({ invoice }: PaymentKPIsProps) {
  // Calculate metrics
  const totalPaid = invoice.status === 'paid' ? invoice.amount : 0
  const totalRefunded = invoice.refunds?.reduce((sum, r) => sum + r.amount, 0) || 0
  const totalDisputed = invoice.disputes?.reduce((sum, d) => sum + d.amount, 0) || 0
  const netRevenue = totalPaid - totalRefunded - totalDisputed

  // Generate sparkline data (mock)
  const sparklineData = Array.from({ length: 12 }, (_, i) => 
    Math.max(0, invoice.amount / 12 + Math.random() * 10000 - 5000)
  )

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Net Revenue with Sparkline */}
      <div className="col-span-2 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">순 매출</div>
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">
              {formatCurrency(netRevenue)}
            </div>
          </div>
          <DollarSign className="w-8 h-8 text-teal-600/30 dark:text-teal-400/30" />
        </div>
        
        {/* Mini Sparkline */}
        <div className="h-8 flex items-end gap-0.5">
          {sparklineData.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-teal-500/50 rounded-t"
              style={{
                height: `${(value / Math.max(...sparklineData)) * 100}%`,
                minHeight: '4px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Total Paid */}
      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-sm">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">결제액</div>
        <div className="text-lg font-bold text-green-700 dark:text-green-300">
          {formatCurrency(totalPaid)}
        </div>
      </div>

      {/* Total Refunded */}
      <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 shadow-sm">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">환불액</div>
        <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
          {formatCurrency(totalRefunded)}
        </div>
      </div>
    </div>
  )
})

