// app/admin/matching/MatchingPageClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { MatchingView } from '@/src/features/admin/matching'

export function MatchingPageClient() {
    const searchParams = useSearchParams()
    return <MatchingView />
}
