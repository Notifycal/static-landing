import type { LanguageCode } from '@notifycal/shared/types';

export const languages: Record<LanguageCode, string> = {
  es: 'Español',
  en: 'English',
  ca: 'Català'
} as const;

export const defaultLang: LanguageCode = 'es';
export const showDefaultLang = false;

export function getLangFromUrl(url: URL): LanguageCode {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as LanguageCode;
  }
  return defaultLang;
}

export function getPathWithoutLang(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const [firstSegment] = segments;

  if (firstSegment in languages) {
    return segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/';
  }

  return url.pathname;
}
