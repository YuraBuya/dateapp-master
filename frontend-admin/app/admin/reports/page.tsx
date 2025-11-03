import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Users, Clock } from 'lucide-react'

// Mock data for demonstration
const reports = [
  {
    id: 1,
    reporter: '김민수',
    reported: '이영희',
    type: 'inappropriate_behavior',
    reason: '부적절한 메시지 발송',
    status: 'pending',
    priority: 'high',
    date: '2024-03-01',
    description: '반복적으로 불쾌한 메시지를 보내고 있습니다.'
  },
  {
    id: 2,
    reporter: '박철수',
    reported: '정미진',
    type: 'fake_profile',
    reason: '가짜 프로필 사용',
    status: 'resolved',
    priority: 'medium',
    date: '2024-02-28',
    description: '프로필 사진이 다른 사람의 것으로 보입니다.'
  },
  {
    id: 3,
    reporter: '최영호',
    reported: '김수연',
    type: 'spam',
    reason: '스팸 메시지',
    status: 'investigating',
    priority: 'low',
    date: '2024-03-02',
    description: '동일한 메시지를 여러 사람에게 발송하고 있습니다.'
  }
]

export default function ReportsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">신고 관리</h1>
        <p className="text-muted-foreground">
          사용자 신고를 검토하고 적절한 조치를 취하세요.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 신고</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리 대기</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              -8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">조치 완료</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">정지된 계정</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">부적절한 행동</CardTitle>
            <CardDescription>불쾌한 메시지, 괴롭힘 등</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">142</div>
            <div className="text-sm text-muted-foreground">전체의 57.5%</div>
            <div className="mt-4">
              <div className="text-sm font-medium text-red-600">긴급: 8건</div>
              <div className="text-sm text-muted-foreground">대기중: 12건</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">가짜 프로필</CardTitle>
            <CardDescription>허위 정보, 사진 도용 등</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">67</div>
            <div className="text-sm text-muted-foreground">전체의 27.1%</div>
            <div className="mt-4">
              <div className="text-sm font-medium text-orange-600">중요: 5건</div>
              <div className="text-sm text-muted-foreground">대기중: 7건</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">스팸/광고</CardTitle>
            <CardDescription>무분별한 메시지, 광고 등</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">38</div>
            <div className="text-sm text-muted-foreground">전체의 15.4%</div>
            <div className="mt-4">
              <div className="text-sm font-medium text-yellow-600">일반: 3건</div>
              <div className="text-sm text-muted-foreground">대기중: 4건</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>최근 신고 내역</CardTitle>
          <CardDescription>
            가장 최근에 접수된 신고들입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    신고 ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    신고자
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    피신고자
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    유형
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    우선순위
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    상태
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    신고일
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="p-4 align-middle">
                      <div className="font-medium">#{report.id}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{report.reporter}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{report.reported}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">
                        {report.type === 'inappropriate_behavior' ? '부적절한 행동' : 
                         report.type === 'fake_profile' ? '가짜 프로필' : '스팸'}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge 
                        variant={
                          report.priority === 'high' ? 'destructive' : 
                          report.priority === 'medium' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {report.priority === 'high' ? '긴급' : 
                         report.priority === 'medium' ? '중요' : '일반'}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge 
                        variant={
                          report.status === 'resolved' ? 'default' : 
                          report.status === 'investigating' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {report.status === 'resolved' ? '해결됨' : 
                         report.status === 'investigating' ? '조사중' : '대기중'}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="text-sm">{report.date}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          검토
                        </Button>
                        <Button variant="outline" size="sm">
                          조치
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}