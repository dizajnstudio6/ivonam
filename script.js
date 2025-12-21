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
