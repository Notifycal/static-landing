import type { LanguageCode } from './i18n-const';

type CategoryTranslations = {
  [key: string]: Record<LanguageCode, string>;
};

export const categoryTranslations: CategoryTranslations = {
  technology: {
    es: 'Tecnología',
    en: 'Technology',
    ca: 'Tecnologia'
  },
  communication: {
    es: 'Comunicación',
    en: 'Communication',
    ca: 'Comunicació'
  },
  legislation: {
    es: 'Legislación',
    en: 'Legislation',
    ca: 'Legislació'
  },
  guides: {
    es: 'Guías',
    en: 'Guides',
    ca: 'Guies'
  },
  'all categories': {
    es: 'Todas las categorías',
    en: 'All categories',
    ca: 'Totes les categories'
  }
};

export const translateCategory = (category: string, lang: LanguageCode): string => {
  const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
  const translation = categoryTranslations[normalizedCategory];

  if (!translation) {
    return category;
  }

  return translation[lang];
};
