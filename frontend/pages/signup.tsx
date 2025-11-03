/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    ArrowLeft,
    Phone,
    User,
    Calendar,
    MapPin,
    Shield,
    CheckCircle,
} from "lucide-react";

import Button from "@/components/Button";
import { useToast } from "@/components/Toast";

const signupSchema = z.object({
    name: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
    phone: z
        .string()
        .regex(/^010-\d{4}-\d{4}$/, "올바른 휴대폰 번호를 입력해주세요"),
    birth: z.string().min(1, "생년월일을 선택해주세요"),
    gender: z.enum(["male", "female"], { message: "성별을 선택해주세요" }),
    location: z.string().min(1, "거주 지역을 선택해주세요"),
    agree: z.boolean().refine((val) => val === true, "약관에 동의해주세요"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const { ToastContainer, success } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const watchedValues = watch();

    const handlePhoneVerification = async () => {
        setIsVerifying(true);
        // 실제로는 SMS 인증 API 호출
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
            success("인증 완료! \n 휴대폰 인증이 완료되었습니다");
            setStep(2);
        }, 2000);
    };

    const onSubmit = (data: SignupForm) => {
        console.log("회원가입 데이터:", data);
        success("가입 완료! \n 언니의 소개에 오신 것을 환영합니다!");
        // 실제로는 회원가입 API 호출 후 리다이렉트
    };

    const locations = [
        "서울 강남구",
        "서울 서초구",
        "서울 송파구",
        "서울 마포구",
        "서울 성동구",
        "서울 용산구",
        "경기 성남시",
        "경기 수원시",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <div className="sticky top-0 px-4 py-4 border-b backdrop-blur-md bg-white/90 border-gray-200/50">
                <div className="flex gap-4 items-center mx-auto max-w-md">
                    <button className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-gray-900">
                            회원가입
                        </h1>
                        <p className="text-sm text-gray-600">{step}/2 단계</p>
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
                            animate={{ width: `${(step / 2) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-24">
                <div className="mx-auto max-w-md">
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="py-8 text-center">
                                <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-br rounded-full from-primary-500 to-secondary-500">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="mb-2 text-xl font-bold text-gray-900">
                                    본인인증
                                </h2>
                                <p className="text-sm text-gray-600">
                                    안전한 만남을 위해 본인인증을 진행해주세요
                                </p>
                            </div>

                            {/* 휴대폰 번호 */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    휴대폰 번호
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                                    <input
                                        {...register("phone")}
                                        type="tel"
                                        placeholder="010-0000-0000"
                                        className="py-3 pr-4 pl-10 w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="button"
                                onClick={handlePhoneVerification}
                                disabled={
                                    !watchedValues.phone ||
                                    isVerifying ||
                                    isVerified
                                }
                                fullWidth
                                size="lg"
                                className={
                                    isVerified
                                        ? "bg-green-500 hover:bg-green-600"
                                        : ""
                                }
                            >
                                {isVerifying ? (
                                    "인증번호 발송 중..."
                                ) : isVerified ? (
                                    <>
                                        <CheckCircle className="mr-2 w-5 h-5" />
                                        인증 완료
                                    </>
                                ) : (
                                    "인증번호 받기"
                                )}
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="py-8 text-center">
                                <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-br rounded-full from-accent-500 to-primary-500">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="mb-2 text-xl font-bold text-gray-900">
                                    기본 정보
                                </h2>
                                <p className="text-sm text-gray-600">
                                    매칭을 위한 기본 정보를 입력해주세요
                                </p>
                            </div>

                            {/* 이름 */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    이름
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="실명을 입력해주세요"
                                    className="px-4 py-3 w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* 생년월일 */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    생년월일
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                                    <input
                                        {...register("birth")}
                                        type="date"
                                        className="py-3 pr-4 pl-10 w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.birth && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.birth.message}
                                    </p>
                                )}
                            </div>

                            {/* 성별 */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    성별
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="relative">
                                        <input
                                            {...register("gender")}
                                            type="radio"
                                            value="male"
                                            className="sr-only peer"
                                        />
                                        <div className="py-3 w-full text-center rounded-2xl border border-gray-300 transition-all cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700">
                                            남성
                                        </div>
                                    </label>
                                    <label className="relative">
                                        <input
                                            {...register("gender")}
                                            type="radio"
                                            value="female"
                                            className="sr-only peer"
                                        />
                                        <div className="py-3 w-full text-center rounded-2xl border border-gray-300 transition-all cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700">
                                            여성
                                        </div>
                                    </label>
                                </div>
                                {errors.gender && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>

                            {/* 거주 지역 */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    거주 지역
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                                    <select
                                        {...register("location")}
                                        className="py-3 pr-4 pl-10 w-full rounded-2xl border border-gray-300 appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            지역을 선택해주세요
                                        </option>
                                        {locations.map((location) => (
                                            <option
                                                key={location}
                                                value={location}
                                            >
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.location.message}
                                    </p>
                                )}
                            </div>

                            {/* 약관 동의 */}
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <label className="flex gap-3 items-start cursor-pointer">
                                    <input
                                        {...register("agree")}
                                        type="checkbox"
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">
                                                서비스 이용약관
                                            </span>{" "}
                                            및{" "}
                                            <span className="font-medium">
                                                개인정보 처리방침
                                            </span>
                                            에 동의합니다
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            만 14세 이상만 가입 가능합니다
                                        </p>
                                    </div>
                                </label>
                                {errors.agree && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.agree.message}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" fullWidth size="lg">
                                가입 완료
                            </Button>
                        </motion.div>
                    )}
                </div>
            </form>

            <ToastContainer />
        </div>
    );
}
