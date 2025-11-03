import { create } from 'zustand'
import { DashboardStats, AdminNotification } from '../types/admin'

interface AdminDashboardState {
  stats: DashboardStats | null
  notifications: AdminNotification[]
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
  autoRefresh: boolean
  refreshInterval: number
  fetchStats: () => Promise<void>
  fetchNotifications: () => Promise<void>
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  deleteNotification: (notificationId: string) => void
  refreshData: () => Promise<void>
  setAutoRefresh: (enabled: boolean) => void
  clearError: () => void
}

const mockStats: DashboardStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalMatches: 456,
  successfulMatches: 234,
  totalRevenue: 45600000,
  monthlyRevenue: 12300000,
  pendingVerifications: 23,
  reportedUsers: 7,
  newSignupsToday: 15,
  activeMatchesToday: 8,
  completedPaymentsToday: 12
}

const generateMockNotifications = (): AdminNotification[] => [
  {
    id: '1',
    type: 'document_upload',
    title: '새로운 서류 업로드',
    message: '김민수님이 신분증을 업로드했습니다.',
    isRead: false,
    createdAt: new Date().toISOString(),
    actionRequired: true,
    relatedId: 'user_123',
    relatedType: 'user',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'user_signup',
    title: '신규 회원 가입',
    message: '박영희님이 가입했습니다.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actionRequired: false,
    relatedId: 'user_124',
    relatedType: 'user',
    priority: 'low'
  },
  {
    id: '3',
    type: 'payment',
    title: '결제 완료',
    message: '이정우님이 Black 멤버십을 결제했습니다.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    actionRequired: false,
    relatedId: 'payment_456',
    relatedType: 'payment',
    priority: 'low'
  },
  {
    id: '4',
    type: 'report',
    title: '사용자 신고',
    message: '부적절한 행동으로 신고가 접수되었습니다.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    actionRequired: true,
    relatedId: 'report_789',
    relatedType: 'report',
    priority: 'high'
  },
  {
    id: '5',
    type: 'system',
    title: '시스템 점검 완료',
    message: '정기 시스템 점검이 완료되었습니다.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    actionRequired: false,
    priority: 'low'
  },
  {
    id: '6',
    type: 'matching',
    title: '매칭 성사',
    message: '새로운 매칭이 성사되었습니다.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    actionRequired: false,
    relatedId: 'match_789',
    relatedType: 'matching',
    priority: 'medium'
  }
]

export const useAdminDashboardStore = create<AdminDashboardState>((set, get) => ({
  stats: mockStats, // 기본값으로 초기화
  notifications: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  autoRefresh: false,
  refreshInterval: 30000, // 30 seconds

  fetchStats: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Add some realistic variations
      const variationStats = {
        ...mockStats,
        activeUsers: mockStats.activeUsers + Math.floor(Math.random() * 40) - 20,
        pendingVerifications: Math.max(0, mockStats.pendingVerifications + Math.floor(Math.random() * 10) - 5),
        reportedUsers: Math.max(0, mockStats.reportedUsers + Math.floor(Math.random() * 6) - 3),
        newSignupsToday: Math.max(0, mockStats.newSignupsToday + Math.floor(Math.random() * 10) - 5),
        activeMatchesToday: Math.max(0, mockStats.activeMatchesToday + Math.floor(Math.random() * 8) - 4),
        completedPaymentsToday: Math.max(0, mockStats.completedPaymentsToday + Math.floor(Math.random() * 8) - 4)
      }

      set({ 
        stats: variationStats, 
        isLoading: false,
        lastUpdated: Date.now()
      })
    } catch (error) {
      set({ 
        error: '통계 데이터를 불러오는데 실패했습니다.', 
        isLoading: false 
      })
    }
  },

  fetchNotifications: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ notifications: generateMockNotifications() })
    } catch (error) {
      set({ error: '알림을 불러오는데 실패했습니다.' })
    }
  },

  markNotificationAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    }))
  },

  markAllNotificationsAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({
        ...notification,
        isRead: true
      }))
    }))
  },

  deleteNotification: (notificationId) => {
    set(state => ({
      notifications: state.notifications.filter(
        notification => notification.id !== notificationId
      )
    }))
  },

  refreshData: async () => {
    const { fetchStats, fetchNotifications } = get()
    await Promise.all([fetchStats(), fetchNotifications()])
  },

  setAutoRefresh: (enabled) => {
    set({ autoRefresh: enabled })
  },

  clearError: () => {
    set({ error: null })
  }
}))