import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    affiliate: z.array(z.object({
      name: z.string(),
      url: z.string(),
      cta: z.string().optional(),
    })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
