// app/admin/members/page.tsx
import { Suspense } from 'react'
import { MembersPageClient } from './MembersPageClient'

export default function UsersPage() {
  return (
    <Suspense fallback={<div />}>
      <MembersPageClient />
    </Suspense>
  )
}
