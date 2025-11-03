/**
 * Matching Management Constants
 * Mock data and configuration for matching management
 */

import type { Matching } from './types'

export const MOCK_MATCHINGS: Matching[] = [
  {
    id: 'MTH001',
    user1: { 
      id: 'M001',
      name: '김민수', 
      age: 32, 
      avatar: '👨',
      city: '서울',
      occupation: '소프트웨어 엔지니어',
      photos: ['/mock/profile1.jpg', '/mock/profile2.jpg']
    },
    user2: { 
      id: 'F001',
      name: '이영희', 
      age: 28, 
      avatar: '👩',
      city: '서울',
      occupation: '디자이너',
      photos: ['/mock/profile3.jpg', '/mock/profile4.jpg']
    },
    status: 'matched',
    matchDate: new Date('2024-03-01'),
    score: 92,
    stage: 'conversation',
    messagesCount: 47,
    lastActivity: new Date('2025-10-31T10:30:00'),
    compatibility: {
      overall: 92,
      interests: 95,
      lifestyle: 88,
      values: 90,
      communication: 94,
      location: 100
    },
    interactions: [
      {
        id: 'INT001',
        type: 'like',
        from: 'M001',
        to: 'F001',
        timestamp: new Date('2024-03-01T09:00:00')
      },
      {
        id: 'INT002',
        type: 'like',
        from: 'F001',
        to: 'M001',
        timestamp: new Date('2024-03-01T09:15:00')
      },
      {
        id: 'INT003',
        type: 'message',
        from: 'M001',
        to: 'F001',
        timestamp: new Date('2024-03-01T10:00:00'),
        content: '안녕하세요! 프로필 보고 인사드립니다.'
      }
    ],
    timeline: [
      {
        id: 'TL001',
        type: 'match_created',
        title: '매칭 성사',
        description: '양측 모두 좋아요를 눌러 매칭이 성사되었습니다.',
        timestamp: new Date('2024-03-01T09:15:00')
      },
      {
        id: 'TL002',
        type: 'first_message',
        title: '첫 메시지',
        description: '김민수님이 첫 메시지를 보냈습니다.',
        timestamp: new Date('2024-03-01T10:00:00'),
        actor: 'M001'
      },
      {
        id: 'TL003',
        type: 'conversation_milestone',
        title: '대화 활성화',
        description: '10개 이상의 메시지를 주고받았습니다.',
        timestamp: new Date('2024-03-02T15:30:00')
      }
    ],
    flags: [],
    adminNotes: [
      {
        id: 'NOTE001',
        content: '활발한 대화가 진행 중입니다. 긍정적인 신호.',
        author: 'Admin Kim',
        createdAt: new Date('2024-03-03T09:00:00'),
        isImportant: false,
        tags: ['positive', 'active']
      }
    ]
  },
  {
    id: 'MTH002',
    user1: { 
      id: 'M002',
      name: '박철수', 
      age: 35, 
      avatar: '👨',
      city: '부산',
      occupation: '의사',
      photos: ['/mock/profile5.jpg']
    },
    user2: { 
      id: 'F002',
      name: '정미진', 
      age: 29, 
      avatar: '👩',
      city: '부산',
      occupation: '간호사',
      photos: ['/mock/profile6.jpg']
    },
    status: 'pending',
    matchDate: new Date('2024-03-02'),
    score: 85,
    stage: 'initial',
    messagesCount: 12,
    lastActivity: new Date('2025-10-30T18:20:00'),
    compatibility: {
      overall: 85,
      interests: 80,
      lifestyle: 90,
      values: 88,
      communication: 82,
      location: 100
    },
    interactions: [
      {
        id: 'INT004',
        type: 'like',
        from: 'M002',
        to: 'F002',
        timestamp: new Date('2024-03-02T08:00:00')
      }
    ],
    timeline: [
      {
        id: 'TL004',
        type: 'match_created',
        title: '매칭 대기',
        description: '박철수님이 좋아요를 보냈습니다.',
        timestamp: new Date('2024-03-02T08:00:00')
      }
    ],
    flags: [],
    adminNotes: []
  },
  {
    id: 'MTH003',
    user1: { 
      id: 'M003',
      name: '최영호', 
      age: 30, 
      avatar: '👨',
      city: '인천',
      occupation: '교사',
      photos: ['/mock/profile7.jpg']
    },
    user2: { 
      id: 'F003',
      name: '김수연', 
      age: 27, 
      avatar: '👩',
      city: '인천',
      occupation: '회계사',
      photos: ['/mock/profile8.jpg']
    },
    status: 'success',
    matchDate: new Date('2024-02-28'),
    score: 88,
    stage: 'meeting',
    messagesCount: 156,
    lastActivity: new Date('2025-10-31T15:45:00'),
    compatibility: {
      overall: 88,
      interests: 85,
      lifestyle: 92,
      values: 90,
      communication: 87,
      location: 100
    },
    interactions: [
      {
        id: 'INT005',
        type: 'meet_request',
        from: 'M003',
        to: 'F003',
        timestamp: new Date('2024-03-10T14:00:00')
      },
      {
        id: 'INT006',
        type: 'meet_confirmed',
        from: 'F003',
        to: 'M003',
        timestamp: new Date('2024-03-10T15:00:00')
      }
    ],
    timeline: [
      {
        id: 'TL005',
        type: 'match_created',
        title: '매칭 성사',
        description: '양측 모두 좋아요를 눌러 매칭이 성사되었습니다.',
        timestamp: new Date('2024-02-28T10:00:00')
      },
      {
        id: 'TL006',
        type: 'meet_scheduled',
        title: '만남 예정',
        description: '3월 15일 만남이 예정되었습니다.',
        timestamp: new Date('2024-03-10T15:00:00')
      },
      {
        id: 'TL007',
        type: 'meet_completed',
        title: '만남 완료',
        description: '첫 만남이 성공적으로 완료되었습니다.',
        timestamp: new Date('2024-03-15T20:00:00')
      }
    ],
    flags: [],
    adminNotes: [
      {
        id: 'NOTE002',
        content: '첫 만남 후 긍정적인 피드백. 관계 발전 가능성 높음.',
        author: 'Admin Lee',
        createdAt: new Date('2024-03-16T09:00:00'),
        isImportant: true,
        tags: ['success', 'meeting-completed']
      }
    ]
  }
]

