// ===========================
// PROJECT FILTER TABS
// ===========================
const projTabs  = document.querySelectorAll('.proj-tab');
const projCards = document.querySelectorAll('.project-card[data-category]');

projTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    projTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');
    projCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===========================
// DARK MODE TOGGLE
// ===========================
const html        = document.documentElement;
const darkToggle  = document.getElementById('darkToggle');
const darkIcon    = document.getElementById('darkIcon');

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateDarkIcon(savedTheme);

darkToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateDarkIcon(next);
});

function updateDarkIcon(theme) {
  darkIcon.className = theme === 'dark'
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNavLink();
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealItems = document.querySelectorAll(
  '.about-card, .skill-item, .project-card, .fp-card, .contact-item, ' +
  '.its-service-card, .its-tool-item, .its-highlight, .cert-card, .cv-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.style.opacity    = '0';
  item.style.transform  = 'translateY(28px)';
  item.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(item);
});

// ===========================
// SMOOTH SCROLL (fixed navbar offset)
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===========================
// CERTIFICATE MODAL
// ===========================
const certFiles = {
  cert1: 'files/sertifikat-1.pdf',
  cert2: 'files/sertifikat-2.pdf',
  cert3: 'files/sertifikat-3.pdf',
};

const certModal      = document.getElementById('certModal');
const certFrame      = document.getElementById('certFrame');
const certModalClose = document.getElementById('certModalClose');

function openCertModal(key) {
  certFrame.src = certFiles[key] || '';
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => {
  if (e.target === certModal) closeCertModal();
});
function closeCertModal() {
  certModal.classList.remove('open');
  certFrame.src = '';
  document.body.style.overflow = '';
}

// ===========================
// CV MODAL
// ===========================
const cvModal      = document.getElementById('cvModal');
const cvModalClose = document.getElementById('cvModalClose');

function openCVModal() {
  cvModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

cvModalClose.addEventListener('click', closeCVModal);
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) closeCVModal();
});
function closeCVModal() {
  cvModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
    closeCVModal();
  }
});

// ===========================
// TOAST
// ===========================
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
