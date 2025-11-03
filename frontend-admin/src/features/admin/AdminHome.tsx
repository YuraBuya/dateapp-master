'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Heart, 
  TrendingUp, 
  DollarSign,
  Activity,
  Star,
  Calendar,
  MessageCircle
} from 'lucide-react'

export default function AdminHome() {
  // Mock data for summary cards
  const summaryData = [
    {
      title: "총 사용자",
      value: "12,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      description: "지난 달 대비"
    },
    {
      title: "활성 매칭",
      value: "3,429",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Heart,
      description: "진행 중인 매칭"
    },
    {
      title: "월 수익",
      value: "₩42,890,000",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "이번 달 매출"
    },
    {
      title: "성공률",
      value: "78.4%",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "매칭 성공률"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            관리자 메인 대시보드 - 전체 서비스 현황을 한눈에 확인하세요
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          실시간 업데이트
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span className={`font-medium ${
                    item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                  <span>{item.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Chart 1 - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              사용자 활동 추이
            </CardTitle>
            <CardDescription>
              최근 7일간 사용자 활동 현황
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">차트 데이터 로딩 중...</p>
                <p className="text-xs text-muted-foreground mt-1">실제 차트가 여기에 표시됩니다</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2 - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              매칭 성공률 분석
            </CardTitle>
            <CardDescription>
              월별 매칭 성공률 및 사용자 만족도
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <div className="text-center">
                <Star className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">차트 데이터 로딩 중...</p>
                <p className="text-xs text-muted-foreground mt-1">실제 차트가 여기에 표시됩니다</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              오늘의 활동
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">신규 가입</span>
              <span className="font-medium">127명</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">새 매칭</span>
              <span className="font-medium">89건</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">완료된 만남</span>
              <span className="font-medium">34건</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              고객 피드백
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">평균 만족도</span>
              <span className="font-medium">4.7/5.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">신규 리뷰</span>
              <span className="font-medium">23개</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">추천율</span>
              <span className="font-medium">92%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">시스템 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">서버 상태</span>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                정상
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">응답 시간</span>
              <span className="font-medium">142ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">가동률</span>
              <span className="font-medium">99.8%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
