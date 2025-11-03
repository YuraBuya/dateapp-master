'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts'
import {
  Users,
  Heart,
  TrendingUp,
  DollarSign,
  MapPin,
  Activity,
  Star,
  Calendar,
  MessageCircle,
  UserPlus,
  Gift,
  Award
} from 'lucide-react'

// 색상 팔레트 - 이 값들만 바꾸면 전체 테마가 변경됩니다
// 팔레트 바꾸는 법: 아래 BRAND 객체의 값만 수정하면 그라디언트/아이콘/차트 색이 한 번에 바뚝니다
const BRAND = {
  primary: "#64748b",      // slate-500 - 주요 색상
  secondary: "#94a3b8",    // slate-400 - 보조 색상
  accent: "#059669",       // emerald-600 - 강조 색상
  light: "#f1f5f9",       // slate-50 - 배경 색상
}

// 예시: 더 밝은 팔레트로 변경하려면:
// const BRAND = {
//   primary: "#7C3AED",   // violet-600
//   secondary: "#EC4899", // pink-500
//   accent: "#06B6D4",    // cyan-500
//   light: "#EDE9FE",    // violet-50
// }

// Mock data
const kpiData = [
  {
    title: '총 회원수',
    value: '2,347',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50'
  },
  {
    title: '성공 매칭',
    value: '1,284',
    change: '+8%',
    trend: 'up',
    icon: Heart,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    title: '월 매출',
    value: '₩45M',
    change: '+15%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    title: '활성 사용자',
    value: '1,892',
    change: '+5%',
    trend: 'up',
    icon: Activity,
    color: 'text-slate-400',
    bgColor: 'bg-slate-50'
  }
]

const revenueData = [
  { name: '베이직', value: 35, amount: 16002000, color: BRAND.primary },
  { name: '프리미엄', value: 45, amount: 18966000, color: BRAND.secondary },
  { name: 'VIP', value: 20, amount: 16954000, color: BRAND.accent }
]

const matchingTrendData = [
  { month: 'Jan', matches: 120, success: 89 },
  { month: 'Feb', matches: 142, success: 108 },
  { month: 'Mar', matches: 168, success: 134 },
  { month: 'Apr', matches: 195, success: 156 },
  { month: 'May', matches: 224, success: 187 },
  { month: 'Jun', matches: 247, success: 203 }
]

const geoMarkers = [
  { name: '서울', coordinates: [126.9780, 37.5665], users: 1247 },
  { name: '부산', coordinates: [129.0756, 35.1796], users: 543 },
  { name: '대구', coordinates: [128.6014, 35.8714], users: 342 },
  { name: '인천', coordinates: [126.7052, 37.4563], users: 298 },
  { name: '광주', coordinates: [126.8526, 35.1595], users: 187 }
]

const socialActivities = [
  { type: '새 프로필 등록', count: 47, icon: UserPlus, color: 'text-slate-500' },
  { type: '메시지 교환', count: 1284, icon: MessageCircle, color: 'text-emerald-600' },
  { type: '선물 보내기', count: 89, icon: Gift, color: 'text-slate-400' },
  { type: '프리미엄 업그레이드', count: 23, icon: Award, color: 'text-slate-500' }
]

const topUsers = [
  { id: 1, name: '김민수', avatar: '👨', score: 95, status: 'Premium', matches: 12 },
  { id: 2, name: '이영희', avatar: '👩', score: 92, status: 'VIP', matches: 8 },
  { id: 3, name: '박철수', avatar: '👨', score: 88, status: 'Basic', matches: 6 },
  { id: 4, name: '정미진', avatar: '👩', score: 85, status: 'Premium', matches: 9 },
  { id: 5, name: '최영호', avatar: '👨', score: 82, status: 'VIP', matches: 7 }
]

export default function AdminDashboardV2() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon
          return (
            <Card key={index} className="relative overflow-hidden border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {kpi.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">로열티 수익 구성</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ₩{(item.amount / 1000000).toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Activities */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">실시간 사용자 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {socialActivities.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white border border-gray-200">
                        <IconComponent className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{activity.type}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{activity.count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">월등 점수 기준</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUsers.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg shadow-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.score}점 기준</p>
                    </div>
                  </div>
                  <Badge 
                    className={
                      user.status === 'VIP' 
                        ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                        : user.status === 'Premium' 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Analysis & Matching Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Analysis */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              지역별 회원 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4">
              <div className="text-center space-y-3">
                <MapPin className="h-12 w-12 mx-auto text-blue-400" />
                <div>
                  <p className="text-base font-semibold text-gray-900">지역별 회원 현황</p>
                  <p className="text-sm text-gray-500">실제 지도 데이터로 데이터베이스 메타데이터</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {geoMarkers.slice(0, 4).map((marker, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <span className="text-sm font-semibold">{marker.name}</span>
                  <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded">{marker.users}명</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Matching Trends */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">월별 매칭 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={matchingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    iconType="circle"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="matches" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="총 매칭"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ fill: '#ec4899', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="성공 매칭"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          className="group relative p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
          aria-label="회원 승인"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
          </div>
          <div className="relative z-10">
            <Users className="h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg">회원 승인</h3>
          </div>
        </button>

        <button 
          className="group relative p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
          aria-label="매칭 관리"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
          </div>
          <div className="relative z-10">
            <Heart className="h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg">매칭 관리</h3>
          </div>
        </button>

        <button 
          className="group relative p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
          aria-label="결제 처리"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
          </div>
          <div className="relative z-10">
            <DollarSign className="h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg">결제 처리</h3>
          </div>
        </button>

        <button 
          className="group relative p-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
          aria-label="시스템 모니터"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
          </div>
          <div className="relative z-10">
            <Activity className="h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg">시스템 모니터</h3>
          </div>
        </button>
      </div>
    </div>
  )
}