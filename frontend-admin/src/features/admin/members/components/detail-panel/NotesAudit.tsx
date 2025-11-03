/**
 * Admin Notes & Audit Trail
 * Searchable notes and audit log for admin actions
 */

'use client'

import { memo, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, StickyNote, Star, Shield, Calendar } from 'lucide-react'
import type { AdminNote, AuditLog } from '../../types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface NotesAuditProps {
  notes: AdminNote[]
  auditLogs: AuditLog[]
}

export const NotesAudit = memo(function NotesAudit({ notes, auditLogs }: NotesAuditProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'audit'>('notes')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [notes, searchTerm])

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter(log =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [auditLogs, searchTerm])

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'notes'
              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <StickyNote className="w-4 h-4" />
          관리자 노트 ({notes.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          감사 로그 ({auditLogs.length})
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={activeTab === 'notes' ? '노트 검색...' : '감사 로그 검색...'}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeTab === 'notes' ? (
          filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{searchTerm ? '검색 결과가 없습니다.' : '작성된 노트가 없습니다.'}</p>
            </div>
          ) : (
            filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  note.isImportant
                    ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        {note.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{note.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {format(note.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })}
                      </p>
                    </div>
                  </div>
                  {note.isImportant && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
              </motion.div>
            ))
          )
        ) : (
          filteredAuditLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{searchTerm ? '검색 결과가 없습니다.' : '감사 로그가 없습니다.'}</p>
            </div>
          ) : (
            filteredAuditLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{log.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {log.performedBy} • {format(log.timestamp, 'yyyy-MM-dd HH:mm:ss', { locale: ko })}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{log.details}</p>
                {log.reason && (
                  <div className="mt-2 p-2 rounded bg-gray-50 dark:bg-gray-900">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">사유:</span> {log.reason}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )
        )}
      </div>
    </div>
  )
})

