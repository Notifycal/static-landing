import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const homepageCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/homepage' }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string().optional(),
      image: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true)
        })
        .optional()
    }),
    features: z.object({
      featuresTab: z.object({
        title: z.string(),
        description: z.string(),
        tabList: z
          .array(
            z.object({
              title: z.string(),
              icon: z.string(),
              image: z.string()
            })
          )
          .optional()
      }),

      ourFeatures: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
          list: z.array(z.string())
        })
      ),
      featuresVideo: z.object({
        title: z.string(),
        description: z.string(),
        video: z.object({
          thumbnail: z.string(),
          videoId: z.string()
        }),
        button: z.object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true)
        })
      })
    }),
    pricing: z.object({
      title: z.string(),
      description: z.string()
    }),
    faq: z.object({
      title: z.string(),
      description: z.string(),
      faqList: z.array(
        z.object({
          title: z.string(),
          content: z.string()
        })
      )
    }),
    testimonial: z.object({
      title: z.string(),
      description: z.string(),
      testimonialList: z
        .array(
          z.object({
            author: z.string(),
            avatar: z.string(),
            organization: z.string(),
            badge: z.object({
              type: z.enum(['clientSince', 'businessType', 'volume', 'improvement', 'feature']),
              value: z.string()
            }),
            content: z.string(),
            reference: z
              .object({
                displayName: z.string(),
                link: z.string().optional()
              })
              .optional()
          })
        )
        .optional()
    })
  })
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/about' }),
  schema: z.object({
    title: z.string(),
    pageTitle: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    image: z.string(),
    mission: z.object({
      title: z.string(),
      content: z.string()
    }),
    members: z.object({
      title: z.string(),
      description: z.string(),
      memberList: z.array(
        z.object({
          name: z.string(),
          field: z.string(),
          image: z.string(),
          bio: z.string(),
          linkedin: z.string(),
          github: z.string()
        })
      )
    }),
    values: z.object({
      title: z.string(),
      description: z.string(),
      valuesList: z.array(
        z.object({
          title: z.string(),
          content: z.string()
        })
      )
    })
  })
});

const roadmapCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/roadmap' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    intro: z.object({
      title: z.string(),
      description: z.string()
    }),
    confirmedFeatures: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        status: z.enum(['confirmed', 'in-development', 'planning'])
      })
    ),
    potentialFeatures: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string()
      })
    ),
    votingCTA: z.object({
      title: z.string(),
      description: z.string(),
      buttonText: z.string()
    }),
    confirmed: z.string(),
    inDevelopment: z.string(),
    planning: z.string(),
    featureUnderConsideration: z.string()
  })
});

const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional()
  })
});

const footerCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/footer' }),
  schema: z.object({
    socials: z.string(),
    quickLinks: z.string(),
    locationContact: z.string()
  })
});

const headerCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/header' }),
  schema: z.object({
    signIn: z.string()
  })
});

const siteCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/site' }),
  schema: z.object({
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    ctaButtonLabel: z.string(),
    footerDescription: z.string(),
    copyright: z.string(),
    metaDescription: z.string()
  })
});

const navigationCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/navigation' }),
  schema: z.object({
    main: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    ),
    footer: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    )
  })
});

// Export collections
export const collections = {
  homepage: homepageCollection,
  about: aboutCollection,
  roadmap: roadmapCollection,
  pages: pagesCollection,
  footer: footerCollection,
  header: headerCollection,
  site: siteCollection,
  navigation: navigationCollection
};
