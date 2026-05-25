(function () {
  const target = new Date('2026-10-06T00:00:00');
  const el = document.querySelector('.v4-intro__count');
  if (!el) return;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((target - now) / msPerDay);

  if (days > 0) {
    const label = days === 1 ? '1 day' : `${days} days`;
    el.textContent = `${label} until October 6, 2026 · Omaha, Nebraska`;
  } else if (days === 0) {
    el.textContent = 'Today · October 6, 2026 · Omaha, Nebraska';
  } else {
    el.textContent = 'October 6–8, 2026 · Omaha, Nebraska';
  }
})();
