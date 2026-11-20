// Site search dialog, backed by the Pagefind index that the build writes.

const PAGEFIND_URL = "/pagefind/pagefind.js";
const PAGE_SIZE = 10;
const DEBOUNCE_MS = 150;

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta?: { title?: string };
}

interface PagefindResult {
  data: () => Promise<PagefindResultData>;
}

interface PagefindSearch {
  results: PagefindResult[];
}

interface Pagefind {
  debouncedSearch: (
    term: string,
    options: object,
    debounceMs: number,
  ) => Promise<PagefindSearch | null>;
}

let pagefind: Pagefind | null = null;

// The index only exists in a built site, so Vite must not resolve this import.

async function loadPagefind(): Promise<Pagefind> {
  pagefind ??= (await import(/* @vite-ignore */ PAGEFIND_URL)) as Pagefind;
  return pagefind;
}

function buildItem(data: PagefindResultData): HTMLLIElement {
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
}

function countText(count: number, term: string): string {
  if (count === 0) return `No results for "${term}"`;
  return `${count} ${count === 1 ? "result" : "results"} for "${term}"`;
}

class SiteSearch extends HTMLElement {
  // Aborted on disconnect, so listeners on window do not outlive the element.

  private listeners = new AbortController();

  connectedCallback() {
    const openBtn = this.querySelector<HTMLButtonElement>(
      "button[data-open-modal]",
    );
    const dialog = this.querySelector("dialog");
    const input = this.querySelector<HTMLInputElement>(".site-search-input");
    const status = this.querySelector<HTMLElement>(".site-search-status");
    const list = this.querySelector<HTMLElement>(".site-search-results");
    const moreBtn = this.querySelector<HTMLButtonElement>(".site-search-more");

    if (!openBtn || !dialog || !input || !status || !list || !moreBtn) {
      console.warn("Required elements not found in site-search component");
      return;
    }

    this.listeners = new AbortController();

    let latest = 0;
    let current: PagefindSearch | null = null;
    let shown = 0;

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
      const search = current;
      if (!search) return;

      const id = latest;
      const next = await Promise.all(
        search.results
          .slice(shown, shown + PAGE_SIZE)
          .map((result) => result.data()),
      );
      if (id !== latest) return;

      list.append(...next.map(buildItem));
      shown += next.length;
      moreBtn.hidden = shown >= search.results.length;
    });

    input.addEventListener("input", runSearch);

    input.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;

      const first = list.querySelector("a");
      if (first) {
        event.preventDefault();
        first.focus();
      }
    });

    list.addEventListener("keydown", (event) => {
      const links = [...list.querySelectorAll("a")];
      const index = links.findIndex((link) => link === document.activeElement);
      if (index === -1) return;

      if (event.key === "ArrowDown" && links[index + 1]) {
        event.preventDefault();
        links[index + 1].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
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

    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      const outside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

      if (outside) closeModal();
    });

    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeModal();
    });

    openBtn.addEventListener("click", openModal);
    openBtn.disabled = false;

    window.addEventListener(
      "keydown",
      (event) => {
        if (!(event.metaKey || event.ctrlKey) || event.key !== "k") return;

        event.preventDefault();
        if (dialog.open) closeModal();
        else openModal();
      },
      { signal: this.listeners.signal },
    );
  }

  disconnectedCallback() {
    this.listeners.abort();
  }
}

customElements.define("site-search", SiteSearch);
