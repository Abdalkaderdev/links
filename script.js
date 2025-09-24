document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const buttons = Array.from(document.querySelectorAll(".links .btn"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panelsContainer = document.getElementById('lang-panels');
  const contactDataEl = document.getElementById('contact-data');

  page.classList.remove("is-loading");
  page.classList.add("is-loaded");

  buttons.forEach((btn, idx) => btn.style.transitionDelay = `${150 + idx*120}ms`);

  function renderCardsForLanguage(langKey) {
    const data = JSON.parse(contactDataEl.textContent);
    const people = data.people.filter(p => p.languages.includes(langKey));
    panelsContainer.innerHTML = people.map((p, idx) => {
      const telHref = `tel:${p.phone.replace(/\s+/g,'')}`;
      const waHref = `https://wa.me/${p.phone.replace(/\s+/g,'').replace('+','')}`;
      const badges = p.languages.map(l => `<span class="badge">${l.charAt(0).toUpperCase()+l.slice(1)}</span>`).join(' ');
      return `
        <article class="lang-card-item" style="transition-delay:${100 + idx*120}ms">
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

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('is-active'); tab.setAttribute('aria-selected','true');
      renderCardsForLanguage(tab.dataset.lang);
    });
  });

  renderCardsForLanguage('kurdish');
});
