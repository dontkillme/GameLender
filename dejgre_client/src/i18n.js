import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import loginTranslationsEn from "./apps/auth/translations/en/login.json";
import loginTranslationsPl from "./apps/auth/translations/pl/login.json";
import boardgamesEng from "./apps/boardgames/translations/en/boardgames.json";


const resources = {
  en: {
    login: loginTranslationsEn,
    boardgames: boardgamesEng
  },
  "pl-PL": {
    login: loginTranslationsPl
  }
}

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
      saveMissing: true
    }
  });


export default i18n;