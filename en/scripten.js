// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("fade");
    setTimeout(() => loader.remove(), 500);
  }
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navMenu.classList.remove("active"));
  });
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });
document.querySelectorAll(".work-item, .studio-card, .contact-card").forEach(el => obs.observe(el));

// To top
const toTop = document.getElementById("toTop");
if (toTop) {
  window.addEventListener("scroll", () => { toTop.style.display = window.scrollY > 400 ? "flex" : "none"; });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Studio slider
const studioTrack = document.getElementById("studioTrack");
const studioPrev = document.getElementById("studioPrev");
const studioNext = document.getElementById("studioNext");
if (studioTrack && studioPrev && studioNext) {
  const cardWidth = 300;
  studioPrev.addEventListener("click", () => {
    studioTrack.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
  studioNext.addEventListener("click", () => {
    studioTrack.scrollBy({ left: cardWidth, behavior: "smooth" });
  });
}

// Design Studio — klik prikazuje tekst (umesto hover na touch do 400px), strelice za navigaciju
document.querySelectorAll(".studio-card:not(.studio-link)").forEach(card => {
  card.addEventListener("click", function (e) {
    if (window.matchMedia("(max-width: 400px)").matches) {
      e.preventDefault();
      const wasActive = this.classList.contains("active");
      document.querySelectorAll(".studio-card.active").forEach(c => c.classList.remove("active"));
      if (!wasActive) this.classList.add("active");
    }
  });
});

// CV download — samo jedna putanja, bez duplog preuzimanja
document.querySelectorAll('.about-cv').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    const a = document.createElement('a');
    a.href = href;
    a.download = href.split('/').pop() || 'cv.pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

// Smooth scroll — sekcija tačno ispod navigacije, cela vidljiva u okviru ekrana
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const nav = document.querySelector(".nav");
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  });
});
