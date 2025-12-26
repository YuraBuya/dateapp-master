import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight
} from 'lucide-react'
import { useAdminAuthStore } from '../../stores/admin/useAdminAuthStore'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const router = useRouter()
  const { signIn } = useAdminAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success && result.admin) {
        signIn(result.admin)
        router.push('/admin')
      } else {
        setError(result.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 로고 및 제목 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            언니의 소개 관리자
          </h1>
          <p className="text-gray-600">
            관리자 계정으로 로그인하세요
          </p>
        </motion.div>

        {/* 로그인 폼 */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@dateapp.com"
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200
                    ${errors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white focus:border-violet-500 focus:bg-violet-50'
                    }
                  `}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`
                    w-full pl-10 pr-12 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200
                    ${errors.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white focus:border-violet-500 focus:bg-violet-50'
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* 에러 메시지 */}
            {error && (
              <motion.div
                className="p-3 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* 로그인 버튼 */}
            <motion.button
              type="submit"
              disabled={!isValid || isLoading}
              className={`
                w-full h-12 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                ${isValid && !isLoading
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
              whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
              whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>로그인</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* 테스트 계정 안내 */}
          <motion.div
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="text-sm font-medium text-blue-900 mb-2">테스트 계정</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>슈퍼 관리자:</strong> admin@dateapp.com / admin123</p>
              <p><strong>일반 관리자:</strong> sub@dateapp.com / admin123</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 돌아가기 링크 */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
          >
            ← 메인 페이지로 돌아가기
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}