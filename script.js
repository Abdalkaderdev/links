document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panelsContainer = document.getElementById('lang-panels');
  const contactDataEl = document.getElementById('contact-data');

  if (page) page.classList.remove("is-loading"); page.classList.add("is-loaded");

  function renderCardsForLanguage(langKey) {
    const data = JSON.parse(contactDataEl.textContent);
    const people = data.people.filter(p => p.languages.includes(langKey));

    panelsContainer.innerHTML = people.map((p, idx) => {
      const telHref = `tel:${p.phone.replace(/\s+/g,'')}`;
      const waHref = `https://wa.me/${p.phone.replace(/\s+/g,'').replace('+','')}`;
      const badges = p.languages.map(l => `<span class="badge">${l.charAt(0).toUpperCase()+l.slice(1)}</span>`).join(' ');

      return `
        <article class="lang-card-item" style="transition-delay:${100 + idx*120}ms">
          <div class="u-contact-deco">
            <div class="u-contact-box u-box1"></div>
            <div class="u-contact-box u-box2"></div>
            <div class="u-contact-box u-box3"></div>
          </div>
          <h3 class="lang-title">${p.name}</h3>
          <div class="lang-badges">${badges}</div>
          <div class="lang-actions">
            <a class="action action--call" href="${telHref}">📞 Call</a>
            <a class="action action--wa" href="${waHref}" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
        </article>
      `;
    }).join('');

    panelsContainer.offsetHeight;
    page.classList.add('is-loaded');
  }

  if (tabs.length && contactDataEl) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active'); tab.setAttribute('aria-selected','true');
        renderCardsForLanguage(tab.dataset.lang);
      });
    });
    renderCardsForLanguage('kurdish');
  }
});
