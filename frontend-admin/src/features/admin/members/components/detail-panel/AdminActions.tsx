/**
 * Admin Actions Panel
 * Primary CTA buttons for admin operations with confirmation modals
 */

'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Eye,
  Ban,
  PlayCircle,
  Crown,
  DollarSign,
  StickyNote,
  X,
  AlertTriangle
} from 'lucide-react'
import type { Member } from '../../types'

interface AdminActionsProps {
  member: Member
  onSendMessage: (memberId: string) => void
  onImpersonate: (memberId: string) => void
  onSuspend: (memberId: string, reason: string) => void
  onRestore: (memberId: string) => void
  onAdjustTier: (memberId: string, tier: string) => void
  onIssueRefund: (memberId: string) => void
  onAddNote: (memberId: string, note: string) => void
}

export const AdminActions = memo(function AdminActions({
  member,
  onSendMessage,
  onImpersonate,
  onSuspend,
  onRestore,
  onAdjustTier,
  onIssueRefund,
  onAddNote
}: AdminActionsProps) {
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showTierModal, setShowTierModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [suspendReason, setSuspendReason] = useState('')
  const [selectedTier, setSelectedTier] = useState(member.subscriptionTier)
  const [noteText, setNoteText] = useState('')

  const handleSuspend = () => {
    if (suspendReason.trim()) {
      onSuspend(member.id, suspendReason)
      setShowSuspendModal(false)
      setSuspendReason('')
    }
  }

  const handleTierChange = () => {
    if (selectedTier !== member.subscriptionTier) {
      onAdjustTier(member.id, selectedTier)
      setShowTierModal(false)
    }
  }

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddNote(member.id, noteText)
      setShowNoteModal(false)
      setNoteText('')
    }
  }

  return (
    <>
      <div className="space-y-3">
        {/* Primary Actions */}
        <button
          onClick={() => onSendMessage(member.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          내부 메시지 보내기
        </button>

        <button
          onClick={() => onImpersonate(member.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Eye className="w-5 h-5" />
          사용자 뷰로 보기
        </button>

        {/* Tier Management */}
        <button
          onClick={() => setShowTierModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Crown className="w-5 h-5" />
          구독 등급 변경
        </button>

        {/* Billing */}
        <button
          onClick={() => onIssueRefund(member.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <DollarSign className="w-5 h-5" />
          환불/결제 조정
        </button>

        {/* Notes */}
        <button
          onClick={() => setShowNoteModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <StickyNote className="w-5 h-5" />
          관리자 노트 추가
        </button>

        {/* Suspend/Restore */}
        {member.status === 'suspended' ? (
          <button
            onClick={() => onRestore(member.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <PlayCircle className="w-5 h-5" />
            계정 복구
          </button>
        ) : (
          <button
            onClick={() => setShowSuspendModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Ban className="w-5 h-5" />
            계정 정지
          </button>
        )}
      </div>

      {/* Suspend Modal */}
      <AnimatePresence>
        {showSuspendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowSuspendModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">계정 정지 확인</h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>{member.name}</strong> 회원의 계정을 정지하시겠습니까? 정지 사유를 입력해주세요.
              </p>

              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="정지 사유를 입력하세요..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowSuspendModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSuspend}
                  disabled={!suspendReason.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  정지 실행
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tier Change Modal */}
      <AnimatePresence>
        {showTierModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowTierModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">구독 등급 변경</h3>

              <div className="space-y-2 mb-4">
                {(['basic', 'premium', 'vip'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedTier === tier
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{tier.toUpperCase()}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tier === 'basic' && '기본 등급'}
                      {tier === 'premium' && '프리미엄 등급'}
                      {tier === 'vip' && 'VIP 등급'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTierModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleTierChange}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
                >
                  변경 저장
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowNoteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">관리자 노트 추가</h3>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="노트 내용을 입력하세요..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={6}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  노트 추가
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

