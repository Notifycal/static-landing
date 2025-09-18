import type { LanguageCode } from '@notifycal/shared/types';
import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';
import { defaultLang, languages, showDefaultLang } from './i18n-const';

export function buildLocalizedUrl(path: string, lang: LanguageCode): string {
  const [pathPart, ...anchorParts] = path.split('#');
  const anchorPart = anchorParts.length > 0 ? anchorParts.join('#') : undefined;

  const normalizedPath = pathPart || '/';
  const pathWithTrailingSlash =
    normalizedPath === '/' ? '/' : normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;

  const localizedPath =
    !showDefaultLang && lang === defaultLang ? pathWithTrailingSlash : `/${lang}${pathWithTrailingSlash}`;

  return anchorPart ? `${localizedPath}#${anchorPart}` : localizedPath;
}

export function useTranslatedPath(lang: LanguageCode) {
  return function translatePath(path: string, l: LanguageCode = lang): string {
    return buildLocalizedUrl(path, l);
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
  const collectionPromise = getCollection(collection, (entry: CollectionEntry<T>) => {
    const entryLang = getLangFromEntryId(entry.id);
    const matches = entryLang === lang;
    return matches;
  }) as Promise<Array<CollectionEntry<T>>>;

  return collectionPromise.catch((error: unknown) => noLanguageRejection(collection, lang, error));
}

export function getCollectionEntryByLang<T extends keyof DataEntryMap>(
  collection: T,
  lang: LanguageCode
): Promise<CollectionEntry<T>> {
  return getCollectionByLang(collection, lang).then(
    (entries: Array<CollectionEntry<T>>) => {
      if (entries.length > 0) {
        return entries[0];
      } else if (lang !== defaultLang) {
        return getCollectionByLang(collection, defaultLang).then((fallbackEntries: Array<CollectionEntry<T>>) => {
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
    (error: unknown) => {
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
