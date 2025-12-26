// app/admin/billing/BillingPageClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { BillingView } from '@/src/features/admin/billing'

export function BillingPageClient() {
    const searchParams = useSearchParams()
    return <BillingView />
}
