/** @format */

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
    Heart,
    Users,
    MapPin,
    Star,
    Coffee,
    ArrowRight,
    CreditCard,
    UserPlus,
} from "lucide-react";

import BottomNav from "@/components/BottomNav";

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    features: string[];
    badge?: string;
    popular?: boolean;
}

export default function HomePage() {
    const router = useRouter();

    const features = [
        {
            icon: Users,
            title: "방문상담",
            description: "전문 매니저가 직접 만나 세심한 상담을 진행해드려요",
        },
        {
            icon: Star,
            title: "스타일링",
            description: "프로필 사진부터 데이트 스타일링까지 완벽하게",
        },
        {
            icon: Coffee,
            title: "소개팅 리포트",
            description: "만남 후 상세한 피드백으로 더 나은 만남을 준비해요",
        },
        {
            icon: MapPin,
            title: "장소예약",
            description: "특별한 데이트 장소까지 미리 예약해드려요",
        },
    ];

    const steps = [
        {
            title: "회원가입",
            description: "간단한 정보 입력으로 시작해보세요",
        },
        {
            title: "본인인증",
            description: "신뢰할 수 있는 만남을 위한 인증 절차",
        },
        {
            title: "프로필 작성",
            description: "나를 매력적으로 어필할 수 있는 프로필 완성",
        },
        {
            title: "상담 신청",
            description: "전문 매니저와의 1:1 상담 예약",
        },
        {
            title: "매칭 시작",
            description: "AI와 매니저의 협업으로 최적의 상대 추천",
        },
        {
            title: "만남 주선",
            description: "첫 만남부터 데이트까지 완벽 서포트",
        },
        {
            title: "사후관리",
            description: "성공적인 연애를 위한 지속적인 관리",
        },
    ];

    const pricingPlans: PricingPlan[] = [
        {
            name: "여성 회원",
            price: "월 99,000원",
            period: "3개월 약정",
            features: [
                "무제한 매칭 제안",
                "전문 매니저 배정",
                "프로필 사진 촬영",
                "데이트 스타일링",
                "만남 후 피드백",
            ],
            badge: "인기",
        },
        {
            name: "남성 회원",
            price: "월 149,000원",
            period: "3개월 약정",
            features: [
                "무제한 매칭 제안",
                "전문 매니저 배정",
                "프로필 사진 촬영",
                "데이트 장소 예약",
                "만남 후 피드백",
                "소개팅 연습",
            ],
            popular: true,
        },
        {
            name: "Black 회원",
            price: "월 299,000원",
            period: "6개월 약정",
            features: [
                "프리미엄 매칭",
                "전담 매니저",
                "무제한 스타일링",
                "VIP 데이트 장소",
                "24시간 상담",
                "성혼 보장 서비스",
            ],
            badge: "VIP",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 relative overflow-hidden">
                {/* 배경 그라디언트 오브 */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="container mx-auto max-w-screen-sm px-6 py-20 min-h-screen flex flex-col justify-center relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* 모던 글래스 카드 */}
                        <motion.div
                            className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-10 mb-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div
                                className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart className="w-8 h-8 text-white fill-current" />
                            </motion.div>

                            <h1 className="text-3xl md:text-4xl font-light mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                                언니의 소개
                            </h1>
                            <p className="text-base text-gray-600 leading-relaxed mb-10 font-light">
                                프리미엄 매칭 서비스로
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                    특별한 만남
                                </span>
                                을 시작하세요
                            </p>

                            {/* CTA 버튼 */}
                            <div className="space-y-4">
                                <motion.button
                                    onClick={() => router.push("/signup/step1")}
                                    className="w-full h-14 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-3 font-medium tracking-wide shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <UserPlus className="w-5 h-5" />
                                    회원가입
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    onClick={() =>
                                        router.push("/payment/plans")
                                    }
                                    className="w-full h-14 px-6 rounded-full border-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    요금제 보기
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* 통계 */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                    2,847
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    성공 커플
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                    96%
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    만족도
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                    4.8
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    평점
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 핵심 가치 */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto max-w-5xl px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 tracking-tight">
                            프리미엄 서비스
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                            차별화된 매칭 시스템과 전문 컨설팅으로
                            <br />
                            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                특별한 만남
                            </span>
                            을 제공합니다
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const gradients = [
                                "from-violet-500 to-purple-600",
                                "from-emerald-500 to-teal-600",
                                "from-blue-500 to-indigo-600",
                                "from-pink-500 to-rose-600",
                            ];
                            const bgGradients = [
                                "from-violet-50 to-purple-50",
                                "from-emerald-50 to-teal-50",
                                "from-blue-50 to-indigo-50",
                                "from-pink-50 to-rose-50",
                            ];

                            return (
                                <motion.div
                                    key={index}
                                    className={`p-8 rounded-[1.5rem] bg-gradient-to-br ${bgGradients[index]} border border-white/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-105`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${gradients[index]} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 이용 절차 */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-gray-100">
                <div className="container mx-auto max-w-6xl px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 tracking-tight">
                            서비스 프로세스
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                            체계적인 7단계 과정을 통해
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                성공적인 만남
                            </span>
                            을 보장합니다
                        </p>
                    </motion.div>

                    {/* 데스크톱/태블릿 그리드 */}
                    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {steps.slice(0, 4).map((step, index) => {
                            const stepGradients = [
                                "from-rose-500 to-pink-600",
                                "from-orange-500 to-amber-600",
                                "from-emerald-500 to-green-600",
                                "from-blue-500 to-cyan-600",
                            ];

                            return (
                                <motion.div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-6 border border-white/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-105"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div
                                        className={`w-10 h-10 bg-gradient-to-r ${stepGradients[index]} rounded-lg flex items-center justify-center mb-4 shadow-lg`}
                                    >
                                        <span className="text-white font-semibold text-sm">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="hidden md:grid md:grid-cols-3 gap-6">
                        {steps.slice(4).map((step, index) => {
                            const stepGradients = [
                                "from-purple-500 to-violet-600",
                                "from-indigo-500 to-blue-600",
                                "from-teal-500 to-emerald-600",
                            ];

                            return (
                                <motion.div
                                    key={index + 4}
                                    className="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-6 border border-white/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-105"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: (index + 4) * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div
                                        className={`w-10 h-10 bg-gradient-to-r ${stepGradients[index]} rounded-lg flex items-center justify-center mb-4 shadow-lg`}
                                    >
                                        <span className="text-white font-semibold text-sm">
                                            {index + 5}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 모바일 캐러셀 */}
                    <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex gap-4 w-max snap-x snap-mandatory">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-[1.5rem] p-6 border border-neutral-100 min-w-[280px] snap-start"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-medium text-sm">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-neutral-800 mb-2 tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-light">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 빠른 시작 링크 */}
            <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-violet-50">
                <div className="container mx-auto max-w-4xl px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 tracking-tight">
                            빠른 시작 🚀
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                            지금 바로 시작하여
                            <br />
                            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                특별한 인연
                            </span>
                            을 만나보세요
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 회원가입 카드 */}
                        <motion.div
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
                                <UserPlus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                회원가입
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                3단계 간편 가입으로
                                <br />
                                지금 바로 시작해보세요
                            </p>
                            <motion.button
                                onClick={() => router.push("/signup/step1")}
                                className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                가입하기
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        {/* 요금제 보기 카드 */}
                        <motion.div
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                요금제 보기
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                다양한 프리미엄 플랜을
                                <br />
                                확인하고 선택하세요
                            </p>
                            <motion.button
                                onClick={() => router.push("/payment/plans")}
                                className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium hover:from-violet-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                요금제 보기
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        {/* 결제 체험 카드 */}
                        <motion.div
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                전체 플로우
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                요금제 선택부터 가입까지
                                <br />
                                전체 과정을 체험해보세요
                            </p>
                            <motion.button
                                onClick={() => router.push("/payment/plans")}
                                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                체험하기
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 요금 하이라이트 */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-indigo-50">
                <div className="container mx-auto max-w-5xl px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 tracking-tight">
                            멤버십 플랜
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                            개인의 니즈에 맞는 프리미엄 서비스를
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                합리적인 가격
                            </span>
                            으로 제공합니다
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan, index) => {
                            const planStyles = {
                                "여성 회원": {
                                    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
                                    border: "border-pink-200",
                                    badge: "bg-gradient-to-r from-pink-500 to-rose-500",
                                    button: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
                                },
                                "남성 회원": {
                                    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
                                    border: "border-blue-200",
                                    badge: "bg-gradient-to-r from-blue-500 to-indigo-500",
                                    button: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
                                },
                                "Black 회원": {
                                    bg: "bg-gradient-to-br from-slate-900 to-gray-900",
                                    border: "border-slate-700",
                                    badge: "bg-gradient-to-r from-yellow-400 to-orange-500",
                                    button: "bg-gradient-to-r from-white to-gray-100 hover:from-gray-50 hover:to-white text-gray-900",
                                },
                            };

                            const currentStyle =
                                planStyles[
                                    plan.name as keyof typeof planStyles
                                ];
                            const isPremium = plan.name === "Black 회원";

                            return (
                                <motion.div
                                    key={index}
                                    className={`
                    relative rounded-[2rem] p-8 border transition-all duration-500 cursor-pointer
                    ${currentStyle.bg} ${currentStyle.border}
                    ${isPremium ? "text-white" : "text-gray-800"}
                    hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:scale-105
                  `}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    onClick={() =>
                                        router.push("/payment/plans")
                                    }
                                >
                                    {/* 상단 라벨/뱃지 */}
                                    {plan.badge && (
                                        <div className="mb-6">
                                            <span
                                                className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${
                            isPremium
                                ? "bg-white/10 text-white"
                                : "bg-neutral-100 text-neutral-700"
                        }
                      `}
                                            >
                                                {plan.badge}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3
                                            className={`text-2xl font-light mb-2 tracking-tight ${
                                                isPremium
                                                    ? "text-white"
                                                    : "text-neutral-800"
                                            }`}
                                        >
                                            {plan.name}
                                        </h3>
                                        <p
                                            className={`text-sm mb-4 ${
                                                isPremium
                                                    ? "text-neutral-300"
                                                    : "text-neutral-500"
                                            }`}
                                        >
                                            {plan.period}
                                        </p>
                                        <div
                                            className={`text-3xl font-light tracking-tight ${
                                                isPremium
                                                    ? "text-white"
                                                    : "text-neutral-800"
                                            }`}
                                        >
                                            {plan.price}
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features
                                            .slice(0, 5)
                                            .map((feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className={`flex items-center gap-3 text-sm ${
                                                        isPremium
                                                            ? "text-neutral-300"
                                                            : "text-neutral-600"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            isPremium
                                                                ? "bg-white"
                                                                : "bg-neutral-400"
                                                        }`}
                                                    />
                                                    {feature}
                                                </li>
                                            ))}
                                        {plan.features.length > 5 && (
                                            <li
                                                className={`text-sm ml-5 ${
                                                    isPremium
                                                        ? "text-neutral-400"
                                                        : "text-neutral-400"
                                                }`}
                                            >
                                                +{plan.features.length - 5}개 더
                                            </li>
                                        )}
                                    </ul>

                                    <motion.button
                                        onClick={() =>
                                            router.push("/payment/plans")
                                        }
                                        className={`
                      w-full h-12 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-medium tracking-wide
                      ${
                          isPremium
                              ? "bg-white text-neutral-900 hover:bg-neutral-100"
                              : "bg-neutral-800 text-white hover:bg-neutral-700"
                      }
                    `}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        시작하기
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 하단 CTA */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
                {/* 배경 장식 */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="container mx-auto max-w-4xl px-6 py-20 md:py-24 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
                            새로운 시작을 함께하세요
                        </h2>
                        <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                            프리미엄 매칭 서비스로 특별한 만남을 경험해보세요.
                            <br />
                            전문 컨설턴트가{" "}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                성공적인 관계
                            </span>
                            까지 함께합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <motion.button
                                onClick={() => router.push("/signup/step1")}
                                className="flex-1 h-14 px-6 rounded-full bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-50 hover:to-white transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <UserPlus className="w-5 h-5" />
                                지금 가입하기
                            </motion.button>
                            <motion.button
                                onClick={() => router.push("/payment/plans")}
                                className="flex-1 h-14 px-6 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <CreditCard className="w-5 h-5" />
                                요금제 보기
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 모바일 탭바 */}
            <BottomNav />

            {/* 하단 여백 (탭바 공간) */}
            <div className="h-20" />
        </div>
    );
}
