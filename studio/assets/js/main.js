const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navPanel = document.querySelector('[data-nav-panel]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navPanel?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const hero = document.querySelector('.hero');
const parallaxItems = document.querySelectorAll('.paper-stack, .orb');
window.addEventListener('scroll', () => {
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = hero.getBoundingClientRect();
  const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
  parallaxItems.forEach((item, index) => {
    const depth = (index + 1) * 10;
    item.style.translate = `0 ${progress * depth}px`;
  });
}, { passive: true });
