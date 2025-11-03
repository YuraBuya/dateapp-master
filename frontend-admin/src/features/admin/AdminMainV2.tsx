"use client";

import React from "react";

type Stat = {
  title: string;
  value: string;
  sub?: string;
  badge?: string;
  tone: "gray" | "green" | "pink" | "amber";
};

const TONE: Record<Stat["tone"], string> = {
  gray:
    "bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-100",
  green:
    "bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-100",
  pink:
    "bg-gradient-to-r from-pink-50 via-white to-pink-50 border border-pink-100",
  amber:
    "bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-100",
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium
                  bg-white/70 text-gray-600 border-gray-200 shadow-sm">
    {children}
  </span>
);

export default function AdminMainV2() {
  const stats: Stat[] = [
    { title: "전체 회원 수", value: "1,247", sub: "전월 대비", badge: "+12%", tone: "gray" },
    { title: "활성 회원 수", value: "903", sub: "최근 30일 내 활동", badge: "+8%", tone: "green" },
    { title: "성공 매칭", value: "234", sub: "이번 달 상세한 매칭", badge: "+15%", tone: "pink" },
    { title: "월 매출", value: "1,230만원", sub: "이번 달 총 수익", badge: "+22%", tone: "amber" },
  ];

  return (
    <div className="min-h-screen px-6 py-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>
        <p className="text-gray-500 mt-1">언니의 소개 서비스 현황을 실시간으로 모니터링하세요</p>
      </div>

      {/* KPI 카드 4개 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.title}
            className={`relative rounded-2xl p-5 shadow-sm ${TONE[s.tone]}`}
          >
            {/* 아이콘 칩(오른쪽 위) */}
            <div className="absolute right-4 -top-3">
              <div className="h-9 w-9 rounded-xl bg-white shadow-sm border border-gray-100 grid place-items-center">
                {/* 심플 아이콘 대체(이모지) - 아이콘 세트가 없는 프로젝트에서도 안전 */}
                <span className="text-lg select-none">📊</span>
              </div>
            </div>

            <div className="text-gray-500 text-sm">{s.title}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-2xl font-semibold">{s.value}</div>
              {s.badge && <Badge>{s.badge}</Badge>}
            </div>
            {s.sub && <div className="mt-2 h-1.5 rounded-full bg-gray-100" />}
            {/* 미세한 밑줄로 그래프 자리감 */}
          </div>
        ))}
      </section>

      {/* 분석 섹션 */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 좌: 가입/활성/매칭 추이 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold">가입/활성/매칭 추이</h3>
            <p className="text-xs text-gray-500">사용자 활동 지표 모니터링</p>
          </div>

          {/* 차트 자리(placeholder) */}
          <div className="h-72 rounded-lg border border-dashed border-gray-200 bg-gray-50 grid place-items-center">
            <div className="text-gray-400 text-sm">최근 7일 데이터 로드</div>
          </div>

          {/* 범례 */}
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> 활성사용자
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-500" /> 신규가입
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" /> 매칭성사
            </div>
          </div>
        </div>

        {/* 우: 일별 매출 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="font-semibold">일별 매출</h3>
              <p className="text-xs text-gray-500">매출 추이 분석</p>
            </div>
            <span className="text-[11px] text-gray-500">단위: 만원</span>
          </div>

          {/* 차트 자리(placeholder) */}
          <div className="h-72 rounded-lg border border-dashed border-gray-200 bg-gradient-to-t from-amber-100/60 to-amber-50 grid place-items-center">
            <div className="text-gray-400 text-sm">최근 7일 데이터 로드</div>
          </div>
        </div>
      </section>
    </div>
  );
}
