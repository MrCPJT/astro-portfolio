class SiteSearch extends HTMLElement {
  connectedCallback() {
    const openBtn = this.querySelector("button[data-open-modal]");
    const dialog = this.querySelector("dialog");
    const input = this.querySelector(".site-search-input");
    const status = this.querySelector(".site-search-status");
    const list = this.querySelector(".site-search-results");
    const moreBtn = this.querySelector(".site-search-more");

    if (!openBtn || !dialog || !input || !status || !list || !moreBtn) {
      console.warn("Required elements not found in site-search component");
      return;
    }

    const PAGE_SIZE = 10;
    const DEBOUNCE_MS = 150;

    let pagefind = null;
    let latest = 0;
    let current = null;
    let shown = 0;

    const loadPagefind = async () => {
      pagefind ??= await import("/pagefind/pagefind.js");
      return pagefind;
    };

    const buildItem = (data) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const title = document.createElement("span");
      const excerpt = document.createElement("span");

      link.className = "site-search-result";
      link.href = data.url;
      title.className = "site-search-result-title";
      title.textContent = data.meta?.title || data.url;
      excerpt.className = "site-search-result-excerpt";
      // Pagefind escapes the page text and only adds <mark> tags.
      excerpt.innerHTML = data.excerpt;

      link.append(title, excerpt);
      item.append(link);
      return item;
    };

    const countText = (count, term) => {
      if (count === 0) return `No results for "${term}"`;
      return `${count} ${count === 1 ? "result" : "results"} for "${term}"`;
    };

    const clear = () => {
      latest += 1;
      current = null;
      shown = 0;
      list.replaceChildren();
      list.removeAttribute("aria-busy");
      status.textContent = "";
      moreBtn.hidden = true;
    };

    const runSearch = async () => {
      const term = input.value.trim();
      const id = ++latest;

      if (!term) {
        clear();
        return;
      }

      // The previous results stay on screen, dimmed, until the new ones are ready.
      list.setAttribute("aria-busy", "true");

      try {
        const pf = await loadPagefind();
        const search = await pf.debouncedSearch(term, {}, DEBOUNCE_MS);
        if (search === null || id !== latest) return;

        const page = await Promise.all(
          search.results.slice(0, PAGE_SIZE).map((result) => result.data()),
        );
        if (id !== latest) return;

        current = search;
        shown = page.length;
        list.replaceChildren(...page.map(buildItem));
        list.scrollTop = 0;
        status.textContent = countText(search.results.length, term);
        moreBtn.hidden = shown >= search.results.length;
      } catch (error) {
        if (id !== latest) return;
        console.warn("Search failed", error);
        list.replaceChildren();
        status.textContent =
          "Search is unavailable. It needs a built site, so run a build first.";
        moreBtn.hidden = true;
      } finally {
        if (id === latest) list.removeAttribute("aria-busy");
      }
    };

    moreBtn.addEventListener("click", async () => {
      if (!current) return;

      const id = latest;
      const next = await Promise.all(
        current.results
          .slice(shown, shown + PAGE_SIZE)
          .map((result) => result.data()),
      );
      if (id !== latest) return;

      list.append(...next.map(buildItem));
      shown += next.length;
      moreBtn.hidden = shown >= current.results.length;
    });

    input.addEventListener("input", runSearch);

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        const first = list.querySelector("a");
        if (first) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    list.addEventListener("keydown", (e) => {
      const links = [...list.querySelectorAll("a")];
      const index = links.indexOf(document.activeElement);
      if (index === -1) return;

      if (e.key === "ArrowDown" && links[index + 1]) {
        e.preventDefault();
        links[index + 1].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        (links[index - 1] ?? input).focus();
      }
    });

    const openModal = () => {
      dialog.showModal();
      input.focus();
    };

    const closeModal = () => {
      dialog.close();
      input.value = "";
      clear();
    };

    dialog.addEventListener("click", (e) => {
      const box = dialog.getBoundingClientRect();
      if (
        e.clientX < box.left ||
        e.clientX > box.right ||
        e.clientY < box.top ||
        e.clientY > box.bottom
      ) {
        closeModal();
      }
    });

    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal();
    });

    openBtn.addEventListener("click", openModal);
    openBtn.disabled = false;

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey === true || e.ctrlKey === true) && e.key === "k") {
        e.preventDefault();
        dialog.open ? closeModal() : openModal();
      }
    });
  }
}

customElements.define("site-search", SiteSearch);
