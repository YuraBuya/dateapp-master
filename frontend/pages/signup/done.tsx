import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { CheckCircle, User, Home, Sparkles, Heart } from 'lucide-react'
import { useSignupStore } from '@/stores/useSignupStore'

export default function SignupDone() {
  const router = useRouter()
  const { completeSignup, reset } = useSignupStore()

  useEffect(() => {
    // 회원가입 완료 시 콘솔에 데이터 출력
    completeSignup()
  }, [completeSignup])

  const handleGoToProfile = () => {
    reset() // 회원가입 데이터 초기화
    router.push('/profile')
  }

  const handleGoHome = () => {
    reset() // 회원가입 데이터 초기화
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 성공 아이콘 */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            
            {/* 축하 이펙트 */}
            <motion.div
              className="absolute -top-4 -left-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-6"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                delay: 1.5
              }}
            >
              <Heart className="w-6 h-6 text-pink-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* 완료 메시지 */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 회원가입이<br />
            완료되었습니다!
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg">
            언니의 소개에 오신 것을 환영합니다.<br />
            곧 완벽한 매칭을 만나보세요!
          </p>
        </motion.div>

        {/* 안내 카드 */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">서류 검토</h3>
                <p className="text-sm text-gray-600">
                  업로드해주신 서류를 검토합니다 (1-2일 소요)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-pink-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">프로필 승인</h3>
                <p className="text-sm text-gray-600">
                  승인 완료 후 매칭 서비스를 이용하실 수 있습니다
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">매칭 시작</h3>
                <p className="text-sm text-gray-600">
                  AI 분석을 통한 최적의 매칭을 받아보세요
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* 내 프로필 보기 버튼 */}
          <motion.button
            onClick={handleGoToProfile}
            className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="w-5 h-5" />
            내 프로필 보기
          </motion.button>

          {/* 홈으로 버튼 */}
          <motion.button
            onClick={handleGoHome}
            className="w-full h-14 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold text-lg hover:border-pink-300 hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            홈으로
          </motion.button>
        </motion.div>

        {/* 감사 메시지 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-gray-500 leading-relaxed">
            💝 소중한 시간을 내어 가입해주셔서 감사합니다.<br />
            더 나은 서비스로 보답하겠습니다.
          </p>
        </motion.div>

        {/* 배경 장식 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-8 w-16 h-16 bg-blue-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -8, 0],
              y: [0, 8, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-12 h-12 bg-purple-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </div>
      </div>
    </div>
  )
}