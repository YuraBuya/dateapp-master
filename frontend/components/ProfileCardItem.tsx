/** @format */

import React from "react";
import { motion } from "framer-motion";
// import Image from 'next/image' // unused
import { Heart, X, MapPin, Briefcase } from "lucide-react";
import { Candidate } from "@/pages/api/matchings/inbox";
import Button from "./Button";

interface ProfileCardItemProps {
    candidate: Candidate;
    onLike: () => void;
    onPass: () => void;
    delay?: number;
}

export default function ProfileCardItem({
    candidate,
    onLike,
    onPass,
    delay = 0,
}: ProfileCardItemProps) {
    return (
        <motion.div
            className="bg-white rounded-3xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {/* 프로필 이미지 */}
            <div className="relative h-80 bg-gradient-to-br from-primary-200 to-secondary-200">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-4xl text-white font-bold">
                            {candidate.name.charAt(0)}
                        </span>
                    </div>
                </div>

                {/* 매치 스코어 배지 */}
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-bold text-primary-600">
                            {candidate.matchScore}% 매치
                        </span>
                    </div>
                </div>
            </div>

            {/* 프로필 정보 */}
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {candidate.name}, {candidate.age}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{candidate.job}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{candidate.location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {candidate.summary}
                </p>

                {/* 하이라이트 태그 */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {candidate.highlights
                        .slice(0, 3)
                        .map((highlight, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                            >
                                {highlight}
                            </span>
                        ))}
                </div>

                {/* 공통 관심사 */}
                {candidate.commonInterests.length > 0 && (
                    <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-2">
                            공통 관심사
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {candidate.commonInterests
                                .slice(0, 3)
                                .map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-accent-50 text-accent-700 text-xs rounded-lg"
                                    >
                                        {interest}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}

                {/* 버튼 */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="ghost"
                        onClick={onPass}
                        icon={X}
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                        패스
                    </Button>
                    <Button variant="primary" onClick={onLike} icon={Heart}>
                        좋아요
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
