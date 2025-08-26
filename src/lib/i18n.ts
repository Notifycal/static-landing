import type { LanguageCode } from '@notifycal/shared/types';
import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';
import { defaultLang, languages, showDefaultLang } from './i18n-const';

export function useTranslatedPath(lang: LanguageCode) {
  return function translatePath(path: string, l: LanguageCode = lang): string {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path === '/' ? '' : path}`;
  };
}

function getLangFromEntryId(entryId: string): LanguageCode {
  const match = entryId.match(/-index([a-z]{2})$/);
  if (match && match[1] in languages) {
    const detectedLang = match[1] as LanguageCode;
    return detectedLang;
  }
  return defaultLang;
}

function noLanguageRejection(collection: string, lang: LanguageCode, error?: unknown): Promise<never> {
  return Promise.reject(new Error(`'${collection}' page content not found for language: ${lang}`, { cause: error }));
}

async function getCollectionByLang<T extends keyof DataEntryMap>(
  collection: T,
  lang: LanguageCode
): Promise<Array<CollectionEntry<T>>> {
  return getCollection(collection, (entry) => {
    const entryLang = getLangFromEntryId(entry.id);
    const matches = entryLang === lang;
    return matches;
  })
    .then((entries) => {
      return entries;
    })
    .catch((error) => noLanguageRejection(collection, lang, error));
}

export function getCollectionEntryByLang<T extends keyof DataEntryMap>(
  collection: T,
  lang: LanguageCode
): Promise<CollectionEntry<T>> {
  return getCollectionByLang(collection, lang).then(
    (entries) => {
      if (entries.length > 0) {
        const selectedEntry = entries[0];
        return selectedEntry;
      } else if (lang !== defaultLang) {
        return getCollectionByLang(collection, defaultLang).then((fallbackEntries) => {
          if (fallbackEntries.length > 0) {
            const selectedFallback = fallbackEntries[0];
            return selectedFallback;
          } else {
            return noLanguageRejection(collection, lang);
          }
        });
      } else {
        return noLanguageRejection(collection, lang);
      }
    },
    (error) => {
      return noLanguageRejection(collection, lang, error);
    }
  );
}

export function getLanguageStaticPaths(): Array<{ params: { lang: string } }> {
  return Object.keys(languages)
    .filter((lang) => lang !== defaultLang || showDefaultLang)
    .map((lang) => ({
      params: { lang }
    }));
}
