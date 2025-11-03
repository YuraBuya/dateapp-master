/** @format */

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, Clock, Filter, Search } from "lucide-react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/components/Toast";

interface Candidate {
    id: string;
    memberId: string;
    name: string;
    gender: string;
    age: number;
    job: string;
    location: string;
    photos: string[];
    summary: string;
    highlights: string[];
    matchScore: number;
    commonInterests: string[];
    introduction: string;
}

interface Proposal {
    id: string;
    expiresAt: string;
    createdAt: string;
    type: string;
    status?: string;
    candidates: Candidate[];
}

export default function MatchingInbox() {
    const router = useRouter();
    const { showToast, ToastContainer } = useToast();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProposals = useCallback(async () => {
        try {
            const response = await fetch("/api/matchings/inbox");
            const result = await response.json();

            if (result.success) {
                setProposals(result.proposals);
            } else {
                showToast("매칭 정보를 불러오는데 실패했습니다", "error");
            }
        } catch {
            showToast("네트워크 오류가 발생했습니다", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProposals();
    }, [fetchProposals]);

    const handleCandidateAction = (action: "like" | "pass") => {
        if (action === "like") {
            showToast("💖 관심 표현을 보냈습니다!", "success");
        } else {
            showToast("다음 기회에 만나요", "info");
        }
    };

    const getTimeRemaining = (expiresAt: string) => {
        const now = new Date();
        const expires = new Date(expiresAt);
        const diff = expires.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours}시간 남음`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                <motion.div
                    className="w-12 h-12 rounded-full border-4 border-violet-300 border-t-violet-600"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <ToastContainer />
            <PageHeader title="매칭 인박스" />

            <div className="px-4 py-6 pb-24 mx-auto max-w-screen-sm">
                {/* 헤더 */}
                <motion.div
                    className="mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        새로운 매칭 💕
                    </h1>
                    <p className="text-gray-600">
                        당신을 위해 엄선된 특별한 인연들이에요
                    </p>
                </motion.div>

                {/* 필터 버튼들 */}
                <motion.div
                    className="flex overflow-x-auto gap-3 mb-6 scrollbar-hide"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button className="flex gap-2 items-center px-4 py-2 text-gray-700 whitespace-nowrap bg-white rounded-full border border-gray-200">
                        <Filter className="w-4 h-4" />
                        필터
                    </button>
                    <button className="flex gap-2 items-center px-4 py-2 text-white whitespace-nowrap bg-gradient-to-r from-violet-500 to-purple-600 rounded-full">
                        <Star className="w-4 h-4" />
                        추천순
                    </button>
                    <button className="px-4 py-2 text-gray-700 whitespace-nowrap bg-white rounded-full border border-gray-200">
                        거리순
                    </button>
                    <button className="px-4 py-2 text-gray-700 whitespace-nowrap bg-white rounded-full border border-gray-200">
                        최신순
                    </button>
                </motion.div>

                {/* 매칭 제안들 */}
                {proposals.length === 0 ? (
                    <motion.div
                        className="py-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center items-center mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full">
                            <Search className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            새로운 매칭을 준비중이에요
                        </h3>
                        <p className="text-sm text-gray-600">
                            곧 멋진 분들을 소개해드릴게요!
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {proposals.map((proposal, proposalIndex) => (
                            <motion.div
                                key={proposal.id}
                                className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: proposalIndex * 0.1,
                                }}
                            >
                                {/* 제안 헤더 */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {proposal.type === "premium"
                                                    ? "프리미엄 매칭"
                                                    : "일반 매칭"}
                                            </span>
                                        </div>
                                        <div className="flex gap-1 items-center text-xs text-amber-600">
                                            <Clock className="w-3 h-3" />
                                            {getTimeRemaining(
                                                proposal.expiresAt
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 후보자들 */}
                                <div className="p-4">
                                    {proposal.candidates.map(
                                        (candidate, candidateIndex) => (
                                            <motion.div
                                                key={candidate.id}
                                                className="mb-6 last:mb-0"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: candidateIndex * 0.1,
                                                }}
                                            >
                                                {/* 후보자 기본 정보 */}
                                                <div className="flex gap-4 items-start mb-4">
                                                    <div className="overflow-hidden flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-white shadow-lg">
                                                        <img
                                                            src={
                                                                candidate.gender ===
                                                                "male"
                                                                    ? "/images/profiles/male-profile.svg"
                                                                    : "/images/profiles/female-profile.svg"
                                                            }
                                                            alt={`${candidate.name} 프로필`}
                                                            className="object-cover w-full h-full"
                                                            onError={(e) => {
                                                                // 이미지 로드 실패 시 fallback
                                                                const target =
                                                                    e.target as HTMLImageElement;
                                                                target.style.display =
                                                                    "none";
                                                                target.parentElement!.innerHTML = `
                                <div class="flex justify-center items-center w-full h-full bg-gradient-to-r from-violet-500 to-purple-600">
                                  <span class="text-lg font-bold text-white">${candidate.name.charAt(
                                      0
                                  )}</span>
                                </div>
                              `;
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex gap-2 items-center mb-1">
                                                            <h3 className="font-semibold text-gray-900">
                                                                {candidate.name}
                                                            </h3>
                                                            <span className="text-sm text-gray-600">
                                                                {candidate.age}
                                                                세
                                                            </span>
                                                            <div className="flex gap-1 items-center px-2 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
                                                                <Heart className="w-3 h-3 text-pink-600" />
                                                                <span className="text-xs font-medium text-pink-700">
                                                                    {
                                                                        candidate.matchScore
                                                                    }
                                                                    % 매칭
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <p className="mb-2 text-sm text-gray-600">
                                                            {candidate.job}
                                                        </p>

                                                        <div className="flex gap-1 items-center text-xs text-gray-500">
                                                            <MapPin className="w-3 h-3" />
                                                            {candidate.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 공통 관심사 */}
                                                {candidate.commonInterests
                                                    .length > 0 && (
                                                    <div className="mb-4">
                                                        <p className="mb-2 text-xs font-medium text-gray-700">
                                                            🎯 공통 관심사
                                                        </p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {candidate.commonInterests.map(
                                                                (
                                                                    interest,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="px-2 py-1 text-xs text-blue-700 bg-blue-50 rounded-full"
                                                                    >
                                                                        {
                                                                            interest
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 소개 */}
                                                <div className="mb-4">
                                                    <p className="text-sm leading-relaxed text-gray-700">
                                                        {candidate.summary}
                                                    </p>
                                                </div>

                                                {/* 액션 버튼들 */}
                                                <div className="flex gap-3">
                                                    <motion.button
                                                        onClick={() =>
                                                            handleCandidateAction(
                                                                "pass"
                                                            )
                                                        }
                                                        className="flex-1 px-4 h-12 font-medium text-gray-700 rounded-xl border border-gray-300 transition-all duration-200 hover:bg-gray-50"
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                    >
                                                        다음에
                                                    </motion.button>

                                                    <motion.button
                                                        onClick={() =>
                                                            handleCandidateAction(
                                                                "like"
                                                            )
                                                        }
                                                        className="flex flex-1 gap-2 justify-center items-center px-4 h-12 font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl transition-all duration-200 hover:from-pink-600 hover:to-rose-600"
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                        관심있어요
                                                    </motion.button>
                                                </div>

                                                {/* 설문 링크 */}
                                                <motion.button
                                                    onClick={() =>
                                                        router.push(
                                                            `/survey/${candidate.id}`
                                                        )
                                                    }
                                                    className="mt-3 w-full text-sm text-center text-violet-600 transition-colors hover:text-violet-700"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    💭 만남 후기 작성하기
                                                </motion.button>
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 더보기 버튼 */}
                {proposals.length > 0 && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <motion.button
                            onClick={() =>
                                showToast("더 많은 매칭을 준비중입니다", "info")
                            }
                            className="px-6 py-3 font-medium text-gray-700 bg-white rounded-full border border-gray-200 transition-all duration-200 hover:bg-gray-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            더 많은 매칭 보기
                        </motion.button>
                    </motion.div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
