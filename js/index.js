/* =====================================================
   DUI.DEV — MAIN SCRIPT
   Author: Dui
   ===================================================== */

'use strict';

/* =====================================================
   1. NAVBAR LOADER
   Mengisi <div id="navbar"> dengan struktur navbar
   ===================================================== */
function loadNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <a href="#hero" class="nav__logo">Dui.Dev</a>

    <ul class="nav__menu">terminal
      <li><a href="#about"      class="nav__link">About</a></li>
      <li><a href="#skills"     class="nav__link">Skills</a></li>
      <li><a href="#projects"   class="nav__link">Projects</a></li>
      <li><a href="#experience" class="nav__link">Experience</a></li>
      <li><a href="#contact"    class="nav__link">Contact</a></li>
    </ul>

    <button class="nav__toggle" id="themeToggle" aria-label="Toggle theme">🌙</button>
  `;
}

/* =====================================================
   2. DARK MODE TOGGLE
   Ganti tema light <-> dark, simpan ke localStorage
   ===================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  // Terapkan tema tersimpan (default: light)
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️';
  }

  // Handle klik toggle
  toggleBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';

    if (isDark) {
      root.removeAttribute('data-theme');
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* =====================================================
   3. SMOOTH SCROLL
   Klik link navigasi -> scroll halus ke section
   ===================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* =====================================================
   4. SCROLL ANIMATION (Reveal on Scroll)
   Elemen muncul saat masuk viewport
   ===================================================== */
function initScrollReveal() {
  const sections = document.querySelectorAll('main > section');

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* =====================================================
   5. ACTIVE NAV LINK ON SCROLL
   Menu yang sesuai section aktif akan di-highlight
   ===================================================== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            link.classList.toggle(
              'nav__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: '-80px 0px -40% 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* =====================================================
   6. FOOTER YEAR (auto update tahun)
   ===================================================== */
function initFooterYear() {
  const yearEl = document.querySelector('.site-footer__year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* =====================================================
   7. INIT ALL
   Jalankan semua fungsi setelah DOM siap
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();          // 1. Isi navbar
  initThemeToggle();     // 2. Aktifkan toggle tema
  initSmoothScroll();    // 3. Aktifkan smooth scroll
  initScrollReveal();    // 4. Aktifkan animasi scroll
  initActiveNavLink();   // 5. Aktifkan highlight menu
  initFooterYear();      // 6. Auto tahun di footer

  console.log('%c🚀 Dui.Dev loaded successfully', 'color:#64ffda;font-weight:bold;font-size:14px');
});