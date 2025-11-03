/** @format */

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import PlanCard from "@/components/PlanCard";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/components/Toast";
import { useSignupStore } from "@/stores/useSignupStore";

interface PaymentPlan {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    period: string;
    color: "pink" | "mint" | "purple";
    features: Array<{
        text: string;
        included: boolean;
    }>;
    isPopular?: boolean;
    isPremium?: boolean;
    description: string;
}

export default function PaymentPlans() {
    const router = useRouter();
    const { showToast, ToastContainer } = useToast();
    const { setPaymentData } = useSignupStore();
    const [plans, setPlans] = useState<PaymentPlan[]>([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchPlans();
    // }, [fetchPlans]);

    const fetchPlans = useCallback(async () => {
        try {
            const response = await fetch("/api/payments");
            const result = await response.json();

            if (result.success) {
                setPlans(result.data);
            } else {
                showToast("요금제 정보를 불러오는데 실패했습니다", "error");
            }
        } catch {
            showToast("네트워크 오류가 발생했습니다", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    const handleStartPlan = (plan: PaymentPlan) => {
        // 선택한 요금제 정보를 Zustand 스토어에 저장
        const paymentData = {
            planId: plan.id,
            planName: plan.name,
            price: parseInt(plan.price.replace(/[^\d]/g, "")), // 숫자만 추출
            duration: plan.period,
            features: plan.features
                .filter((f) => f.included)
                .map((f) => f.text),
            paymentMethod: null as "credit" | "bank" | "kakao" | "naver" | null,
        };

        setPaymentData(paymentData);

        // 결제 페이지로 이동
        router.push("/payment/checkout");
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
            <PageHeader title="멤버십 플랜" showBack />

            <div className="px-4 py-6 pb-24 mx-auto max-w-screen-sm">
                {/* 헤더 */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        완벽한 매칭을 위한 플랜 💎
                    </h1>
                    <p className="leading-relaxed text-gray-600">
                        당신에게 맞는 프리미엄 서비스를
                        <br />
                        선택하고 특별한 만남을 시작하세요
                    </p>
                </motion.div>

                {/* 플랜 카드들 */}
                <div className="space-y-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <PlanCard
                                name={plan.name}
                                price={plan.price}
                                period={plan.period}
                                features={plan.features}
                                color={plan.color}
                                isPopular={plan.isPopular}
                                isPremium={plan.isPremium}
                                onSelect={() => handleStartPlan(plan)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* 서비스 보장 */}
                <motion.div
                    className="p-6 mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="mb-4 text-lg font-semibold text-center text-gray-900">
                        🛡️ 서비스 보장
                    </h3>
                    <div className="space-y-3">
                        <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-white">✓</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    100% 실명인증
                                </span>{" "}
                                - 모든 회원은 엄격한 신원확인을 거칩니다
                            </p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-white">✓</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    전문 매니저 관리
                                </span>{" "}
                                - 경험 많은 매칭 전문가가 직접 관리합니다
                            </p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-white">✓</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    개인정보 보호
                                </span>{" "}
                                - 최고 수준의 보안으로 안전하게 보호합니다
                            </p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-white">✓</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    7일 환불보장
                                </span>{" "}
                                - 서비스가 맞지 않으면 전액 환불해드립니다
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                    className="p-6 mt-8 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h3 className="mb-4 text-lg font-semibold text-center text-violet-800">
                        ❓ 자주 묻는 질문
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="mb-1 text-sm font-semibold text-violet-700">
                                Q. 매칭은 어떻게 이루어지나요?
                            </h4>
                            <p className="text-sm text-violet-600">
                                A. 개인의 성향, 가치관, 선호도를 종합적으로
                                분석하여 최적의 상대방을 추천해드립니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-1 text-sm font-semibold text-violet-700">
                                Q. 요금제 변경이 가능한가요?
                            </h4>
                            <p className="text-sm text-violet-600">
                                A. 언제든지 상위 플랜으로 업그레이드가 가능하며,
                                차액만 결제하시면 됩니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-1 text-sm font-semibold text-violet-700">
                                Q. 개인정보는 안전한가요?
                            </h4>
                            <p className="text-sm text-violet-600">
                                A. 모든 개인정보는 암호화되어 저장되며, 매칭
                                목적 외에는 절대 사용되지 않습니다.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 문의하기 */}
                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className="mb-3 text-sm text-gray-600">
                        궁금한 점이 있으시면 언제든 문의해주세요
                    </p>
                    <div className="flex gap-3 justify-center">
                        <motion.button
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                showToast(
                                    "카카오톡 문의가 준비 중입니다",
                                    "info"
                                )
                            }
                        >
                            💬 카카오톡 문의
                        </motion.button>
                        <motion.button
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                showToast("전화 상담이 준비 중입니다", "info")
                            }
                        >
                            📞 전화 상담
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <BottomNav />
        </div>
    );
}
