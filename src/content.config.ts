import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    categories: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      domain: z.string().optional(),
      summary: z.string().optional(),
      outcome: z.string().optional(),
      image: z.string().optional(),
      /** Pixel-art thumbnail, 32×24, under public/sprites/projects/. */
      thumbnail: z.string().optional(),
      highlights: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            title: z.string(),
            caption: z.string(),
          }),
        )
        .max(4)
        .optional(),
      technologies: z.array(z.string()),
      link: z.string().optional(),
    }),
});

export const collections = {
  blog,
  projects,
};
