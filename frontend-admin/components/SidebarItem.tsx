"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  href: string
  label: string
  icon: LucideIcon
  isActive?: boolean
  badge?: number
  description?: string
  color?: string
  onClick?: () => void
}

export default function SidebarItem({ 
  href, 
  label, 
  icon: Icon, 
  isActive = false, 
  badge, 
  description,
  color = 'from-gray-500 to-slate-600',
  onClick 
}: SidebarItemProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(href)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`
        w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group relative
        ${isActive 
          ? `bg-gradient-to-r ${color} text-white shadow-lg` 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      title={description}
    >
      <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-200 ${
        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
      }`} />
      
      <div className="flex-1 min-w-0">
        <span className={`font-medium truncate block ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>
          {label}
        </span>
        {description && !isActive && (
          <span className="text-xs text-gray-500 truncate block mt-0.5">
            {description}
          </span>
        )}
      </div>

      {badge && badge > 0 && (
        <motion.div
          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
            isActive 
              ? 'bg-white/20 text-white' 
              : 'bg-red-100 text-red-600'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {badge > 99 ? '99+' : badge}
        </motion.div>
      )}

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  )
}