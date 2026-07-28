const header = document.querySelector('[data-header]');
const revealItems = document.querySelectorAll('.reveal');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};     
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
  }, { threshold: 0.18 });

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item) => observer.observe(item));
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
