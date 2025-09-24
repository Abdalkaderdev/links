document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const card = document.querySelector(".card");
  const buttons = Array.from(document.querySelectorAll(".links .btn"));
  const langButtons = Array.from(document.querySelectorAll(".lang-links .btn"));
  const chooser = document.querySelector('.chooser-grid');
  const popover = document.getElementById('choice-popover');
  let currentChoice = null;

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

  // Interactive language chooser logic
  // Shows a small popover near the clicked language to choose Call or WhatsApp
  function openPopover(target) {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    popover.style.top = `${rect.bottom + scrollTop + 8}px`;
    popover.style.left = `${rect.left + scrollLeft + (rect.width/2) - (popover.offsetWidth/2)}px`;
    popover.hidden = false;
    target.setAttribute('aria-expanded', 'true');
  }

  function closePopover() {
    popover.hidden = true;
    if (currentChoice) currentChoice.setAttribute('aria-expanded', 'false');
    currentChoice = null;
  }

  document.addEventListener('click', (e) => {
    if (!popover.hidden && !popover.contains(e.target) && currentChoice && !currentChoice.contains(e.target)) {
      closePopover();
    }
  });

  if (chooser && popover) {
    chooser.addEventListener('click', (e) => {
      const target = e.target.closest('.choice');
      if (!target) return;
      currentChoice = target;
      openPopover(target);
    });

    popover.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.choice-action');
      if (!actionBtn || !currentChoice) return;
      const action = actionBtn.dataset.action;
      const href = action === 'call' ? currentChoice.dataset.call : currentChoice.dataset.wa;
      closePopover();
      window.location.href = href;
    });
  }
});
