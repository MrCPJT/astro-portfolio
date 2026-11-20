// Giscus comments. Each container is mounted once, and the iframe follows the
// site theme.

import { THEME_CHANGE_EVENT, type Theme } from "./theme";

const CONTAINER_SELECTOR = "[data-giscus-comments]";
const MOUNTED_ATTRIBUTE = "data-giscus-mounted";
const PLACEHOLDER_PREFIX = "TODO_REPLACE_WITH_";
const GISCUS_ORIGIN = "https://giscus.app";

// Giscus attribute, the container's dataset key, and the fallback value.

const OPTIONS: [attribute: string, key: string, fallback?: string][] = [
  ["data-repo", "repo"],
  ["data-repo-id", "repoId"],
  ["data-category", "category"],
  ["data-category-id", "categoryId"],
  ["data-mapping", "mapping", "pathname"],
  ["data-strict", "strict", "0"],
  ["data-reactions-enabled", "reactionsEnabled", "1"],
  ["data-emit-metadata", "emitMetadata", "0"],
  ["data-input-position", "inputPosition", "bottom"],
  ["data-lang", "lang", "en"],
  ["data-loading", "loading", "lazy"],
];

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function isConfigured(container: HTMLElement): boolean {
  const { repoId = "", categoryId = "" } = container.dataset;

  return (
    repoId !== "" &&
    categoryId !== "" &&
    !repoId.startsWith(PLACEHOLDER_PREFIX) &&
    !categoryId.startsWith(PLACEHOLDER_PREFIX)
  );
}

function createGiscusScript(container: HTMLElement): HTMLScriptElement {
  const script = document.createElement("script");

  script.src = `${GISCUS_ORIGIN}/client.js`;
  script.async = true;
  script.crossOrigin = "anonymous";

  for (const [attribute, key, fallback = ""] of OPTIONS) {
    script.setAttribute(attribute, container.dataset[key] || fallback);
  }
  script.setAttribute("data-theme", currentTheme());

  return script;
}

function mountComments() {
  document
    .querySelectorAll<HTMLElement>(CONTAINER_SELECTOR)
    .forEach((container) => {
      if (container.hasAttribute(MOUNTED_ATTRIBUTE)) return;
      if (!isConfigured(container)) return;

      container.setAttribute(MOUNTED_ATTRIBUTE, "");
      container.replaceChildren(createGiscusScript(container));
    });
}

function updateGiscusTheme(theme: Theme) {
  document
    .querySelectorAll<HTMLIFrameElement>("iframe.giscus-frame")
    .forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme, lang: "en" } } },
        GISCUS_ORIGIN,
      );
    });
}

document.addEventListener("astro:page-load", mountComments);

window.addEventListener(THEME_CHANGE_EVENT, (event) => {
  const theme = (event as CustomEvent<{ theme?: Theme }>).detail?.theme;
  updateGiscusTheme(theme ?? currentTheme());
});

mountComments();
