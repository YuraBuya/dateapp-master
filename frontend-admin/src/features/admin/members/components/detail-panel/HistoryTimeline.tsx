/**
 * History & Evidence Timeline
 * Chronological event timeline with filtering
 */

'use client'

import { memo, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  UserPlus,
  LogIn,
  AlertTriangle,
  Heart,
  CreditCard,
  FileText,
  Shield,
  MessageSquare,
  User
} from 'lucide-react'
import type { TimelineEvent } from '../../types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface HistoryTimelineProps {
  events: TimelineEvent[]
}

const eventIcons = {
  signup: UserPlus,
  login: LogIn,
  report: AlertTriangle,
  match: Heart,
  payment: CreditCard,
  document_upload: FileText,
  admin_action: Shield,
  message: MessageSquare,
  profile_update: User
}

const eventColors = {
  signup: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  login: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  report: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  match: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  payment: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  document_upload: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  admin_action: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  message: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  profile_update: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
}

export const HistoryTimeline = memo(function HistoryTimeline({ events }: HistoryTimelineProps) {
  const [filter, setFilter] = useState<string>('all')
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events
    return events.filter(event => event.type === filter)
  }, [events, filter])

  const toggleExpand = (eventId: string) => {
    setExpandedEvents(prev => {
      const next = new Set(prev)
      if (next.has(eventId)) {
        next.delete(eventId)
      } else {
        next.add(eventId)
      }
      return next
    })
  }

  return (
    <div className="space-y-4">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          전체 ({events.length})
        </button>
        <button
          onClick={() => setFilter('report')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'report'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          신고 ({events.filter(e => e.type === 'report').length})
        </button>
        <button
          onClick={() => setFilter('admin_action')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'admin_action'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          관리자 ({events.filter(e => e.type === 'admin_action').length})
        </button>
        <button
          onClick={() => setFilter('payment')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'payment'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          결제 ({events.filter(e => e.type === 'payment').length})
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        {/* Events */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              필터링된 이벤트가 없습니다.
            </div>
          ) : (
            filteredEvents.map((event, index) => {
              const Icon = eventIcons[event.type]
              const isExpanded = expandedEvents.has(event.id)

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-16"
                >
                  {/* Icon */}
                  <div className={`absolute left-3 w-6 h-6 rounded-full flex items-center justify-center ${eventColors[event.type]}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Event Card */}
                  <div
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => event.metadata && toggleExpand(event.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                      </div>
                      <time className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                        {format(event.timestamp, 'yyyy-MM-dd HH:mm', { locale: ko })}
                      </time>
                    </div>

                    {/* Expandable Metadata */}
                    {event.metadata && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-xs space-y-1">
                          {Object.entries(event.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                              <span className="text-gray-900 dark:text-white font-mono">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
})

