/**
 * Billing Management Types
 * Enterprise-grade type definitions for billing operations
 */

export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'refunded' | 'disputed' | 'cancelled'
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal' | 'other'
export type RefundType = 'full' | 'partial'
export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'lost'

export interface Invoice {
  id: string
  invoiceNumber: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  amount: number
  currency: string
  status: InvoiceStatus
  paymentMethod: PaymentMethod
  createdDate: Date
  dueDate: Date
  paidDate?: Date
  retryAttempts: number
  description: string
  tags: string[]
  lineItems: LineItem[]
  refunds?: Refund[]
  disputes?: Dispute[]
  paymentAttempts?: PaymentAttempt[]
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxRate: number
}

export interface Refund {
  id: string
  amount: number
  reason: string
  processedBy: string
  processedAt: Date
  type: RefundType
  status: 'pending' | 'completed' | 'failed'
}

export interface Dispute {
  id: string
  amount: number
  reason: string
  status: DisputeStatus
  openedAt: Date
  resolvedAt?: Date
  evidence?: string[]
  notes?: string
}

export interface PaymentAttempt {
  id: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  attemptedAt: Date
  failureReason?: string
  transactionId?: string
}

export interface BillingKPI {
  title: string
  value: string | number
  trend: {
    value: string
    isPositive: boolean
  }
  sparklineData: number[]
  icon: React.ReactNode
  color: string
  tooltip?: string
}

export interface BillingFilters {
  status?: InvoiceStatus[]
  paymentMethod?: PaymentMethod[]
  dateRange?: {
    start: Date
    end: Date
  }
  amountRange?: {
    min: number
    max: number
  }
  search?: string
}

export interface AuditLog {
  id: string
  action: string
  performedBy: string
  timestamp: Date
  details: string
  metadata?: Record<string, any>
}

export interface ReconciliationMatch {
  invoiceId: string
  bankTransactionId: string
  matchScore: number
  status: 'suggested' | 'confirmed' | 'rejected'
}

export interface TimelineEvent {
  id: string
  type: 'payment' | 'refund' | 'dispute' | 'retry' | 'credit' | 'note' | 'status_change'
  title: string
  description: string
  timestamp: Date
  amount?: number
  performedBy?: string
  metadata?: Record<string, any>
}

export interface AdminNote {
  id: string
  content: string
  author: string
  createdAt: Date
  isImportant: boolean
}

export interface PaymentKPI {
  totalPaid: number
  totalRefunded: number
  totalDisputed: number
  netRevenue: number
  sparklineData: number[]
}

