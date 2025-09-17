import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../public/locales/en/common.json'
import hiCommon from '../public/locales/hi/common.json'

const resources = {
  en: { translation: enCommon },
  hi: { translation: hiCommon },
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })
}

export default i18n
