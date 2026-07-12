/**
 * main.js
 * Jason O'Malley Portfolio
 */

// ─── Scroll Progress Indicator ───────────────────────────────────────────────
const scrollThumb = document.getElementById('scrollThumb');

function updateScrollIndicator() {
  if (!scrollThumb) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollThumb.style.height = pct + '%';
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.project-card, .about-block, .about-hero');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── Nav Active State ─────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('nav-active');
    }
  });
}

// ─── Mobile Nav Toggle ────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');

if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
  navLinksList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinksList.classList.remove('open'));
  });
}

// ─── Screening Modal ──────────────────────────────────────────────────────────
const modal = document.getElementById('screeningModal');
const screeningBtn = document.getElementById('screeningBtn');
const modalClose = document.getElementById('modalClose');
const screeningForm = document.getElementById('screeningForm');
const screeningSuccess = document.getElementById('screeningSuccess');

function openModal() {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (screeningBtn) {
  screeningBtn.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

if (screeningForm) {
  screeningForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(screeningForm);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        document.querySelector('.modal-desc').style.display = 'none';
        document.querySelector('.modal-title').style.display = 'none';
        document.querySelector('.modal-eyebrow').style.display = 'none';
        screeningForm.style.display = 'none';
        screeningSuccess.classList.add('is-visible');
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  });
}

// ─── Scroll Event ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  updateScrollIndicator();
  updateActiveNav();
}, { passive: true });

// Init
updateScrollIndicator();
updateActiveNav();

// ─── Contact Modal ────────────────────────────────────────────────────────────
const contactModal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const contactClose = document.getElementById('contactClose');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (contactBtn) contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openContactModal();
});

if (contactClose) contactClose.addEventListener('click', closeContactModal);

if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        document.getElementById('contactDesc').style.display = 'none';
        document.getElementById('contactTitle').style.display = 'none';
        document.querySelector('#contactModal .modal-eyebrow').style.display = 'none';
        contactForm.style.display = 'none';
        contactSuccess.classList.add('is-visible');
      }
    } catch (err) {
      console.error('Contact form error:', err);
    }
  });
}