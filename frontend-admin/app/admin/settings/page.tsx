import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Database, Shield, Bell, Mail, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">시스템 설정</h1>
        <p className="text-muted-foreground">
          애플리케이션의 전반적인 설정을 관리하세요.
        </p>
      </div>

      {/* System Status */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">시스템 상태</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">정상</div>
            <p className="text-xs text-muted-foreground">
              모든 서비스 정상 운영
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">데이터베이스</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">
              가용성 (지난 30일)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">보안 상태</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">안전</div>
            <p className="text-xs text-muted-foreground">
              최근 보안 검사 완료
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">백업 상태</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">완료</div>
            <p className="text-xs text-muted-foreground">
              마지막: 2시간 전
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              일반 설정
            </CardTitle>
            <CardDescription>
              기본적인 시스템 설정을 관리하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">서비스 이름</div>
                <div className="text-sm text-muted-foreground">언니의 소개</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">운영 시간</div>
                <div className="text-sm text-muted-foreground">24시간 운영</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">유지보수 모드</div>
                <div className="text-sm text-muted-foreground">비활성화</div>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              보안 설정
            </CardTitle>
            <CardDescription>
              시스템 보안 관련 설정을 관리하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">2단계 인증</div>
                <div className="text-sm text-muted-foreground">활성화됨</div>
              </div>
              <Badge variant="default">ON</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">로그인 시도 제한</div>
                <div className="text-sm text-muted-foreground">5회 실패 시 잠금</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">세션 만료</div>
                <div className="text-sm text-muted-foreground">24시간</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification & Communication Settings */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              알림 설정
            </CardTitle>
            <CardDescription>
              시스템 알림 및 사용자 알림을 관리하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">이메일 알림</div>
                <div className="text-sm text-muted-foreground">신규 회원, 결제 등</div>
              </div>
              <Badge variant="default">ON</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS 알림</div>
                <div className="text-sm text-muted-foreground">긴급 상황시만</div>
              </div>
              <Badge variant="secondary">제한적</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">푸시 알림</div>
                <div className="text-sm text-muted-foreground">실시간 매칭 등</div>
              </div>
              <Badge variant="default">ON</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              이메일 설정
            </CardTitle>
            <CardDescription>
              이메일 발송 및 템플릿을 관리하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMTP 서버</div>
                <div className="text-sm text-muted-foreground">smtp.gmail.com</div>
              </div>
              <Badge variant="default">연결됨</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">발신자 이메일</div>
                <div className="text-sm text-muted-foreground">noreply@dateapp.com</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">일일 발송 한도</div>
                <div className="text-sm text-muted-foreground">10,000건</div>
              </div>
              <Button variant="outline" size="sm">편집</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            고급 설정
          </CardTitle>
          <CardDescription>
            개발자 및 고급 사용자를 위한 설정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">API 버전</div>
                  <div className="text-sm text-muted-foreground">v2.1.0</div>
                </div>
                <Badge variant="outline">최신</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">로그 레벨</div>
                  <div className="text-sm text-muted-foreground">INFO</div>
                </div>
                <Button variant="outline" size="sm">변경</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">캐시 설정</div>
                  <div className="text-sm text-muted-foreground">Redis 활성화</div>
                </div>
                <Badge variant="default">ON</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">데이터베이스 풀</div>
                  <div className="text-sm text-muted-foreground">최대 20개 연결</div>
                </div>
                <Button variant="outline" size="sm">편집</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">백업 주기</div>
                  <div className="text-sm text-muted-foreground">매일 자정</div>
                </div>
                <Button variant="outline" size="sm">편집</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">모니터링</div>
                  <div className="text-sm text-muted-foreground">Grafana + Prometheus</div>
                </div>
                <Badge variant="default">활성</Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex space-x-4">
              <Button>설정 저장</Button>
              <Button variant="outline">기본값 복원</Button>
              <Button variant="destructive">시스템 재시작</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}