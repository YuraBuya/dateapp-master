/** @format */

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Briefcase,
    MessageSquare,
    Camera,
    ArrowRight,
    X,
    Plus,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useSignupStore } from "@/stores/useSignupStore";
import { useToast } from "@/hooks/useToast";

const step2Schema = z.object({
    job: z.string().min(2, "직업을 입력해주세요"),
    education: z.string().min(1, "학력을 선택해주세요"),
    idealType: z.string().min(10, "이상형 조건을 10글자 이상 입력해주세요"),
});

type Step2Data = z.infer<typeof step2Schema>;

// 선택 옵션들
const educationOptions = [
    "고등학교 졸업",
    "전문대학 졸업",
    "대학교 졸업",
    "대학원 재학",
    "대학원 졸업",
    "기타",
];

const hobbyOptions = [
    "독서",
    "영화감상",
    "음악감상",
    "운동",
    "요리",
    "여행",
    "사진",
    "게임",
    "쇼핑",
    "카페",
    "술",
    "드라이브",
    "등산",
    "수영",
    "요가",
    "댄스",
    "악기연주",
    "그림그리기",
];

const personalityOptions = [
    "외향적",
    "내향적",
    "활발한",
    "조용한",
    "유머러스한",
    "진중한",
    "낙관적",
    "현실적",
    "감성적",
    "이성적",
    "자유로운",
    "계획적",
    "독립적",
    "사교적",
    "창의적",
    "논리적",
    "배려심 많은",
    "솔직한",
];

export default function SignupStep2() {
    const router = useRouter();
    const { data, updateData, nextStep } = useSignupStore();
    const { showToast } = useToast();

    const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
        data.hobbies || []
    );
    const [selectedPersonality, setSelectedPersonality] = useState<string[]>(
        data.personality || []
    );
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<Step2Data>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            job: data.job,
            education: data.education,
            idealType: data.idealType,
        },
        mode: "onChange",
    });

    const handleHobbyToggle = (hobby: string) => {
        setSelectedHobbies((prev) => {
            if (prev.includes(hobby)) {
                return prev.filter((h) => h !== hobby);
            } else if (prev.length < 5) {
                return [...prev, hobby];
            } else {
                showToast("취미는 최대 5개까지 선택할 수 있습니다", "warning");
                return prev;
            }
        });
    };

    const handlePersonalityToggle = (personality: string) => {
        setSelectedPersonality((prev) => {
            if (prev.includes(personality)) {
                return prev.filter((p) => p !== personality);
            } else if (prev.length < 3) {
                return [...prev, personality];
            } else {
                showToast("성격은 최대 3개까지 선택할 수 있습니다", "warning");
                return prev;
            }
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB 제한
                showToast("이미지 크기는 5MB 이하여야 합니다", "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
                updateData({ profilePhoto: file });
                showToast("프로필 사진이 업로드되었습니다", "success");
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (formData: Step2Data) => {
        if (selectedHobbies.length === 0) {
            showToast("취미를 최소 1개 이상 선택해주세요", "error");
            return;
        }

        if (selectedPersonality.length === 0) {
            showToast("성격을 최소 1개 이상 선택해주세요", "error");
            return;
        }

        updateData({
            ...formData,
            hobbies: selectedHobbies,
            personality: selectedPersonality,
        });

        nextStep();
        router.push("/signup/step3");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <PageHeader
                title="회원가입 (2/3)"
                showBack={true}
                onBack={() => router.back()}
            />

            <div className="px-4 pb-20 pt-4">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        자신을 소개해주세요 💝
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        매력적인 프로필로 더 나은 매칭을 받아보세요
                    </p>
                </motion.div>

                {/* Progress */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-pink-600">
                            STEP 2
                        </span>
                        <span className="text-sm text-gray-500">자기소개</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full w-2/3"></div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* 프로필 사진 업로드 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            대표 사진 *
                        </label>
                        <div className="flex justify-center">
                            <div className="relative">
                                <div
                                    className={`
                  w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 
                  flex items-center justify-center cursor-pointer transition-all duration-200
                  hover:border-pink-400 hover:bg-pink-50
                  ${profileImage ? "border-solid border-pink-500" : ""}
                `}
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="프로필 미리보기"
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <span className="text-sm text-gray-500 font-medium">
                                                사진 업로드
                                            </span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                {profileImage && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileImage(null);
                                            updateData({ profilePhoto: null });
                                        }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            JPG, PNG 파일 (최대 5MB)
                        </p>
                    </motion.div>

                    {/* 직업 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            직업 *
                        </label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                {...register("job")}
                                type="text"
                                placeholder="예: 마케터, 개발자, 디자이너"
                                className={`
                  w-full h-14 pl-12 pr-4 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200
                  ${
                      errors.job
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-white focus:border-pink-500 focus:bg-pink-50"
                  }
                `}
                            />
                        </div>
                        {errors.job && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.job.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 학력 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            학력 *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {educationOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() =>
                                        setValue("education", option, {
                                            shouldValidate: true,
                                        })
                                    }
                                    className={`
                    h-12 px-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium
                    ${
                        watch("education") === option
                            ? "border-pink-500 bg-pink-50 text-pink-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-pink-300"
                    }
                  `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {errors.education && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.education.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 취미 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            취미 * (최대 5개)
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            선택한 취미: {selectedHobbies.length}/5
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {hobbyOptions.map((hobby) => (
                                <button
                                    key={hobby}
                                    type="button"
                                    onClick={() => handleHobbyToggle(hobby)}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1
                    ${
                        selectedHobbies.includes(hobby)
                            ? "bg-pink-500 text-white shadow-lg"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-pink-300"
                    }
                  `}
                                >
                                    {selectedHobbies.includes(hobby) ? (
                                        <X className="w-3 h-3" />
                                    ) : (
                                        <Plus className="w-3 h-3" />
                                    )}
                                    {hobby}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 성격 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            성격 * (최대 3개)
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            선택한 성격: {selectedPersonality.length}/3
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {personalityOptions.map((personality) => (
                                <button
                                    key={personality}
                                    type="button"
                                    onClick={() =>
                                        handlePersonalityToggle(personality)
                                    }
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1
                    ${
                        selectedPersonality.includes(personality)
                            ? "bg-violet-500 text-white shadow-lg"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-violet-300"
                    }
                  `}
                                >
                                    {selectedPersonality.includes(
                                        personality
                                    ) ? (
                                        <X className="w-3 h-3" />
                                    ) : (
                                        <Plus className="w-3 h-3" />
                                    )}
                                    {personality}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 이상형 조건 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            이상형 조건 *
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea
                                {...register("idealType")}
                                placeholder="어떤 분과 만나고 싶으신가요? 구체적으로 적어주세요."
                                rows={4}
                                className={`
                  w-full pl-12 pr-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none
                  ${
                      errors.idealType
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-white focus:border-pink-500 focus:bg-pink-50"
                  }
                `}
                            />
                        </div>
                        {errors.idealType && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.idealType.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 다음 버튼 */}
                    <motion.button
                        type="submit"
                        disabled={
                            !isValid ||
                            selectedHobbies.length === 0 ||
                            selectedPersonality.length === 0
                        }
                        className={`
              w-full h-14 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
              ${
                  isValid &&
                  selectedHobbies.length > 0 &&
                  selectedPersonality.length > 0
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
                        whileHover={isValid ? { scale: 1.02 } : {}}
                        whileTap={isValid ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        다음 단계로
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
