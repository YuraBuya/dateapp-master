# 언니의 소개 - 프리미엄 매칭 서비스

> **완전한 데이팅 앱 생태계**  
> 사용자 앱 + 관리자 대시보드를 포함한 종합 매칭 서비스 플랫폼

![License](https://img.shields.io/badge/license-Private-red)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## 📋 프로젝트 개요

**언니의 소개**는 프리미엄 매칭 서비스를 위한 완전한 웹 애플리케이션 생태계입니다. 모바일 우선의 사용자 앱과 강력한 관리자 대시보드를 통해 전문적인 소개팅 서비스를 제공합니다.

### 🎯 주요 특징

- **🎨 모바일 우선 설계**: 375px 기준 완벽한 모바일 최적화
- **🌈 현대적 UI/UX**: 컬러풀한 그라디언트와 부드러운 애니메이션
- **📊 실시간 관리자 대시보드**: 지도 기반 사용자 분석 및 관리
- **🔐 완전한 인증 시스템**: 다단계 회원가입 및 문서 검증
- **💳 통합 결제 시스템**: 다양한 멤버십 플랜 및 결제 옵션
- **📱 반응형 디자인**: 모든 디바이스에서 완벽한 사용자 경험

## 🏗️ 프로젝트 구조

```
dateapp-master/
├── frontend/                 # 사용자 앱 (포트 3000)
│   ├── pages/               # Next.js Pages Router
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── stores/             # Zustand 상태 관리
│   ├── styles/             # Tailwind CSS 스타일
│   ├── public/             # 정적 파일 및 이미지
│   └── mocks/              # 개발용 Mock 데이터
├── frontend-admin/          # 관리자 대시보드 (포트 3001)
│   ├── app/                # Next.js App Router
│   ├── components/         # 관리자 전용 컴포넌트
│   ├── stores/            # 관리자 상태 관리
│   ├── types/             # TypeScript 타입 정의
│   └── public/            # 관리자 패널 정적 파일
└── stores/                # 공유 상태 관리 (공통)
```

## 🚀 빠른 시작

### 시스템 요구사항

- **Node.js**: 18.0 이상
- **npm**: 8.0 이상
- **Git**: 최신 버전

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd dateapp-master
```

2. **사용자 앱 실행** (포트 3000)
```bash
cd frontend
npm install
npm run dev
```

3. **관리자 대시보드 실행** (포트 3001)
```bash
cd frontend-admin
npm install  
npm run dev
```

4. **브라우저에서 확인**
- 사용자 앱: http://localhost:3000
- 관리자 대시보드: http://localhost:3001

## 📱 사용자 앱 (Frontend)

### 주요 기능

#### 🏠 메인 페이지
- **Hero 섹션**: 그라디언트 배경과 애니메이션 blob
- **서비스 소개**: 4가지 핵심 서비스 (방문상담, 스타일링, 리포트, 장소예약)
- **이용 절차**: 7단계 프로세스 가이드
- **요금제**: 3가지 멤버십 플랜 (여성/남성/Black)

#### 👤 회원가입 시스템
- **Step 1**: 기본정보 입력 + 본인인증 시뮬레이션
- **Step 2**: 프로필 정보 (성별, 직업, 취미, 성격, 이상형)
- **Step 3**: 사진/서류 업로드 (드래그 앤 드롭 지원)
- **완료**: 가입 완료 및 멤버십 안내

#### 📝 설문 조사 시스템
- **객관식 4문항**: 만족도, 추천의향, 서비스품질, 편의성
- **주관식 1문항**: 자유 피드백 (최소 10자)
- **시각적 UI**: 이모지 버튼과 색상 피드백

#### 💳 결제 시스템
- **요금제 선택**: 3종 멤버십 카드 디자인
- **결제 방법**: 카드/휴대폰/무통장입금
- **약관 동의**: 체크박스 검증
- **결제 시뮬레이션**: 2초 로딩 후 완료

#### ⚙️ 설정 페이지
- **프로필 요약**: 완성도 표시 카드
- **언어 토글**: 한국어 ↔ English
- **알림 설정**: 푸시/이메일/SMS 개별 제어
- **테마 설정**: 라이트/다크 모드
- **고객지원**: 문의 메뉴

#### 👥 프로필 관리
- **완성도 표시**: 프로필 완성률
- **매칭 통계**: 좋아요, 성공, 대화 중 수치
- **편집 기능**: 프로필 수정 버튼

### 기술 스택

#### Core Framework
- **Next.js 15.5.2** (Pages Router)
- **React 19.1.0**
- **TypeScript 5.0**

#### Styling & Animation
- **Tailwind CSS 3.4.16**
- **Framer Motion 12.23.12** (애니메이션)
- **Pretendard Variable** (한글 최적화 웹폰트)
- **Lucide React 0.542.0** (아이콘)

#### State Management & Forms
- **Zustand 5.0.8** (전역 상태 관리)
- **React Hook Form 7.62.0** (폼 관리)
- **Zod 4.1.5** (스키마 검증)

#### UI Components
- **Radix UI** (접근성 우선 컴포넌트)
- **shadcn/ui** (재사용 가능한 UI 컴포넌트)
- **Class Variance Authority** (조건부 스타일링)

## 🖥️ 관리자 대시보드 (Frontend-Admin)

### 주요 기능

#### 📊 대시보드
- **실시간 KPI**: 총 사용자, 활성 사용자, 매칭 성공률, 수익
- **지도 기반 분석**: 한국/몽골 지역별 사용자 분포
- **차트 시각화**: Recharts 기반 데이터 차트
- **알림 시스템**: 실시간 관리자 알림

#### 🗺️ 지리적 분석
- **한국 지도**: 시/도별 사용자 분포 히트맵
- **몽골 지도**: 아이막별 사용자 현황
- **인터랙티브 기능**: 줌, 팬, 지역별 필터링
- **실시간 데이터**: D3.js 기반 스케일링

#### 👥 회원 관리
- **사용자 목록**: 페이지네이션, 검색, 필터링
- **프로필 검증**: 신분증, 졸업증명서, 재직증명서 등
- **상태 관리**: 활성/정지/대기/차단 상태 변경
- **활동 로그**: 사용자별 활동 이력 추적

#### 💕 매칭 관리
- **매칭 현황**: 진행 중/완료/취소된 매칭
- **만남 관리**: 데이트 일정 및 장소 관리
- **설문 결과**: 만남 후 만족도 조사 결과
- **성공률 분석**: 매칭 성공률 통계

#### 💰 결제 관리
- **거래 내역**: 모든 결제 트랜잭션 관리
- **환불 처리**: 환불 요청 및 처리
- **수익 분석**: 일/월/년 수익 리포트
- **결제 방법**: 다양한 결제 수단 통계

#### 🚨 신고 관리
- **신고 목록**: 부적절한 행동, 가짜 프로필 등
- **조사 진행**: 신고 접수부터 해결까지
- **증거 관리**: 스크린샷, 채팅 로그 등
- **처리 결과**: 해결/기각 처리 및 기록

#### ⚙️ 시스템 설정
- **서버 상태**: 시스템 가용성 모니터링
- **데이터베이스**: 연결 상태 및 백업 관리
- **보안 설정**: 접근 권한 및 보안 정책
- **알림 설정**: 관리자 알림 규칙

### 기술 스택

#### Core Framework
- **Next.js 15.5.2** (App Router)
- **React 19.1.0**
- **TypeScript 5.0**

#### Data Visualization
- **Recharts 2.15.4** (차트 라이브러리)
- **react-simple-maps 3.0.0** (지도 시각화)
- **D3-scale 4.0.2** (데이터 스케일링)

#### UI Framework
- **Radix UI** (접근성 우선 컴포넌트)
- **Tailwind CSS 3.4.16**
- **Framer Motion 12.23.12**
- **Lucide React 0.542.0**

#### State Management
- **Zustand 5.0.8**
- **React Hook Form 7.62.0**
- **Zod 4.1.5**

## 🗄️ 데이터베이스 정보

> **참고**: 현재 프로토타입은 Mock 데이터를 사용하며, 실제 데이터베이스 연동을 위한 설정 정보는 다음과 같습니다.

### PostgreSQL 설정 (Hural App 프로젝트용)
- **Host**: 192.168.0.171
- **Port**: 5432
- **Database**: notemi
- **Username**: notemi_user
- **Password**: notemi2025

### 데이터 모델

#### 사용자 관리
- **회원 정보**: 기본정보, 프로필, 인증 상태
- **문서 검증**: 신분증, 학력, 재직, 혼인관계 증명서
- **활동 로그**: 로그인, 프로필 수정, 매칭 활동

#### 매칭 시스템
- **매칭 데이터**: 참가자, 상태, 만남 일정
- **설문 결과**: 만족도, 피드백, 점수
- **채팅 메시지**: 매칭 후 대화 내역

#### 결제 시스템
- **거래 내역**: 결제, 환불, 취소
- **멤버십**: 여성/남성/Black 플랜
- **정기 결제**: 구독 관리

## 🎨 디자인 시스템

### 컬러 팔레트
```css
/* 주요 브랜드 컬러 */
--pink: #EC4899      /* 여성 멤버십 */
--mint: #10B981      /* 남성 멤버십 */
--purple: #8B5CF6    /* Black 멤버십 */

/* 그라디언트 */
--gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--gradient-mint: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
```

### 타이포그래피
- **Primary Font**: Pretendard Variable (한글 최적화)
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif
- **Font Sizes**: 12px ~ 48px (Tailwind CSS 스케일)

### 반응형 브레이크포인트
```css
sm: 640px   /* 태블릿 */
md: 768px   /* 작은 데스크탑 */
lg: 1024px  /* 데스크탑 */
xl: 1280px  /* 큰 데스크탑 */
```

## 🔧 개발 가이드

### 코드 구조 원칙
- **Feature-Sliced Design (FSD)** 아키텍처 적용
- **컴포넌트 분리**: 기능별 독립적인 컴포넌트
- **상태 관리**: Zustand를 통한 중앙집중식 관리
- **타입 안전성**: TypeScript 엄격 모드 적용

### 개발 환경 설정
```bash
# 린팅 실행
npm run lint

# 타입 체크
npm run type-check

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

### 환경 변수
```env
# 개발 환경
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# 프로덕션 환경  
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# 데이터베이스 (실제 연동 시)
DATABASE_URL=postgresql://notemi_user:notemi2025@192.168.0.171:5432/notemi
```

## 🧪 테스트 시나리오

### 사용자 앱 테스트

#### 1. 회원가입 플로우
1. 메인 페이지 → "시작하기" 클릭
2. Step 1: 이름, 전화번호 입력 → 본인인증 (2초 시뮬레이션)
3. Step 2: 성별, 직업, 취미, 성격, 이상형 선택
4. Step 3: 사진/서류 드래그 앤 드롭 업로드
5. 완료 페이지 → "멤버십 플랜 보기" 이동

#### 2. 설문 시스템
1. URL: `/survey/match123` 직접 접근
2. 객관식 4문항 선택 (이모지 버튼 클릭)
3. 주관식 의견 작성 (최소 10자 입력)
4. "피드백 제출하기" → 성공 토스트 확인

#### 3. 결제 시뮬레이션
1. `/payment/plans` → 원하는 플랜 선택
2. 결제 방법 선택 (카드/휴대폰/무통장입금)
3. 약관 동의 체크박스 선택
4. "결제하기" → 2초 로딩 → 성공 메시지

### 관리자 대시보드 테스트

#### 1. 로그인 및 대시보드
1. `/login` → 관리자 계정 로그인
2. 대시보드 KPI 카드 확인
3. 지도 인터랙션 테스트 (줌, 팬, 필터)
4. 차트 데이터 시각화 확인

#### 2. 회원 관리
1. 회원 목록 페이지 접근
2. 검색 및 필터링 기능 테스트
3. 회원 상태 변경 (활성/정지)
4. 문서 검증 프로세스 확인

## 📈 성능 최적화

### 프론트엔드 최적화
- **코드 분할**: 페이지별 동적 임포트
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **폰트 최적화**: Pretendard Variable 웹폰트
- **번들 분석**: webpack-bundle-analyzer

### 렌더링 최적화
- **SSR/SSG**: Next.js 하이브리드 렌더링
- **메모이제이션**: React.memo, useMemo 활용
- **가상화**: 긴 목록에 대한 윈도우 렌더링
- **레이지 로딩**: 뷰포트 기반 컴포넌트 로딩

## 🚀 배포 가이드

### Vercel 배포 (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel --prod
```

### Docker 배포
```dockerfile
# Dockerfile (frontend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 환경별 설정
- **개발**: localhost:3000, localhost:3001
- **스테이징**: staging-app.domain.com, staging-admin.domain.com  
- **프로덕션**: app.domain.com, admin.domain.com

## 🛡️ 보안 고려사항

### 인증 및 권한
- **JWT 토큰**: 안전한 세션 관리
- **역할 기반 접근**: 사용자/관리자 권한 분리
- **API 보안**: 요청 검증 및 제한
- **데이터 암호화**: 민감 정보 암호화 저장

### 프라이버시
- **GDPR 준수**: 개인정보 처리 방침
- **데이터 최소화**: 필요한 정보만 수집
- **동의 관리**: 명시적 사용자 동의
- **데이터 삭제**: 사용자 요청 시 완전 삭제

## 📞 지원 및 문의

### 개발팀 연락처
- **프로젝트 관리자**: [이메일 주소]
- **기술 지원**: [기술 지원 이메일]
- **버그 리포트**: GitHub Issues

### 문서 및 리소스
- **API 문서**: `/docs/api`
- **컴포넌트 가이드**: `/docs/components`
- **배포 가이드**: `/docs/deployment`

## 📄 라이선스

이 프로젝트는 비공개 소프트웨어입니다. 모든 권리는 저작권자에게 있습니다.

---

**© 2024 언니의 소개. All rights reserved.**

> **개발 환경**: Windows 10, Git Bash  
> **마지막 업데이트**: 2024년 12월  
> **버전**: 1.0.0
