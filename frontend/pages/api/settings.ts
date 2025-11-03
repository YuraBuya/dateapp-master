/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

interface UserSettings {
    userId: string;
    language: "ko" | "en";
    notifications: {
        push: boolean;
        email: boolean;
        sms: boolean;
    };
    privacy: {
        showOnlineStatus: boolean;
        allowDirectMessages: boolean;
        profileVisibility: "public" | "members" | "private";
    };
    preferences: {
        matchingRadius: number;
        ageRange: {
            min: number;
            max: number;
        };
        autoMatch: boolean;
    };
    updatedAt: string;
}

// 임시 저장소
const userSettings: UserSettings[] = [
    {
        userId: "user_1",
        language: "ko",
        notifications: {
            push: true,
            email: true,
            sms: false,
        },
        privacy: {
            showOnlineStatus: true,
            allowDirectMessages: true,
            profileVisibility: "members",
        },
        preferences: {
            matchingRadius: 10,
            ageRange: {
                min: 25,
                max: 35,
            },
            autoMatch: false,
        },
        updatedAt: new Date().toISOString(),
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId가 필요합니다.",
            });
        }

        const settings = userSettings.find((s) => s.userId === userId);

        if (!settings) {
            // 기본 설정 반환
            const defaultSettings: UserSettings = {
                userId: userId as string,
                language: "ko",
                notifications: {
                    push: true,
                    email: true,
                    sms: false,
                },
                privacy: {
                    showOnlineStatus: true,
                    allowDirectMessages: true,
                    profileVisibility: "members",
                },
                preferences: {
                    matchingRadius: 10,
                    ageRange: {
                        min: 25,
                        max: 35,
                    },
                    autoMatch: false,
                },
                updatedAt: new Date().toISOString(),
            };

            userSettings.push(defaultSettings);

            return res.status(200).json({
                success: true,
                data: defaultSettings,
            });
        }

        res.status(200).json({
            success: true,
            data: settings,
        });
    } else if (req.method === "PUT") {
        const { userId } = req.query;
        const updates = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId가 필요합니다.",
            });
        }

        const settingsIndex = userSettings.findIndex(
            (s) => s.userId === userId
        );

        if (settingsIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "사용자 설정을 찾을 수 없습니다.",
            });
        }

        userSettings[settingsIndex] = {
            ...userSettings[settingsIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        res.status(200).json({
            success: true,
            message: "설정이 업데이트되었습니다.",
            data: userSettings[settingsIndex],
        });
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).json({ message: "Method not allowed" });
    }
}
