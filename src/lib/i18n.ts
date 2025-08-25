import type { LanguageCode } from '@notifycal/shared/types';
import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';

export const languages: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català'
} as const;

export const defaultLang: LanguageCode = 'es';

export function getLangFromUrl(url: URL): LanguageCode {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as LanguageCode;
  }
  return defaultLang;
}

function getLangFromEntryId(entryId: string): LanguageCode {
  const match = entryId.match(/\.([a-z]{2})\.md$/);
  if (match && match[1] in languages) {
    return match[1] as LanguageCode;
  }
  return defaultLang;
}

function noLanguageRejection(collection: string, lang: LanguageCode, error?: unknown): Promise<never> {
  return Promise.reject(new Error(`'${collection}' page content not found for language: ${lang}`, { cause: error }));
}

function getCollectionByLang<T extends keyof DataEntryMap>(
  collection: T,
  lang: LanguageCode
): Promise<Array<CollectionEntry<T>>> {
  return getCollection(collection).then(
    (entries) =>
      entries.filter((entry) => {
        const entryLang = getLangFromEntryId(entry.id);
        return entryLang === lang;
      }),
    (error) => noLanguageRejection(collection, lang, error)
  );
}

export function getCollectionEntryByLang<T extends keyof DataEntryMap>(
  collection: T,
  lang: LanguageCode
): Promise<CollectionEntry<T>> {
  return getCollectionByLang(collection, lang).then(
    (entries) => {
      if (entries.length > 0) {
        return entries[0];
      } else if (lang !== defaultLang) {
        return getCollectionByLang(collection, defaultLang).then((fallbackEntries) => {
          if (fallbackEntries.length > 0) {
            return fallbackEntries[0];
          } else {
            return noLanguageRejection(collection, lang);
          }
        });
      } else {
        return noLanguageRejection(collection, lang);
      }
    },
    (error) => noLanguageRejection(collection, lang, error)
  );
}
