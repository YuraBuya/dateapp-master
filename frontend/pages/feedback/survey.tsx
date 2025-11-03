/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    ArrowLeft,
    Star,
    MessageCircle,
    CheckCircle,
    ThumbsUp,
} from "lucide-react";

import Button from "@/components/Button";
import { useToast } from "@/components/Toast";

const surveySchema = z.object({
    satisfaction: z.number().min(1).max(5),
    recommendation: z.number().min(1).max(5),
    service_quality: z.number().min(1).max(5),
    value_for_money: z.number().min(1).max(5),
    feedback: z.string().min(10, "10글자 이상 입력해주세요"),
});

type SurveyForm = z.infer<typeof surveySchema>;

interface Question {
    id: keyof SurveyForm;
    title: string;
    description: string;
}

export default function SurveyPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { ToastContainer, success } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm<SurveyForm>({
        resolver: zodResolver(surveySchema),
    });

    const watchedValues = watch();

    const questions: Question[] = [
        {
            id: "satisfaction",
            title: "전반적인 서비스 만족도",
            description:
                "언니의 소개 서비스에 대한 전반적인 만족도를 평가해주세요",
        },
        {
            id: "recommendation",
            title: "지인 추천 의향",
            description:
                "주변 지인들에게 언니의 소개를 추천하실 의향이 있으신가요?",
        },
        {
            id: "service_quality",
            title: "서비스 품질",
            description: "매니저 상담, 매칭 품질 등 서비스 품질은 어떠셨나요?",
        },
        {
            id: "value_for_money",
            title: "가격 대비 만족도",
            description:
                "지불하신 비용 대비 서비스 가치는 어떻게 평가하시나요?",
        },
    ];

    const currentQuestion = questions[currentStep];

    const handleRatingSelect = async (rating: number) => {
        setValue(currentQuestion.id, rating);
        await trigger(currentQuestion.id);

        // 0.5초 후 다음 단계로 이동
        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                setCurrentStep(questions.length); // 마지막 텍스트 입력 단계
            }
        }, 500);
    };

    const onSubmit = (data: SurveyForm) => {
        console.log("설문 데이터:", data);
        setIsSubmitted(true);
        success(`설문 완료 \n 소중한 의견을 주셔서 감사합니다!`);
    };

    const goToPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const StarRating = ({
        value,
        onSelect,
    }: {
        value?: number;
        onSelect: (rating: number) => void;
    }) => {
        const [hoverValue, setHoverValue] = useState(0);

        return (
            <div className="flex gap-2 justify-center py-8">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                        key={rating}
                        type="button"
                        className={`p-2 rounded-full transition-colors ${
                            (hoverValue || value || 0) >= rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverValue(rating)}
                        onMouseLeave={() => setHoverValue(0)}
                        onClick={() => onSelect(rating)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Star className="w-12 h-12 fill-current" />
                    </motion.button>
                ))}
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div className="flex justify-center items-center px-4 min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
                <motion.div
                    className="p-8 mx-auto max-w-sm text-center bg-white rounded-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="flex justify-center items-center mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        설문 완료!
                    </h2>
                    <p className="mb-6 leading-relaxed text-gray-600">
                        소중한 의견을 주셔서 감사합니다.
                        <br />더 나은 서비스로 보답하겠습니다.
                    </p>

                    <Button
                        onClick={() => window.history.back()}
                        fullWidth
                        variant="primary"
                    >
                        돌아가기
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 d-flex">
                {/* 헤더 */}
                <div className="sticky top-0 px-4 py-4 border-b backdrop-blur-md bg-white/90 border-gray-200/50">
                    <div className="flex gap-4 items-center mx-auto max-w-md">
                        <button
                            onClick={goToPrevious}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold text-gray-900">
                                서비스 만족도 조사
                            </h1>
                            <p className="text-sm text-gray-600">
                                {currentStep < questions.length
                                    ? `${currentStep + 1}/5`
                                    : "5/5"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 프로그레스 바 */}
                <div className="px-4 py-4">
                    <div className="mx-auto max-w-md">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <motion.div
                                className="h-2 bg-gradient-to-r rounded-full from-primary-500 to-secondary-500"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: `${((currentStep + 1) / 5) * 100}%`,
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-24">
                    <div className="mx-auto max-w-md">
                        {currentStep < questions.length ? (
                            // 별점 질문들
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="py-8 text-center"
                            >
                                <div className="mb-8">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                                        {currentQuestion.title}
                                    </h2>
                                    <p className="leading-relaxed text-gray-600">
                                        {currentQuestion.description}
                                    </p>
                                </div>

                                <StarRating
                                    value={
                                        watchedValues[currentQuestion.id] as number
                                    }
                                    onSelect={handleRatingSelect}
                                />

                                <div className="flex justify-between mt-4 text-sm text-gray-500">
                                    <span>매우 불만족</span>
                                    <span>매우 만족</span>
                                </div>

                                {errors[currentQuestion.id] && (
                                    <p className="mt-2 text-sm text-red-600">
                                        별점을 선택해주세요
                                    </p>
                                )}
                            </motion.div>
                        ) : (
                            // 텍스트 피드백
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="py-8"
                            >
                                <div className="mb-8 text-center">
                                    <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-br rounded-full from-primary-500 to-secondary-500">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                                        추가 의견을 들려주세요
                                    </h2>
                                    <p className="text-gray-600">
                                        서비스 개선을 위한 소중한 의견을 자유롭게
                                        작성해주세요
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <textarea
                                            {...register("feedback")}
                                            rows={6}
                                            placeholder="서비스에 대한 솔직한 의견, 개선사항, 칭찬 등을 자유롭게 작성해주세요..."
                                            className="px-4 py-3 w-full rounded-2xl border border-gray-300 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        {errors.feedback && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.feedback.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={goToPrevious}
                                            className="text-gray-600 border-gray-300"
                                        >
                                            이전
                                        </Button>
                                        <Button type="submit" icon={ThumbsUp}>
                                            제출하기
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </form>

                <ToastContainer />
            </div>
        </>
    );
}
