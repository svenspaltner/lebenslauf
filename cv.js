const ICONS = {
  all: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  formation_initiale: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  experience_pro: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  travaux: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  interventions: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  creations: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  bourses: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  formation_continue: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  competences: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`
};

const ORCID_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="#a6ce39" style="vertical-align:-1px;margin-right:3px"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.947-.431-.947-.947.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.609 3.9-3.722 0-2.016-1.453-3.722-3.828-3.722h-2.369z"/></svg>`;

let lang = 'fr';
let activeFilters = new Set(['all']);

const NOW = { fr: 'auj.', en: 'now', de: 'heute' };

function fmt(e) {
  if (!e.date_debut) return '';
  if (e.date_fin === null || e.date_fin === undefined) return e.date_debut;
  if (e.date_fin === '') return e.date_debut + '–' + NOW[lang];
  if (e.date_debut === e.date_fin) return e.date_debut;
  return e.date_debut + '–' + e.date_fin;
}

function renderHeader(data) {
  const i = data.info;
  document.getElementById('cv-header').innerHTML = `
    <div class="cv-name">${i.nom}</div>
    <div class="cv-title">${i.titre}</div>
    ${i.age ? `<span>${i.age} ${data.labels.age || 'ans'}</span>` : ''}
    <div class="cv-contact">
    <span>${i.email}</span>
    ${i.site ? `<a href="https://${i.site}" target="_blank"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>site</a>` : ''}
      ${i.github ? `<a href="https://${i.github}" target="_blank"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>repo</a>` : ''}
      ${i.orcid ? `<a href="https://orcid.org/${i.orcid}" target="_blank">${ORCID_SVG}<span class="orcid-id">${i.orcid}</span></a>` : ''}
    </div>`;
}

function renderBody(data) {
  const labels = data.labels;
  let html = '';

  data.sections.forEach(s => {
    const entries = data[s.key] || [];
    const entriesHtml = entries.map(e => {
      const main = e[s.champ] || '';
      const linkIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:5px;color:#00c896;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
      const linked = e.lien ? `${main}<a href="${e.lien}" target="_blank" style="color:inherit;text-decoration:none;">${linkIcon}</a>` : main;
      return `<div class="entry">
        <div class="entry-dates">${fmt(e)}</div>
        <div>
          <div class="entry-title">${linked}</div>
          ${e.sous_titre ? `<div class="entry-sub">${e.sous_titre}</div>` : ''}
        </div>
      </div>`;
    }).join('');
    html += `<div class="cv-section" data-key="${s.key}">
      <div class="section-label">${s.label}</div>
      ${entriesHtml}
    </div>`;
  });

  html += `<div class="cv-section" data-key="competences">
    <div class="section-label">${labels.competences}</div>
    <div class="entry">
      <div class="entry-dates">${labels.langues}</div>
      <div><div class="tags">${data.competences.langues.map(l => `<span class="tag">${l}</span>`).join('')}</div></div>
    </div>
    <div class="entry">
      <div class="entry-dates">${labels.numerique}</div>
      <div><div class="tags">${data.competences.numerique.map(l => `<span class="tag accent">${l}</span>`).join('')}</div></div>
    </div>
  </div>`;

  html += `<div class="interets-line">${labels.interets} — ${data.interets.join(', ')}</div>`;
  document.getElementById('cv-body').innerHTML = html;
  applyFilters();
}

function renderLangSwitcher() {
  const printBtn = `<button class="lang-btn" onclick="window.print()" style="margin-left:0.5rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></button>`;
  document.getElementById('lang-switcher').innerHTML =
    ['fr', 'en', 'de'].map(l =>
      `<button class="lang-btn ${l === lang ? 'active' : ''}" onclick="setLang('${l}')">${l.toUpperCase()}</button>`
    ).join('') + printBtn;
}

function renderFilterBar(data) {
  const all = activeFilters.has('all');
  const labels = data.labels;
  let html = `<button class="filter-btn ${all ? 'active' : ''}" onclick="toggleFilter('all')">${ICONS.all}${labels.tout}</button>`;
  data.sections.forEach(s => {
    const on = !all && activeFilters.has(s.key);
    html += `<button class="filter-btn ${on ? 'active' : ''}" onclick="toggleFilter('${s.key}')">${ICONS[s.key] || ''}${s.label}</button>`;
  });
  const compOn = !all && activeFilters.has('competences');
  html += `<button class="filter-btn ${compOn ? 'active' : ''}" onclick="toggleFilter('competences')">${ICONS.competences}${labels.competences}</button>`;
  document.getElementById('filter-bar').innerHTML = html;
}

function toggleFilter(key) {
  if (key === 'all') { activeFilters = new Set(['all']); }
  else {
    activeFilters.delete('all');
    if (activeFilters.has(key)) {
      activeFilters.delete(key);
      if (!activeFilters.size) activeFilters = new Set(['all']);
    } else {
      activeFilters.add(key);
    }
  }
  renderFilterBar(CV[lang]);
  applyFilters();
}

function applyFilters() {
  const all = activeFilters.has('all');
  document.querySelectorAll('.cv-section').forEach(el => {
    el.style.display = (all || activeFilters.has(el.dataset.key)) ? '' : 'none';
  });
  const int = document.querySelector('.interets-line');
  if (int) int.style.display = (all || activeFilters.has('competences')) ? '' : 'none';
}

function setLang(l) { lang = l; activeFilters = new Set(['all']); render(); }

function render() {
  renderLangSwitcher();
  renderHeader(CV[lang]);
  renderBody(CV[lang]);
  renderFilterBar(CV[lang]);
}

fetch('cv.json')
  .then(r => r.json())
  .then(data => { window.CV = data; render(); })
  .catch(err => console.error('Erreur chargement cv.json :', err));

document.getElementById('cv-footer').innerHTML =
  `<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a> — Sven Spaltner`;
