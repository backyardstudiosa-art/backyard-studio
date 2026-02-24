(async function () {
  const root = document.getElementById('journal-entry');
  if (!root) return;

  const slug = document.body.dataset.slug;
  const res = await fetch('/journal/data.json');
  const entries = await res.json();
  const index = entries.findIndex((item) => item.slug === slug);
  const entry = entries[index];
  if (!entry) return;

  const niceDate = new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const prev = entries[index + 1];
  const next = entries[index - 1];
  document.title = `${entry.title} | New Horizons Journal`;

  root.innerHTML = `
    <img class="entry-hero" src="${entry.featuredImage}" alt="Featured image for ${entry.title}" />
    <p><a class="btn" href="/journal/">← Back to Journal</a></p>
    <h1>${entry.title}</h1>
    <p class="meta">${niceDate} · ${entry.tags.join(' · ')}</p>
    <div class="entry-content">${entry.content.map((p) => `<p>${p}</p>`).join('')}</div>
    <p><button id="share" class="btn" type="button">Share reflection</button></p>
    <p id="share-fallback" class="inline-share" hidden></p>
    <div class="button-row">
      ${prev ? `<a class="btn" href="/journal/${prev.slug}.html">← ${prev.title}</a>` : ''}
      ${next ? `<a class="btn" href="/journal/${next.slug}.html">${next.title} →</a>` : ''}
    </div>
  `;

  const shareBtn = document.getElementById('share');
  const fallback = document.getElementById('share-fallback');
  shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: entry.title, text: entry.excerpt, url });
        return;
      } catch (_) {}
    }

    const encoded = encodeURIComponent(url);
    fallback.hidden = false;
    fallback.innerHTML = `
      <a class="btn" target="_blank" rel="noopener" href="https://wa.me/?text=${encoded}">WhatsApp</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encoded}">Facebook</a>
      <a class="btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${encoded}">X</a>
    `;
  });
})();
