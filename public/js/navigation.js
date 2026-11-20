(() => {
  if (window.PortfolioNavigation) return;
  window.PortfolioNavigation = true;

  const SCROLL_THRESHOLD = 12;

  const getHeader = () => document.querySelector("[data-site-header]");

  // The page keys are a drop-down below 768px. The header reads this state.

  function setOpen(open, { refocus = false } = {}) {
    const header = getHeader();
    const toggle = header?.querySelector("[data-toggle-nav]");
    if (!header || !toggle) return;

    header.toggleAttribute("data-nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (refocus) toggle.focus();
  }

  const isOpen = () => getHeader()?.hasAttribute("data-nav-open") ?? false;

  function syncScroll() {
    getHeader()?.toggleAttribute(
      "data-scrolled",
      window.scrollY > SCROLL_THRESHOLD,
    );
  }

  // Delegated on document, so the listeners survive client-side page swaps.

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-toggle-nav]")) {
      setOpen(!isOpen());
    } else if (isOpen() && !event.target.closest("#nav-menu")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) setOpen(false, { refocus: true });
  });

  window.addEventListener("scroll", syncScroll, { passive: true });

  document.addEventListener("astro:page-load", () => {
    setOpen(false);
    syncScroll();
  });

  syncScroll();
})();
