import type { LanguageCode } from '@notifycal/shared/types';
import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { defaultLang } from './i18n-const';

type PageData = {
  title: string;
  metaTitle?: string;
  description?: string;
  image?: string;
  draft?: boolean;
};

function getLangFromEntryId(entryId: string): LanguageCode {
  const match = entryId.match(/([a-z]{2})$/);
  if (match && match[1] in { es: true, en: true, ca: true }) {
    return match[1] as LanguageCode;
  }
  return defaultLang;
}

export function removeLanguageSuffix(id: string): string {
  return id.replace(/([a-z]{2})$/, '');
}

export const getSinglePage = async <C extends CollectionKey>(collectionName: C): Promise<Array<CollectionEntry<C>>> => {
  const allPages = await getCollection(collectionName);

  const removeIndex = allPages.filter((data) => data.id.match(/^(?!-)/));

  const removeDrafts = removeIndex.filter((data) => {
    const pageData = data.data as PageData;
    return pageData.draft !== true;
  });

  return removeDrafts;
};

export const getSinglePageByLang = async <C extends CollectionKey>(
  collectionName: C,
  lang: LanguageCode
): Promise<Array<CollectionEntry<C>>> => {
  const allPages = await getCollection(collectionName, (entry) => {
    const isNotIndex = entry.id.match(/^(?!-)/);
    if (!isNotIndex) return false;

    const entryLang = getLangFromEntryId(entry.id);
    return entryLang === lang;
  });

  const removeDrafts = allPages.filter((data) => {
    const pageData = data.data as PageData;
    return pageData.draft !== true;
  });

  return removeDrafts;
};
