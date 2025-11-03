/**
 * Matching Management Types
 * Type definitions for matching management
 */

export type MatchStatus = 'matched' | 'pending' | 'success' | 'cancelled' | 'blocked'
export type MatchStage = 'initial' | 'conversation' | 'meeting' | 'relationship' | 'closed'
export type InteractionType = 'message' | 'like' | 'meet_request' | 'meet_confirmed' | 'report' | 'block' | 'unmatch'

export interface User {
  id: string
  name: string
  age: number
  avatar: string
  city?: string
  occupation?: string
  photos?: string[]
}

export interface Matching {
  id: string
  user1: User
  user2: User
  status: MatchStatus
  matchDate: Date
  score: number
  stage: MatchStage
  messagesCount: number
  lastActivity: Date
  compatibility?: CompatibilityScore
  interactions?: Interaction[]
  timeline?: TimelineEvent[]
  flags?: MatchFlag[]
  adminNotes?: AdminNote[]
}

export interface CompatibilityScore {
  overall: number
  interests: number
  lifestyle: number
  values: number
  communication: number
  location: number
}

export interface Interaction {
  id: string
  type: InteractionType
  from: string // user id
  to: string // user id
  timestamp: Date
  content?: string
  metadata?: Record<string, any>
}

export interface TimelineEvent {
  id: string
  type: 'match_created' | 'first_message' | 'conversation_milestone' | 'meet_scheduled' | 'meet_completed' | 'status_change' | 'admin_action' | 'flag_raised'
  title: string
  description: string
  timestamp: Date
  actor?: string
  metadata?: Record<string, any>
}

export interface MatchFlag {
  id: string
  type: 'spam' | 'harassment' | 'inappropriate' | 'fake_profile' | 'safety_concern' | 'payment_issue'
  severity: 'low' | 'medium' | 'high' | 'critical'
  reportedBy: string // user id
  reportedAt: Date
  description: string
  status: 'open' | 'investigating' | 'resolved' | 'dismissed'
  assignedTo?: string
}

export interface AdminNote {
  id: string
  content: string
  author: string
  createdAt: Date
  isImportant: boolean
  tags?: string[]
}

export interface MessageStats {
  total: number
  last24h: number
  last7d: number
  avgResponseTime: string
  longestGap: string
}

export interface MeetingInfo {
  scheduled: Date | null
  location?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  feedback?: {
    user1Rating?: number
    user2Rating?: number
    user1Comment?: string
    user2Comment?: string
  }
}

