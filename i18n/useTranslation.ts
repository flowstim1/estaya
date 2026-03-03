'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { defaultLocale, localeDirections, type Locale } from './config';

// Import dictionaries
import en from './dictionaries/en.json';
import fr from './dictionaries/fr.json';
import ar from './dictionaries/ar.json';

const dictionaries = {
  en,
  fr,
  ar,
} as const;

type Dictionary = typeof en;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.lang as Locale) || defaultLocale;
  const [dict, setDict] = useState<Dictionary>(dictionaries[locale]);

  useEffect(() => {
    // Update HTML direction when locale changes
    document.documentElement.dir = localeDirections[locale];
    document.documentElement.lang = locale;
    setDict(dictionaries[locale]);
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = dict;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value || key;
  };

  return { t, locale };
}