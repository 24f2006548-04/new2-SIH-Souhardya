import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../public/locales/en/common.json'
import hiCommon from '../public/locales/hi/common.json'
import orCommon from '../public/locales/or/common.json'

const resources = {
  en: { translation: enCommon },
  hi: { translation: hiCommon },
  or: { translation: orCommon },
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
