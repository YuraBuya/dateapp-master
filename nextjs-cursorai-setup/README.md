# Next.js + TypeScript 프로젝트 개발 가이드

이 프로젝트는 Next.js 15 + TypeScript를 기반으로 한 모던 웹 애플리케이션 개발 템플릿입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트: 3050)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린팅
npm run lint
```

개발 서버가 실행되면 [http://localhost:3050](http://localhost:3050)에서 확인할 수 있습니다.

## 🏗️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4 + Ant Design 5.26.7
- **State Management**: Zustand 5.0.7
- **Form**: React Hook Form 7.62.0 + Zod 4.0.15
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React 0.537.0
- **i18n**: React i18next 15.6.1
- **Notifications**: React Toastify 11.0.5

## 📁 프로젝트 구조

```
/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── globals.css        # 전역 스타일
│   └── [feature]/         # 기능별 페이지 디렉토리
├── components/            # 컴포넌트 구조
│   ├── layout/           # 레이아웃 컴포넌트 (Header, Footer)
│   ├── page/             # 페이지별 특화 컴포넌트
│   └── shared/           # 공유 컴포넌트
│       ├── common/       # 기본 UI 컴포넌트 (Button, Input, etc.)
│       ├── ui/           # 복합 UI 컴포넌트
│       └── utils/        # 유틸리티 컴포넌트
├── entities/             # 데이터 엔티티 및 비즈니스 로직
│   ├── [feature]/        # 기능별 엔티티
│   │   ├── [feature]-types.ts      # 타입 정의
│   │   ├── [feature]-query.ts      # 조회 로직
│   │   ├── [feature]-mutation.ts   # 변경 로직
│   │   ├── [feature]-dummy.ts      # 더미 데이터
│   │   └── index.ts               # 내보내기
│   ├── endpoints.ts      # API 엔드포인트 정의
│   └── index.ts          # 전체 엔티티 내보내기
├── hooks/                # 커스텀 훅
├── libs/                 # 외부 라이브러리 설정
├── locales/              # 다국어 지원
│   ├── kr/translation.json
│   └── en/translation.json
├── providers/            # Context Providers
├── assets/               # 정적 자산
│   ├── fonts/           # 폰트 파일
│   └── imgs/            # 이미지 및 아이콘
└── public/              # 퍼블릭 자산
```
