/**
 * Billing Management Constants
 * Mock data and configuration
 */

import type { Invoice } from './types'

// Mock invoice data
export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2025-001',
    user: {
      id: 'U001',
      name: '김민지',
      email: 'kim***@example.com',
      avatar: '👩'
    },
    amount: 99000,
    currency: 'KRW',
    status: 'paid',
    paymentMethod: 'credit_card',
    createdDate: new Date('2025-10-01'),
    dueDate: new Date('2025-10-15'),
    paidDate: new Date('2025-10-05'),
    retryAttempts: 0,
    description: 'Premium 구독 - 1개월',
    tags: ['premium', 'subscription'],
    lineItems: [
      {
        id: 'LI001',
        description: 'Premium 구독',
        quantity: 1,
        unitPrice: 90000,
        total: 90000,
        taxRate: 0.1
      }
    ]
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2025-002',
    user: {
      id: 'U002',
      name: '이준호',
      email: 'lee***@example.com',
      avatar: '👨'
    },
    amount: 149000,
    currency: 'KRW',
    status: 'pending',
    paymentMethod: 'credit_card',
    createdDate: new Date('2025-10-28'),
    dueDate: new Date('2025-11-05'),
    retryAttempts: 1,
    description: 'VIP 구독 - 1개월',
    tags: ['vip', 'subscription'],
    lineItems: [
      {
        id: 'LI002',
        description: 'VIP 구독',
        quantity: 1,
        unitPrice: 135000,
        total: 135000,
        taxRate: 0.1
      }
    ]
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2025-003',
    user: {
      id: 'U003',
      name: '박서연',
      email: 'park***@example.com',
      avatar: '👩'
    },
    amount: 49000,
    currency: 'KRW',
    status: 'failed',
    paymentMethod: 'credit_card',
    createdDate: new Date('2025-10-25'),
    dueDate: new Date('2025-10-30'),
    retryAttempts: 3,
    description: 'Basic 구독 - 1개월',
    tags: ['basic', 'subscription'],
    lineItems: [
      {
        id: 'LI003',
        description: 'Basic 구독',
        quantity: 1,
        unitPrice: 44500,
        total: 44500,
        taxRate: 0.1
      }
    ],
    paymentAttempts: [
      {
        id: 'PA001',
        amount: 49000,
        status: 'failed',
        attemptedAt: new Date('2025-10-25T10:00:00'),
        failureReason: '잔액 부족',
        transactionId: 'TXN-FAILED-001'
      },
      {
        id: 'PA002',
        amount: 49000,
        status: 'failed',
        attemptedAt: new Date('2025-10-26T10:00:00'),
        failureReason: '카드 한도 초과',
        transactionId: 'TXN-FAILED-002'
      },
      {
        id: 'PA003',
        amount: 49000,
        status: 'failed',
        attemptedAt: new Date('2025-10-27T10:00:00'),
        failureReason: '카드 정보 오류',
        transactionId: 'TXN-FAILED-003'
      }
    ]
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2025-004',
    user: {
      id: 'U004',
      name: '최동욱',
      email: 'choi***@example.com',
      avatar: '👨'
    },
    amount: 99000,
    currency: 'KRW',
    status: 'disputed',
    paymentMethod: 'credit_card',
    createdDate: new Date('2025-10-20'),
    dueDate: new Date('2025-10-25'),
    paidDate: new Date('2025-10-22'),
    retryAttempts: 0,
    description: 'Premium 구독 - 1개월',
    tags: ['premium', 'subscription', 'disputed'],
    lineItems: [
      {
        id: 'LI004',
        description: 'Premium 구독',
        quantity: 1,
        unitPrice: 90000,
        total: 90000,
        taxRate: 0.1
      }
    ],
    disputes: [
      {
        id: 'DIS001',
        amount: 99000,
        reason: '서비스 불만족',
        status: 'under_review',
        openedAt: new Date('2025-10-26'),
        notes: '고객이 서비스 품질에 불만을 제기',
        evidence: ['screenshot1.jpg', 'email_correspondence.pdf']
      }
    ],
    paymentAttempts: [
      {
        id: 'PA004',
        amount: 99000,
        status: 'success',
        attemptedAt: new Date('2025-10-22T09:00:00'),
        transactionId: 'TXN-SUCCESS-004'
      }
    ]
  },
  {
    id: 'INV-005',
    invoiceNumber: 'INV-2025-005',
    user: {
      id: 'U005',
      name: '정수아',
      email: 'jung***@example.com',
      avatar: '👩'
    },
    amount: 149000,
    currency: 'KRW',
    status: 'refunded',
    paymentMethod: 'credit_card',
    createdDate: new Date('2025-10-15'),
    dueDate: new Date('2025-10-20'),
    paidDate: new Date('2025-10-16'),
    retryAttempts: 0,
    description: 'VIP 구독 - 1개월',
    tags: ['vip', 'subscription', 'refunded'],
    lineItems: [
      {
        id: 'LI005',
        description: 'VIP 구독',
        quantity: 1,
        unitPrice: 135000,
        total: 135000,
        taxRate: 0.1
      }
    ],
    refunds: [
      {
        id: 'REF001',
        amount: 149000,
        reason: '중복 결제',
        processedBy: 'admin@example.com',
        processedAt: new Date('2025-10-18'),
        type: 'full',
        status: 'completed'
      }
    ]
  }
]

// Status color mapping
export const STATUS_COLORS = {
  paid: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30 border-green-200 dark:border-green-800',
  pending: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
  failed: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30 border-red-200 dark:border-red-800',
  refunded: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  disputed: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
  cancelled: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
}

export const STATUS_LABELS = {
  paid: '결제 완료',
  pending: '대기 중',
  failed: '실패',
  refunded: '환불됨',
  disputed: '분쟁 중',
  cancelled: '취소됨'
}

export const PAYMENT_METHOD_LABELS = {
  credit_card: '신용카드',
  bank_transfer: '계좌이체',
  paypal: 'PayPal',
  other: '기타'
}

export const PAYMENT_METHOD_ICONS = {
  credit_card: '💳',
  bank_transfer: '🏦',
  paypal: '💰',
  other: '💵'
}

// Currency formatter
export const formatCurrency = (amount: number, currency: string = 'KRW') => {
  if (currency === 'KRW') {
    return `₩${amount.toLocaleString('ko-KR')}`
  }
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency
  }).format(amount)
}

