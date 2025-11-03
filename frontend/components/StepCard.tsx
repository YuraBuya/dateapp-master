import React from 'react'
import { motion } from 'framer-motion'

interface StepCardProps {
  step: number
  title: string
  description: string
  delay?: number
  className?: string
}

export default function StepCard({
  step,
  title,
  description,
  delay = 0,
  className = '',
}: StepCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-3xl p-6 shadow-card min-w-[280px] ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {step}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
