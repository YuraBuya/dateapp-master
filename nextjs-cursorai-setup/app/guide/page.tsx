"use client";

import { Card } from "@/components/shared/common";

export default function Guide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎯 CURSOR AI 효과적인 사용법 가이드</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CURSOR AI를 활용하여 Next.js + TypeScript 프로젝트를 효율적으로 개발하는 방법을 제시합니다.
          </p>
        </div>

        {/* Basic Principle */}
        <Card>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 기본 원칙: 구체적이고 명확한 요청</h2>

            {/* Bad Example */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-red-500 mr-3 text-2xl">❌</span>
                <h3 className="text-2xl font-semibold text-red-600">나쁜 예: 모호하고 불완전한 요청</h3>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <code className="text-red-800 text-lg font-mono">검색 기능 만들어줘.</code>
                <div className="mt-3 text-red-700">
                  <p className="font-semibold mb-2">문제점:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>어디에 만들지 불분명</li>
                    <li>어떤 데이터를 검색할지 모름</li>
                    <li>어떤 기술 스택을 사용할지 불분명</li>
                    <li>제약사항이나 요구사항 없음</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Good Example */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-green-500 mr-3 text-2xl">✅</span>
                <h3 className="text-2xl font-semibold text-green-600">좋은 예: 구체적이고 완전한 요청</h3>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <div className="text-green-800 font-mono text-sm">
                  <p className="font-bold text-base mb-2">
                    목표: users 페이지에 검색 필터 추가(인풋+디바운스+빈결과 메시지)
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">컨텍스트:</span>
                    </p>
                    <div className="ml-4 space-y-1">
                      <p>- 파일: app/users/page.tsx, src/hooks/useUsersQuery.ts</p>
                      <p>- API: GET /api/users?query=&lt;string&gt; -&gt; User[]</p>
                      <p>- 타입: User &#123; id:number; name:string; tags:string[] &#125;</p>
                    </div>
                    <p>
                      <span className="font-semibold">제약:</span> 외부 lib 추가 금지, any 금지, 접근성 준수
                    </p>
                    <p>
                      <span className="font-semibold">산출물:</span> Plan → 작은 diff(10–30줄) → 수동 테스트 방법
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Request Structure */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔧 효과적인 요청 구조</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 text-xl">🎯</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">1. 목표 (Goal)</h3>
                  <p className="text-gray-600 mb-2">무엇을 만들 것인가</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <code className="text-blue-800">목표: 상품 목록 페이지에 필터링 기능 추가</code>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 text-xl">⚙️</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2. 컨텍스트 (Context)</h3>
                  <p className="text-gray-600 mb-2">현재 상황과 관련 파일들</p>
                  <div className="bg-purple-50 p-3 rounded-lg text-sm">
                    <div className="text-purple-800 font-mono space-y-1">
                      <p>컨텍스트:</p>
                      <p>- 현재 파일: app/products/page.tsx</p>
                      <p>- 관련 컴포넌트: Select.tsx, Input.tsx</p>
                      <p>- API: /api/products?category=&lt;string&gt;</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 text-xl">⚠️</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3. 제약사항 (Constraints)</h3>
                  <p className="text-gray-600 mb-2">지켜야 할 규칙들</p>
                  <div className="bg-orange-50 p-3 rounded-lg text-sm">
                    <div className="text-orange-800 font-mono space-y-1">
                      <p>제약:</p>
                      <p>- 기존 공통 컴포넌트만 사용</p>
                      <p>- TypeScript strict 모드 준수</p>
                      <p>- 접근성 준수 (ARIA 레이블)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-xl">📄</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">4. 산출물 (Deliverables)</h3>
                  <p className="text-gray-600 mb-2">기대하는 결과물</p>
                  <div className="bg-green-50 p-3 rounded-lg text-sm">
                    <div className="text-green-800 font-mono space-y-1">
                      <p>산출물:</p>
                      <p>1. 구현 계획 (Plan)</p>
                      <p>2. 최소한의 코드 변경</p>
                      <p>3. 테스트 방법 안내</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Situation Examples */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 상황별 요청 예시</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-blue-500 text-2xl mr-2">💻</span>
                <h3 className="text-lg font-semibold text-gray-800">새 페이지 생성</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">주문 관리 페이지 생성 (/orders)</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  참조 페이지: app/about/page.tsx
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  공통 컴포넌트 활용
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  SEO 최적화 적용
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-green-500 text-2xl mr-2">🔧</span>
                <h3 className="text-lg font-semibold text-gray-800">기존 기능 수정</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">로그인 폼에 비밀번호 강도 체크 추가</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  Password 컴포넌트 확장
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  Zod 스키마 업데이트
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  실시간 피드백 UI
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-red-500 text-2xl mr-2">🐛</span>
                <h3 className="text-lg font-semibold text-gray-800">버그 수정</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">모바일에서 드롭다운 메뉴가 잘리는 문제</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  문제 원인 분석
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  CSS 수정 (z-index, position)
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  모바일 테스트 방법
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 text-2xl mr-2">⚡</span>
                <h3 className="text-lg font-semibold text-gray-800">성능 최적화</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">상품 목록 페이지 렌더링 성능 개선</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  성능 병목 지점 분석
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  가상화 또는 페이지네이션
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  React.memo, useMemo 최적화
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-purple-500 text-2xl mr-2">📱</span>
                <h3 className="text-lg font-semibold text-gray-800">반응형 디자인</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">대시보드 차트 컴포넌트 모바일 최적화</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  Tailwind 브레이크포인트 사용
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  터치 인터랙션 지원
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  다양한 화면 크기 테스트
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <span className="text-indigo-500 text-2xl mr-2">🧪</span>
                <h3 className="text-lg font-semibold text-gray-800">테스트 시나리오</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">로그인 폼 수동 테스트 시나리오 작성</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  단계별 테스트 시나리오
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  에지 케이스 테스트
                </li>
                <li className="text-xs text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  브라우저 호환성 확인
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 효과적인 요청을 위한 팁</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">✅ 좋은 예시들</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5 text-lg">✅</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-green-700">app/products/page.tsx</code>
                    <p className="text-xs text-gray-500 mt-1">파일 경로 명시</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5 text-lg">✅</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-green-700">Ant Design Select 컴포넌트를 확장해서</code>
                    <p className="text-xs text-gray-500 mt-1">구체적인 기술 스택 언급</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5 text-lg">✅</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-green-700">기존 공통 컴포넌트만 사용, any 타입 금지</code>
                    <p className="text-xs text-gray-500 mt-1">제약사항 명확히</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5 text-lg">✅</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-green-700">10-30줄의 작은 diff, 테스트 방법 포함</code>
                    <p className="text-xs text-gray-500 mt-1">예상 결과물 구체화</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">❌ 피해야 할 예시들</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5 text-lg">❌</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-red-700">상품 페이지</code>
                    <p className="text-xs text-gray-500 mt-1">모호한 위치 표현</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5 text-lg">❌</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-red-700">드롭다운을 만들어서</code>
                    <p className="text-xs text-gray-500 mt-1">기술 스택 불명확</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5 text-lg">❌</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-red-700">깔끔하게 만들어줘</code>
                    <p className="text-xs text-gray-500 mt-1">제약사항 모호</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5 text-lg">❌</span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-red-700">잘 작동하게 해줘</code>
                    <p className="text-xs text-gray-500 mt-1">결과물 불명확</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tech Stack */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏗️ 프로젝트 기술 스택</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Framework</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  Next.js 15.5.3 (App Router)
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  TypeScript 5
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">UI & Styling</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  Ant Design 5.26.7
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  Tailwind CSS 4
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  Lucide React Icons
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">State & Data</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  Zustand 5.0.7
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  React Query 5.87.4
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  React Hook Form + Zod
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Advanced Features */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 CURSOR AI 고급 기능 활용법</h2>

          <div className="space-y-8">
            {/* Rules System */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-purple-500 mr-3 text-2xl">📋</span>
                .cursor/rules 시스템 활용
              </h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3">Rules 파일 구조</h4>
                    <div className="bg-white rounded p-3 text-sm font-mono">
                      <div className="text-purple-700">
                        <p>.cursor/rules/</p>
                        <p className="ml-2">├── project.mdc (프로젝트 전체 규칙)</p>
                        <p className="ml-2">├── components.mdc (컴포넌트 규칙)</p>
                        <p className="ml-2">└── api.mdc (API 관련 규칙)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3">Rules 작성 예시</h4>
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="text-purple-700 font-mono">
                        <p>---</p>
                        <p>description: "컴포넌트 개발 규칙"</p>
                        <p>globs: ["components/**/*"]</p>
                        <p>alwaysApply: true</p>
                        <p>---</p>
                        <p className="mt-2"># 컴포넌트 규칙</p>
                        <p>- TypeScript 인터페이스 필수</p>
                        <p>- Props 검증 필수</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>💡 팁:</strong> Rules 파일을 작성하면 CURSOR AI가 자동으로 프로젝트 컨텍스트를 이해하고
                    일관된 코드를 생성합니다. 현재 프로젝트에는 <code>project.mdc</code>가 설정되어 있어 개발 원칙과
                    컨벤션이 자동 적용됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Context Management */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-500 mr-3 text-2xl">🎯</span>
                컨텍스트 관리 기법
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">@파일명 활용</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-2 font-mono text-blue-700">
                      @components/Button.tsx 이 컴포넌트를 확장해서...
                    </div>
                    <div className="bg-white rounded p-2 font-mono text-blue-700">
                      @app/users/page.tsx 페이지에 필터 추가해줘
                    </div>
                    <p className="text-blue-600 mt-2">파일을 직접 참조하여 정확한 컨텍스트 제공</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">코드 블록 첨부</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-2 text-green-700">
                      현재 코드:
                      <br />
                      <code className="text-xs">
                        ```tsx
                        <br />
                        const Button = () =&gt; &#123;`&lt;button&gt;`&#125;
                        <br />
                        ```
                      </code>
                    </div>
                    <p className="text-green-600 mt-2">기존 코드를 첨부하여 정확한 수정 요청</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-step Requests */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-orange-500 mr-3 text-2xl">⚡</span>
                단계별 개발 전략
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">분석 단계</h4>
                      <p className="text-orange-700 text-sm">
                        "현재 프로젝트 구조를 분석하고 최적의 구현 방법 제안해줘"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">계획 단계</h4>
                      <p className="text-orange-700 text-sm">"위 분석을 바탕으로 구체적인 구현 계획을 세워줘"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">구현 단계</h4>
                      <p className="text-orange-700 text-sm">"계획에 따라 첫 번째 단계부터 차례로 구현해줘"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">검증 단계</h4>
                      <p className="text-orange-700 text-sm">"구현된 코드를 검토하고 개선점 제안해줘"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Prompting Techniques */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎨 고급 프롬프팅 기법</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Role-based Prompting */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-indigo-500 mr-2 text-xl">👨‍💻</span>
                역할 기반 요청
              </h3>
              <div className="space-y-4">
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
                  <p className="text-indigo-800 font-mono text-sm">
                    "시니어 React 개발자 관점에서 이 컴포넌트의 성능을 분석해줘"
                  </p>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
                  <p className="text-indigo-800 font-mono text-sm">
                    "UX 디자이너 입장에서 이 인터페이스의 사용성을 평가해줘"
                  </p>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
                  <p className="text-indigo-800 font-mono text-sm">
                    "테스트 엔지니어 관점에서 테스트 케이스를 작성해줘"
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison Requests */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-teal-500 mr-2 text-xl">⚖️</span>
                비교 분석 요청
              </h3>
              <div className="space-y-4">
                <div className="bg-teal-50 border-l-4 border-teal-400 p-3 rounded-r-lg">
                  <p className="text-teal-800 font-mono text-sm">"useState vs Zustand: 이 상황에 더 적합한 것은?"</p>
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-3 rounded-r-lg">
                  <p className="text-teal-800 font-mono text-sm">"현재 구현 vs 제안하는 방식의 장단점 비교해줘"</p>
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-3 rounded-r-lg">
                  <p className="text-teal-800 font-mono text-sm">
                    "3가지 구현 방법을 제시하고 각각의 트레이드오프 설명해줘"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Productivity Tips */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚡ 생산성 극대화 팁</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <span className="mr-2">🔄</span>
                반복 작업 자동화
              </h3>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>"이와 같은 패턴으로 5개 더 만들어줘"</p>
                <p>"이 컴포넌트를 템플릿으로 다른 페이지들 생성해줘"</p>
                <p>"비슷한 구조로 CRUD 전체 구현해줘"</p>
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h3 className="font-semibold text-pink-800 mb-3 flex items-center">
                <span className="mr-2">🔍</span>
                코드 리뷰 요청
              </h3>
              <div className="space-y-2 text-sm text-pink-700">
                <p>"이 코드의 잠재적 문제점 찾아줘"</p>
                <p>"성능 최적화 포인트 알려줘"</p>
                <p>"보안 취약점 검토해줘"</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-800 mb-3 flex items-center">
                <span className="mr-2">📚</span>
                학습 지원 활용
              </h3>
              <div className="space-y-2 text-sm text-cyan-700">
                <p>"이 패턴이 왜 좋은지 설명해줘"</p>
                <p>"다른 방법들과 비교 설명해줘"</p>
                <p>"베스트 프랙티스 알려줘"</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Pitfalls */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚠️ 흔한 실수와 해결책</h2>

          <div className="space-y-6">
            <div className="border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-red-500 mr-2 text-xl">❌</span>
                <h3 className="font-semibold text-red-600">너무 큰 범위의 요청</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-red-700 text-sm font-mono">"전체 프로젝트를 리팩토링해줘"</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-green-700 text-sm font-mono">"User 컴포넌트부터 시작해서 단계별로 리팩토링해줘"</p>
                </div>
              </div>
            </div>

            <div className="border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-red-500 mr-2 text-xl">❌</span>
                <h3 className="font-semibold text-red-600">컨텍스트 부족</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-red-700 text-sm font-mono">"버그 고쳐줘"</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-green-700 text-sm font-mono">
                    "@components/Button.tsx에서 클릭 이벤트가 두 번 발생하는 버그 고쳐줘"
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-red-500 mr-2 text-xl">❌</span>
                <h3 className="font-semibold text-red-600">결과 검증 생략</h3>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>💡 해결책:</strong> 구현 후 반드시 "이 코드가 올바른지 검토해줘", "테스트 케이스 작성해줘"
                  등으로 검증 요청
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">💡 핵심 원칙</h3>
          <p className="text-xl mb-4">구체적이고, 맥락을 제공하고, 제약사항을 명시하고, 기대 결과를 분명히 하세요!</p>
          <div className="text-sm opacity-90">
            <p>📋 Rules 파일 활용 • 🎯 단계별 접근 • 🔄 반복 개선 • ⚡ 생산성 극대화</p>
          </div>
        </div>
      </div>
    </div>
  );
}
