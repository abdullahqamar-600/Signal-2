/* Variation 5 — "The room" pinned scene transition.

   The pin is still scroll-driven (sticky positioning), but the animation
   inside has its own pace. Scroll direction sets the target — scrolling
   down inside the section drives t toward 1, scrolling up drives t back
   toward 0. Each step is timed by a tween, not by scroll position, so the
   animation does not race the wheel or rubber-band on touchpads.

   Outside the pin window the state snaps:
     - Section hasn't reached pin yet  → t = 0  (photo)
     - Section is past the pin window  → t = 1  (final composition)
*/
(function () {
  const section = document.querySelector('.v5-rp');
  if (!section) return;

  const track = section.querySelector('.v5-rp__track');
  const stage = section.querySelector('.v5-rp__stage');
  const orange = section.querySelector('.v5-rp__orange');
  const body = section.querySelector('.v5-rp__body');
  const patternHost = section.querySelector('.v5-rp__pattern');
  if (!track || !stage || !orange || !body || !patternHost) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  // Pattern fetch -----------------------------------------------------------
  let rows = [];
  const src = patternHost.getAttribute('data-pattern-src') || 'Pattern.grouped.svg';

  fetch(src)
    .then((res) => res.text())
    .then((markup) => {
      patternHost.innerHTML = markup;
      rows = Array.from(patternHost.querySelectorAll('.v5-rp-row'));
      if (prefersReduced.matches) rows.forEach((r) => r.style.setProperty('--r', '1'));
      apply(t);
    })
    .catch(() => {});

  // Apply state for animation progress t ∈ [0,1] ---------------------------
  // Phases are non-overlapping so the orange fade reads as a clean smooth
  // overlay (no bottom-to-top fill) before any wave appears:
  //   0.00 → 0.30  Orange overlay fades smoothly onto the photo
  //   0.32 → 0.72  Whole diagonal waves fade in, staggered bottom→top
  //   0.55 → 0.85  Headline + lede fade in
  const apply = (v) => {
    section.style.setProperty('--p', v.toFixed(4));

    const orangeT = clamp01(v / 0.30);
    orange.style.setProperty('--orange-a', easeOutQuart(orangeT).toFixed(4));

    const N = rows.length;
    if (N) {
      const start = 0.32;
      const end = 0.72;
      const rowDur = 0.14;
      const stagger = (end - start - rowDur) / Math.max(1, N - 1);
      for (let i = 0; i < N; i++) {
        const rowStart = start + stagger * i;
        const rowT = clamp01((v - rowStart) / rowDur);
        rows[i].style.setProperty('--r', easeOutExpo(rowT).toFixed(4));
      }
    }

    const bodyT = easeOutQuart(clamp01((v - 0.55) / 0.30));
    body.style.setProperty('--body-t', bodyT.toFixed(4));
  };

  // --- Tween controller: t advances at fixed pace toward target -----------
  // Total time for a full forward (or backward) play. The animation plays
  // at this pace regardless of how fast the user scrolls.
  const DURATION = 900;

  let t = 0;
  let target = 0;
  let lastFrameTime = 0;
  let running = false;
  let lastScrollY = window.scrollY;

  const tick = (now) => {
    if (!lastFrameTime) lastFrameTime = now;
    const dt = now - lastFrameTime;
    lastFrameTime = now;

    const dir = target > t ? 1 : -1;
    const step = dt / DURATION;
    t = clamp01(t + dir * step);

    if ((dir === 1 && t >= target) || (dir === -1 && t <= target)) {
      t = target;
      running = false;
      lastFrameTime = 0;
    }
    apply(t);
    if (running) requestAnimationFrame(tick);
  };

  const startTicking = () => {
    if (running || t === target) return;
    running = true;
    lastFrameTime = 0;
    requestAnimationFrame(tick);
  };

  // Decide the target based on section position + scroll direction ---------
  const updateTarget = () => {
    const r = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - stage.offsetHeight;

    // Section hasn't reached the pin window yet.
    if (r.top > 0) {
      target = 0;
    }
    // Section is past the pin window — sticky stage has unpinned.
    else if (-r.top >= scrollable) {
      target = 1;
    }
    // Inside the pin window — direction follows the latest scroll.
    else {
      const sy = window.scrollY;
      if (sy > lastScrollY) target = 1;
      else if (sy < lastScrollY) target = 0;
      // If scrollY equal, keep previous target.
    }
    lastScrollY = window.scrollY;
    startTicking();
  };

  // Initial state.
  apply(t);

  if (prefersReduced.matches) {
    t = 1;
    target = 1;
    apply(1);
    return;
  }

  // rAF-throttled scroll handler.
  let scrollPending = false;
  const onScroll = () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      scrollPending = false;
      updateTarget();
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Set initial target based on current scroll position on load.
  updateTarget();
})();
