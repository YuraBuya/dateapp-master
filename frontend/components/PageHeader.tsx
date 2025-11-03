import { ArrowLeft, Globe } from 'lucide-react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useSettingsStore } from '@/stores/useSettingsStore'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  showLanguageToggle?: boolean
  onBack?: () => void
}

export default function PageHeader({ 
  title, 
  showBack = false, 
  showLanguageToggle = false,
  onBack 
}: PageHeaderProps) {
  const router = useRouter()
  const { language, setLanguage } = useSettingsStore()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko')
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-sm mx-auto">
        {/* 뒤로가기 버튼 */}
        {showBack && (
          <motion.button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}

        {/* 타이틀 */}
        <h1 className={`text-lg font-semibold text-gray-900 ${showBack ? '' : 'ml-4'}`}>
          {title}
        </h1>

        {/* 언어 토글 버튼 */}
        {showLanguageToggle ? (
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </motion.button>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </motion.header>
  )
}