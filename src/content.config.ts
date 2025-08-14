import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Homepage Collection Schema
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
    keyFeatures: z.object({
      title: z.string(),
      description: z.string(),
      featureList: z
        .array(
          z.object({
            icon: z.string(),
            title: z.string(),
            content: z.string()
          })
        )
        .optional()
    }),

    service: z.object({
      homepageTab: z.object({
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

      ourService: z.array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          image: z.string().optional(),
          list: z.array(z.string()).optional(),
          video: z
            .object({
              thumbnail: z.string(),
              videoId: z.string()
            })
            .optional(),
          button: z
            .object({
              label: z.string(),
              link: z.string(),
              enable: z.boolean().default(true)
            })
            .optional()
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
            rating: z.enum(['one', 'two', 'three', 'four', 'five']),
            content: z.string()
          })
        )
        .optional()
    })
  })
});

// About Collection Schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/about' }),
  schema: z.object({
    title: z.string(),
    pageTitle: z.string(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    image: z.string().optional(),
    buttons: z.array(
      z.object({
        label: z.string(),
        link: z.string(),
        outline: z.boolean().optional(),
        enable: z.boolean().default(true)
      })
    ),

    // Counter
    counter: z.array(
      z.object({
        name: z.string(),
        number: z.union([z.number(), z.string()]), // Support both numeric and string types (e.g., 'M', 'K')
        measurement: z.string(),
        color: z.string()
      })
    ),

    // Gallery
    gallery: z.object({
      title: z.string(),
      images: z.array(z.string())
    }),

    // Our Work
    features: z.object({
      title: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean().default(true)
      }),
      featuresList: z.array(
        z.object({
          title: z.string(),
          content: z.string()
        })
      )
    }),

    // Team Members
    members: z.object({
      title: z.string(),
      description: z.string(),
      memberList: z.array(
        z.object({
          name: z.string(),
          field: z.string(),
          image: z.string()
        })
      )
    })
  })
});

// Blog collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pageTitle: z.string().optional(),
    subtitle: z.string().optional(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).default(['others']),
    draft: z.boolean().optional(),
    featured: z.boolean().optional()
  })
});

// Features collections schema
const featuresCollection = defineCollection({
  loader: glob({ pattern: '**/-*.{md,mdx}', base: 'src/content/features' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true)
        })
        .optional()
    }),

    // Project Management Section
    projectManagement: z.object({
      title: z.string(),
      content: z.string(),
      management: z.object({
        title: z.string(),
        projects: z
          .array(
            z.object({
              title: z.string(),
              content: z.string(),
              icon: z.string()
            })
          )
          .optional()
      }),

      // Feature Service Section
      featureService: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        list: z.array(z.string()).optional(),
        buttons: z.array(
          z.object({
            label: z.string(),
            link: z.string(),
            enable: z.boolean().default(true),
            outline: z.boolean().optional()
          })
        )
      }),

      // Feature Tab Section
      featureTab: z.object({
        title: z.string(),
        list: z
          .array(
            z.object({
              title: z.string(),
              content: z.string(),
              image: z.string()
            })
          )
          .optional()
      })
    })
  })
});

// How It Works Collection Schema
const howItWorksCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pageTitle: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),

    // Performance Section
    performance: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      })
    ),

    // Our Works Section
    ourWorks: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        list: z.array(z.string()).optional()
      })
    )
  })
});

// Contact collection schema
const contactCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    pageTitle: z.string(),
    image: z.string().optional()
  })
});

// Careers collection schema
const careersCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/careers' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    pageTitle: z.string().optional(),
    image: z.string().optional(),
    benefits: z
      .object({
        title: z.string(),
        description: z.string(),
        benefitList: z.array(
          z
            .object({
              title: z.string(),
              content: z.string(),
              color: z.string(),
              icon: z.string()
            })
            .optional()
        )
      })
      .optional(),
    sidebarContent: z
      .object({
        title: z.string(),
        content: z.string(),
        button: z.object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true)
        }),
        enable: z.boolean().default(true)
      })
      .optional(),
    career: z
      .object({
        title: z.string(),
        subtitle: z.string()
      })
      .optional(),
    excerpt: z.string().optional(),
    jobNature: z.string().optional(),
    location: z.string().optional(),
    categories: z.array(z.string()).default(['developer']),
    date: z.date().optional(),
    draft: z.boolean().default(false)
  })
});

const integrationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/integrations' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    pageTitle: z.string().optional(),
    name: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(['social media']).optional(),
    button: z
      .object({
        label: z.string(),
        link: z.string()
      })
      .optional(),
    draft: z.boolean().default(false).optional()
  })
});

const pricingCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pageTitle: z.string(),
    metaTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    pricingCard: z.array(
      z.object({
        title: z.string(),
        preCurrency: z.string(),
        postCurrency: z.string(),
        price: z.number(),
        icon: z.string(),
        description: z.string(),
        featured: z.boolean().default(false),
        buttons: z.object({
          buyNow: z.object({
            label: z.string(),
            link: z.string()
          }),
          freeTrial: z.object({
            label: z.string(),
            link: z.string()
          })
        }),
        services: z.object({
          title: z.string(),
          list: z.array(z.string())
        })
      })
    ),
    faq: z.object({
      title: z.string(),
      description: z.string(),
      faqList: z.array(
        z.object({
          title: z.string(),
          content: z.string()
        })
      )
    })
  })
});

// Pages collection schema
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

// Export collections
export const collections = {
  homepage: homepageCollection,
  about: aboutCollection,
  blog: blogCollection,
  features: featuresCollection,
  'how-it-works': howItWorksCollection,
  contact: contactCollection,
  careers: careersCollection,
  integrations: integrationsCollection,
  pricing: pricingCollection,
  pages: pagesCollection
};
