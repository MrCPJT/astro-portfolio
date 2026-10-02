// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import { rehypeProjectSections } from "./src/app/utils/rehypeProjectSections.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://cpjt.dev",

  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    tailwind({ applyBaseStyles: false }),
    pagefind(),
  ],
  markdown: {
    rehypePlugins: [rehypeProjectSections],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
