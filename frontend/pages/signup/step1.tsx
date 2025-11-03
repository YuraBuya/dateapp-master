/** @format */

// import { useState } from "react"; // unused import
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Users, ArrowRight, Shield } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useSignupStore } from "@/stores/useSignupStore";
import { useToast } from "@/hooks/useToast";

const step1Schema = z.object({
    name: z
        .string()
        .min(2, "이름은 2글자 이상이어야 합니다")
        .max(10, "이름은 10글자 이하여야 합니다"),
    phone: z
        .string()
        .regex(
            /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
            "올바른 휴대폰 번호를 입력해주세요"
        ),
    gender: z.enum(["male", "female"], {
        message: "성별을 선택해주세요",
    }),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function SignupStep1() {
    const router = useRouter();
    const { data, updateData, nextStep } = useSignupStore();
    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: data.name,
            phone: data.phone,
            gender: (data.gender as "male" | "female") || undefined,
        },
        mode: "onChange",
    });

    const selectedGender = watch("gender");

    const handleVerification = () => {
        updateData({ isVerified: true });
        showToast("본인인증이 완료되었습니다!", "success");
    };

    const onSubmit = (formData: Step1Data) => {
        if (!data.isVerified) {
            showToast("본인인증을 완료해주세요", "error");
            return;
        }

        updateData({
            ...formData,
        });
        nextStep();
        router.push("/signup/step2");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
            <PageHeader
                title="회원가입 (1/3)"
                showBack={true}
                onBack={() => router.back()}
            />

            <div className="px-4 pt-4 pb-20">
                {/* Hero Section */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        간단한 정보 입력으로
                        <br />
                        시작해보세요 ✨
                    </h1>
                    <p className="leading-relaxed text-gray-600">
                        안전한 매칭을 위해 기본 정보와 본인인증이 필요합니다
                    </p>
                </motion.div>

                {/* Progress */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex gap-2 items-center mb-2">
                        <span className="text-sm font-semibold text-pink-600">
                            STEP 1
                        </span>
                        <span className="text-sm text-gray-500">기본 정보</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="w-1/3 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* 이름 입력 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <label className="block mb-2 text-sm font-semibold text-gray-900">
                            이름 *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="실명을 입력해주세요"
                                className={`
                  w-full h-14 pl-12 pr-4 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200
                  ${
                      errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-white focus:border-pink-500 focus:bg-pink-50"
                  }
                `}
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 연락처 입력 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label className="block mb-2 text-sm font-semibold text-gray-900">
                            연락처 *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="010-1234-5678"
                                className={`
                  w-full h-14 pl-12 pr-4 rounded-xl border-2 text-gray-900 placeholder-gray-500 transition-all duration-200
                  ${
                      errors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-white focus:border-pink-500 focus:bg-pink-50"
                  }
                `}
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 성별 선택 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label className="block mb-3 text-sm font-semibold text-gray-900">
                            성별 *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setValue("gender", "male", {
                                        shouldValidate: true,
                                    })
                                }
                                className={`
                  h-14 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3
                  ${
                      selectedGender === "male"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                  }
                `}
                            >
                                <Users className="w-5 h-5" />
                                <span className="font-semibold">남성</span>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setValue("gender", "female", {
                                        shouldValidate: true,
                                    })
                                }
                                className={`
                  h-14 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3
                  ${
                      selectedGender === "female"
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-pink-300"
                  }
                `}
                            >
                                <Users className="w-5 h-5" />
                                <span className="font-semibold">여성</span>
                            </button>
                        </div>
                        {errors.gender && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.gender.message}
                            </p>
                        )}
                    </motion.div>

                    {/* 본인인증 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className="block mb-2 text-sm font-semibold text-gray-900">
                            본인인증 *
                        </label>
                        <button
                            type="button"
                            onClick={handleVerification}
                            disabled={data.isVerified}
                            className={`
                w-full h-14 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
                ${
                    data.isVerified
                        ? "bg-emerald-500 text-white"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600"
                }
              `}
                        >
                            {data.isVerified ? (
                                <>
                                    <span className="text-lg">✓</span>
                                    본인인증 완료
                                </>
                            ) : (
                                <>
                                    <Shield className="w-5 h-5" />
                                    본인인증 하기
                                </>
                            )}
                        </button>
                        {data.isVerified && (
                            <p className="flex gap-1 items-center mt-1 text-sm text-emerald-600">
                                <span className="text-lg">🛡️</span>
                                본인인증이 완료되었습니다
                            </p>
                        )}
                    </motion.div>

                    {/* 다음 버튼 */}
                    <motion.button
                        type="submit"
                        disabled={!isValid || !data.isVerified}
                        className={`
              w-full h-14 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
              ${
                  isValid && data.isVerified
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
                        whileHover={
                            isValid && data.isVerified ? { scale: 1.02 } : {}
                        }
                        whileTap={
                            isValid && data.isVerified ? { scale: 0.98 } : {}
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        다음 단계로
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
