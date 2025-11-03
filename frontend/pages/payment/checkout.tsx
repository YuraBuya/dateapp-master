/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
    CreditCard,
    Building2,
    Smartphone,
    Shield,
    Crown,
    Check,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/components/Toast";
import { useSignupStore } from "@/stores/useSignupStore";

export default function PaymentCheckout() {
    const router = useRouter();
    const { showToast, ToastContainer } = useToast();
    const { paymentData, setPaymentData } = useSignupStore();
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // 요금제 정보가 없으면 플랜 선택 페이지로 이동
        if (!paymentData) {
            router.push("/payment/plans");
            return;
        }
    }, [paymentData, router]);

    const paymentMethods = [
        {
            id: "credit",
            name: "신용카드",
            description: "안전한 카드 결제",
            icon: CreditCard,
            recommended: true,
        },
        {
            id: "bank",
            name: "계좌이체",
            description: "실시간 계좌이체",
            icon: Building2,
        },
        {
            id: "kakao",
            name: "카카오페이",
            description: "간편한 카카오 결제",
            icon: Smartphone,
        },
        {
            id: "naver",
            name: "네이버페이",
            description: "간편한 네이버 결제",
            icon: Smartphone,
        },
    ];

    const handlePayment = async () => {
        if (!selectedPayment) {
            showToast("결제 방법을 선택해주세요", "error");
            return;
        }

        setIsProcessing(true);

        try {
            // 결제 방법을 상태에 저장
            if (paymentData) {
                setPaymentData({
                    ...paymentData,
                    paymentMethod: selectedPayment as
                        | "credit"
                        | "bank"
                        | "kakao"
                        | "naver",
                });
            }

            // 결제 처리 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 2000));

            showToast("결제가 완료되었습니다!", "success");

            // 회원가입 Step1으로 이동
            setTimeout(() => {
                router.push("/signup/step1");
            }, 1500);
        } catch {
            showToast("결제 처리 중 오류가 발생했습니다", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!paymentData) {
        return null; // 리다이렉션 중일 때 표시할 내용 없음
    }

    // 플랜별 색상 설정
    const getPlanColors = (planName: string) => {
        if (planName.includes("여성") || planName.includes("Pink")) {
            return {
                border: "border-pink-500",
                bg: "bg-pink-50",
                text: "text-pink-600",
                icon: "text-pink-500",
            };
        } else if (planName.includes("남성") || planName.includes("Mint")) {
            return {
                border: "border-emerald-500",
                bg: "bg-emerald-50",
                text: "text-emerald-600",
                icon: "text-emerald-500",
            };
        } else {
            return {
                border: "border-slate-500",
                bg: "bg-slate-900",
                text: "text-yellow-400",
                icon: "text-yellow-500",
            };
        }
    };

    const colors = getPlanColors(paymentData.planName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <PageHeader
                title="결제하기"
                showBack={true}
                onBack={() => router.back()}
            />

            <div className="px-4 pb-20 pt-4">
                {/* 선택한 플랜 정보 */}
                <motion.div
                    className={`bg-white rounded-2xl p-6 mb-6 border-2 shadow-lg ${colors.border}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            선택한 플랜
                        </h2>
                        {paymentData.planName.includes("Black") && (
                            <Crown className="w-5 h-5 text-yellow-500" />
                        )}
                    </div>

                    <div className={`border-l-4 pl-4 ${colors.border}`}>
                        <h3 className="text-xl font-bold text-gray-900">
                            {paymentData.planName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {paymentData.duration}
                        </p>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-2xl font-bold ${colors.text}`}
                            >
                                {paymentData.price.toLocaleString()}원
                            </span>
                            <span className="text-sm text-gray-500">
                                / {paymentData.duration}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            포함된 혜택
                        </h4>
                        <div className="space-y-2">
                            {paymentData.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center ${colors.bg}`}
                                    >
                                        <Check
                                            className={`w-3 h-3 ${colors.icon}`}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 결제 방법 선택 */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        결제 방법 선택
                    </h2>

                    <div className="space-y-3">
                        {paymentMethods.map((method) => (
                            <motion.div
                                key={method.id}
                                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${
                      selectedPayment === method.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 bg-white hover:border-pink-300"
                  }
                `}
                                onClick={() => setSelectedPayment(method.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${
                        selectedPayment === method.id
                            ? "bg-pink-500"
                            : "bg-gray-100"
                    }
                  `}
                                    >
                                        <method.icon
                                            className={`w-6 h-6 ${
                                                selectedPayment === method.id
                                                    ? "text-white"
                                                    : "text-gray-600"
                                            }`}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {method.name}
                                            </h3>
                                            {method.recommended && (
                                                <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
                                                    추천
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {method.description}
                                        </p>
                                    </div>

                                    <div
                                        className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
                        selectedPayment === method.id
                            ? "border-pink-500 bg-pink-500"
                            : "border-gray-300"
                    }
                  `}
                                    >
                                        {selectedPayment === method.id && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 보안 안내 */}
                <motion.div
                    className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                🔒 안전한 결제 보장
                            </h3>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                모든 결제 정보는 SSL 암호화로 보호되며,
                                개인정보는 안전하게 처리됩니다.
                                <br />
                                PCI DSS 인증을 받은 결제 시스템을 사용합니다.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 결제하기 버튼 */}
                <motion.button
                    className={`
            w-full h-14 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
            ${
                selectedPayment && !isProcessing
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
                    onClick={handlePayment}
                    disabled={!selectedPayment || isProcessing}
                    whileHover={
                        selectedPayment && !isProcessing ? { scale: 1.02 } : {}
                    }
                    whileTap={
                        selectedPayment && !isProcessing ? { scale: 0.98 } : {}
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            결제 처리 중...
                        </>
                    ) : (
                        `${paymentData.price.toLocaleString()}원 결제하기`
                    )}
                </motion.button>
            </div>

            <ToastContainer />
        </div>
    );
}
