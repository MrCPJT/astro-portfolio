---
title: "Building a Data Science Portfolio"
summary: "An overview of the Astro portfolio build: structure, design decisions, theme choices, and how the site evolved."
date: 2026-05-31
tags: ["portfolio", "astro", "web design"]
categories: "meta"
draft: false
---

# Building a Data Science Portfolio

This site started as a fairly practical idea: I wanted a single place for projects, writing, notebooks, and a resume. The first version of that idea was mostly about collecting material. Over time, though, the more interesting problem became the site itself: how should a technical portfolio feel, how should it be structured, and how much design should sit between a reader and the work?

I built the portfolio with Astro because it fits that shape well. Most of the site is content-led and static, but it still benefits from components, typed content collections, reusable layouts, and small interactive touches. Astro gives the site enough structure to grow without making the simple pages feel like an application pretending to be a document.

## Starting point

The earliest version was a conventional portfolio: a home page, a projects page, a blog, and a resume download. That was useful, but it also created some redundancy. The About page and Resume page were both drifting toward the same purpose, listing skills, experience, and education in slightly different ways.

That led to the first major design decision: give every section a distinct job.

- **Home** acts as the front door, giving a quick sense of the site and pointing to the most useful areas.
- **Projects** holds the case-study style work, where the detail belongs.
- **Blog** is for design notes, modelling write-ups, workflow decisions, and more reflective technical writing.
- **Resume** is the structured professional snapshot, including the PDF and the component version of the same information.
- **About** is intentionally more personal, leaving room for a less formal account of how I think and what I care about.

That split made the navigation feel less like a list of pages and more like an information architecture.

## Layout choices

The layout is deliberately narrow and readable. The main content column uses a restrained max width, fixed top navigation, and simple vertical spacing. For a portfolio like this, the page should not compete with the project write-ups or blog posts. The design needs to be present enough to feel cared for, but quiet enough that the reader can skim, compare, and move around easily.

Astro components help keep that layout consistent. The shared layout wraps pages in the same header, footer, metadata handling, and content width. Smaller components then carry repeated structures such as project cards, tags, timeline entries, and section headings.

## Theme and colour

The colour system uses CSS custom properties for the major surfaces and text states. Light mode is built around a clean slate background with white content surfaces, dark readable text, teal as the main action colour, and blue as a secondary accent. Dark mode keeps the same relationships but shifts the palette into deeper blues, softer borders, and brighter teal links.

That approach keeps the theme easy to reason about. Rather than scattering one-off Tailwind colours through the site, the main decisions live in a small set of variables:

- background and surface colours
- primary and accent colours
- muted text and borders
- focus and hover states

The goal is not to create a loud personal brand. It is to make a calm technical reading environment with enough colour to guide attention.

## Content as the centre

The site uses Astro content collections for blog posts, logs, and projects. That keeps the content portable and makes each entry feel like a document first. A project can have frontmatter for dates, technologies, domains, and links, while the body stays focused on the actual narrative.

That separation is useful for a data science portfolio because the same material often needs to appear at different levels of detail. A project card can show the title, summary, and tools. The project page can tell the full story. A resume section can point to selected work without duplicating every detail.

## Where it is going

The current version is still an evolving system. The next steps are less about adding more pages and more about sharpening what is already here: stronger project narratives, clearer notebook-derived posts, better cross-linking between projects and write-ups, and a more personal About page.

The useful lesson so far is that a portfolio is not just a container for work. It is itself a design problem: what to foreground, what to separate, what to repeat, and what to leave quiet.
