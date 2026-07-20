// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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

// Close menu on link click
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
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ===========================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// ===========================
const revealItems = document.querySelectorAll(
  '.about-card, .skill-item, .project-card, .fp-card, .contact-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'translateY(28px)';
  item.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(item);
});

// ===========================
// CONTACT FORM TOAST
// ===========================
function handleSubmit(e) {
  e.preventDefault();
  showToast('✉️ Pesan terkirim! Saya akan segera menghubungi kamu.');
  e.target.reset();
}

function showToast(message) {
  // Create or reuse toast
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

// ===========================
// SMOOTH SCROLL OFFSET (fixed navbar)
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 76;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
