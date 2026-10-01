# Connor Tynan Data Science Portfolio

Personal portfolio website for data science work, live at [cpjt.dev](https://cpjt.dev). It hosts a career timeline, project case studies, a resume, and longer-form writing, including posts converted from Jupyter notebooks.

Built with [Astro](https://astro.build/) from the [Astro Fox](https://astro.build/themes/details/astro-fox/) theme.

## Tech Stack

- Astro with Markdown and MDX content collections (`blog`, `projects`)
- SolidJS for the interactive blog list and tag filter
- Tailwind CSS, with the colour palette defined as CSS variables in `src/app/styles/global.css`
- Pagefind search (the index only exists after a build) and an RSS feed
- `pnpm` for package management

## Local Development

After a fresh clone or pull on another machine, install dependencies before running Astro. Missing modules such as `solid-icons` or `astro:*` usually mean this step has not run yet.

```bash
corepack pnpm install
corepack pnpm run dev
```

Useful scripts:

```bash
corepack pnpm run build
corepack pnpm run preview
corepack pnpm run lint
corepack pnpm run format:check
corepack pnpm run notebook:convert -- notebooks/source/sample-model-diagnostics.ipynb blog sample-model-diagnostics
```

## Content Structure

```text
src/content/blog/        Blog posts, writing, and notebook-derived articles
src/content/projects/    Data science case studies
src/app/static/          Site constants, featured projects, roles and education
src/pages/index.astro    Home page (hero, timeline, featured projects, latest posts)
src/pages/resume.astro   Resume page
public/resume/           Downloadable resume PDF
notebooks/source/        Original Jupyter notebooks
notebooks/published/     Optional reviewed conversion outputs
public/notebooks/        Generated notebook images and assets
scripts/                 Local workflow scripts
docs/                    Project and content workflow notes
```

Where to change common things:

- Roles and education: `src/app/static/experience.ts`. The home timeline and the resume page both read from it.
- Featured projects on the home page: `FEATURED_PROJECTS` in `src/app/static/consts.ts`.
- Colours: the `--color-*` variables in `src/app/styles/global.css`, for light and dark mode.

Blog posts require frontmatter like:

```markdown
---
title: "Post Title"
summary: "Short description"
date: 2026-05-31
tags: ["python", "data science"]
categories: "notebooks"
draft: true
---
```

Project case studies require frontmatter like:

```markdown
---
title: "Project Title"
company: "Portfolio case study"
startDate: "2026-05-31"
domain: "Machine learning"
summary: "Short project summary"
technologies: ["Python", "SQL", "scikit-learn"]
link: "https://github.com/your-username/project"
---
```

## Notebook Publishing Workflow

Keep original notebooks in `notebooks/source/`. Convert a notebook into a publishable Astro content entry with:

```bash
corepack pnpm run notebook:convert -- notebooks/source/sample-model-diagnostics.ipynb blog sample-model-diagnostics
```

The converter:

- writes Markdown to `src/content/<collection>/<slug>/index.md`
- adds draft frontmatter when the notebook has none
- moves generated notebook assets to `public/notebooks/<slug>/`
- rewrites asset links so Astro can serve them from `/notebooks/<slug>/`

Review converted posts before publishing. Keep `draft: true` until the narrative, charts, and conclusions are ready.

Draft posts show in `pnpm dev` but are excluded from production builds, the blog index, and the RSS feed.

Do not start a post with a `# Title` heading. The layout renders the title as the page H1.

## Deployment

The site builds to static files in `dist/` and is deployed with Vercel. Pull requests get a preview deployment.

- Build command: `pnpm run build`, which runs `astro check` and then `astro build`.
- Output directory: `dist`.
- The production URL is set as `site` in `astro.config.mjs`. It feeds the sitemap, `robots.txt`, canonical URLs, and social images.

## Acknowledgement

This portfolio is based on the MIT-licensed Astro Fox theme by jt_fox.
