import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'

interface BadgeTimerProps {
  expiresAt: string
  className?: string
}

export default function BadgeTimer({ expiresAt, className = '' }: BadgeTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
  }>({ hours: 0, minutes: 0, seconds: 0, isExpired: false })

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds, isExpired: false })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [expiresAt])

  if (timeLeft.isExpired) {
    return (
      <motion.div
        className={`inline-flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-full text-sm font-medium ${className}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5 }}
      >
        <Clock className="w-4 h-4" />
        <span>만료됨</span>
      </motion.div>
    )
  }

  const isUrgent = timeLeft.hours < 1
  const bgColor = isUrgent ? 'bg-red-500' : timeLeft.hours < 6 ? 'bg-orange-500' : 'bg-green-500'

  const formatTime = () => {
    if (timeLeft.hours > 0) {
      return `${timeLeft.hours}시간 ${timeLeft.minutes}분`
    } else if (timeLeft.minutes > 0) {
      return `${timeLeft.minutes}분 ${timeLeft.seconds}초`
    } else {
      return `${timeLeft.seconds}초`
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${timeLeft.hours}-${timeLeft.minutes}-${timeLeft.seconds}`}
        className={`inline-flex items-center gap-2 px-3 py-1 ${bgColor} text-white rounded-full text-sm font-medium ${className}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={isUrgent ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0, repeatDelay: 1 }}
        >
          <Clock className="w-4 h-4" />
        </motion.div>
        <span>{formatTime()} 남음</span>
      </motion.div>
    </AnimatePresence>
  )
}
