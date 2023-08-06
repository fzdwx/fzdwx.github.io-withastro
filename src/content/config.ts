import {defineCollection, z} from 'astro:content';

const blog = defineCollection({
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        summary: z.string().optional(),
        // Transform string to Date object
        date: z
            .any()
            .or(z.date())
            .transform((val) => new Date(val)),
        update: z
            .any()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        tags: z.array(z.string()),
        cover: z.object(
            {
                image: z.string().optional(),
            }
        ).optional(),
    }),
});

export const collections = {blog};
