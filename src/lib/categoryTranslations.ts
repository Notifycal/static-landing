import type { LanguageCode } from './i18n-const';

type CategoryTranslations = {
  [key: string]: Record<LanguageCode, string>;
};

export const categoryTranslations: CategoryTranslations = {
  development: {
    es: 'Desarrollo',
    en: 'Development',
    ca: 'Desenvolupament'
  },
  design: {
    es: 'Diseño',
    en: 'Design',
    ca: 'Disseny'
  },
  'email marketing': {
    es: 'Marketing por email',
    en: 'Email marketing',
    ca: 'Màrqueting per email'
  },
  updates: {
    es: 'Actualizaciones',
    en: 'Updates',
    ca: 'Actualitzacions'
  },
  'rate optimization': {
    es: 'Optimización de tasas',
    en: 'Rate optimization',
    ca: 'Optimització de taxes'
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
