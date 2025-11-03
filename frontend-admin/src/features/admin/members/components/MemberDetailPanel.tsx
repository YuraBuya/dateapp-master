/**
 * Member Detail Panel Component
 * Premium slide-in panel with comprehensive member details and admin actions
 */

'use client'

import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, FileText, History, AlertTriangle, Shield, StickyNote } from 'lucide-react'
import type { Member } from '../types'
import {
  MemberSummaryStrip,
  ProfileCarousel,
  AdminActions,
  HistoryTimeline,
  RiskSignals,
  DocumentPreview,
  NotesAudit
} from './detail-panel'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MemberDetailPanelProps {
  member: Member | null
  isOpen: boolean
  onClose: () => void
}

export const MemberDetailPanel = memo(function MemberDetailPanel({
  member,
  isOpen,
  onClose
}: MemberDetailPanelProps) {
  const [activeSection, setActiveSection] = useState<'profile' | 'timeline' | 'risk' | 'docs' | 'notes'>('profile')

  // Admin action handlers (would be connected to actual API calls)
  const handleSendMessage = useCallback((memberId: string) => {
    console.log('Send message to:', memberId)
    // TODO: Implement message sending
  }, [])

  const handleImpersonate = useCallback((memberId: string) => {
    console.log('Impersonate user:', memberId)
    // TODO: Implement impersonation with audit logging
  }, [])

  const handleSuspend = useCallback((memberId: string, reason: string) => {
    console.log('Suspend user:', memberId, 'Reason:', reason)
    // TODO: Implement suspension with audit logging
  }, [])

  const handleRestore = useCallback((memberId: string) => {
    console.log('Restore user:', memberId)
    // TODO: Implement restoration with audit logging
  }, [])

  const handleAdjustTier = useCallback((memberId: string, tier: string) => {
    console.log('Adjust tier for:', memberId, 'New tier:', tier)
    // TODO: Implement tier adjustment with audit logging
  }, [])

  const handleIssueRefund = useCallback((memberId: string) => {
    console.log('Issue refund for:', memberId)
    // TODO: Implement refund flow
  }, [])

  const handleAddNote = useCallback((memberId: string, note: string) => {
    console.log('Add note for:', memberId, 'Note:', note)
    // TODO: Implement note addition with audit logging
  }, [])

  const handleRevealPII = useCallback((docId: string) => {
    console.log('Reveal PII for document:', docId)
    // TODO: Implement PII reveal with 2FA and audit logging
  }, [])

  if (!member) return null

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[520px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-detail-title"
          >
            {/* Summary Strip (Sticky Header) */}
            <MemberSummaryStrip member={member} onClose={onClose} />

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {/* Premium Section Navigation - Sticky with Gradient */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm">
                <div className="flex gap-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-600">
                  <button
                    onClick={() => setActiveSection('profile')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'profile'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <User className={`w-5 h-5 ${activeSection === 'profile' ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                    <span>프로필</span>
                    {activeSection === 'profile' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('timeline')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'timeline'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <History className={`w-5 h-5 ${activeSection === 'timeline' ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                    <span>활동</span>
                    {activeSection === 'timeline' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('risk')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'risk'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <AlertTriangle className={`w-5 h-5 ${activeSection === 'risk' ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                    <span>위험</span>
                    {member.riskSignals && member.riskSignals.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-md"
                      >
                        {member.riskSignals.length}
                      </motion.span>
                    )}
                    {activeSection === 'risk' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('docs')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'docs'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <FileText className={`w-5 h-5 ${activeSection === 'docs' ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                    <span>서류</span>
                    {activeSection === 'docs' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveSection('notes')}
                    className={`relative flex items-center gap-3 px-6 py-4 font-bold text-[17px] whitespace-nowrap transition-all duration-300 ${
                      activeSection === 'notes'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <StickyNote className={`w-5 h-5 ${activeSection === 'notes' ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                    <span>노트</span>
                    {activeSection === 'notes' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                {/* Profile Section */}
                {activeSection === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Photo & Basic Info */}
                      <div className="space-y-4">
                        <ProfileCarousel member={member} />

                        {/* Basic Info Card */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">기본 정보</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">나이</span>
                              <span className="font-medium text-gray-900 dark:text-white">{member.age}세</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">성별</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {member.gender === 'male' ? '남성' : member.gender === 'female' ? '여성' : '기타'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">지역</span>
                              <span className="font-medium text-gray-900 dark:text-white">{member.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">가입일</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {format(member.joinDate, 'yyyy-MM-dd', { locale: ko })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info (Masked) */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">연락처 (보호됨)</h4>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-blue-600 dark:text-blue-400 text-xs">이메일</span>
                              <p className="font-mono text-blue-900 dark:text-blue-200">{member.email}</p>
                            </div>
                            <div>
                              <span className="text-blue-600 dark:text-blue-400 text-xs">전화번호</span>
                              <p className="font-mono text-blue-900 dark:text-blue-200">{member.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Admin Actions */}
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">관리자 작업</h4>
                          <AdminActions
                            member={member}
                            onSendMessage={handleSendMessage}
                            onImpersonate={handleImpersonate}
                            onSuspend={handleSuspend}
                            onRestore={handleRestore}
                            onAdjustTier={handleAdjustTier}
                            onIssueRefund={handleIssueRefund}
                            onAddNote={handleAddNote}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">자기소개</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {member.bio}
                        </p>
                      </div>
                    )}

                    {/* Preferences */}
                    {member.preferences && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">선호 조건</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">희망 나이</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {member.preferences.ageRange.min}세 ~ {member.preferences.ageRange.max}세
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">희망 지역</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {member.preferences.location.join(', ')}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400 block mb-1">관심사</span>
                            <div className="flex flex-wrap gap-2">
                              {member.preferences.interests.map((interest, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Timeline Section */}
                {activeSection === 'timeline' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <HistoryTimeline events={member.timeline || []} />
                  </motion.div>
                )}

                {/* Risk Section */}
                {activeSection === 'risk' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <RiskSignals signals={member.riskSignals || []} />
                  </motion.div>
                )}

                {/* Documents Section */}
                {activeSection === 'docs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <DocumentPreview
                      documents={member.verificationDocs || []}
                      onRevealPII={handleRevealPII}
                    />
                  </motion.div>
                )}

                {/* Notes & Audit Section */}
                {activeSection === 'notes' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <NotesAudit
                      notes={member.adminNotes || []}
                      auditLogs={member.auditLogs || []}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})
