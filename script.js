document.getElementById("exploreBtn").addEventListener("click", () => {
  window.scrollTo({
    top: document.querySelector(".about").offsetTop,
    behavior: "smooth"
  });
});
const morningNotes = [
  "Let today arrive slowly. You don’t need to rush what is becoming.",
  "There is nothing you need to prove today. Being here is enough.",
  "Gentle steps still move you forward. Rest is part of the rhythm.",
  "You are allowed to take up space quietly.",
  "What feels small today may be carrying you more than you know.",
  "Breathe. This moment is not asking for perfection.",
  "Start where you are, with the softness you have."
];

const weekNumber = Math.floor(
  (new Date() - new Date(new Date().getFullYear(), 0, 1)) / 
  (7 * 24 * 60 * 60 * 1000)
);

const note = morningNotes[weekNumber % morningNotes.length];
const noteElement = document.getElementById("morning-note");

if (noteElement) {
  noteElement.textContent = note;
}
