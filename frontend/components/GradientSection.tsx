import React from 'react'
import { motion } from 'framer-motion'

interface GradientSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow'
}

export default function GradientSection({
  children,
  className = '',
  variant = 'rainbow',
}: GradientSectionProps) {
  const gradientVariants = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
    accent: 'bg-gradient-to-br from-accent-500 to-accent-600',
    rainbow: 'bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500',
  }

  return (
    <motion.section
      className={`${gradientVariants[variant]} text-white ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}
