import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
    blog: defineCollection({
        loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs/blog' }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date().optional(),
            authors: z.array(z.string()).optional(),
            tags: z.array(z.string()).optional(),
            cover: z
                .object({
                    image: z.string().optional(),
                    alt: z.string().optional(),
                })
                .optional(),
        }),
    }),
    projects: defineCollection({
        loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs/project' }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date().optional(),
            authors: z.array(z.string()).optional(),
            hero: z.any().optional(),
        }),
    }),
};
