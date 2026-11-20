// Theme toggle. The inline script in Layout.astro sets the theme before first
// paint; this module handles clicks and re-applies the theme after each
// client-side page swap, which replaces the <html> attributes.

export type Theme = "dark" | "light";

export const THEME_CHANGE_EVENT = "portfolio:theme-change";

const STORAGE_KEY = "theme";
const TOGGLE_SELECTOR = "[data-theme-toggle]";
const SWITCHING_CLASS = "theme-switching";
const SWITCHING_MS = 100;

function preferredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme: Theme, { persist = true, notify = true } = {}) {
  const root = document.documentElement;
  const isDark = theme === "dark";

  // Transitions are suspended for the switch so every element changes together.

  root.classList.add(SWITCHING_CLASS);
  root.classList.toggle("dark", isDark);
  root.dataset.theme = theme;
  setTimeout(() => root.classList.remove(SWITCHING_CLASS), SWITCHING_MS);

  if (persist) localStorage.setItem(STORAGE_KEY, theme);

  document.querySelectorAll(TOGGLE_SELECTOR).forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
  });

  if (notify) {
    window.dispatchEvent(
      new CustomEvent<{ theme: Theme }>(THEME_CHANGE_EVENT, {
        detail: { theme },
      }),
    );
  }
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest(TOGGLE_SELECTOR)) return;

  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

document.addEventListener("astro:after-swap", () => {
  setTheme(preferredTheme(), { persist: false });
});

setTheme(preferredTheme(), { persist: false, notify: false });
