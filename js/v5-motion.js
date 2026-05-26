/* Variation 5 — subtle scroll reveals.
   Uses IntersectionObserver. Respects prefers-reduced-motion. */
(function () {
  const root = document.documentElement;
  if (!root.classList.contains('v5')) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Mark targets immediately for users who prefer reduced motion.
  if (prefersReduced.matches) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    return;
  }

  // Allow CSS to apply the pre-reveal state without flash on first paint.
  document.body.classList.add('v5--motion-ready');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
})();
