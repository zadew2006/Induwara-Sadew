const header = document.querySelector('.site-header');
const glow = document.querySelector('.cursor-glow');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

document.addEventListener('pointermove', (e) => {
  glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!open));
  nav.style.display = open ? '' : 'flex';
  if (!open) {
    nav.style.position = 'absolute';
    nav.style.top = '70px';
    nav.style.left = '20px';
    nav.style.right = '20px';
    nav.style.flexDirection = 'column';
    nav.style.padding = '20px';
    nav.style.background = 'rgba(10,12,15,.96)';
    nav.style.border = '1px solid rgba(255,255,255,.1)';
    nav.style.borderRadius = '16px';
  }
});

document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 950) {
    menuBtn.setAttribute('aria-expanded', 'false');
    nav.style.display = 'none';
  }
}));

document.getElementById('year').textContent = new Date().getFullYear();

// Lightweight tilt on desktop for the portrait.
const visual = document.querySelector('.hero-visual');
const photo = document.querySelector('.photo-wrap');
if (visual && photo && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('pointermove', (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    photo.style.transform = `rotate(2deg) rotateY(${x * 6}deg) rotateX(${y * -5}deg)`;
  });
  visual.addEventListener('pointerleave', () => photo.style.transform = 'rotate(2deg)');
}
