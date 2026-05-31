function setTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
  });

  const giscus = document.querySelector("iframe.giscus-frame");
  if (giscus?.contentWindow) {
    giscus.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: isDark ? "dark" : "light",
          },
        },
      },
      "https://giscus.app",
    );
  }
}

function getInitialTheme() {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

setTheme(getInitialTheme());

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    setTheme(nextTheme);
  });
});
