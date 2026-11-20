// Mobile nav toggle. The open state lives in aria-expanded on the button, so a
// client-side page swap starts closed with no reset needed.

const TOGGLE_SELECTOR = "[data-toggle-nav]";
const MENU_SELECTOR = "[data-nav-menu]";

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const toggle = event.target.closest(TOGGLE_SELECTOR);
  const menu = document.querySelector<HTMLElement>(MENU_SELECTOR);
  if (!toggle || !menu) return;

  const expand = toggle.getAttribute("aria-expanded") !== "true";

  menu.style.maxHeight = expand ? `${menu.scrollHeight}px` : "0";
  toggle.setAttribute("aria-expanded", String(expand));
});
