(function () {
  const COPYRIGHT_TEXT = (year) => `© ${year} Backyard Studio. All artwork, designs, and written reflections are protected by copyright and may not be reproduced, distributed, or downloaded without permission.`;

  function syncFooterNotices() {
    const year = 2025;

    document.querySelectorAll('#year').forEach((node) => {
      node.textContent = String(year);
    });

    document.querySelectorAll('footer').forEach((footer) => {
      const notices = footer.querySelectorAll('.footer-copyright-notice');
      const notice = notices[0] || document.createElement('p');

      if (!notices.length) {
        notice.className = 'footer-copyright-notice';
        footer.appendChild(notice);
      }

      notices.forEach((extraNotice, index) => {
        if (index > 0) extraNotice.remove();
      });
      notice.textContent = COPYRIGHT_TEXT(year);
    });
  }

  function ensureToast() {
    let toast = document.querySelector('.bstoast');
    if (toast) return toast;

    toast = document.createElement('div');
    toast.className = 'bstoast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'Backyard Studio © This artwork is protected.';
    document.body.appendChild(toast);
    return toast;
  }

  let toastTimer;
  function showToast() {
    const toast = ensureToast();
    window.clearTimeout(toastTimer);
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1800);
  }

  function withinProtectedMedia(target) {
    return target.closest('.protected-media');
  }

  function isProtectedTarget(target) {
    if (target.closest('.portfolio-media')) return true;
    if (target.matches('img')) return true;
    return false;
  }

  document.addEventListener('contextmenu', (event) => {
    if (!withinProtectedMedia(event.target)) return;
    if (!isProtectedTarget(event.target)) return;
    event.preventDefault();
    showToast();
  });

  document.addEventListener('dragstart', (event) => {
    if (!withinProtectedMedia(event.target)) return;
    if (!(event.target.matches('img') || event.target.closest('.portfolio-media'))) return;
    event.preventDefault();
  });

  syncFooterNotices();
})();
