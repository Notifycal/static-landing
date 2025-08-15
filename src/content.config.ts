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
            rating: z.enum(['one', 'two', 'three', 'four', 'five']),
            content: z.string()
          })
        )
        .optional()
    })
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

// Export collections
export const collections = {
  homepage: homepageCollection,
  pages: pagesCollection
};
