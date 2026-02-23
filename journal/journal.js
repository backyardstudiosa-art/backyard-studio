(function () {
  const entries = (window.journalEntries || []).map((entry) => ({
    ...entry,
    displayDate: new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }));

  function sortNewest(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  function renderLanding() {
    const list = document.querySelector("#entry-list");
    if (!list) return;

    const searchInput = document.querySelector("#journal-search");
    const sortSelect = document.querySelector("#sort-order");
    const tagButtons = Array.from(document.querySelectorAll(".tag-pill"));
    let activeTag = "All";

    function draw() {
      const q = (searchInput.value || "").trim().toLowerCase();
      const sortValue = sortSelect.value;

      let filtered = entries.filter((entry) => {
        const haystack = `${entry.title} ${entry.reflection.join(" ")}`.toLowerCase();
        const tagMatch = activeTag === "All" || entry.tags.includes(activeTag);
        const searchMatch = !q || haystack.includes(q);
        return tagMatch && searchMatch;
      });

      filtered.sort(sortValue === "oldest" ? (a, b) => new Date(a.date) - new Date(b.date) : sortNewest);

      if (!filtered.length) {
        list.innerHTML = '<div class="empty-state">No reflections matched your search yet. Try a different phrase or tag.</div>';
        return;
      }

      list.innerHTML = filtered
        .map(
          (entry) => `
            <article class="card" aria-label="${entry.title}">
              <img src="${entry.image}" alt="Featured image for ${entry.title}" loading="lazy" />
              <div class="card-body">
                <h3>${entry.title}</h3>
                <p class="meta">${entry.displayDate} · ${entry.tags.join(" · ")}</p>
                <p>${entry.excerpt}</p>
                <a class="btn" href="/journal/${entry.slug}/">Read more</a>
              </div>
            </article>
          `
        )
        .join("");
    }

    searchInput.addEventListener("input", draw);
    sortSelect.addEventListener("change", draw);
    tagButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tagButtons.forEach((other) => other.classList.remove("active"));
        btn.classList.add("active");
        activeTag = btn.dataset.tag;
        draw();
      });
    });

    draw();
  }

  function renderDetail() {
    const article = document.querySelector("#journal-article");
    if (!article) return;

    const slug = document.body.dataset.slug;
    const index = entries.findIndex((entry) => entry.slug === slug);
    const entry = entries[index];
    if (!entry) return;

    const prev = entries[index + 1];
    const next = entries[index - 1];
    document.title = `${entry.title} | New Horizons Journal`;

    article.innerHTML = `
      <figure><img src="${entry.image}" alt="Featured image for ${entry.title}" /></figure>
      <p><a href="/journal/" class="btn">← Back to Journal</a></p>
      <h1>${entry.title}</h1>
      <p class="meta">${entry.displayDate} · ${entry.tags.join(" · ")}</p>
      ${entry.reflection.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <p><button id="share-entry" class="btn">Share reflection</button></p>
      <nav class="article-nav" aria-label="Adjacent journal entries">
        <span>${prev ? `<a href="/journal/${prev.slug}/">← ${prev.title}</a>` : ""}</span>
        <span>${next ? `<a href="/journal/${next.slug}/">${next.title} →</a>` : ""}</span>
      </nav>
    `;

    const shareButton = document.querySelector("#share-entry");
    shareButton.addEventListener("click", async () => {
      const url = window.location.href;
      const shareData = { title: entry.title, text: entry.excerpt, url };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // user cancelled; fallback below
        }
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        shareButton.textContent = "Link copied";
      } else {
        window.prompt("Copy this link", url);
      }
    });
  }

  renderLanding();
  renderDetail();
})();
