/**
 * Billing Management View
 * Premium admin billing page
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Search, Filter, Download, DollarSign, TrendingUp, RefreshCw, 
  XCircle, AlertTriangle, Users, Calendar, FileText
} from 'lucide-react'
import { BillingKpiCard, InvoiceTable, InvoiceDetailPanel, RevenueGrowthChart } from './components'
import { MOCK_INVOICES } from './constants'
import type { Invoice } from './types'

export function BillingView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync with URL query parameter
  useEffect(() => {
    const invoiceNumber = searchParams.get('invoice')
    if (invoiceNumber) {
      const invoice = MOCK_INVOICES.find(i => i.invoiceNumber === invoiceNumber)
      if (invoice) {
        setSelectedInvoice(invoice)
        setIsPanelOpen(true)
      }
    } else {
      setIsPanelOpen(false)
      setTimeout(() => setSelectedInvoice(null), 300)
    }
  }, [searchParams])

  const kpis = useMemo(() => {
    const totalRevenue = MOCK_INVOICES
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0)
    
    const refundedAmount = MOCK_INVOICES
      .filter(i => i.status === 'refunded')
      .reduce((sum, i) => sum + i.amount, 0)
    
    const failedPayments = MOCK_INVOICES.filter(i => i.status === 'failed').length
    const failedPercentage = ((failedPayments / MOCK_INVOICES.length) * 100).toFixed(1)
    
    const chargebackCount = MOCK_INVOICES.filter(i => i.status === 'disputed').length
    const chargebackRate = ((chargebackCount / MOCK_INVOICES.length) * 100).toFixed(2)
    
    const avgRevenuePerUser = Math.round(totalRevenue / MOCK_INVOICES.length)

    return {
      mrr: Math.round(totalRevenue * 0.7),
      arr: Math.round(totalRevenue * 12 * 0.7),
      revenue: totalRevenue,
      refunds: refundedAmount,
      chargebackRate: parseFloat(chargebackRate),
      failedPercent: parseFloat(failedPercentage),
      arpu: avgRevenuePerUser,
      pendingCount: MOCK_INVOICES.filter(i => i.status === 'pending').length
    }
  }, [])

  const generateSparkline = (baseValue: number) => {
    return Array.from({ length: 12 }, (_, i) => 
      Math.max(0, baseValue + Math.floor(Math.random() * (baseValue * 0.3)) - (baseValue * 0.15))
    )
  }

  const filteredInvoices = useMemo(() => {
    if (!searchQuery) return MOCK_INVOICES
    const query = searchQuery.toLowerCase()
    return MOCK_INVOICES.filter(i => 
      i.invoiceNumber.toLowerCase().includes(query) ||
      i.user.name.toLowerCase().includes(query) ||
      i.user.id.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleSelectInvoice = (invoice: Invoice) => {
    // Update URL with invoice number
    router.push(`/admin/billing?invoice=${invoice.invoiceNumber}`, { scroll: false })
  }

  const handleClosePanel = () => {
    // Remove invoice query parameter to close panel
    router.push('/admin/billing', { scroll: false })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/40 to-gray-100/30 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Header - Neutral Slate */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">결제 관리</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">청구서, 결제, 환불을 한눈에 관리하세요</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                <Filter className="w-4 h-4" />
                필터
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white font-medium transition-all shadow-md hover:shadow-lg">
                <Download className="w-4 h-4" />
                내보내기
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="청구서 번호, 회원 이름, ID로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs - Muted Teal/Indigo */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <BillingKpiCard
              title="MRR"
              value={`₩${(kpis.mrr / 1000).toFixed(0)}K`}
              trend={{ value: '+12%', isPositive: true }}
              sparklineData={generateSparkline(kpis.mrr)}
              icon={DollarSign}
              color="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
              tooltip="월 반복 수익 (Monthly Recurring Revenue)"
              delay={0}
            />
            <BillingKpiCard
              title="ARR"
              value={`₩${(kpis.arr / 1000).toFixed(0)}K`}
              trend={{ value: '+15%', isPositive: true }}
              sparklineData={generateSparkline(kpis.arr)}
              icon={TrendingUp}
              color="from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
              tooltip="연 반복 수익 (Annual Recurring Revenue)"
              delay={0.1}
            />
            <BillingKpiCard
              title="기간 수익"
              value={`₩${(kpis.revenue / 1000).toFixed(0)}K`}
              trend={{ value: '+8%', isPositive: true }}
              sparklineData={generateSparkline(kpis.revenue)}
              icon={FileText}
              color="from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
              delay={0.2}
            />
            <BillingKpiCard
              title="환불"
              value={`₩${(kpis.refunds / 1000).toFixed(0)}K`}
              trend={{ value: '-3%', isPositive: true }}
              sparklineData={generateSparkline(kpis.refunds)}
              icon={RefreshCw}
              color="from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20"
              delay={0.3}
            />
            <BillingKpiCard
              title="분쟁률"
              value={`${kpis.chargebackRate}%`}
              trend={{ value: '-0.5%', isPositive: true }}
              sparklineData={generateSparkline(kpis.chargebackRate * 10)}
              icon={AlertTriangle}
              color="from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
              tooltip="전체 거래 대비 분쟁 비율"
              delay={0.4}
            />
            <BillingKpiCard
              title="실패율"
              value={`${kpis.failedPercent}%`}
              trend={{ value: '-2%', isPositive: true }}
              sparklineData={generateSparkline(kpis.failedPercent * 10)}
              icon={XCircle}
              color="from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
              tooltip="전체 결제 중 실패 비율"
              delay={0.5}
            />
            <BillingKpiCard
              title="ARPU"
              value={`₩${(kpis.arpu / 1000).toFixed(0)}K`}
              trend={{ value: '+5%', isPositive: true }}
              sparklineData={generateSparkline(kpis.arpu)}
              icon={Users}
              color="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
              tooltip="사용자당 평균 수익 (Average Revenue Per User)"
              delay={0.6}
            />
            <BillingKpiCard
              title="대기 중"
              value={kpis.pendingCount}
              trend={{ value: '+2', isPositive: false }}
              sparklineData={generateSparkline(kpis.pendingCount * 10)}
              icon={Calendar}
              color="from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800"
              delay={0.7}
            />
          </div>
        </motion.section>

        {/* Revenue Growth Chart */}
        <RevenueGrowthChart />

        {/* Main Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <InvoiceTable
            invoices={filteredInvoices}
            onSelectInvoice={handleSelectInvoice}
            selectedInvoiceId={selectedInvoice?.id}
          />
        </motion.section>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            총 <span className="font-semibold">{filteredInvoices.length}</span>개의 청구서
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              이전
            </button>
            <button className="px-3 py-2 rounded-lg bg-teal-600 text-white font-medium">1</button>
            <button className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              다음
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detail Panel */}
      <InvoiceDetailPanel
        invoice={selectedInvoice}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  )
}

