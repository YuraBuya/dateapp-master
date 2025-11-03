/** @format */

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    User,
    Globe,
    Bell,
    Shield,
    HelpCircle,
    LogOut,
    ChevronRight,
    Moon,
    Sun,
    MessageSquare,
    Star,
    Camera,
    Edit,
} from "lucide-react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useToast } from "@/components/Toast";

interface UserProfile {
    name: string;
    email: string;
    profileImage: string;
    membershipType: string;
    joinDate: string;
}

interface SettingsItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description: string;
    action: () => void;
    color: string;
    hasToggle?: boolean;
    toggleValue?: boolean;
}

export default function SettingsPage() {
    const router = useRouter();
    const { user, signOut } = useAuthStore();
    const {
        language,
        notifications,
        theme,
        setLanguage,
        toggleNotification,
        setTheme,
    } = useSettingsStore();
    const { showToast, ToastContainer } = useToast();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchUserSettings();
    // }, [fetchUserSettings]);

    const fetchUserSettings = useCallback(async () => {
        try {
            // 실제로는 API에서 사용자 정보를 가져옴
            const mockProfile: UserProfile = {
                name: user?.name || "김회원",
                email: user?.email || "user@example.com",
                profileImage: "/api/placeholder/100/100",
                membershipType: user?.membershipType || "female",
                joinDate: "2024.01.15",
            };
            setProfile(mockProfile);
        } catch {
            showToast("설정 정보를 불러오는데 실패했습니다", "error");
        } finally {
            setLoading(false);
        }
    }, [user, showToast]);

    const handleLogout = () => {
        signOut();
        showToast("로그아웃되었습니다", "info");
        router.push("/");
    };

    const toggleLanguage = () => {
        const newLanguage = language === "ko" ? "en" : "ko";
        setLanguage(newLanguage);
        showToast(
            `언어가 ${
                newLanguage === "ko" ? "한국어" : "English"
            }로 변경되었습니다`,
            "success"
        );
    };

    const settingsSections: { title: string; items: SettingsItem[] }[] = [
        {
            title: "계정 관리",
            items: [
                {
                    icon: User,
                    label: "프로필 수정",
                    description: "기본 정보 및 프로필 사진 변경",
                    action: () => router.push("/profile/edit"),
                    color: "from-blue-500 to-indigo-600",
                },
                {
                    icon: Camera,
                    label: "사진 관리",
                    description: "프로필 사진 추가/삭제",
                    action: () => router.push("/profile/photos"),
                    color: "from-pink-500 to-rose-500",
                },
                {
                    icon: Shield,
                    label: "개인정보 보호",
                    description: "프라이버시 설정 관리",
                    action: () => router.push("/settings/privacy"),
                    color: "from-emerald-500 to-teal-600",
                },
            ],
        },
        {
            title: "환경 설정",
            items: [
                {
                    icon: Globe,
                    label: "언어 설정",
                    description: language === "ko" ? "한국어" : "English",
                    action: toggleLanguage,
                    color: "from-violet-500 to-purple-600",
                    hasToggle: true,
                    toggleValue: language === "en",
                },
                {
                    icon: theme === "light" ? Sun : Moon,
                    label: "테마 설정",
                    description:
                        theme === "light" ? "라이트 모드" : "다크 모드",
                    action: () => {
                        const newTheme = theme === "light" ? "dark" : "light";
                        setTheme(newTheme);
                        showToast(
                            `${
                                newTheme === "light" ? "라이트" : "다크"
                            } 모드로 변경되었습니다`,
                            "success"
                        );
                    },
                    color: "from-amber-500 to-orange-600",
                    hasToggle: true,
                    toggleValue: theme === "dark",
                },
            ],
        },
        {
            title: "알림 설정",
            items: [
                {
                    icon: Bell,
                    label: "푸시 알림",
                    description: "새로운 매칭 및 메시지 알림",
                    action: () => toggleNotification("push"),
                    color: "from-red-500 to-pink-600",
                    hasToggle: true,
                    toggleValue: notifications.push,
                },
                {
                    icon: MessageSquare,
                    label: "이메일 알림",
                    description: "중요한 소식을 이메일로 받기",
                    action: () => toggleNotification("email"),
                    color: "from-blue-500 to-cyan-600",
                    hasToggle: true,
                    toggleValue: notifications.email,
                },
                {
                    icon: MessageSquare,
                    label: "SMS 알림",
                    description: "긴급한 소식을 문자로 받기",
                    action: () => toggleNotification("sms"),
                    color: "from-green-500 to-emerald-600",
                    hasToggle: true,
                    toggleValue: notifications.sms,
                },
            ],
        },
        {
            title: "고객 지원",
            items: [
                {
                    icon: HelpCircle,
                    label: "도움말",
                    description: "자주 묻는 질문 및 사용법",
                    action: () =>
                        showToast("도움말 페이지가 준비 중입니다", "info"),
                    color: "from-indigo-500 to-purple-600",
                },
                {
                    icon: MessageSquare,
                    label: "고객센터",
                    description: "1:1 문의 및 상담",
                    action: () =>
                        showToast("고객센터 연결이 준비 중입니다", "info"),
                    color: "from-emerald-500 to-teal-600",
                },
                {
                    icon: Star,
                    label: "앱 평가하기",
                    description: "앱스토어에서 리뷰 작성",
                    action: () =>
                        showToast("앱스토어로 이동이 준비 중입니다", "info"),
                    color: "from-yellow-500 to-orange-600",
                },
            ],
        },
    ];

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
            <PageHeader title="설정" showLanguageToggle />

            <div className="px-4 py-6 pb-24 mx-auto max-w-screen-sm">
                {/* 프로필 카드 */}
                {profile && (
                    <motion.div
                        className="p-6 mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <div className="overflow-hidden w-16 h-16 rounded-full border-2 border-gray-200">
                                    <img
                                        src="/images/profiles/female-profile.svg"
                                        alt="프로필 사진"
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                            // 이미지 로드 실패 시 fallback
                                            const target =
                                                e.target as HTMLImageElement;
                                            target.style.display = "none";
                                            target.parentElement!.innerHTML = `
                        <div class="flex justify-center items-center w-full h-full bg-gradient-to-r from-violet-500 to-purple-600">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      `;
                                        }}
                                    />
                                </div>
                                <motion.button
                                    className="flex absolute -right-1 -bottom-1 justify-center items-center w-6 h-6 bg-white rounded-full border-2 border-gray-200 shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => router.push("/profile/edit")}
                                >
                                    <Edit className="w-3 h-3 text-gray-600" />
                                </motion.button>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {profile.name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {profile.email}
                                </p>
                                <div className="flex gap-2 items-center mt-1">
                                    <span
                                        className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                        profile.membershipType === "black"
                            ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                            : profile.membershipType === "male"
                            ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
                            : "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700"
                    }
                  `}
                                    >
                                        {profile.membershipType === "black"
                                            ? "Black 회원"
                                            : profile.membershipType === "male"
                                            ? "남성 회원"
                                            : "여성 회원"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        가입일: {profile.joinDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 설정 섹션들 */}
                {settingsSections.map((section, sectionIndex) => (
                    <motion.div
                        key={section.title}
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: sectionIndex * 0.1,
                        }}
                    >
                        <h3 className="px-2 mb-3 text-lg font-semibold text-gray-900">
                            {section.title}
                        </h3>
                        <div className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm">
                            {section.items.map((item, itemIndex) => (
                                <motion.button
                                    key={item.label}
                                    onClick={item.action}
                                    className={`
                    w-full flex items-center gap-4 p-4 transition-all duration-200
                    ${
                        itemIndex !== section.items.length - 1
                            ? "border-b border-gray-100"
                            : ""
                    }
                    hover:bg-gray-50
                  `}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}
                                    >
                                        <item.icon className="w-5 h-5 text-white" />
                                    </div>

                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-gray-900">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {item.description}
                                        </div>
                                    </div>

                                    {item.hasToggle ? (
                                        <motion.div
                                            className={`
                        w-12 h-6 rounded-full transition-all duration-200 flex items-center
                        ${item.toggleValue ? "bg-violet-500" : "bg-gray-300"}
                      `}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                item.action();
                                            }}
                                        >
                                            <motion.div
                                                className="w-5 h-5 bg-white rounded-full shadow-sm"
                                                animate={{
                                                    x: item.toggleValue
                                                        ? 26
                                                        : 2,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* 로그아웃 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.button
                        onClick={handleLogout}
                        className="flex gap-3 justify-center items-center p-4 w-full text-red-600 bg-white rounded-2xl border border-red-200 transition-all duration-200 hover:bg-red-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">로그아웃</span>
                    </motion.button>
                </motion.div>

                {/* 앱 정보 */}
                <motion.div
                    className="mt-8 text-sm text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p>언니의 소개 v1.0.0</p>
                    <p className="mt-1">© 2024 All rights reserved</p>
                </motion.div>
            </div>

            <BottomNav />
        </div>
    );
}
