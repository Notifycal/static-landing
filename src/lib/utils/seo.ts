import config from '@/config/config.json';
import { getCollectionEntryByLang } from '@/lib/i18n';
import type { LanguageCode } from '@notifycal/shared/types';

interface BaseSchema {
  '@context': string;
  '@type': string;
}

interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: {
    '@type': string;
    name: string;
  };
  contactPoint: {
    '@type': string;
    contactType: string;
    availableLanguage: Array<string>;
  };
}

interface SoftwareApplicationSchema extends BaseSchema {
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  image: string;
  applicationCategory: string;
  operatingSystem: string;
  softwareVersion: string;
  provider: OrganizationSchema;
  offers: Array<{
    '@type': string;
    name: string;
    price: string;
    priceCurrency: string;
    availability: string;
  }>;
  featureList: Array<string>;
}

interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

interface ProductSchema extends BaseSchema {
  '@type': 'Product';
  name: string;
  description: string;
  image: string;
  offers: Array<{
    '@type': string;
    name: string;
    price: string;
    priceCurrency: string;
    availability: string;
    seller: OrganizationSchema;
  }>;
}

type StructuredDataSchema =
  | OrganizationSchema
  | SoftwareApplicationSchema
  | FAQPageSchema
  | BreadcrumbListSchema
  | ProductSchema
  | null;

function getDefaultOffers(lang: LanguageCode): Array<{ name: string; price: string; currency: string }> {
  const offers = {
    es: [
      { name: 'Plan Solo', price: '16.00', currency: 'EUR' },
      { name: 'Plan Team', price: '44.00', currency: 'EUR' },
      { name: 'Plan Pro', price: '99.00', currency: 'EUR' }
    ],
    en: [
      { name: 'Solo Plan', price: '16.00', currency: 'EUR' },
      { name: 'Team Plan', price: '44.00', currency: 'EUR' },
      { name: 'Pro Plan', price: '99.00', currency: 'EUR' }
    ],
    ca: [
      { name: 'Pla Solo', price: '16.00', currency: 'EUR' },
      { name: 'Pla Team', price: '44.00', currency: 'EUR' },
      { name: 'Pla Pro', price: '99.00', currency: 'EUR' }
    ]
  };
  return offers[lang] || offers.es;
}

async function getHomepageFAQs(lang: LanguageCode): Promise<Array<{ question: string; answer: string }>> {
  try {
    const home = await getCollectionEntryByLang('home', lang);
    return home.data.faq.faqList.map((faq: { title: string; content: string }) => ({
      question: faq.title,
      answer: faq.content
    }));
  } catch (error) {
    console.warn(`Failed to load FAQs for lang ${lang}:`, error);
    return [];
  }
}

function generateBreadcrumbs(url: string, lang: LanguageCode): Array<{ name: string; url: string }> {
  const pathSegments = url.split('/').filter((segment) => segment && segment !== lang);

  const breadcrumbNames: Record<LanguageCode, Record<string, string>> = {
    es: { about: 'Acerca de', roadmap: 'Roadmap' },
    en: { about: 'About', roadmap: 'Roadmap' },
    ca: { about: 'Sobre nosaltres', roadmap: 'Roadmap' }
  };

  const homeNames = {
    es: 'Inicio',
    en: 'Home',
    ca: 'Inici'
  };

  const breadcrumbs = [{ name: homeNames[lang] || homeNames.es, url: '/' }];

  if (pathSegments.length > 0) {
    const page = pathSegments[0];
    const pageName = breadcrumbNames[lang][page];
    breadcrumbs.push({ name: pageName, url: `/${page}` });
  }

  return breadcrumbs;
}

const keywordsMap = {
  es: {
    primary: [
      'recordatorios automáticos citas',
      'avisos citas whatsapp',
      'notificaciones citas médicas',
      'recordatorio cita dental',
      'sistema avisos pacientes',
      'reduce absentismo 80%',
      'configuración 3 minutos',
      'recordatorios sms automáticos',
      'integración google calendar'
    ],
    secondary: [
      'reducir ausencias citas',
      'recordatorios sms citas',
      'notificaciones automáticas',
      'avisos cita peluquería',
      'recordatorios cita médica',
      'sin errores gestión manual',
      'automatizar recordatorios',
      'sincronización tiempo real',
      'envío recordatorios automático'
    ],
    sectors: {
      dental: 'recordatorios automáticos citas dentales',
      medical: 'avisos citas médicas automáticos',
      salon: 'sistema recordatorios peluquerías',
      clinic: 'notificaciones citas clínica',
      automotive: 'recordatorios automáticos talleres coches',
      tattoo: 'avisos citas centros tatuajes',
      massage: 'recordatorios automáticos spa masajes',
      optical: 'notificaciones citas ópticas',
      therapy: 'recordatorios citas terapia psicológica',
      veterinary: 'avisos citas clínicas veterinarias',
      beauty: 'recordatorios tratamientos estética belleza',
      laboratory: 'notificaciones entregas laboratorio'
    }
  },
  en: {
    primary: [
      'automated appointment reminders',
      'whatsapp appointment notifications',
      'appointment reminder system',
      'reduce patient no-shows',
      'dental appointment reminders',
      'reduce absenteeism 80%',
      'setup in 3 minutes',
      'automated sms reminders',
      'google calendar integration'
    ],
    secondary: [
      'sms appointment alerts',
      'clinic reminder software',
      'automated patient notifications',
      'appointment booking reminders',
      'medical appointment alerts',
      'no manual number management',
      'automate reminders',
      'real-time synchronization',
      'automatic reminder sending'
    ],
    sectors: {
      dental: 'automated dental appointment reminders',
      medical: 'medical appointment notification system',
      salon: 'salon appointment reminder software',
      clinic: 'clinic appointment alert system',
      automotive: 'automated car workshop reminders',
      tattoo: 'tattoo studio appointment notifications',
      massage: 'spa massage appointment reminders',
      optical: 'optical clinic appointment alerts',
      therapy: 'therapy appointment reminder system',
      veterinary: 'veterinary clinic appointment reminders',
      beauty: 'beauty treatment appointment notifications',
      laboratory: 'laboratory delivery notifications'
    }
  },
  ca: {
    primary: [
      'recordatoris automàtics cites',
      'avisos cites whatsapp',
      'notificacions cites mèdiques',
      'recordatori cita dental',
      'sistema avisos pacients',
      'redueix absentisme 80%',
      'configuració 3 minuts',
      'recordatoris sms automàtics',
      'integració google calendar'
    ],
    secondary: [
      'reduir absències cites',
      'recordatoris sms cites',
      'notificacions automàtiques',
      'avisos cita perruqueria',
      'recordatoris cita mèdica',
      'sense errors gestió manual',
      'automatitzar recordatoris',
      'sincronització temps real',
      'enviament recordatoris automàtic'
    ],
    sectors: {
      dental: 'recordatoris automàtics cites dentals',
      medical: 'avisos cites mèdiques automàtics',
      salon: 'sistema recordatoris perruqueries',
      clinic: 'notificacions cites clínica',
      automotive: 'recordatoris automàtics tallers cotxes',
      tattoo: 'avisos cites centres tatuatges',
      massage: 'recordatoris automàtics spa massatges',
      optical: 'notificacions cites òptiques',
      therapy: 'recordatoris cites teràpia psicològica',
      veterinary: 'avisos cites clíniques veterinàries',
      beauty: 'recordatoris tractaments estètica bellesa',
      laboratory: 'notificacions lliuraments laboratori'
    }
  }
};

export function getSectorKeywords(lang: LanguageCode, sector: keyof typeof keywordsMap.es.sectors): string {
  return keywordsMap[lang]?.sectors[sector] || keywordsMap.es.sectors[sector];
}

export function getSEODefaults(lang: LanguageCode): {
  title: string;
  description: string;
  image: string;
  keywords: string;
} {
  const defaults = {
    es: {
      title: 'Notifycal - Recordatorios Automáticos de Citas | Reduce Ausencias',
      description:
        'Sistema de recordatorios automáticos sin conocimientos técnicos. Integración directa con Google Calendar y Contactos. Reduce ausencias hasta 80% en clínicas dentales, talleres, centros de tatuajes, spas y más.',
      image: '/images/og-image.png',
      keywords: keywordsMap.es.primary.join(', ')
    },
    en: {
      title: 'Notifycal - Automated Appointment Reminders | Reduce No-Shows',
      description:
        'Automated reminder system without technical knowledge required. Direct Google Calendar and Contacts integration. Reduce no-shows up to 80% for dental clinics, car workshops, tattoo studios, spas and more.',
      image: '/images/og-image.png',
      keywords: keywordsMap.en.primary.join(', ')
    },
    ca: {
      title: 'Notifycal - Recordatoris Automàtics Cites | Redueix Absències',
      description:
        'Sistema de recordatoris automàtics sense coneixements tècnics. Integració directa amb Google Calendar i Contactes. Redueix absències fins 80% en clíniques dentals, tallers, centres de tatuatges, spas i més.',
      image: '/images/og-image.png',
      keywords: keywordsMap.ca.primary.join(', ')
    }
  };

  return defaults[lang] || defaults.es;
}

function createOrganizationSchema(lang: LanguageCode): OrganizationSchema {
  const {
    site: { baseUrl, author }
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Notifycal',
    url: baseUrl,
    logo: `${baseUrl}/images/notifycal-logo.png`,
    description: getSEODefaults(lang).description,
    founder: {
      '@type': 'Person',
      name: author
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'Catalan']
    }
  };
}

export async function generateStructuredData({
  type,
  lang,
  title,
  description,
  url,
  image,
  breadcrumbs = [],
  offers = [],
  faqs = []
}: {
  type: string;
  lang: LanguageCode;
  title: string;
  description: string;
  url: string;
  image: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  offers?: Array<{ name: string; price: string; currency: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}): Promise<StructuredDataSchema> {
  const {
    site: { baseUrl }
  } = config;
  const organizationSchema = createOrganizationSchema(lang);

  const finalOffers = offers.length > 0 ? offers : getDefaultOffers(lang);
  const finalFaqs = faqs.length > 0 ? faqs : await getHomepageFAQs(lang);
  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : generateBreadcrumbs(url, lang);

  switch (type) {
    case 'Organization':
      return organizationSchema;

    case 'SoftwareApplication':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Notifycal',
        description,
        url,
        image,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web-based',
        softwareVersion: '1.0',
        provider: organizationSchema,
        offers: finalOffers.map((offer) => ({
          '@type': 'Offer',
          name: offer.name,
          price: offer.price,
          priceCurrency: offer.currency,
          availability: 'https://schema.org/InStock'
        })),
        featureList:
          lang === 'es'
            ? ['Recordatorios automáticos SMS', 'Notificaciones WhatsApp', 'Reducción de ausencias', 'Panel de control']
            : lang === 'en'
              ? ['Automated SMS reminders', 'WhatsApp notifications', 'No-show reduction', 'Control dashboard']
              : ['Recordatoris automàtics SMS', 'Notificacions WhatsApp', 'Reducció absències', 'Panell de control']
      };

    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: finalFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };

    case 'BreadcrumbList':
      return finalBreadcrumbs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: finalBreadcrumbs.map((breadcrumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: breadcrumb.name,
              item: `${baseUrl}${breadcrumb.url}`
            }))
          }
        : null;

    case 'Offer':
      return finalOffers.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: title,
            description,
            image,
            offers: finalOffers.map((offer) => ({
              '@type': 'Offer',
              name: offer.name,
              price: offer.price,
              priceCurrency: offer.currency,
              availability: 'https://schema.org/InStock',
              seller: organizationSchema
            }))
          }
        : null;

    default:
      return organizationSchema;
  }
}

export function generateMetaDescription(lang: LanguageCode, sector?: string, customText?: string): string {
  if (customText) return customText;

  const sectorTemplates = {
    es: {
      dental:
        'Recordatorios automáticos para clínicas dentales. Reduce ausencias hasta 80% con SMS y WhatsApp. Configuración en 3 minutos.',
      medical:
        'Avisos automáticos citas médicas. Sistema de recordatorios SMS que reduce faltas hasta 80%. Integración Google Calendar.',
      automotive:
        'Recordatorios automáticos talleres de coches. Avisos SMS para revisiones y reparaciones. Reduce ausencias 80%.',
      tattoo:
        'Recordatorios automáticos centros de tatuajes. Avisos SMS para sesiones y citas. Sistema profesional y fácil.',
      massage:
        'Recordatorios automáticos spa y masajes. Notificaciones SMS para tratamientos. Reduce faltas hasta 80%.',
      optical:
        'Recordatorios automáticos ópticas. Avisos SMS para revisiones visuales y entregas. Configuración simple.',
      therapy:
        'Recordatorios automáticos terapia psicológica. Sistema SMS para citas terapéuticas. Integración transparente.',
      veterinary:
        'Recordatorios automáticos clínicas veterinarias. Avisos SMS vacunas y revisiones. Reduce ausencias 80%.',
      beauty:
        'Recordatorios automáticos centros estética. Notificaciones SMS tratamientos belleza. Sistema profesional.',
      laboratory: 'Recordatorios automáticos laboratorios. Avisos SMS entregas y seguimientos. Coordinación perfecta.'
    },
    en: {
      dental:
        'Automated reminders for dental clinics. Reduce no-shows up to 80% with SMS and WhatsApp. Setup in 3 minutes.',
      medical:
        'Automated medical appointment alerts. SMS reminder system reduces absences up to 80%. Google Calendar integration.',
      automotive: 'Automated car workshop reminders. SMS alerts for reviews and repairs. Reduce no-shows by 80%.',
      tattoo:
        'Automated tattoo studio reminders. SMS notifications for sessions and appointments. Professional and easy system.',
      massage: 'Automated spa and massage reminders. SMS notifications for treatments. Reduce no-shows up to 80%.',
      optical: 'Automated optical clinic reminders. SMS alerts for eye exams and deliveries. Simple setup.',
      therapy: 'Automated therapy appointment reminders. SMS system for therapeutic sessions. Seamless integration.',
      veterinary:
        'Automated veterinary clinic reminders. SMS alerts for vaccinations and checkups. Reduce absences 80%.',
      beauty: 'Automated beauty center reminders. SMS notifications for aesthetic treatments. Professional system.',
      laboratory: 'Automated laboratory reminders. SMS alerts for deliveries and follow-ups. Perfect coordination.'
    },
    ca: {
      dental:
        'Recordatoris automàtics clíniques dentals. Redueix absències fins 80% amb SMS i WhatsApp. Configuració 3 minuts.',
      medical:
        'Avisos automàtics cites mèdiques. Sistema recordatoris SMS redueix faltes fins 80%. Integració Google Calendar.',
      automotive: 'Recordatoris automàtics tallers cotxes. Avisos SMS revisions i reparacions. Redueix absències 80%.',
      tattoo: 'Recordatoris automàtics centres tatuatges. Avisos SMS sessions i cites. Sistema professional i fàcil.',
      massage: 'Recordatoris automàtics spa i massatges. Notificacions SMS tractaments. Redueix faltes fins 80%.',
      optical: 'Recordatoris automàtics òptiques. Avisos SMS revisions visuals i lliuraments. Configuració simple.',
      therapy: 'Recordatoris automàtics teràpia psicològica. Sistema SMS cites terapèutiques. Integració transparent.',
      veterinary:
        'Recordatoris automàtics clíniques veterinàries. Avisos SMS vacunes i revisions. Redueix absències 80%.',
      beauty: 'Recordatoris automàtics centres estètica. Notificacions SMS tractaments bellesa. Sistema professional.',
      laboratory: 'Recordatoris automàtics laboratoris. Avisos SMS lliuraments i seguiments. Coordinació perfecta.'
    }
  };

  if (sector && sectorTemplates[lang] && sectorTemplates[lang][sector as keyof typeof sectorTemplates.es]) {
    return sectorTemplates[lang][sector as keyof typeof sectorTemplates.es];
  }

  const defaultTemplates = {
    es: 'Recordatorios automáticos de citas por SMS y WhatsApp. Reduce ausencias de pacientes hasta 80%. Configuración en 3 minutos.',
    en: 'Automated appointment reminders via SMS and WhatsApp. Reduce patient no-shows up to 80%. Setup in 3 minutes.',
    ca: 'Recordatoris automàtics de cites per SMS i WhatsApp. Redueix absències de pacients fins 80%. Configuració 3 minuts.'
  };

  return defaultTemplates[lang] || defaultTemplates.es;
}

export function generateTitle(lang: LanguageCode, pageTitle: string, sector?: string): string {
  const brandSuffix = ' | Notifycal';

  if (sector) {
    const sectorNames = {
      es: {
        dental: 'Clínicas Dentales',
        medical: 'Centros Médicos',
        automotive: 'Talleres de Coches',
        tattoo: 'Centros de Tatuajes',
        massage: 'Spa y Masajes',
        optical: 'Ópticas',
        therapy: 'Centros de Terapia',
        veterinary: 'Clínicas Veterinarias',
        beauty: 'Centros de Estética',
        laboratory: 'Laboratorios'
      },
      en: {
        dental: 'Dental Clinics',
        medical: 'Medical Centers',
        automotive: 'Car Workshops',
        tattoo: 'Tattoo Studios',
        massage: 'Spa & Massage',
        optical: 'Optical Clinics',
        therapy: 'Therapy Centers',
        veterinary: 'Veterinary Clinics',
        beauty: 'Beauty Centers',
        laboratory: 'Laboratories'
      },
      ca: {
        dental: 'Clíniques Dentals',
        medical: 'Centres Mèdics',
        automotive: 'Tallers de Cotxes',
        tattoo: 'Centres de Tatuatges',
        massage: 'Spa i Massatges',
        optical: 'Òptiques',
        therapy: 'Centres de Teràpia',
        veterinary: 'Clíniques Veterinàries',
        beauty: "Centres d'Estètica",
        laboratory: 'Laboratoris'
      }
    };

    const sectorName = sectorNames[lang]?.[sector as keyof typeof sectorNames.es] || sector;
    const templates = {
      es: `${pageTitle} para ${sectorName}${brandSuffix}`,
      en: `${pageTitle} for ${sectorName}${brandSuffix}`,
      ca: `${pageTitle} per ${sectorName}${brandSuffix}`
    };
    return templates[lang] || templates.es;
  }

  return `${pageTitle}${brandSuffix}`;
}
