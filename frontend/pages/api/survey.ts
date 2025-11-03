/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

interface SurveyAnswer {
    questionId: string;
    answer: string;
    type: "radio" | "text";
}

interface SurveySubmission {
    matchingId: string;
    userId: string;
    answers: SurveyAnswer[];
    submittedAt: string;
}

// 임시 저장소 (실제로는 DB 사용)
const surveySubmissions: SurveySubmission[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { matchingId, userId, answers } = req.body;

            if (!matchingId || !userId || !answers) {
                return res.status(400).json({
                    success: false,
                    message: "필수 필드가 누락되었습니다.",
                });
            }

            const submission: SurveySubmission = {
                matchingId,
                userId,
                answers,
                submittedAt: new Date().toISOString(),
            };

            surveySubmissions.push(submission);

            res.status(200).json({
                success: true,
                message: "설문이 성공적으로 제출되었습니다.",
                data: submission,
            });
        } catch {
            res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
            });
        }
    } else if (req.method === "GET") {
        const { matchingId, userId } = req.query;

        let filtered = [...surveySubmissions];

        if (matchingId) {
            filtered = filtered.filter((s) => s.matchingId === matchingId);
        }

        if (userId) {
            filtered = filtered.filter((s) => s.userId === userId);
        }

        res.status(200).json({
            success: true,
            data: filtered,
        });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ message: "Method not allowed" });
    }
}
