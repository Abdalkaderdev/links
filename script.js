document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const card = document.querySelector(".card");
  const buttons = Array.from(document.querySelectorAll(".links .btn"));
  const langButtons = Array.from(document.querySelectorAll(".lang-links .btn"));

  // Mark page as loaded to trigger CSS transitions
  if (page) {
    page.classList.remove("is-loading");
    page.classList.add("is-loaded");
  }

  // Stagger button fade-ins
  buttons.forEach((btn, index) => {
    btn.style.transitionDelay = `${150 + index * 120}ms`;
  });

  // Extra stagger for language buttons after primary list
  langButtons.forEach((btn, index) => {
    btn.style.transitionDelay = `${600 + index * 120}ms`;
  });
});
