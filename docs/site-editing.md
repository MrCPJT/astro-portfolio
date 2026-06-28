# Minimal Site Editing Guide

Use this when you want to make small manual updates without hunting through the project.

## Common Details

- Home page intro: edit `src/pages/index.astro`.
- About page title, meta description, profile copy, experience, skills, and education: edit `src/pages/about/index.astro`.
- Resume page copy and download link: edit `src/pages/resume.astro`.
- Uploaded resume PDF: replace `public/resume/connor-tynan-resume.pdf`.
- Header logo: edit `src/app/layouts/Header.astro` and the logo files in `public/`.
- Browser tab icons: replace `public/favicon.svg`, `public/favicon-32.png`, `public/favicon-96.png`, and `public/favicon-192.png`.
- Footer social links: edit `src/app/layouts/Footer.astro`.

## Content Collections

- Blog posts live in `src/content/blog/<post-slug>/index.md`.
- Project pages live in `src/content/projects/<project-slug>/index.md`.
- Log entries live in `src/content/log/<entry-slug>/index.md`.

Most content files start with frontmatter between `---` lines. Edit fields such as `title`, `summary`, `date`, `tags`, `technologies`, and `link` there.

## Local Check

Preview locally:

```bash
corepack pnpm run dev -- --host 127.0.0.1
```

Run the full check before deploying:

```bash
corepack pnpm run build
```

If the build passes, the site is in a good state to deploy.
