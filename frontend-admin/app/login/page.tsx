'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useAdminAuthStore } from '@/stores/useAdminAuthStore'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const router = useRouter()
  const { signIn, isAuthenticated } = useAdminAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  // 이미 인증된 경우 대시보드로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setLoginError('')
    setLoginSuccess(false)

    try {
      // 시뮬레이션: 2초 후 로그인 성공
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock 로그인 - 실제로는 API 호출
      if (data.email === 'admin@example.com' && data.password === 'admin123') {
        signIn({
          id: '1',
          name: '관리자',
          email: data.email,
          role: 'admin',
          permissions: [],
          profileImage: '',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true
        }, 'mock-admin-token-12345')
        setLoginSuccess(true)
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      } else {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      setLoginError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* 로고 및 제목 */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
          <p className="text-gray-600">언니의 소개 관리자 패널에 접속하세요</p>
        </div>

        {/* 로그인 폼 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* 성공/오류 메시지 */}
          {loginSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">로그인 성공! 대시보드로 이동합니다...</span>
            </motion.div>
          )}

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{loginError}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-400 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </>
              ) : (
                <>
                  로그인
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* 데모 계정 안내 */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">데모 계정</h3>
            <p className="text-sm text-blue-800">
              이메일: <code className="bg-blue-100 px-1 rounded">admin@example.com</code><br/>
              비밀번호: <code className="bg-blue-100 px-1 rounded">admin123</code>
            </p>
          </div>
        </motion.div>

        {/* 하단 링크 */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            © 2024 언니의 소개. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}