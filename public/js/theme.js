(() => {
  if (window.PortfolioTheme) {
    window.PortfolioTheme.init();
    return;
  }

  const STORAGE_KEY = "theme";
  const BOUND_ATTRIBUTE = "data-theme-toggle-bound";

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme, options = {}) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    const isDark = nextTheme === "dark";
    const { persist = true, notify = true } = options;

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = nextTheme;

    if (persist) {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
    });

    if (notify) {
      window.dispatchEvent(
        new CustomEvent("portfolio:theme-change", {
          detail: { theme: nextTheme },
        }),
      );
    }
  }

  function bindThemeToggles() {
    setTheme(getPreferredTheme(), { persist: false, notify: false });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      if (button.getAttribute(BOUND_ATTRIBUTE) === "true") {
        return;
      }

      button.setAttribute(BOUND_ATTRIBUTE, "true");
      button.addEventListener("click", () => {
        const nextTheme = document.documentElement.classList.contains("dark")
          ? "light"
          : "dark";

        setTheme(nextTheme);
      });
    });
  }

  window.PortfolioTheme = {
    getTheme: getPreferredTheme,
    setTheme,
    init: bindThemeToggles,
  };

  document.addEventListener("astro:page-load", bindThemeToggles);
  document.addEventListener("astro:after-swap", () => {
    setTheme(getPreferredTheme(), { persist: false, notify: true });
  });

  bindThemeToggles();
})();
