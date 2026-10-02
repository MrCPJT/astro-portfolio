import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
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
  type: "content",
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
