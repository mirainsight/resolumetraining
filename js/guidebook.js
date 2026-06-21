// Resolume Training Guidebook — shared interactivity (vanilla JS, no deps)

document.addEventListener("DOMContentLoaded", () => {
  initProgressBar();
  initCollapsibleCallouts();
  initScrollspy();
});

// Thin top progress bar reflecting scroll position through the page.
function initProgressBar() {
  const bar = document.querySelector(".progress-bar");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    bar.style.width = pct + "%";
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

// "Advanced" callouts start collapsed; click the header to expand/collapse.
function initCollapsibleCallouts() {
  document.querySelectorAll(".callout.advanced").forEach((callout) => {
    const toggle = callout.querySelector(".callout-toggle");
    const body = callout.querySelector(".callout-body");
    if (!toggle || !body) return;

    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const isOpen = callout.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0px";
    });
  });
}

// Highlights the current subsection in the sticky sidebar TOC as the reader scrolls.
function initScrollspy() {
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (!tocLinks.length) return;

  const sections = Array.from(tocLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
