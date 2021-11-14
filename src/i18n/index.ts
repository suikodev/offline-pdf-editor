import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

export const lngs = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
];

export const resources = {
  en,
  zh,
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    debug: process.env.NODE_ENV !== "production",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
  });

export default i18n;
