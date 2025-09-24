document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const card = document.querySelector(".card");
  const buttons = Array.from(document.querySelectorAll(".links .btn"));
  const langButtons = Array.from(document.querySelectorAll(".lang-links .btn"));
  const chooser = document.querySelector('.chooser-grid');
  const popover = document.getElementById('choice-popover');
  let currentChoice = null;
  const unifiedLangCards = Array.from(document.querySelectorAll('.lang-card-item'));
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panelsContainer = document.getElementById('lang-panels');
  const contactDataEl = document.getElementById('contact-data');

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

  // Stagger unified language cards
  unifiedLangCards.forEach((card, index) => {
    card.style.transitionDelay = `${150 + index * 120}ms`;
  });

  // ----- Tabs Rendering Logic -----
  function renderCardsForLanguage(langKey) {
    if (!panelsContainer || !contactDataEl) return;
    const data = JSON.parse(contactDataEl.textContent);
    const people = data.people.filter(p => p.languages.includes(langKey));

    panelsContainer.innerHTML = people.map((p, idx) => {
      const telHref = `tel:${p.phone.replace(/\s+/g, '')}`;
      const waHref = `https://wa.me/${p.phone.replace(/\s+/g, '').replace('+','')}`;
      const badges = p.languages.map(l => `<span class=\"badge\">${l.charAt(0).toUpperCase()+l.slice(1)}</span>`).join(' ');
      return `
        <article class=\"lang-card-item\" style=\"transition-delay:${100 + idx*120}ms\">\n\
          <div class=\"u-contact-deco\">\n\
            <div class=\"u-contact-bg\"></div>\n\
            <div class=\"u-contact-box u-box1\"></div>\n\
            <div class=\"u-contact-box u-box2\"></div>\n\
            <div class=\"u-contact-box u-box3\"></div>\n\
          </div>\n\
          <h3 class=\"lang-title\">${p.name}</h3>\n\
          <div class=\"lang-badges\">${badges}</div>\n\
          <div class=\"lang-actions\">\n\
            <a class=\"action action--call\" href=\"${telHref}\"><span aria-hidden=\"true\">📞</span><span>Call</span></a>\n\
            <a class=\"action action--wa\" href=\"${waHref}\" target=\"_blank\" rel=\"noopener noreferrer\"><span aria-hidden=\"true\">💬</span><span>WhatsApp</span></a>\n\
          </div>\n\
        </article>\n      `;
    }).join('');

    // Trigger fade-in by toggling is-loaded on parent
    panelsContainer.offsetHeight; // force reflow
    document.querySelector('.page')?.classList.add('is-loaded');
  }

  if (tabs.length && contactDataEl) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        renderCardsForLanguage(tab.dataset.lang);
      });
    });
    // Initial render defaults to Kurdish
    renderCardsForLanguage('kurdish');
  }

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
