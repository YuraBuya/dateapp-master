// app/admin/users/MembersPageClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { MembersView } from '@/src/features/admin/members'

export function MembersPageClient() {
    const searchParams = useSearchParams()
    return <MembersView />
}
