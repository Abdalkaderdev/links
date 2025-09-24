document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const card = document.querySelector(".card");
  const buttons = Array.from(document.querySelectorAll(".links .btn"));

  // Mark page as loaded to trigger CSS transitions
  if (page) {
    page.classList.remove("is-loading");
    page.classList.add("is-loaded");
  }

  // Stagger button fade-ins
  buttons.forEach((btn, index) => {
    btn.style.transitionDelay = `${150 + index * 120}ms`;
  });
});
