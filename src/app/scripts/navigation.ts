// Header state. The page keys are a drop-down below 768px, and the fox swaps
// to its head on a key once the page scrolls. Both states are attributes on
// the header, which a client-side page swap replaces, so each page starts
// closed and re-reads the scroll position.
//
// The scroll state follows a sentinel at the top of the page, so it stays
// right when the page moves without a scroll event.

const HEADER_SELECTOR = "[data-site-header]";
const TOGGLE_SELECTOR = "[data-toggle-nav]";
const MENU_SELECTOR = "#nav-menu";
const SENTINEL_SELECTOR = "[data-scroll-sentinel]";
const OPEN_ATTRIBUTE = "data-nav-open";
const SCROLLED_ATTRIBUTE = "data-scrolled";

const getHeader = () => document.querySelector<HTMLElement>(HEADER_SELECTOR);

const isOpen = () => getHeader()?.hasAttribute(OPEN_ATTRIBUTE) ?? false;

function setOpen(open: boolean, { refocus = false } = {}) {
  const header = getHeader();
  const toggle = header?.querySelector<HTMLElement>(TOGGLE_SELECTOR);
  if (!header || !toggle) return;

  header.toggleAttribute(OPEN_ATTRIBUTE, open);
  toggle.setAttribute("aria-expanded", String(open));
  if (refocus) toggle.focus();
}

function setScrolled(scrolled: boolean) {
  getHeader()?.toggleAttribute(SCROLLED_ATTRIBUTE, scrolled);
}

const topObserver = new IntersectionObserver((entries) => {
  const entry = entries.at(-1);
  if (entry?.target.isConnected) setScrolled(!entry.isIntersecting);
});

// Reads the position at once, so a swapped-in page is right on its first
// frame, then follows the page's sentinel.

function watchTop() {
  const sentinel = document.querySelector(SENTINEL_SELECTOR);
  topObserver.disconnect();
  if (!sentinel) return;

  setScrolled(sentinel.getBoundingClientRect().bottom < 0);
  topObserver.observe(sentinel);
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  if (event.target.closest(TOGGLE_SELECTOR)) {
    setOpen(!isOpen());
  } else if (isOpen() && !event.target.closest(MENU_SELECTOR)) {
    setOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isOpen()) setOpen(false, { refocus: true });
});

document.addEventListener("astro:after-swap", watchTop);

watchTop();
