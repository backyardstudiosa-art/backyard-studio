document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }
});
