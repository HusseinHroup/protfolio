
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = Array.from(document.querySelectorAll(".nav-link"));
const sections = navAnchors
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

document.getElementById("year").textContent = new Date().getFullYear();

function closeMenu() {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navAnchors.forEach(a => {
  a.addEventListener("click", () => closeMenu());
});

// Active section highlighting
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navAnchors.forEach((a) => {
        const href = a.getAttribute("href")?.replace("#", "");
        a.classList.toggle("active", href === id);
      });
    });
  },
  { root: null, threshold: 0.45 }
);

sections.forEach((s) => observer.observe(s));

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (!navLinks.classList.contains("open")) return;
  const target = e.target;
  if (navLinks.contains(target) || navToggle.contains(target)) return;
  closeMenu();
});
