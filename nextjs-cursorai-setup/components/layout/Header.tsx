"use client";

import { LanguageSelector } from "../shared/ui";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Header</h1>
      <span>{t("hello")}</span> <LanguageSelector />
    </div>
  );
};
