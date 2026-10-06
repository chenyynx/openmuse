import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en as batch1En, zh as batch1Zh } from './parts/batch1';
import { en as batch2En, zh as batch2Zh } from './parts/batch2';
import { en as batch3En, zh as batch3Zh } from './parts/batch3';
import { en as batch4En, zh as batch4Zh } from './parts/batch4';
import { en as batch5En, zh as batch5Zh } from './parts/batch5';
import { en as batch6En, zh as batch6Zh } from './parts/batch6';

const en: Record<string, string> = {
  ...batch1En,
  ...batch2En,
  ...batch3En,
  ...batch4En,
  ...batch5En,
  ...batch6En,
};

const zh: Record<string, string> = {
  ...batch1Zh,
  ...batch2Zh,
  ...batch3Zh,
  ...batch4Zh,
  ...batch5Zh,
  ...batch6Zh,
};

type LocalizationModule = { getLocales?: () => { languageTag?: string }[] };

// expo-localization pulls in react-native, which plain-node test runners
// (tsx/esbuild) cannot parse. A guarded require keeps tests loading this
// module: any failure falls back to English. Metro still bundles it.
declare const require: (id: string) => LocalizationModule | undefined;

function deviceLanguage(): string {
  try {
    const tag = require('expo-localization')?.getLocales?.()?.[0]?.languageTag ?? '';
    return tag.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  } catch {
    return 'en';
  }
}

export const initialLanguage = deviceLanguage();

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18next;
