document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }
});
