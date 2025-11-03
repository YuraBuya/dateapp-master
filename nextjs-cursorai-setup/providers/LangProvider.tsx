"use client";

import React, { useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import i18next from "./i18n";

interface LangContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  isLoading: boolean;
}

const LangContext = React.createContext<LangContextType | undefined>(undefined);

interface LangProviderProps {
  children: ReactNode;
}

export const LangProvider: React.FC<LangProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("kr");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 초기 언어 설정
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // localStorage에서 저장된 언어 가져오기
        const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("selectedLanguage") : null;

        const targetLanguage = storedLanguage || "kr";

        console.log("LangProvider initializing with:", targetLanguage);

        // i18n 언어 변경 (hook의 i18n 또는 기본 i18next 인스턴스 사용)
        const changeLang = i18n?.changeLanguage ?? i18next.changeLanguage.bind(i18next);
        await changeLang(targetLanguage);
        setCurrentLanguage(targetLanguage);

        // localStorage에 저장
        if (typeof window !== "undefined") {
          localStorage.setItem("selectedLanguage", targetLanguage);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize language:", error);
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [i18n]);

  // 언어 변경 함수
  const changeLanguage = async (language: string) => {
    try {
      setIsLoading(true);
      console.log("LangProvider changing language to:", language);

      // i18n 언어 변경 (hook의 i18n 또는 기본 i18next 인스턴스 사용)
      const changeLang = i18n?.changeLanguage ?? i18next.changeLanguage.bind(i18next);
      await changeLang(language);

      // 상태 업데이트
      setCurrentLanguage(language);

      // localStorage에 저장
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedLanguage", language);
      }

      console.log("Language changed successfully to:", language);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to change language:", error);
      setIsLoading(false);
    }
  };

  // i18n 언어 변경 감지
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log("i18n language changed event:", lng);
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const value: LangContextType = {
    currentLanguage,
    changeLanguage,
    isLoading,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

// Custom hook for using language context
export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};

export default LangProvider;
