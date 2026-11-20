// Header state. The page keys are a drop-down below 768px, and the fox swaps
// to its head on a key once the page scrolls. Both states are attributes on
// the header, which a client-side page swap replaces, so each page starts
// closed and re-reads the scroll position.

const HEADER_SELECTOR = "[data-site-header]";
const TOGGLE_SELECTOR = "[data-toggle-nav]";
const MENU_SELECTOR = "#nav-menu";
const OPEN_ATTRIBUTE = "data-nav-open";
const SCROLLED_ATTRIBUTE = "data-scrolled";
const SCROLL_THRESHOLD = 12;

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

function syncScroll() {
  getHeader()?.toggleAttribute(
    SCROLLED_ATTRIBUTE,
    window.scrollY > SCROLL_THRESHOLD,
  );
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

window.addEventListener("scroll", syncScroll, { passive: true });
document.addEventListener("astro:page-load", syncScroll);

syncScroll();
