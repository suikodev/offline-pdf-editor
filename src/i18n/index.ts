import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const DETECTION_OPTIONS = {
  order: ["navigator"],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    debug: true,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          home: {
            banner: {
              title: "Edit your PDF all offline in browser ",
              description:
                "This is a PDF editor which runs in your browser totally offline after all page have loaded. your PDFs and your personal infomation won't send to any server FOREVER.",
              choosePdfButtonText: "Choose PDF",
            },
          },
        },
      },
      zh: {
        translation: {
          home: {
            banner: {
              title: "在浏览器中离线编辑PDF",
              description:
                "这是一个 PDF 编辑器，它在所有页面加载完成后在你的浏览器中完全离线运行。你的PDF和你的个人信息将永远不会发送到任何服务器。",
              choosePdfButtonText: "选择 PDF",
            },
          },
        },
      },
    },
  });

export default i18n;
