/**
 * Card Components
 * Reusable card UI components
 */

import { ReactNode, memo } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: ReactNode
}

export const Card = memo(function Card({ className = '', children }: CardProps) {
  return (
    <div className={cn(
      'rounded-2xl border border-gray-100 bg-white p-6 shadow-sm',
      'dark:border-gray-800 dark:bg-gray-900',
      className
    )}>
      {children}
    </div>
  )
})

interface CardTitleProps {
  children: ReactNode
}

export const CardTitle = memo(function CardTitle({ children }: CardTitleProps) {
  return (
    <div className="mb-4 font-semibold text-gray-900 dark:text-white">
      {children}
    </div>
  )
})



