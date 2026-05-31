# Connor Tynan Data Science Portfolio

Personal portfolio website for data science work, built with [Astro](https://astro.build/) and initialized from the [Astro Fox](https://astro.build/themes/details/astro-fox/) theme.

The site is intended to support an upcoming job search by hosting a resume, project case studies, notebook-backed analysis, and longer-form writing.

## Tech Stack

- Astro with Markdown and MDX content collections
- SolidJS components from the Astro Fox theme
- Tailwind CSS for styling
- Pagefind search and RSS from the starter theme
- `pnpm` for package management

## Local Development

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
src/content/log/         Optional short notes or learning logs from Astro Fox
src/pages/resume.astro   Resume landing page
public/resume/           Downloadable resume PDF assets
notebooks/source/        Original Jupyter notebooks
notebooks/published/     Optional reviewed conversion outputs
public/notebooks/        Generated notebook images and assets
scripts/                 Local workflow scripts
docs/                    Project and content workflow notes
```

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

## Personalization Checklist

- Replace placeholder name, links, and bio copy in the home, about, and resume pages.
- Replace `https://your-domain.example` in `astro.config.mjs` with the production domain.
- Add a real resume PDF at `public/resume/connor-tynan-resume.pdf`.
- Replace the sample project and draft notebook post with real portfolio work.
- Update `public/opengraph.png` and `public/favicon.svg` for personal branding.

## Deployment

This repository is prepared for Vercel static deployment.

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Use the default Astro build command: `pnpm run build`.
4. Set the output directory to `dist`.
5. Add the final production URL to `astro.config.mjs`.

## Acknowledgement

This portfolio is based on the MIT-licensed Astro Fox theme by jt_fox.
