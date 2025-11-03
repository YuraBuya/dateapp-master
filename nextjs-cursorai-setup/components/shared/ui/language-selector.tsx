"use client";

import { useLang } from "@/providers/LangProvider";
import { GlobalOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import React from "react";

const { Option } = Select;

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLang();

  const handleLanguageChange = (language: string) => {
    console.log("LanguageSelector changing language to:", language);
    changeLanguage(language);
  };

  const languageOptions = [
    {
      value: "kr",
      label: "한국어",
      flag: "🇰🇷",
    },
    {
      value: "en",
      label: "English",
      flag: "🇺🇸",
    },
  ];

  return (
    <Select
      value={currentLanguage}
      onChange={handleLanguageChange}
      style={{ width: 120 }}
      size="middle"
      suffixIcon={isLoading ? <Spin size="small" /> : <GlobalOutlined />}
      className="language-selector"
      loading={isLoading}
      disabled={isLoading}
    >
      {languageOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          <span className="flex gap-2 items-center">
            <span>{option.flag}</span>
            <span>{option.label}</span>
          </span>
        </Option>
      ))}
    </Select>
  );
};

export default React.memo(LanguageSelector);
