// Backyard Studio Starter JS

// Mobile nav toggle
const header = document.querySelector(".site-header");
const menuBtn = document.querySelector("[data-menu-btn]");
if (menuBtn && header) {
  menuBtn.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
  });
}

// Portfolio filtering (optional, safe if not present)
const filterBtns = document.querySelectorAll("[data-filter]");
const tiles = document.querySelectorAll("[data-category]");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-filter");

    filterBtns.forEach(b => b.classList.remove("primary"));
    btn.classList.add("primary");

    tiles.forEach(tile => {
      const cat = tile.getAttribute("data-category");
      const show = value === "all" || value === cat;
      tile.style.display = show ? "" : "none";
    });
  });
});
