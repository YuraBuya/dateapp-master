# 🎯 CURSOR AI 효과적인 사용법 가이드

이 가이드는 CURSOR AI를 활용하여 Next.js + TypeScript 프로젝트를 효율적으로 개발하는 방법을 제시합니다.

## 📝 기본 원칙: 구체적이고 명확한 요청

### ❌ 나쁜 예: 모호하고 불완전한 요청

```
검색 기능 만들어줘.
```

**문제점:**

- 어디에 만들지 불분명
- 어떤 데이터를 검색할지 모름
- 어떤 기술 스택을 사용할지 불분명
- 제약사항이나 요구사항 없음

### ✅ 좋은 예: 구체적이고 완전한 요청

```
목표: users 페이지에 검색 필터 추가(인풋+디바운스+빈결과 메시지)

컨텍스트:
- 파일: app/users/page.tsx, src/hooks/useUsersQuery.ts
- API: GET /api/users?query=<string> -> User[]
- 타입: User { id:number; name:string; tags:string[] }

제약: 외부 lib 추가 금지, any 금지, 접근성 준수(aria/alt)

산출물: Plan → 작은 diff(10–30줄) → 수동 테스트 방법
```

## 🔧 효과적인 요청 구조

### 1. **목표 (Goal)** - 무엇을 만들 것인가

```
목표: 상품 목록 페이지에 필터링 기능 추가
```

### 2. **컨텍스트 (Context)** - 현재 상황과 관련 파일들

```
컨텍스트:
- 현재 파일: app/products/page.tsx
- 관련 컴포넌트: components/shared/common/Select.tsx, Input.tsx
- API 엔드포인트: /api/products?category=<string>&price=<range>
- 데이터 타입: Product { id: string; name: string; category: string; price: number }
```

### 3. **제약사항 (Constraints)** - 지켜야 할 규칙들

```
제약:
- 기존 공통 컴포넌트만 사용 (components/shared/common/)
- TypeScript strict 모드 준수 (any 타입 금지)
- 접근성 준수 (ARIA 레이블, 키보드 네비게이션)
- 외부 라이브러리 추가 금지
```

### 4. **산출물 (Deliverables)** - 기대하는 결과물

```
산출물:
1. 구현 계획 (Plan)
2. 최소한의 코드 변경 (diff 10-50줄)
3. 테스트 방법 안내
4. 사용법 예시
```

## 🏗️ 프로젝트별 컨텍스트 활용

### 기술 스택 정보 제공

```
기술 스택:
- Next.js 15.5.3 (App Router)
- TypeScript 5 (Strict 모드)
- Ant Design 5.26.7 + Tailwind CSS 4
- React Hook Form 7.62.0 + Zod 4.0.15
- Zustand 5.0.7 (상태 관리)
- React Query 5.87.4 (서버 상태)
```

### 프로젝트 구조 참조

```
관련 파일 구조:
- 페이지: app/products/page.tsx
- 컴포넌트: components/page/products/ProductFilter.tsx
- 공통 UI: components/shared/common/Select.tsx, Input.tsx
- 엔티티: entities/products/product-types.ts, product-query.ts
- 훅: hooks/useProductFilter.ts
```

## 📋 상황별 요청 예시

### 🆕 새 페이지 생성

```
목표: 주문 관리 페이지 생성 (/orders)

컨텍스트:
- 참조 페이지: app/about/page.tsx (레이아웃 참고)
- 사용할 컴포넌트: components/shared/common/Table.tsx, Button.tsx
- API: GET /api/orders -> Order[]
- 타입: Order { id: string; customerName: string; status: 'pending'|'completed'; createdAt: Date }

제약:
- 기존 공통 컴포넌트 최대 활용
- 페이지별 컴포넌트는 components/page/orders/에 배치
- SEO 최적화 적용 (metadata 설정)

산출물:
1. app/orders/page.tsx 생성
2. components/page/orders/ 하위 컴포넌트들
3. entities/orders/ 엔티티 파일들
4. 라우팅 및 네비게이션 연결
```

### 🔧 기존 기능 수정

```
목표: 로그인 폼에 비밀번호 강도 체크 추가

컨텍스트:
- 현재 파일: app/auth/login/page.tsx
- 사용 중인 컴포넌트: components/shared/common/Password.tsx, Form.tsx
- 폼 관리: React Hook Form + Zod 스키마
- 현재 검증: 최소 8자리만 체크

제약:
- Password 컴포넌트 확장 (새 컴포넌트 생성 금지)
- Zod 스키마에 새 검증 규칙 추가
- 실시간 피드백 UI 제공
- 접근성 고려 (screen reader 지원)

산출물:
1. Password.tsx 확장
2. Zod 스키마 업데이트
3. 강도 표시 UI 추가
4. 테스트 케이스 (약한/보통/강한 비밀번호)
```

### 🐛 버그 수정

```
목표: 모바일에서 드롭다운 메뉴가 잘리는 문제 해결

컨텍스트:
- 문제 파일: components/shared/common/Select.tsx
- 사용 기술: Ant Design Select + Tailwind CSS
- 문제 상황: 화면 하단에서 드롭다운이 잘림
- 브라우저: iOS Safari, Android Chrome

제약:
- Ant Design 기본 동작 유지
- 기존 API 변경 금지
- 다른 페이지에 영향 없이 수정

산출물:
1. 문제 원인 분석
2. CSS 수정 (z-index, position 등)
3. 모바일 테스트 방법
4. 회귀 테스트 체크리스트
```

### ⚡ 성능 최적화

```
목표: 상품 목록 페이지 렌더링 성능 개선

컨텍스트:
- 현재 상황: 1000개 상품 렌더링 시 3초 소요
- 파일: app/products/page.tsx, components/page/products/ProductList.tsx
- 데이터: React Query로 fetch, 클라이언트 사이드 필터링
- 컴포넌트: 각 상품마다 복잡한 UI (이미지, 버튼, 모달)

제약:
- 기존 UI/UX 유지
- 외부 라이브러리 추가 최소화
- SEO 영향 없이 개선

산출물:
1. 성능 병목 지점 분석
2. 가상화 또는 페이지네이션 적용
3. React.memo, useMemo 최적화
4. 성능 측정 방법 (before/after)
```

## 🎨 컴포넌트 개발 요청

### 새 공통 컴포넌트 생성

```
목표: 이미지 업로드 컴포넌트 생성

컨텍스트:
- 위치: components/shared/common/ImageUpload.tsx
- 참조 컴포넌트: FileUploadArea.tsx (비슷한 기능)
- 요구사항: 드래그&드롭, 미리보기, 여러 파일 지원
- 파일 제한: jpg, png, webp / 최대 5MB

제약:
- Ant Design Upload 컴포넌트 확장
- TypeScript 인터페이스 정의
- 에러 처리 및 로딩 상태
- 접근성 준수 (키보드 네비게이션)

산출물:
1. ImageUpload.tsx 컴포넌트
2. TypeScript 타입 정의
3. components/shared/common/index.ts 업데이트
4. 사용법 예시 및 Props 설명
```

## 🔍 디버깅 요청

### 에러 해결

```
목표: "Cannot read property 'map' of undefined" 에러 해결

컨텍스트:
- 에러 발생 위치: app/dashboard/page.tsx:45
- 관련 코드: {data?.items?.map(item => ...)}
- API 응답: /api/dashboard-stats
- 상태 관리: React Query 사용

현재 상황:
- 초기 로딩 시에만 발생
- 새로고침하면 정상 작동
- 개발 환경에서만 발생

제약:
- API 응답 구조 변경 불가
- 기존 로직 최대한 유지

산출물:
1. 에러 원인 분석
2. 안전한 렌더링 로직 수정
3. 로딩/에러 상태 처리 개선
4. 유사 에러 방지 가이드
```

## 📱 반응형 디자인 요청

```
목표: 대시보드 차트 컴포넌트 모바일 최적화

컨텍스트:
- 현재 파일: components/page/dashboard/ChartWidget.tsx
- 차트 라이브러리: 현재 미사용 (Ant Design Chart 고려)
- 화면 크기: 데스크톱(1200px+), 태블릿(768-1199px), 모바일(~767px)
- 데이터: 월별 매출 통계 (12개월)

제약:
- 기존 Tailwind CSS 브레이크포인트 사용
- 차트 가독성 유지 (레이블, 툴팁)
- 터치 인터랙션 지원

산출물:
1. 반응형 차트 컴포넌트 구현
2. 브레이크포인트별 레이아웃 조정
3. 모바일 터치 이벤트 처리
4. 다양한 화면 크기 테스트 방법
```

## 🧪 테스트 관련 요청

```
목표: 로그인 폼 수동 테스트 시나리오 작성

컨텍스트:
- 테스트 대상: app/auth/login/page.tsx
- 기능: 이메일/비밀번호 로그인, 유효성 검사, 에러 처리
- 관련 컴포넌트: Input.tsx, Password.tsx, Button.tsx
- API: POST /api/auth/login

테스트 범위:
- 정상 로그인 플로우
- 입력 검증 (이메일 형식, 비밀번호 길이)
- 에러 시나리오 (잘못된 인증정보, 네트워크 에러)
- 접근성 테스트 (키보드 네비게이션, 스크린 리더)

산출물:
1. 단계별 테스트 시나리오
2. 예상 결과 및 실제 결과 체크리스트
3. 에지 케이스 테스트 방법
4. 브라우저별 호환성 확인 방법
```

## 💡 효과적인 요청을 위한 팁

### 1. **파일 경로 명시**

- ✅ `app/products/page.tsx`
- ❌ "상품 페이지"

### 2. **구체적인 기술 스택 언급**

- ✅ "Ant Design Select 컴포넌트를 확장해서"
- ❌ "드롭다운을 만들어서"

### 3. **제약사항 명확히**

- ✅ "기존 공통 컴포넌트만 사용, any 타입 금지"
- ❌ "깔끔하게 만들어줘"

### 4. **예상 결과물 구체화**

- ✅ "10-30줄의 작은 diff, 테스트 방법 포함"
- ❌ "잘 작동하게 해줘"

### 5. **단계별 진행 요청**

- ✅ "1. 계획 수립 → 2. 구현 → 3. 테스트 방법"
- ❌ "한 번에 다 해줘"

## 🚀 고급 활용법

### 리팩토링 요청

```
목표: UserProfile 컴포넌트를 공통 컴포넌트로 분리

현재 상황:
- 3개 페이지에서 유사한 사용자 프로필 UI 중복
- 파일: app/dashboard/page.tsx, app/settings/page.tsx, app/profile/page.tsx
- 공통 부분: 아바타, 이름, 이메일, 상태 표시

리팩토링 계획:
1. components/shared/ui/UserProfile.tsx 생성
2. Props 인터페이스 설계 (확장성 고려)
3. 기존 3개 페이지에서 새 컴포넌트 사용
4. index.ts 파일들 업데이트

제약:
- 기존 UI/UX 완전 유지
- 각 페이지별 커스터마이징 가능하도록
- TypeScript 타입 안정성 보장
```

### 아키텍처 개선 요청

```
목표: API 호출 로직을 React Query로 통일

현재 상황:
- 일부는 axios 직접 사용, 일부는 React Query 사용
- 에러 처리 및 로딩 상태가 페이지마다 다름
- 캐싱 전략이 일관되지 않음

개선 방향:
1. entities/[feature]/[feature]-query.ts 패턴으로 통일
2. 공통 에러 처리 훅 생성
3. 캐싱 전략 표준화
4. 낙관적 업데이트 패턴 적용

제약:
- 기존 API 엔드포인트 변경 없이
- 점진적 마이그레이션 (한 번에 모든 것 변경 금지)
- 성능 저하 없이 개선
```

---

## 📚 참고: 프로젝트 구조 및 컨벤션

이 프로젝트는 다음과 같은 구조와 규칙을 따릅니다:

- **기술 스택**: Next.js 15 + TypeScript + Ant Design + Tailwind CSS
- **상태 관리**: Zustand + React Query
- **폼 관리**: React Hook Form + Zod
- **국제화**: React i18next
- **컴포넌트 구조**: Layout > Page > Shared (Common/UI/Utils)
- **엔티티 구조**: Types + Query + Mutation + Dummy + Index

자세한 내용은 `.cursor/rules/project.mdc` 파일을 참고하세요.

---

**💡 핵심 원칙: 구체적이고, 맥락을 제공하고, 제약사항을 명시하고, 기대 결과를 분명히 하세요!**
