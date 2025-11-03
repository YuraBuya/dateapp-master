export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'super_admin'
  permissions: AdminPermission[]
  profileImage?: string
  createdAt: string
  lastLoginAt: string
  isActive: boolean
  department?: string
}

export interface AdminPermission {
  id: string
  name: string
  resource: string
  actions: ('read' | 'write' | 'delete')[]
  description?: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalMatches: number
  successfulMatches: number
  totalRevenue: number
  monthlyRevenue: number
  pendingVerifications: number
  reportedUsers: number
  newSignupsToday: number
  activeMatchesToday: number
  completedPaymentsToday: number
}

export interface UserManagement {
  id: string
  name: string
  email: string
  phone?: string
  gender: 'male' | 'female'
  age: number
  membershipType: 'female' | 'male' | 'black'
  status: 'active' | 'suspended' | 'pending' | 'banned'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  joinDate: string
  lastActive: string
  profileImage?: string
  location?: string
  occupation?: string
  documents: {
    idCard: DocumentStatus
    marriageCert: DocumentStatus
    graduationCert: DocumentStatus
    employmentCert: DocumentStatus
    familyCert?: DocumentStatus
  }
  preferences?: {
    ageRange: { min: number; max: number }
    location: string[]
    interests: string[]
  }
  activityLog?: ActivityLog[]
}

export interface DocumentStatus {
  status: 'pending' | 'approved' | 'rejected'
  uploadedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectReason?: string
  fileUrl?: string
  notes?: string
}

export interface ActivityLog {
  id: string
  action: string
  timestamp: string
  details?: string
  ipAddress?: string
}

export interface MatchingManagement {
  id: string
  participants: {
    id: string
    name: string
    profileImage?: string
    age: number
    occupation?: string
  }[]
  status: 'active' | 'completed' | 'cancelled' | 'pending_approval'
  createdAt: string
  lastActivity: string
  meetingDate?: string
  location?: string
  surveyCompleted: boolean
  satisfactionScore?: number
  notes?: string
  adminNotes?: string
  chatMessages?: number
}

export interface PaymentManagement {
  id: string
  userId: string
  userName: string
  userEmail: string
  planId: string
  planName: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'
  paymentMethod: string
  transactionId?: string
  createdAt: string
  completedAt?: string
  refundedAt?: string
  refundAmount?: number
  refundReason?: string
  notes?: string
}

export interface AdminNotification {
  id: string
  type: 'user_signup' | 'document_upload' | 'payment' | 'report' | 'system' | 'matching'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionRequired: boolean
  relatedId?: string
  relatedType?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
}

export interface SystemSettings {
  id: string
  key: string
  value: any
  description: string
  category: 'general' | 'payments' | 'matching' | 'notifications' | 'security'
  updatedAt: string
  updatedBy: string
}

export interface ReportManagement {
  id: string
  reportedUserId: string
  reportedUserName: string
  reporterUserId: string
  reporterUserName: string
  type: 'inappropriate_behavior' | 'fake_profile' | 'harassment' | 'spam' | 'other'
  description: string
  evidence?: string[]
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  assignedTo?: string
  createdAt: string
  resolvedAt?: string
  resolution?: string
  adminNotes?: string
}

export interface AdminSession {
  id: string
  adminId: string
  token: string
  createdAt: string
  expiresAt: string
  lastActivity: string
  ipAddress: string
  userAgent: string
  isActive: boolean
}