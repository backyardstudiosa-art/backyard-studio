document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector("[data-accordion]");
  if (!accordion) {
    return;
  }

  const toggleItem = (button) => {
    const answer = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    if (answer) {
      answer.hidden = isExpanded;
    }
  };

  accordion.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => toggleItem(button));
  });

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
