/**
 * Members Management Types
 * Enterprise-grade type definitions for member management
 */

export type SubscriptionTier = 'basic' | 'premium' | 'vip'
export type Gender = 'male' | 'female' | 'other'
export type MemberStatus = 'active' | 'suspended' | 'inactive' | 'pending' | 'flagged'
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'none'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface Member {
  id: string
  avatar: string
  name: string
  age: number
  gender: Gender
  city: string
  subscriptionTier: SubscriptionTier
  verificationStatus: VerificationStatus
  lastActive: Date
  matchesCount: number
  reportsCount: number
  riskScore: number
  riskLevel: RiskLevel
  status: MemberStatus
  joinDate: Date
  email: string
  phone: string
  bio: string
  flags?: string[]
  photos?: string[]
  messagesLast30d?: number
  preferences?: MemberPreferences
  verificationDocs?: VerificationDoc[]
  riskSignals?: RiskSignal[]
  timeline?: TimelineEvent[]
  adminNotes?: AdminNote[]
  auditLogs?: AuditLog[]
}

export interface MemberPreferences {
  ageRange: { min: number; max: number }
  location: string[]
  interests: string[]
}

export interface VerificationDoc {
  id: string
  type: 'passport' | 'id_card' | 'selfie' | 'driver_license' | 'residence_card' | 'income_proof' | 'employment_proof'
  url: string
  status: VerificationStatus
  uploadedAt: Date
  reviewedAt?: Date
  isRequired?: boolean
  expiryDate?: Date
}

export interface RequiredDocument {
  type: VerificationDoc['type']
  name: string
  description: string
  isRequired: boolean
  icon: string
}

export interface RiskSignal {
  id: string
  type: 'photo_mismatch' | 'spam_score' | 'multiple_accounts' | 'suspicious_payment' | 'behavior_anomaly'
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  description: string
  detectedAt: Date
  recommendation: string
}

export interface TimelineEvent {
  id: string
  type: 'signup' | 'login' | 'report' | 'match' | 'payment' | 'document_upload' | 'admin_action' | 'message' | 'profile_update'
  title: string
  description: string
  timestamp: Date
  metadata?: Record<string, any>
  icon: string
}

export interface AdminNote {
  id: string
  content: string
  author: string
  createdAt: Date
  isImportant: boolean
}

export interface AuditLog {
  id: string
  action: string
  performedBy: string
  timestamp: Date
  reason?: string
  details: string
}

export interface MemberKPI {
  title: string
  value: number | string
  trend: {
    value: string
    isPositive: boolean
  }
  sparklineData: number[]
  icon: React.ReactNode
  color: string
}

export interface MemberFilters {
  gender?: Gender
  verificationStatus?: VerificationStatus
  subscriptionTier?: SubscriptionTier
  riskLevel?: RiskLevel
  status?: MemberStatus
  dateRange?: {
    start: Date
    end: Date
  }
  search?: string
}

export interface MemberActivity {
  id: string
  type: 'login' | 'match' | 'message' | 'report' | 'payment' | 'profile_update'
  description: string
  timestamp: Date
}

export interface MemberDetails extends Member {
  activities: MemberActivity[]
  verificationDocs?: VerificationDoc[]
  notes: AdminNote[]
  flagReasons?: string[]
}
