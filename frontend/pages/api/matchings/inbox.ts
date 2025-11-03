import type { NextApiRequest, NextApiResponse } from 'next'
import proposalsData from '@/mocks/proposals.json'

export interface Candidate {
  id: string
  memberId: string
  name: string
  gender: string
  age: number
  job: string
  location: string
  photos: string[]
  summary: string
  highlights: string[]
  matchScore: number
  commonInterests: string[]
  introduction: string
}

export interface Proposal {
  id: string
  expiresAt: string
  createdAt: string
  type: string
  status?: string
  candidates: Candidate[]
}

export interface MatchingInboxResponse {
  success: boolean
  proposals: Proposal[]
  hasMore: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchingInboxResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      proposals: [],
      hasMore: false
    })
  }

  try {
    // 만료되지 않은 제안만 필터링
    const activeProposals = proposalsData.proposals.filter(
      proposal => !proposal.status || proposal.status !== 'expired'
    )

    // 실제로는 페이지네이션, 사용자별 필터링 등이 있을 것
    const response: MatchingInboxResponse = {
      success: true,
      proposals: activeProposals,
      hasMore: false // 더미 데이터이므로 false
    }

    // 즉시 응답
    res.status(200).json(response)

  } catch (error) {
    console.error('Matching inbox API error:', error)
    res.status(500).json({
      success: false,
      proposals: [],
      hasMore: false
    })
  }
}
