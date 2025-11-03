import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/translation.json";
import kr from "@/locales/kr/translation.json";
// import mn from "@/locales/mn/translation.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      kr: { translation: kr },
      // mn: { translation: mn },
    },
    lng: "kr",
    fallbackLng: "en",
    supportedLngs: ["en", "kr"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    // SSR 호환
    initImmediate: false,
  });
}

export default i18n;
