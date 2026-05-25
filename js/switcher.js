(function () {
  const VARIATIONS = [
    { id: 1, title: 'Editorial / Constellation', file: 'variation-1.html' },
    { id: 2, title: 'Quiet / Magazine', file: 'variation-2.html' },
    { id: 3, title: 'Editorial Stack', file: 'variation-3.html' },
    { id: 4, title: 'The Annual', file: 'variation-4.html' },
  ];

  const current = (function () {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const match = path.match(/variation-(\d+)\.html/);
    return match ? parseInt(match[1], 10) : null;
  })();

  const root = document.createElement('div');
  root.className = 'switcher';
  root.setAttribute('data-open', 'false');

  const currentLabel = current ? `V${current}` : 'Index';

  root.innerHTML = `
    <button class="switcher__pill" type="button" aria-haspopup="menu" aria-expanded="false">
      <span class="switcher__dot"></span>
      <span class="switcher__label">${currentLabel}</span>
      <span class="switcher__caret">▾</span>
    </button>
    <div class="switcher__menu" role="menu">
      <div class="switcher__menu-header">
        <span>Variations</span>
        <span>${VARIATIONS.length}</span>
      </div>
      <a class="switcher__item" href="index.html" data-active="${current === null}" role="menuitem">
        <span>Index — All variations</span>
        <span class="switcher__item-tag">↗</span>
      </a>
      ${VARIATIONS.map(
        (v) => `
        <a class="switcher__item" href="${v.file}" data-active="${current === v.id}" role="menuitem">
          <span>${v.title}</span>
          <span class="switcher__item-tag">V${v.id}</span>
        </a>
      `,
      ).join('')}
    </div>
  `;

  document.body.appendChild(root);

  const pill = root.querySelector('.switcher__pill');

  const setOpen = (open) => {
    root.setAttribute('data-open', String(open));
    pill.setAttribute('aria-expanded', String(open));
  };

  pill.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(root.getAttribute('data-open') !== 'true');
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
