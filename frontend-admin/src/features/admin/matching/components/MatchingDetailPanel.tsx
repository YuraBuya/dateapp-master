/**
 * Matching Detail Panel Component
 * Premium detail view for matching information
 */

'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Heart, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Briefcase,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag,
  StickyNote,
  Activity,
  Users,
  Ban,
  Send
} from 'lucide-react'
import type { Matching } from '../types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MatchingDetailPanelProps {
  matching: Matching | null
  isOpen: boolean
  onClose: () => void
}

export const MatchingDetailPanel = memo(function MatchingDetailPanel({
  matching,
  isOpen,
  onClose
}: MatchingDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'actions'>('overview')

  if (!matching) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'matched': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'blocked': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return '성공'
      case 'matched': return '매칭됨'
      case 'pending': return '대기중'
      case 'cancelled': return '취소됨'
      case 'blocked': return '차단됨'
      default: return status
    }
  }

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'initial': return '초기 단계'
      case 'conversation': return '대화 중'
      case 'meeting': return '만남 단계'
      case 'relationship': return '관계 발전'
      case 'closed': return '종료'
      default: return stage
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">매칭 상세정보</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Summary Strip */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{matching.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(matching.status)}`}>
                    {getStatusText(matching.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{matching.score}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{matching.messagesCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Cards */}
            <div className="flex-shrink-0 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="grid grid-cols-2 gap-4">
                {/* User 1 */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                      {matching.user1.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{matching.user1.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{matching.user1.age}세</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{matching.user1.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Briefcase className="w-3 h-3" />
                      <span>{matching.user1.occupation}</span>
                    </div>
                  </div>
                </div>

                {/* User 2 */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl">
                      {matching.user2.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{matching.user2.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{matching.user2.age}세</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{matching.user2.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Briefcase className="w-3 h-3" />
                      <span>{matching.user2.occupation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex-shrink-0 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10 backdrop-blur-xl">
              <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-thin">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Activity className="w-5 h-5" />
                  상세정보
                  {activeTab === 'overview' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
                    />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'timeline'
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  타임라인
                  {activeTab === 'timeline' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
                    />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('actions')}
                  className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'actions'
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                  관리 작업
                  {activeTab === 'actions' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 space-y-6"
                  >
                    {/* Compatibility Scores */}
                    {matching.compatibility && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          호환성 점수
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(matching.compatibility).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                  {key === 'overall' ? '전체' :
                                   key === 'interests' ? '관심사' :
                                   key === 'lifestyle' ? '라이프스타일' :
                                   key === 'values' ? '가치관' :
                                   key === 'communication' ? '소통' :
                                   key === 'location' ? '위치' : key}
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{value}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    value >= 90 ? 'bg-green-500' :
                                    value >= 80 ? 'bg-blue-500' :
                                    value >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Match Info */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        매칭 정보
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">매칭일</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {format(matching.matchDate, 'yyyy년 MM월 dd일', { locale: ko })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">현재 단계</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {getStageText(matching.stage)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">마지막 활동</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {format(matching.lastActivity, 'MM/dd HH:mm', { locale: ko })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">총 메시지</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {matching.messagesCount}개
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Flags */}
                    {matching.flags && matching.flags.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          신고 내역
                        </h3>
                        <div className="space-y-2">
                          {matching.flags.map((flag) => (
                            <div key={flag.id} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                                  {flag.type}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  flag.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                  flag.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                  flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }`}>
                                  {flag.severity}
                                </span>
                              </div>
                              <p className="text-xs text-amber-700 dark:text-amber-300">{flag.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Admin Notes */}
                    {matching.adminNotes && matching.adminNotes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <StickyNote className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          관리자 노트
                        </h3>
                        <div className="space-y-2">
                          {matching.adminNotes.map((note) => (
                            <div key={note.id} className={`rounded-lg p-3 ${
                              note.isImportant
                                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                                : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                            }`}>
                              <div className="flex items-start justify-between mb-1">
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">{note.author}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {format(note.createdAt, 'MM/dd HH:mm', { locale: ko })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{note.content}</p>
                              {note.tags && note.tags.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {note.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6"
                  >
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                      {/* Timeline Events */}
                      <div className="space-y-6">
                        {matching.timeline && matching.timeline.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-12"
                          >
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              event.type === 'match_created' ? 'bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border-2 border-pink-500 dark:border-pink-400' :
                              event.type === 'first_message' ? 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-blue-500 dark:border-blue-400' :
                              event.type === 'meet_scheduled' ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-500 dark:border-green-400' :
                              event.type === 'meet_completed' ? 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border-2 border-emerald-500 dark:border-emerald-400' :
                              event.type === 'status_change' ? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-2 border-amber-500 dark:border-amber-400' :
                              event.type === 'admin_action' ? 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-500 dark:border-red-400' :
                              event.type === 'conversation_milestone' ? 'bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 border-2 border-purple-500 dark:border-purple-400' :
                              'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 border-2 border-gray-500 dark:border-gray-400'
                            }`}>
                              {event.type === 'match_created' && <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 fill-pink-600 dark:fill-pink-400" />}
                              {event.type === 'first_message' && <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                              {event.type === 'meet_scheduled' && <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />}
                              {event.type === 'meet_completed' && <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />}
                              {event.type === 'status_change' && <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                              {event.type === 'admin_action' && <Flag className="w-4 h-4 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />}
                              {event.type === 'conversation_milestone' && <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                              {event.type === 'flag_raised' && <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400" />}
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {format(event.timestamp, 'MM/dd HH:mm', { locale: ko })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'actions' && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 space-y-4"
                  >
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">관리자 작업</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-left transition-colors">
                          <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">메시지 보내기</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">양측에게 관리자 메시지 전송</div>
                          </div>
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-left transition-colors">
                          <Flag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">플래그 추가</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">이 매칭에 관리자 플래그 설정</div>
                          </div>
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-left transition-colors">
                          <StickyNote className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">노트 추가</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">관리자 메모 작성</div>
                          </div>
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 text-left transition-colors">
                          <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <div>
                            <div className="text-sm font-semibold text-red-900 dark:text-red-200">매칭 종료</div>
                            <div className="text-xs text-red-700 dark:text-red-300">이 매칭을 강제로 종료합니다</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Add Note Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">새 노트 작성</h3>
                      <textarea
                        placeholder="관리자 노트를 입력하세요..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <input type="checkbox" className="rounded" />
                          중요 표시
                        </label>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold transition-all">
                          저장
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})

