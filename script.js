document.getElementById("exploreBtn").addEventListener("click", () => {
  window.scrollTo({
    top: document.querySelector(".about").offsetTop,
    behavior: "smooth"
  });
});
