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

/* Variation 5 — mobile menu toggle.
   Hamburger button opens a full-screen sheet, locks scroll,
   and hides the floating bottom dock while open. */
(function () {
  const toggle = document.querySelector('.v5__nav-toggle');
  const menu = document.getElementById('v5MobileMenu');
  if (!toggle || !menu) return;

  // Take the menu out of the `hidden` attribute model so transitions
  // run reliably; we manage visibility with opacity + pointer-events.
  menu.hidden = false;
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('v5--menu-open', open);
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // Close when a link is tapped (so the menu doesn't linger on navigation)
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close automatically if the viewport widens past the mobile breakpoint
  const mq = window.matchMedia('(min-width: 481px)');
  const handleMq = (e) => {
    if (e.matches && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  };
  if (mq.addEventListener) mq.addEventListener('change', handleMq);
  else mq.addListener(handleMq);
})();

/* Variation 5 — page-pattern parallax.
   As the bottom decorative band enters view, the base pattern shifts
   vertically at a slower rate than the page scroll. */
(function () {
  const band = document.querySelector('.v5__page-pattern');
  if (!band) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  let ticking = false;
  const updateParallax = () => {
    const rect = band.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom > 0 && rect.top < vh) {
      const progress = (vh - rect.top) / (vh + rect.height);
      const py = (progress - 0.5) * -48;
      band.style.setProperty('--v5-pp-py', py.toFixed(1) + 'px');
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
})();
