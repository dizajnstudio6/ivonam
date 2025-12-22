// ================= LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// ================= VIDEO FALLBACK =================
window.addEventListener("load", () => {
  const video = document.querySelector(".hero-background-video");
  const fallback = document.getElementById("video-fallback");

  if (video) {
    video.addEventListener("error", () => {
      video.style.display = "none";
      if (fallback) fallback.style.display = "block";
    });
    video.addEventListener("loadeddata", () => {
      if (fallback) fallback.style.display = "none";
    });
    video.addEventListener("canplay", () => {
      if (fallback) fallback.style.display = "none";
    });

    if (video.readyState === 0) {
      setTimeout(() => {
        if (video.readyState === 0) {
          video.style.display = "none";
          if (fallback) fallback.style.display = "block";
        }
      }, 3000);
    }
  }
});

// ================= HERO SLIDER =================
window.addEventListener("load", () => {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
});

// ================= MOUSE IMAGE REVEAL =================
window.addEventListener("load", () => {
  const intro = document.querySelector(".intro-hover");
  if (!intro) return;

  const imgs = document.querySelectorAll(".hover-img");
  if (!imgs.length) return;

  let imgIndex = 0;

  intro.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const img = imgs[imgIndex];
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.opacity = 1;
    img.style.transform = "translate(-50%, -50%) scale(1)";

    imgIndex = (imgIndex + 1) % imgs.length;
  });

  intro.addEventListener("mouseleave", () => {
    imgs.forEach(img => img.style.opacity = 0);
  });
});

// ================= ABOUT SLIDER =================
window.addEventListener("load", () => {
  const aboutSlider = document.querySelector(".about-slider");
  if (!aboutSlider) return;

  const slides = document.querySelectorAll(".slider-slide");
  if (!slides.length) return;

  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentSlide = 0;

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 4000);
});

// ================= TRIVIA SLIDER (SAMO STRELE) =================
window.addEventListener("load", () => {
  const prevBtn = document.getElementById('triviaPrev');
  const nextBtn = document.getElementById('triviaNext');
  const track = document.getElementById('triviaStripTrack');

  if (!prevBtn || !nextBtn || !track) return;

  // Uzmi širinu prve slike + gap
  const slide = track.querySelector('.strip-img');
  const gap = 20;
  const slideWidth = slide.offsetWidth + gap;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
});

// ================= SCROLL TO TOP =================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', function() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// ================= HAMBURGER MENU =================
const hamburgerToggle = document.getElementById('hamburgerToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (hamburgerToggle && mobileMenu) {
  hamburgerToggle.addEventListener('click', function() {
    hamburgerToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburgerToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = hamburgerToggle.contains(event.target);
    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
      hamburgerToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}

(function(){
  const css = `
  /* STRONG OVERRIDE: Restore original MOJE USLUGE visuals (high specificity & !important) */
  html body .services-page {
    padding: 90px 8% 140px !important;
    position: relative !important;
    background: url('../images/mojeusluge.jpg') center/cover no-repeat !important;
    background-attachment: fixed !important;
    background-size: cover !important;
  }
  html body .services-page h2 {
    position: relative !important;
    z-index: 2 !important;
    font-size: 56px !important;
    text-align: center !important;
    margin-bottom: 40px !important;
    color: #fff !important;
  }
  html body .services-page .services-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 20px !important;
    position: relative !important;
    z-index: 2 !important;
    margin: 0 auto !important;
    max-width: 1400px !important;
  }
  html body .services-page .services-grid .service-card {
    border: 1px solid rgba(255,255,255,0.1) !important;
    padding: 30px 20px !important;
    text-align: center !important;
    transition: transform .4s ease, background .4s ease !important;
    position: relative !important;
    overflow: hidden !important;
    min-height: 180px !important;
    height: 300px !important; /* keep original desktop height */
    background: #fff !important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
  }
  html body .services-page .services-grid .service-card .service-text {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 2 !important;
    transition: opacity 0.4s ease !important;
    background: rgba(255,255,255,0.92) !important;
    padding: 30px 20px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
  html body .services-page .services-grid .service-card h3 {
    font-size: 20px !important;
    margin: 0 0 10px 0 !important;
    color: #000 !important;
  }
  html body .services-page .services-grid .service-card p {
    font-size: 16px !important;
    line-height: 1.5 !important;
    margin: 0 !important;
    color: #000 !important;
  }
  html body .services-page .services-grid .service-card .service-img {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 1 !important;
    overflow: hidden !important;
    opacity: 0 !important;
    transition: opacity 0.4s ease !important;
  }
  html body .services-page .services-grid .service-card .service-img img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }
  html body .services-page .services-grid .service-card:hover {
    transform: translateY(-10px) !important;
  }
  html body .services-page .services-grid .service-card:hover .service-text {
    opacity: 0 !important;
  }
  html body .services-page .services-grid .service-card:hover .service-img {
    opacity: 1 !important;
  }
  /* Responsive (keep original responsive breakpoints) */
  @media (max-width: 1024px) {
    html body .services-page .services-grid { grid-template-columns: repeat(3, 1fr) !important; max-width: 1100px !important; }
    html body .services-page .services-grid .service-card { height: 280px !important; min-height: 280px !important; }
  }
  @media (max-width: 768px) {
    html body .services-page .services-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 760px !important; }
    html body .services-page .services-grid .service-card { height: 260px !important; min-height: 260px !important; }
  }
  @media (max-width: 480px) {
    html body .services-page .services-grid { grid-template-columns: 1fr !important; max-width: 420px !important; gap: 16px !important; }
    html body .services-page .services-grid .service-card { height: 220px !important; min-height: 220px !important; padding: 18px 14px !important; }
  }
  `;
  let s = document.getElementById('moje-usluge-override');
  if(s) s.remove();
  s = document.createElement('style');
  s.id = 'moje-usluge-override';
  s.appendChild(document.createTextNode(css));
  document.head.appendChild(s);
  console.log('Original Moje usluge override injected. If this looks right, copy the CSS block into your styles.css permanently.');
})();
