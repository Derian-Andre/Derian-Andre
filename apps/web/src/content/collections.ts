import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const publicationFields = {
  title: z.string().min(1),
  date: z.coerce.date(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  hero: z.string().optional(),
  draft: z.boolean().optional().default(false),
  disabled: z.boolean().optional().default(false),
}

export const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "{es,en}/**/*.md",
  }),
  schema: z.object(publicationFields),
})

export const work = defineCollection({
  loader: glob({
    base: "./src/content/work",
    pattern: "{es,en}/**/*.md",
  }),
  schema: z.object({
    ...publicationFields,
    gallery: z.coerce.number().int().positive().optional().default(1),
    working: z.boolean().optional().default(true),
  }),
})

export const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "{es,en}/**/*.md",
  }),
  schema: z.object(publicationFields),
})

export const collections = { blog, work, projects }
