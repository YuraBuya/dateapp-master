'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type ThemeMode = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50
                   dark:border-gray-700 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4 mx-auto" />
      </button>
    )
  }

  const currentTheme = (theme || 'system') as ThemeMode

  // Cycle through: system -> light -> dark -> system
  const cycleTheme = () => {
    const themeOrder: ThemeMode[] = ['system', 'light', 'dark']
    const currentIndex = themeOrder.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setTheme(themeOrder[nextIndex])
  }

  // Get the icon based on current theme
  const getIcon = () => {
    if (currentTheme === 'system') {
      return <Monitor className="h-4 w-4" />
    } else if (currentTheme === 'dark') {
      return <Moon className="h-4 w-4" />
    } else {
      return <Sun className="h-4 w-4" />
    }
  }

  // Get tooltip text
  const getTooltipText = () => {
    if (currentTheme === 'system') {
      return `Auto (${systemTheme === 'dark' ? 'Dark' : 'Light'})`
    } else if (currentTheme === 'dark') {
      return 'Dark'
    } else {
      return 'Light'
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "h-9 w-9 rounded-lg border transition-all duration-200",
        "flex items-center justify-center",
        "hover:scale-105 active:scale-95",
        "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
        "dark:border-gray-700 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
      )}
      aria-label={`Toggle theme (current: ${getTooltipText()})`}
      title={getTooltipText()}
    >
      {getIcon()}
    </button>
  )
}
