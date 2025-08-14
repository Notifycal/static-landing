import type { LanguageCode } from '@notifycal/shared/types';
import { defaultLang, ui } from './ui';

export function getLangFromUrl(url: URL): LanguageCode {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(
  lang: keyof typeof ui
): (key: keyof (typeof ui)['en']) => string | ReadonlyArray<string> {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
