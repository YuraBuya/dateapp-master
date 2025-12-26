// app/admin/matching/page.tsx
import { Suspense } from 'react'
import { MatchingPageClient } from './MatchingPageClient'

export default function MatchingPage() {
  return (
    <Suspense fallback={<div />}>
      <MatchingPageClient />
    </Suspense>
  )
}
