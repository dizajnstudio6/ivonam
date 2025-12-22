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

(function(){
  try{
    // 1) Remove any previous temporary style we added
    ['moje-usluge-override','moje-usluge-temp','moje-usluge-debug'].forEach(id=>{
      const s = document.getElementById(id);
      if(s) s.remove();
    });
    // Also remove any <style> that includes a known marker text (best-effort)
    document.querySelectorAll('style').forEach(s=>{
      const t = s.textContent || '';
      if(t.includes('Original Moje usluge') || t.includes('MOJE USLUGE') || t.includes('STRONG OVERRIDE: Restore original MOJE USLUGE')) s.remove();
    });

    // 2) Inject safe, focused CSS for .services-page only (no global changes)
    const css = `
/* Injected: focused Moje usluge CSS override (only layout/text/hover for services) */
html body .services-page { padding:90px 8% 140px !important; position:relative !important; background-image: url('/images/mojeusluge.jpg') !important; background-size: cover !important; background-position: center center !important; background-attachment: fixed !important; }
html body .services-page h2 { font-size:56px !important; text-align:center !important; color:#fff !important; z-index:2 !important; margin-bottom:40px !important; }
html body .services-page .services-grid { display:grid !important; grid-template-columns: repeat(4, 1fr) !important; gap:20px !important; align-items:stretch !important; position:relative !important; z-index:2 !important; max-width:1400px !important; margin:0 auto !important; }
html body .services-page .services-grid .service-card { position:relative !important; overflow:hidden !important; background:#fff !important; border-radius:8px !important; border:1px solid rgba(0,0,0,0.04) !important; padding:0 !important; height:300px !important; box-sizing:border-box !important; }
html body .services-page .services-grid .service-card .service-text { position:absolute !important; inset:0 !important; z-index:2 !important; background:rgba(255,255,255,0.92) !important; padding:30px 20px !important; display:flex !important; flex-direction:column !important; justify-content:center !important; align-items:center !important; text-align:center !important; transition:opacity .35s ease !important; }
html body .services-page .services-grid .service-card h3 { font-size:20px !important; margin:0 0 10px 0 !important; color:#000 !important; }
html body .services-page .services-grid .service-card p { font-size:16px !important; line-height:1.5 !important; margin:0 !important; color:#000 !important; }
html body .services-page .services-grid .service-card .service-img { position:absolute !important; top:0 !important; left:0 !important; width:100% !important; height:100% !important; z-index:1 !important; opacity:0 !important; transition:opacity .4s ease !important; overflow:hidden !important; pointer-events:none !important; }
html body .services-page .services-grid .service-card .service-img img { width:100% !important; height:100% !important; object-fit:cover !important; display:block !important; }
html body .services-page .services-grid .service-card:hover { transform:translateY(-8px) !important; transition:transform 220ms ease !important; }
html body .services-page .services-grid .service-card:hover .service-text { opacity:0 !important; }
html body .services-page .services-grid .service-card:hover .service-img { opacity:1 !important; }
/* Responsive fallbacks */
@media (max-width:1024px){ html body .services-page .services-grid { grid-template-columns: repeat(3,1fr) !important; } html body .services-page .services-grid .service-card { height:280px !important; } }
@media (max-width:768px){ html body .services-page .services-grid { grid-template-columns: repeat(2,1fr) !important; } html body .services-page .services-grid .service-card { height:260px !important; } }
@media (max-width:480px){ html body .services-page .services-grid { grid-template-columns:1fr !important; } html body .services-page .services-grid .service-card { height:220px !important; padding:18px 14px !important; } }
`;
    const styleEl = document.createElement('style');
    styleEl.id = 'moje-usluge-override';
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);

    // 3) DOM check & fix: unwrap nested .service-card elements if necessary
    const grid = document.querySelector('.services-page .services-grid');
    if(!grid){
      console.error('No .services-page .services-grid found on this page. Make sure the section exists in markup.');
      return;
    }
    const direct = grid.querySelectorAll(':scope > .service-card');
    const all = grid.querySelectorAll('.service-card');
    console.log('services-grid children — direct:', direct.length, 'total .service-card in subtree:', all.length);

    if(all.length === 0){
      console.warn('No .service-card elements found inside .services-grid.');
    } else if(all.length > direct.length){
      // Move nested .service-card elements to be direct children (preserve order as found)
      const cards = Array.from(all);
      cards.forEach(card=>{
        if(card.parentElement !== grid){
          grid.appendChild(card); // moves node to be direct child
        }
      });
      console.log('Moved nested .service-card elements to be direct children of .services-grid.');
    } else {
      console.log('No nested .service-card elements detected.');
    }

    // Re-count
    const directAfter = grid.querySelectorAll(':scope > .service-card').length;
    console.log('After fix, direct children count:', directAfter);

    // Gather some diagnostics for you to check visually
    const first = grid.querySelector(':scope > .service-card');
    if(first){
      const r = first.getBoundingClientRect();
      console.log('First card size (px) — width:', Math.round(r.width), 'height:', Math.round(r.height));
      const cs = window.getComputedStyle(first);
      console.log('Computed padding (top/right/bottom/left):', cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft);
    }

    // Copy corrected grid HTML to clipboard for you to paste permanently
    try{
      copy(grid.outerHTML);
      console.log('Corrected .services-grid outerHTML copied to clipboard. Paste into your template to make permanent.');
    }catch(e){
      console.log('Unable to copy to clipboard automatically. Inspect grid.outerHTML manually:', grid.outerHTML.slice(0,1000)+'...');
    }

    console.log('Done — check the page now. If it still looks wrong, paste here the output logs you see above (counts/sizes), or paste the current grid.outerHTML that was copied.');
  }catch(err){
    console.error('Script error:', err);
  }
})(); 

(function(){
  const btn = document.querySelector('.hamburger-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if(!btn || !menu) { console.warn('hamburger or mobile menu element not found:', !!btn, !!menu); return; }
  btn.addEventListener('click', ()=> {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  });
  console.log('Temporary hamburger click-handler added. Click the hamburger to open/close mobile menu.');
})();

