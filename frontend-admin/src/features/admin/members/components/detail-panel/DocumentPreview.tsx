/**
 * Document Preview Component
 * Display verification documents with PII protection and required documents checklist
 */

'use client'

import { memo, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, EyeOff, Shield, CheckCircle, XCircle, Clock, AlertCircle, Upload, CreditCard, Briefcase, Home, DollarSign } from 'lucide-react'
import type { VerificationDoc, RequiredDocument } from '../../types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface DocumentPreviewProps {
  documents: VerificationDoc[]
  onRevealPII: (docId: string) => void
}

// 필수 서류 목록 정의
const REQUIRED_DOCUMENTS: RequiredDocument[] = [
  {
    type: 'passport',
    name: '여권',
    description: '유효한 여권 사본',
    isRequired: true,
    icon: 'passport'
  },
  {
    type: 'id_card',
    name: '신분증',
    description: '주민등록증 또는 운전면허증',
    isRequired: true,
    icon: 'id'
  },
  {
    type: 'selfie',
    name: '셀카 인증',
    description: '신분증과 함께 찍은 셀카',
    isRequired: true,
    icon: 'camera'
  },
  {
    type: 'income_proof',
    name: '소득 증명',
    description: '급여명세서 또는 소득금액증명원',
    isRequired: false,
    icon: 'dollar'
  },
  {
    type: 'employment_proof',
    name: '재직 증명',
    description: '재직증명서 또는 사업자등록증',
    isRequired: false,
    icon: 'briefcase'
  },
  {
    type: 'residence_card',
    name: '거주 증명',
    description: '주민등록등본 또는 거소증명서',
    isRequired: false,
    icon: 'home'
  }
]

const statusColors = {
  verified: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  none: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

const statusIcons = {
  verified: CheckCircle,
  pending: Clock,
  rejected: XCircle,
  none: FileText
}

export const DocumentPreview = memo(function DocumentPreview({
  documents,
  onRevealPII
}: DocumentPreviewProps) {
  const [revealedDocs, setRevealedDocs] = useState<Set<string>>(new Set())
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [twoFACode, setTwoFACode] = useState('')

  // 서류 제출 현황 계산
  const documentStatus = useMemo(() => {
    const submitted = new Map(documents.map(doc => [doc.type, doc]))
    return REQUIRED_DOCUMENTS.map(reqDoc => ({
      ...reqDoc,
      submittedDoc: submitted.get(reqDoc.type),
      isSubmitted: submitted.has(reqDoc.type)
    }))
  }, [documents])

  const completionStats = useMemo(() => {
    const required = documentStatus.filter(d => d.isRequired)
    const optional = documentStatus.filter(d => !d.isRequired)
    return {
      requiredTotal: required.length,
      requiredCompleted: required.filter(d => d.isSubmitted && d.submittedDoc?.status === 'verified').length,
      optionalTotal: optional.length,
      optionalCompleted: optional.filter(d => d.isSubmitted && d.submittedDoc?.status === 'verified').length
    }
  }, [documentStatus])

  const handleRevealRequest = (docId: string) => {
    setSelectedDocId(docId)
    setShow2FAModal(true)
  }

  const handleRevealConfirm = () => {
    if (twoFACode.length === 6 && selectedDocId) {
      onRevealPII(selectedDocId)
      setRevealedDocs(prev => new Set(prev).add(selectedDocId))
      setShow2FAModal(false)
      setTwoFACode('')
      setSelectedDocId(null)
    }
  }

  return (
    <>
      {/* 필수 서류 체크리스트 */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-gray-900 dark:text-white">필수 서류 체크리스트</h4>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {completionStats.requiredCompleted}/{completionStats.requiredTotal}
              </span>
              <span className="text-gray-600 dark:text-gray-400">필수</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {completionStats.optionalCompleted}/{completionStats.optionalTotal}
              </span>
              <span className="text-gray-600 dark:text-gray-400">선택</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {documentStatus.map((item, index) => {
            const isVerified = item.submittedDoc?.status === 'verified'
            const isPending = item.submittedDoc?.status === 'pending'
            const isRejected = item.submittedDoc?.status === 'rejected'
            
            return (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isVerified
                    ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                    : isPending
                    ? 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
                    : isRejected
                    ? 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isVerified
                      ? 'bg-green-500 text-white'
                      : isPending
                      ? 'bg-amber-500 text-white'
                      : isRejected
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isVerified ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isPending ? (
                      <Clock className="w-5 h-5" />
                    ) : isRejected ? (
                      <XCircle className="w-5 h-5" />
                    ) : item.icon === 'dollar' ? (
                      <DollarSign className="w-5 h-5" />
                    ) : item.icon === 'briefcase' ? (
                      <Briefcase className="w-5 h-5" />
                    ) : item.icon === 'home' ? (
                      <Home className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      {item.isRequired && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-semibold">
                          필수
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isVerified && (
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">인증 완료</span>
                  )}
                  {isPending && (
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">검토 중</span>
                  )}
                  {isRejected && (
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300">거부됨</span>
                  )}
                  {!item.isSubmitted && (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition-colors">
                      <Upload className="w-3 h-3" />
                      요청
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {completionStats.requiredCompleted < completionStats.requiredTotal && (
          <div className="mt-4 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">필수 서류 미제출</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                {completionStats.requiredTotal - completionStats.requiredCompleted}개의 필수 서류가 아직 제출되지 않았습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 제출된 서류 목록 */}
      {documents.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-bold text-gray-900 dark:text-white">제출된 서류</h4>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold">
              {documents.length}개
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc, index) => {
          const StatusIcon = statusIcons[doc.status]
          const isRevealed = revealedDocs.has(doc.id)

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {doc.type === 'passport' && '여권'}
                        {doc.type === 'id_card' && '신분증'}
                        {doc.type === 'selfie' && '셀카 인증'}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        업로드: {format(doc.uploadedAt, 'yyyy-MM-dd HH:mm', { locale: ko })}
                      </p>
                    </div>
                  </div>

                  <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${statusColors[doc.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {doc.status === 'verified' && '인증됨'}
                    {doc.status === 'pending' && '대기중'}
                    {doc.status === 'rejected' && '거부됨'}
                    {doc.status === 'none' && '미제출'}
                  </span>
                </div>

                {/* Document Preview (Blurred) */}
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
                  <div className={`w-full h-full flex items-center justify-center text-gray-400 ${!isRevealed && 'blur-xl'}`}>
                    <FileText className="w-16 h-16" />
                  </div>
                  {!isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">PII 보호됨</p>
                        <p className="text-white/80 text-xs">보려면 2FA 인증 필요</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!isRevealed ? (
                    <button
                      onClick={() => handleRevealRequest(doc.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      보기 (2FA)
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setRevealedDocs(prev => {
                          const next = new Set(prev)
                          next.delete(doc.id)
                          return next
                        })}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium transition-colors"
                      >
                        <EyeOff className="w-4 h-4" />
                        숨기기
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        다운로드
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
          </div>
        </>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShow2FAModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">2단계 인증 필요</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              민감한 개인정보를 보기 위해서는 2단계 인증이 필요합니다. 6자리 인증 코드를 입력하세요.
            </p>

            <input
              type="text"
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              maxLength={6}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShow2FAModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleRevealConfirm}
                disabled={twoFACode.length !== 6}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
              >
                확인
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              이 작업은 감사 로그에 기록됩니다.
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  )
})

