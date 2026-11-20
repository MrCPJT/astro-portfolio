// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import pagefind from "astro-pagefind";
import { rehypeProjectSections } from "./src/app/utils/rehypeProjectSections.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://cpjt.dev",

  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },

  // Keeps the space between adjacent inline elements.

  compressHTML: true,

  integrations: [mdx(), sitemap(), solidJs(), pagefind()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeProjectSections],
    }),
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
