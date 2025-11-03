/** @format */

import { motion } from "framer-motion";
import {
    Camera,
    Edit,
    Settings,
    Heart,
    Star,
    MessageCircle,
} from "lucide-react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/components/Toast";

export default function ProfilePage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showToast, ToastContainer } = useToast();

    const stats = [
        {
            label: "받은 좋아요",
            value: "24",
            icon: Heart,
            color: "from-pink-500 to-rose-500",
        },
        {
            label: "매칭 성공",
            value: "3",
            icon: Star,
            color: "from-yellow-500 to-orange-500",
        },
        {
            label: "대화 중",
            value: "5",
            icon: MessageCircle,
            color: "from-blue-500 to-indigo-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <ToastContainer />
            <PageHeader title="내 프로필" />

            <div className="px-4 py-6 max-w-screen-sm mx-auto pb-24">
                {/* 프로필 카드 */}
                <motion.div
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center">
                        {/* 프로필 사진 */}
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                                <img
                                    src="/images/profiles/female-profile.svg"
                                    alt="프로필 사진"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // 이미지 로드 실패 시 fallback
                                        const target =
                                            e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    `;
                                    }}
                                />
                            </div>
                            <motion.button
                                className="absolute bottom-0 right-1/2 transform translate-x-12 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                    showToast(
                                        "사진 편집 기능이 준비 중입니다",
                                        "info"
                                    )
                                }
                            >
                                <Camera className="w-4 h-4 text-gray-600" />
                            </motion.button>
                        </div>

                        {/* 사용자 정보 */}
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                            {user?.name || "김회원"}
                        </h2>
                        <p className="text-gray-600 mb-2">
                            마케팅 전문가, 28세
                        </p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 text-sm font-medium">
                            ✨ 여성 회원
                        </div>
                    </div>

                    {/* 프로필 완성도 */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-700">
                                프로필 완성도
                            </span>
                            <span className="text-sm font-bold text-blue-700">
                                85%
                            </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                            더 많은 매칭을 위해 자기소개를 추가해보세요!
                        </p>
                    </div>
                </motion.div>

                {/* 통계 */}
                <motion.div
                    className="grid grid-cols-3 gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                            >
                                <stat.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-600">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 액션 버튼들 */}
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.button
                        onClick={() =>
                            showToast(
                                "프로필 편집 기능이 준비 중입니다",
                                "info"
                            )
                        }
                        className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Edit className="w-5 h-5" />
                        프로필 편집하기
                    </motion.button>

                    <motion.button
                        onClick={() => router.push("/settings")}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Settings className="w-5 h-5" />
                        설정
                    </motion.button>
                </motion.div>

                {/* 매칭 팁 */}
                <motion.div
                    className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-sm font-semibold text-emerald-700 mb-2">
                        💡 매칭 성공 팁
                    </h3>
                    <ul className="text-sm text-emerald-600 space-y-1">
                        <li>• 프로필 사진을 다양하게 업로드해보세요</li>
                        <li>• 자기소개를 구체적이고 진솔하게 작성하세요</li>
                        <li>• 관심사와 취미를 상세히 적어보세요</li>
                        <li>• 정기적으로 프로필을 업데이트하세요</li>
                    </ul>
                </motion.div>
            </div>

            <BottomNav />
        </div>
    );
}
