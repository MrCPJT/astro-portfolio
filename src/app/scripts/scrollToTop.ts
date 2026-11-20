// Scroll-to-top button. It shows once the page has scrolled past the threshold.

const BUTTON_SELECTOR = "[data-scroll-to-top]";
const SHOW_THRESHOLD = 400;
const HIDDEN_CLASSES = ["invisible", "opacity-0"];

function updateVisibility() {
  const button = document.querySelector(BUTTON_SELECTOR);
  if (!button) return;

  const hide = window.scrollY <= SHOW_THRESHOLD;
  HIDDEN_CLASSES.forEach((name) => button.classList.toggle(name, hide));
}

window.addEventListener("scroll", updateVisibility, { passive: true });
document.addEventListener("astro:page-load", updateVisibility);

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest(BUTTON_SELECTOR)) return;

  window.scrollTo({ top: 0, behavior: "smooth" });
});
