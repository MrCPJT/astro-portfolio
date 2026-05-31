(() => {
  const SELECTOR = "[data-giscus-comments]";
  const PLACEHOLDER_PREFIX = "TODO_REPLACE_WITH_";

  function getTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  function isConfigured(container) {
    const repoId = container.dataset.repoId || "";
    const categoryId = container.dataset.categoryId || "";

    return (
      repoId &&
      categoryId &&
      !repoId.startsWith(PLACEHOLDER_PREFIX) &&
      !categoryId.startsWith(PLACEHOLDER_PREFIX)
    );
  }

  function clearContainer(container) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  }

  function createGiscusScript(container) {
    const script = document.createElement("script");

    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", container.dataset.repo);
    script.setAttribute("data-repo-id", container.dataset.repoId);
    script.setAttribute("data-category", container.dataset.category);
    script.setAttribute("data-category-id", container.dataset.categoryId);
    script.setAttribute(
      "data-mapping",
      container.dataset.mapping || "pathname",
    );
    script.setAttribute("data-strict", container.dataset.strict || "0");
    script.setAttribute(
      "data-reactions-enabled",
      container.dataset.reactionsEnabled || "1",
    );
    script.setAttribute(
      "data-emit-metadata",
      container.dataset.emitMetadata || "0",
    );
    script.setAttribute(
      "data-input-position",
      container.dataset.inputPosition || "bottom",
    );
    script.setAttribute("data-theme", getTheme());
    script.setAttribute("data-lang", container.dataset.lang || "en");
    script.setAttribute("data-loading", container.dataset.loading || "lazy");

    return script;
  }

  function updateGiscusTheme(theme = getTheme()) {
    document.querySelectorAll("iframe.giscus-frame").forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme,
              lang: "en",
            },
          },
        },
        "https://giscus.app",
      );
    });
  }

  function mountComments() {
    document.querySelectorAll(SELECTOR).forEach((container) => {
      clearContainer(container);

      if (!isConfigured(container)) {
        return;
      }

      container.append(createGiscusScript(container));
    });
  }

  if (!window.PortfolioComments) {
    window.PortfolioComments = {
      mount: mountComments,
      updateTheme: updateGiscusTheme,
    };

    document.addEventListener("astro:page-load", mountComments);
    window.addEventListener("portfolio:theme-change", (event) => {
      updateGiscusTheme(event.detail?.theme);
    });
  }

  mountComments();
})();
