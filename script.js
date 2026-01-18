// 🌊 Smooth scroll (only if elements exist)
const exploreBtn = document.getElementById("exploreBtn");
const aboutSection = document.getElementById("who-i-am");

if (exploreBtn && aboutSection) {
  exploreBtn.addEventListener("click", () => {
    window.scrollTo({
      top: aboutSection.offsetTop,
      behavior: "smooth"
    });
  });
}

// ✨ Fade-in on scroll (shared across pages)
const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add("visible"));
  }
}

// 🌅 Weekly rotating morning note
const morningNotes = [
  "Let today arrive slowly. You don’t need to rush what is becoming.",
  "There is nothing you need to prove today. Being here is enough.",
  "Gentle steps still move you forward. Rest is part of the rhythm.",
  "You are allowed to take up space quietly.",
  "What feels small today may be carrying you more than you know.",
  "Breathe. This moment is not asking for perfection.",
  "Start where you are, with the softness you have."
];

const noteElement = document.getElementById("morning-note");
if (noteElement) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor(
    (now - startOfYear) / (7 * 24 * 60 * 60 * 1000)
  );
  noteElement.textContent =
    morningNotes[weekNumber % morningNotes.length];
}

// 🌿 Daily line (home page)
const dailyLine = document.getElementById("daily-line");
if (dailyLine) {
  dailyLine.textContent =
    morningNotes[new Date().getDate() % morningNotes.length];
}

// 🌿 Enable JS styling
document.documentElement.classList.remove("no-js");
