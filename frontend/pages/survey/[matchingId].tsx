/** @format */

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageSquare, CheckCircle, Star, Heart, Send } from "lucide-react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/components/Toast";

const surveySchema = z.object({
    q1_satisfaction: z.enum(
        [
            "very_satisfied",
            "satisfied",
            "neutral",
            "dissatisfied",
            "very_dissatisfied",
        ],
        {
            message: "만족도를 선택해주세요",
        }
    ),
    q2_recommendation: z.enum(
        ["definitely", "probably", "maybe", "probably_not", "definitely_not"],
        {
            message: "추천 의향을 선택해주세요",
        }
    ),
    q3_service_quality: z.enum(
        ["excellent", "good", "average", "poor", "very_poor"],
        {
            message: "서비스 품질을 평가해주세요",
        }
    ),
    q4_ease_of_use: z.enum(
        ["very_easy", "easy", "moderate", "difficult", "very_difficult"],
        {
            message: "사용 편의성을 평가해주세요",
        }
    ),
    q5_feedback: z
        .string()
        .min(10, "최소 10글자 이상 입력해주세요")
        .max(500, "최대 500글자까지 입력 가능합니다"),
});

type SurveyFormData = z.infer<typeof surveySchema>;

const questions = [
    {
        id: "q1_satisfaction",
        title: "전반적인 매칭 서비스 만족도는 어떠셨나요?",
        type: "radio" as const,
        icon: Star,
        options: [
            {
                value: "very_satisfied",
                label: "매우 만족",
                color: "from-emerald-500 to-teal-600",
                emoji: "😍",
            },
            {
                value: "satisfied",
                label: "만족",
                color: "from-blue-500 to-indigo-600",
                emoji: "😊",
            },
            {
                value: "neutral",
                label: "보통",
                color: "from-gray-400 to-gray-500",
                emoji: "😐",
            },
            {
                value: "dissatisfied",
                label: "불만족",
                color: "from-orange-400 to-red-500",
                emoji: "😞",
            },
            {
                value: "very_dissatisfied",
                label: "매우 불만족",
                color: "from-red-500 to-red-700",
                emoji: "😡",
            },
        ],
    },
    {
        id: "q2_recommendation",
        title: "지인에게 이 서비스를 추천하시겠나요?",
        type: "radio" as const,
        icon: Heart,
        options: [
            {
                value: "definitely",
                label: "적극 추천",
                color: "from-pink-500 to-rose-500",
                emoji: "💖",
            },
            {
                value: "probably",
                label: "추천할 것 같음",
                color: "from-violet-500 to-purple-600",
                emoji: "💕",
            },
            {
                value: "maybe",
                label: "상황에 따라",
                color: "from-gray-400 to-gray-500",
                emoji: "🤔",
            },
            {
                value: "probably_not",
                label: "추천하지 않을 것 같음",
                color: "from-orange-400 to-red-500",
                emoji: "😕",
            },
            {
                value: "definitely_not",
                label: "절대 추천 안함",
                color: "from-red-500 to-red-700",
                emoji: "😤",
            },
        ],
    },
    {
        id: "q3_service_quality",
        title: "매칭 상대방의 품질은 어떠셨나요?",
        type: "radio" as const,
        icon: CheckCircle,
        options: [
            {
                value: "excellent",
                label: "탁월함",
                color: "from-emerald-500 to-teal-600",
                emoji: "⭐",
            },
            {
                value: "good",
                label: "좋음",
                color: "from-blue-500 to-indigo-600",
                emoji: "👍",
            },
            {
                value: "average",
                label: "보통",
                color: "from-gray-400 to-gray-500",
                emoji: "👌",
            },
            {
                value: "poor",
                label: "아쉬움",
                color: "from-orange-400 to-red-500",
                emoji: "👎",
            },
            {
                value: "very_poor",
                label: "매우 아쉬움",
                color: "from-red-500 to-red-700",
                emoji: "💔",
            },
        ],
    },
    {
        id: "q4_ease_of_use",
        title: "서비스 이용 과정이 얼마나 편리했나요?",
        type: "radio" as const,
        icon: MessageSquare,
        options: [
            {
                value: "very_easy",
                label: "매우 편리함",
                color: "from-emerald-500 to-teal-600",
                emoji: "✨",
            },
            {
                value: "easy",
                label: "편리함",
                color: "from-blue-500 to-indigo-600",
                emoji: "👌",
            },
            {
                value: "moderate",
                label: "보통",
                color: "from-gray-400 to-gray-500",
                emoji: "🤷",
            },
            {
                value: "difficult",
                label: "불편함",
                color: "from-orange-400 to-red-500",
                emoji: "😤",
            },
            {
                value: "very_difficult",
                label: "매우 불편함",
                color: "from-red-500 to-red-700",
                emoji: "😡",
            },
        ],
    },
];

export default function SurveyPage() {
    const router = useRouter();
    const { matchingId } = router.query;
    const { showToast, ToastContainer } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SurveyFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/survey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    matchingId,
                    userId: "current_user_id", // 실제로는 인증된 사용자 ID
                    answers: Object.entries(data).map(
                        ([questionId, answer]) => ({
                            questionId,
                            answer: String(answer),
                            type:
                                questionId === "q5_feedback" ? "text" : "radio",
                        })
                    ),
                }),
            });

            const result = await response.json();

            if (result.success) {
                showToast("피드백이 성공적으로 제출되었습니다!", "success");
                setTimeout(() => {
                    router.push("/matching/inbox");
                }, 2000);
            } else {
                throw new Error(result.message);
            }
        } catch {
            showToast("제출 중 오류가 발생했습니다", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <ToastContainer />
            <PageHeader
                title="만남 후기"
                showBack
                onBack={() => router.push("/matching/inbox")}
            />

            <div className="px-4 py-6 pb-24 mx-auto max-w-screen-sm">
                {/* 헤더 */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full">
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        만남은 어떠셨나요? 💕
                    </h1>
                    <p className="leading-relaxed text-gray-600">
                        소중한 피드백을 통해
                        <br />더 나은 매칭 서비스를 제공하겠습니다
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* 객관식 질문들 */}
                    {questions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex gap-3 items-start mb-4">
                                <div className="flex flex-shrink-0 justify-center items-center w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg">
                                    <question.icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold leading-tight text-gray-900">
                                        {question.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Q{index + 1}. 해당하는 항목을
                                        선택해주세요
                                    </p>
                                </div>
                            </div>

                            <Controller
                                name={question.id as keyof SurveyFormData}
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        {question.options.map((option) => (
                                            <motion.label
                                                key={option.value}
                                                className={`
                          flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                          ${
                              field.value === option.value
                                  ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg`
                                  : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                          }
                        `}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    checked={
                                                        field.value ===
                                                        option.value
                                                    }
                                                    onChange={field.onChange}
                                                    className="sr-only"
                                                />
                                                <span className="text-2xl">
                                                    {option.emoji}
                                                </span>
                                                <span className="flex-1 font-medium">
                                                    {option.label}
                                                </span>
                                                {field.value ===
                                                    option.value && (
                                                    <CheckCircle className="w-5 h-5" />
                                                )}
                                            </motion.label>
                                        ))}
                                    </div>
                                )}
                            />

                            {errors[question.id as keyof SurveyFormData] && (
                                <p className="mt-2 text-sm text-red-600">
                                    {
                                        errors[
                                            question.id as keyof SurveyFormData
                                        ]?.message
                                    }
                                </p>
                            )}
                        </motion.div>
                    ))}

                    {/* 주관식 질문 */}
                    <motion.div
                        className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex gap-3 items-start mb-4">
                            <div className="flex flex-shrink-0 justify-center items-center w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold leading-tight text-gray-900">
                                    서비스 개선을 위한 추가 의견이 있으시다면
                                    자유롭게 작성해주세요
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Q5. 구체적인 피드백이나 제안사항을
                                    적어주세요
                                </p>
                            </div>
                        </div>

                        <textarea
                            {...register("q5_feedback")}
                            placeholder="예: 매칭 상대방과의 만남에서 좋았던 점이나 아쉬웠던 점, 서비스 개선 제안 등을 자유롭게 작성해주세요..."
                            rows={6}
                            className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 resize-none
                ${
                    errors.q5_feedback
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-violet-500"
                }
                focus:outline-none bg-white placeholder-gray-400
              `}
                        />

                        {errors.q5_feedback && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.q5_feedback.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 제출 버튼 */}
                    <motion.div
                        className="fixed right-0 bottom-0 left-0 p-4 border-t border-gray-100 backdrop-blur-lg bg-white/95"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="mx-auto max-w-screen-sm">
                            <motion.button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={`
                  w-full h-12 px-6 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3
                  ${
                      !isValid || isSubmitting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  }
                `}
                                whileHover={
                                    isValid && !isSubmitting
                                        ? { scale: 1.02 }
                                        : {}
                                }
                                whileTap={
                                    isValid && !isSubmitting
                                        ? { scale: 0.98 }
                                        : {}
                                }
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                        제출 중...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        피드백 제출하기
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}
