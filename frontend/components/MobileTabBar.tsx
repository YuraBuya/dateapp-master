import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Home, Heart, User, Settings } from 'lucide-react'

interface TabItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const tabs: TabItem[] = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/matching/inbox', icon: Heart, label: '매칭' },
  { href: '/profile', icon: User, label: '프로필' },
  { href: '/settings', icon: Settings, label: '설정' },
]

export default function MobileTabBar() {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-neutral-200/30 z-40">
      <div className="flex items-center justify-around px-3 py-3 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = router.pathname === tab.href || 
            (tab.href === '/matching/inbox' && router.pathname.startsWith('/matching'))
          
          return (
            <Link key={tab.href} href={tab.href} className="flex-1">
              <motion.div
                className={`
                  flex flex-col items-center py-2 px-3 rounded-xl relative
                  ${isActive ? 'text-neutral-800' : 'text-neutral-500'}
                `}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-neutral-100 rounded-xl"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-neutral-800' : 'text-neutral-500'} transition-colors`} />
                  <span className={`text-xs font-medium mt-1 ${isActive ? 'text-neutral-800' : 'text-neutral-500'} transition-colors`}>
                    {tab.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-2" />
    </div>
  )
}
