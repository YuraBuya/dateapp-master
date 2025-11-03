import { Heart, MessageCircle, User, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const tabs = [
  {
    href: '/',
    icon: Heart,
    label: '홈',
    activeColor: 'from-pink-500 to-rose-500'
  },
  {
    href: '/matching/inbox',
    icon: MessageCircle,
    label: '매칭',
    activeColor: 'from-violet-500 to-purple-600'
  },
  {
    href: '/profile',
    icon: User,
    label: '프로필',
    activeColor: 'from-blue-500 to-indigo-600'
  },
  {
    href: '/settings',
    icon: Settings,
    label: '설정',
    activeColor: 'from-emerald-500 to-teal-600'
  }
]

export default function BottomNav() {
  const router = useRouter()

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-sm mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = router.pathname === tab.href || 
            (tab.href === '/matching/inbox' && router.pathname.startsWith('/matching'))
          
          return (
            <Link key={tab.href} href={tab.href} className="flex-1">
              <motion.div
                className="flex flex-col items-center py-2 px-3 rounded-xl relative"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${tab.activeColor} opacity-10 rounded-xl`}
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${tab.activeColor}` 
                      : 'bg-gray-100'
                    }
                  `}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <span className={`text-xs font-medium mt-1 transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {tab.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  )
}
