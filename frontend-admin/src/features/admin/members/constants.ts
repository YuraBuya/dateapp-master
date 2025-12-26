/**
 * Members Management Constants
 * Static data and configuration
 */

import { Users, UserPlus, Activity, Crown, CheckCircle, AlertTriangle, Flag } from 'lucide-react'
import type { Member } from './types'

export type MemberStatus =
  | 'active'
  | 'suspended'
  | 'inactive'
  | 'pending'
  | 'flagged'

// Mock member data for development
export const MOCK_MEMBERS: Member[] = [
  {
    id: 'M001',
    avatar: '/images/profiles/female-profile.svg',
    name: '김민지',
    age: 28,
    gender: 'female',
    city: '서울',
    subscriptionTier: 'premium',
    verificationStatus: 'verified',
    lastActive: new Date('2025-10-31T10:30:00'),
    matchesCount: 12,
    reportsCount: 0,
    riskScore: 15,
    riskLevel: 'low',
    status: 'active',
    joinDate: new Date('2025-01-15'),
    email: 'kim***@example.com',
    phone: '010-****-5678',
    bio: '진지한 만남을 원합니다. 서로 존중하며 함께 성장할 수 있는 사람과의 인연을 기대합니다.',
    photos: ['/images/profiles/female-profile.svg'],
    messagesLast30d: 45,
    preferences: {
      ageRange: { min: 28, max: 35 },
      location: ['서울', '경기'],
      interests: ['영화', '독서', '여행', '요리']
    },
    verificationDocs: [
      {
        id: 'D001',
        type: 'id_card',
        url: '/docs/id_001.jpg',
        status: 'verified',
        uploadedAt: new Date('2025-01-16'),
        reviewedAt: new Date('2025-01-17')
      },
      {
        id: 'D002',
        type: 'selfie',
        url: '/docs/selfie_001.jpg',
        status: 'verified',
        uploadedAt: new Date('2025-01-16'),
        reviewedAt: new Date('2025-01-17')
      }
    ],
    timeline: [
      {
        id: 'T001',
        type: 'signup',
        title: '회원 가입',
        description: '플랫폼에 새로 가입했습니다.',
        timestamp: new Date('2025-01-15T09:00:00'),
        icon: '👋'
      },
      {
        id: 'T002',
        type: 'document_upload',
        title: '인증 서류 제출',
        description: '신분증 및 셀카 인증을 제출했습니다.',
        timestamp: new Date('2025-01-16T14:30:00'),
        icon: '📄'
      },
      {
        id: 'T003',
        type: 'match',
        title: '첫 매칭 성공',
        description: '이준호 회원과 매칭되었습니다.',
        timestamp: new Date('2025-01-20T10:00:00'),
        icon: '💕'
      }
    ],
    adminNotes: [
      {
        id: 'N001',
        content: '매우 활발한 사용자입니다. 긍정적인 피드백 다수.',
        author: 'Admin Kim',
        createdAt: new Date('2025-02-01T10:00:00'),
        isImportant: false
      }
    ],
    auditLogs: [
      {
        id: 'A001',
        action: '인증 승인',
        performedBy: 'Admin Park',
        timestamp: new Date('2025-01-17T10:00:00'),
        details: '신분증 및 셀카 인증을 승인했습니다.'
      }
    ]
  },
  {
    id: 'M002',
    avatar: '/images/profiles/male-profile.svg',
    name: '이준호',
    age: 32,
    gender: 'male',
    city: '부산',
    subscriptionTier: 'vip',
    verificationStatus: 'verified',
    lastActive: new Date('2025-10-31T15:20:00'),
    matchesCount: 24,
    reportsCount: 0,
    riskScore: 10,
    riskLevel: 'low',
    status: 'active',
    joinDate: new Date('2024-11-20'),
    email: 'lee***@example.com',
    phone: '010-****-1234',
    bio: '성실한 사람을 찾습니다. 진지한 만남을 원하며, 가족과 친구를 소중히 여깁니다.',
    photos: ['/images/profiles/male-profile.svg'],
    messagesLast30d: 120,
    preferences: {
      ageRange: { min: 25, max: 32 },
      location: ['부산', '울산'],
      interests: ['운동', '음악', '카페']
    },
    verificationDocs: [
      {
        id: 'D003',
        type: 'passport',
        url: '/docs/passport_001.jpg',
        status: 'verified',
        uploadedAt: new Date('2024-11-21'),
        reviewedAt: new Date('2024-11-22')
      }
    ],
    timeline: [
      {
        id: 'T004',
        type: 'signup',
        title: '회원 가입',
        description: 'VIP 플랜으로 가입했습니다.',
        timestamp: new Date('2024-11-20T08:00:00'),
        icon: '🌟'
      }
    ],
    adminNotes: [],
    auditLogs: []
  },
  {
    id: 'M003',
    avatar: '/images/profiles/female-profile.svg',
    name: '박서연',
    age: 26,
    gender: 'female',
    city: '인천',
    subscriptionTier: 'basic',
    verificationStatus: 'pending',
    lastActive: new Date('2025-10-30T20:15:00'),
    matchesCount: 5,
    reportsCount: 1,
    riskScore: 45,
    riskLevel: 'medium',
    status: 'active',
    joinDate: new Date('2025-09-10'),
    email: 'park***@example.com',
    phone: '010-****-9876',
    bio: '좋은 인연을 기다립니다.',
    photos: ['/images/profiles/female-profile.svg'],
    messagesLast30d: 15,
    preferences: {
      ageRange: { min: 26, max: 33 },
      location: ['인천', '서울'],
      interests: ['쇼핑', '카페']
    },
    verificationDocs: [
      {
        id: 'D004',
        type: 'id_card',
        url: '/docs/id_003.jpg',
        status: 'pending',
        uploadedAt: new Date('2025-09-11')
      }
    ],
    riskSignals: [
      {
        id: 'R001',
        type: 'spam_score',
        severity: 'medium',
        confidence: 0.65,
        description: '짧은 시간 내에 많은 메시지를 전송한 이력이 있습니다.',
        detectedAt: new Date('2025-10-15T14:00:00'),
        recommendation: '사용자 행동을 모니터링하고 필요시 경고를 발송하세요.'
      }
    ],
    timeline: [
      {
        id: 'T005',
        type: 'report',
        title: '신고 접수',
        description: '다른 사용자로부터 부적절한 메시지 신고를 받았습니다.',
        timestamp: new Date('2025-10-15T14:00:00'),
        icon: '⚠️'
      }
    ],
    adminNotes: [
      {
        id: 'N002',
        content: '신고 건 조사 중. 추가 모니터링 필요.',
        author: 'Admin Lee',
        createdAt: new Date('2025-10-16T09:00:00'),
        isImportant: true
      }
    ],
    auditLogs: []
  },
  {
    id: 'M004',
    avatar: '/images/profiles/male-profile.svg',
    name: '최동욱',
    age: 35,
    gender: 'male',
    city: '대구',
    subscriptionTier: 'premium',
    verificationStatus: 'verified',
    lastActive: new Date('2025-10-29T18:00:00'),
    matchesCount: 18,
    reportsCount: 2,
    riskScore: 65,
    riskLevel: 'high',
    status: 'flagged',
    joinDate: new Date('2025-03-05'),
    email: 'choi***@example.com',
    phone: '010-****-3456',
    bio: '진심으로 만남을 원합니다.',
    flags: ['부적절한 메시지', '프로필 사진 문제'],
    photos: ['/images/profiles/male-profile.svg'],
    messagesLast30d: 200,
    preferences: {
      ageRange: { min: 20, max: 35 },
      location: ['대구', '경북'],
      interests: ['게임', '영화']
    },
    verificationDocs: [
      {
        id: 'D005',
        type: 'id_card',
        url: '/docs/id_004.jpg',
        status: 'verified',
        uploadedAt: new Date('2025-03-06'),
        reviewedAt: new Date('2025-03-07')
      }
    ],
    riskSignals: [
      {
        id: 'R002',
        type: 'behavior_anomaly',
        severity: 'high',
        confidence: 0.85,
        description: '짧은 시간 내에 다수의 회원에게 동일한 메시지를 전송했습니다.',
        detectedAt: new Date('2025-10-20T10:00:00'),
        recommendation: '계정을 정지하고 사용자에게 경고를 발송하세요.'
      },
      {
        id: 'R003',
        type: 'photo_mismatch',
        severity: 'medium',
        confidence: 0.70,
        description: '프로필 사진과 인증 셀카 간에 불일치가 감지되었습니다.',
        detectedAt: new Date('2025-10-22T15:00:00'),
        recommendation: '추가 인증을 요청하거나 프로필 사진을 교체하도록 안내하세요.'
      }
    ],
    timeline: [
      {
        id: 'T006',
        type: 'report',
        title: '신고 접수 (1)',
        description: '부적절한 메시지로 신고되었습니다.',
        timestamp: new Date('2025-10-20T10:00:00'),
        icon: '🚨'
      },
      {
        id: 'T007',
        type: 'report',
        title: '신고 접수 (2)',
        description: '또 다른 사용자로부터 신고를 받았습니다.',
        timestamp: new Date('2025-10-22T15:00:00'),
        icon: '🚨'
      },
      {
        id: 'T008',
        type: 'admin_action',
        title: '경고 발송',
        description: 'Admin Choi가 사용자에게 경고 메시지를 발송했습니다.',
        timestamp: new Date('2025-10-23T09:00:00'),
        icon: '⚠️'
      }
    ],
    adminNotes: [
      {
        id: 'N003',
        content: '다수의 신고를 받았습니다. 계정 정지 고려 중.',
        author: 'Admin Choi',
        createdAt: new Date('2025-10-23T09:00:00'),
        isImportant: true
      }
    ],
    auditLogs: [
      {
        id: 'A002',
        action: '경고 발송',
        performedBy: 'Admin Choi',
        timestamp: new Date('2025-10-23T09:00:00'),
        reason: '부적절한 메시지 반복',
        details: '사용자에게 경고 메시지를 발송하고 행동을 모니터링 중입니다.'
      }
    ]
  },
  {
    id: 'M005',
    avatar: '/images/profiles/female-profile.svg',
    name: '정수아',
    age: 29,
    gender: 'female',
    city: '광주',
    subscriptionTier: 'vip',
    verificationStatus: 'verified',
    lastActive: new Date('2025-10-31T16:45:00'),
    matchesCount: 30,
    reportsCount: 0,
    riskScore: 5,
    riskLevel: 'low',
    status: 'active',
    joinDate: new Date('2024-08-12'),
    email: 'jung***@example.com',
    phone: '010-****-7890',
    bio: '좋은 사람 만나고 싶어요. 함께 성장하고 서로를 응원할 수 있는 관계를 원합니다.',
    photos: ['/images/profiles/female-profile.svg'],
    messagesLast30d: 180,
    preferences: {
      ageRange: { min: 28, max: 38 },
      location: ['광주', '전남'],
      interests: ['운동', '요가', '명상', '독서']
    },
    verificationDocs: [
      {
        id: 'D006',
        type: 'passport',
        url: '/docs/passport_002.jpg',
        status: 'verified',
        uploadedAt: new Date('2024-08-13'),
        reviewedAt: new Date('2024-08-14')
      },
      {
        id: 'D007',
        type: 'selfie',
        url: '/docs/selfie_005.jpg',
        status: 'verified',
        uploadedAt: new Date('2024-08-13'),
        reviewedAt: new Date('2024-08-14')
      }
    ],
    timeline: [
      {
        id: 'T009',
        type: 'signup',
        title: '회원 가입',
        description: 'VIP 플랜으로 가입했습니다.',
        timestamp: new Date('2024-08-12T10:00:00'),
        icon: '💎'
      },
      {
        id: 'T010',
        type: 'payment',
        title: 'VIP 구독 갱신',
        description: 'VIP 플랜을 1년 연장했습니다.',
        timestamp: new Date('2025-08-12T10:00:00'),
        icon: '💳'
      }
    ],
    adminNotes: [
      {
        id: 'N004',
        content: '모범적인 사용자입니다. 긍정적인 피드백이 많습니다.',
        author: 'Admin Kim',
        createdAt: new Date('2025-05-10T11:00:00'),
        isImportant: false
      }
    ],
    auditLogs: []
  }
]

// KPI Icons
export const KPI_ICONS = {
  totalMembers: Users,
  newSignups: UserPlus,
  activeToday: Activity,
  premiumSubscribers: Crown,
  verifiedPercent: CheckCircle,
  flaggedUsers: AlertTriangle,
  reportsPending: Flag
}

// Color mappings
export const TIER_COLORS = {
  basic: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800',
  premium: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  vip: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
}

export const RISK_COLORS = {
  low: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  high: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
  critical: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
}

export const STATUS_COLORS: Record<MemberStatus, string> = {
  active: 'bg-green-100 text-green-700',
  suspended: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-700',
  pending: 'bg-blue-100 text-blue-700',
  flagged: 'bg-red-100 text-red-700',
}

export const VERIFICATION_COLORS = {
  verified: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  pending: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  rejected: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
  none: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
}

// Table columns configuration
export const TABLE_COLUMNS = [
  { id: 'avatar', label: '', width: '60px', sortable: false },
  { id: 'id', label: 'ID', width: '80px', sortable: true },
  { id: 'name', label: '이름', width: '120px', sortable: true },
  { id: 'age', label: '나이', width: '60px', sortable: true },
  { id: 'gender', label: '성별', width: '70px', sortable: true },
  { id: 'city', label: '지역', width: '100px', sortable: true },
  { id: 'subscriptionTier', label: '등급', width: '100px', sortable: true },
  { id: 'verificationStatus', label: '인증', width: '90px', sortable: true },
  { id: 'lastActive', label: '최근 활동', width: '130px', sortable: true },
  { id: 'matchesCount', label: '매칭', width: '70px', sortable: true },
  { id: 'reportsCount', label: '신고', width: '70px', sortable: true },
  { id: 'riskScore', label: '위험도', width: '80px', sortable: true },
  { id: 'actions', label: '작업', width: '120px', sortable: false }
]

