# Blog authoring guide

This site stores blog posts in `src/content/blog`. Each post should live in its own folder with an `index.md` file:

```text
src/content/blog/my-first-post/index.md
```

The folder name becomes the URL slug, so `my-first-post` becomes `/blog/my-first-post`.

## Required frontmatter

Every blog post must include the fields defined in `src/content/config.ts`:

```md
---
title: "My First Post"
summary: "A one-sentence description for listings, SEO, and previews."
date: 2026-06-03
tags: ["data science", "career", "portfolio"]
categories: "meta"
draft: true
---
```

Use `draft: true` while writing. Change it to `draft: false` when the post is ready to publish.

## Suggested structure for the introductory post

A good first post should quickly tell visitors what this site is for and what they can expect from future writing:

```md
# Introducing My Data Science Portfolio

## Why I built this site

Explain the purpose of the portfolio and what kind of roles or work you are interested in.

## What I will write about

Describe the themes you expect to cover: projects, notebooks, modelling decisions, lessons learned, and data science communication.

## How I approach data science

Give readers a sense of your working style: careful analysis, reproducibility, curiosity, and practical outcomes.

## What comes next

Point readers toward projects, your resume, and future posts.
```

## Writing tips

- Start with the reader: hiring managers, technical reviewers, and future collaborators should understand the point quickly.
- Make one clear claim per section.
- Prefer concrete examples over broad statements.
- Include tradeoffs and limitations; they make the writing more credible.
- Keep code-heavy posts focused on the decision being explained, not every line of implementation.

## Preview locally

Run the local development server:

```bash
corepack pnpm run dev
```

Then open the post at:

```text
http://localhost:4324/blog/my-first-post
```

Before publishing, run:

```bash
corepack pnpm run format:check
corepack pnpm run lint
corepack pnpm run build
```
