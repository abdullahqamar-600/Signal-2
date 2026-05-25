(function () {
  // Respect prefers-reduced-motion across all scroll-driven motion.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ────────────────────────────────────────────────────────────
  // Scroll-driven hero stage (scatter + thesis + fade-out tail)
  // ────────────────────────────────────────────────────────────
  const stage = document.querySelector('.v1-stage');
  if (stage) {
    const sticky = stage.querySelector('.v1-stage__sticky');
    const hero = stage.querySelector('.v1-hero');
    const subRow = stage.querySelector('.v1-hero__sub-row');
    const cards = Array.from(stage.querySelectorAll('.v1-card'));
    const thesis = stage.querySelector('.v1-thesis');

    const GAP = 12;
    const CONTAINER_MAX = 1440;

    // Per-card width:height ratios — staggered widths exactly matching the
    // New Generation reference: cards 1–3 portrait (4:5), card 4 square (1:1),
    // card 5 wide landscape (7:5). Width grows toward the right of the row.
    const CARD_AR = [4/5, 4/5, 4/5, 1, 7/5];
    const AR_SUM = CARD_AR.reduce((a, v) => a + v, 0);

    function containerPadX(vw) { return Math.max(24, Math.min(150, vw * 0.104)); }
    function containerOuterWidth(vw) { return Math.min(CONTAINER_MAX, vw); }
    function containerContentWidth(vw) { return containerOuterWidth(vw) - 2 * containerPadX(vw); }
    function containerContentLeft(vw) { return (vw - containerOuterWidth(vw)) / 2 + containerPadX(vw); }

    function rowGeometry(vw, vh) {
      const cw = containerContentWidth(vw);
      // All cards share the same height; widths vary by aspect ratio.
      const totalGaps = GAP * (CARD_AR.length - 1);
      const cardH = Math.round((cw - totalGaps) / AR_SUM);
      const cardWs = CARD_AR.map((ar) => Math.round(ar * cardH));
      const left0 = containerContentLeft(vw);
      // Cumulative left offsets for each card
      const cardLefts = [];
      let acc = left0;
      for (let i = 0; i < cardWs.length; i++) {
        cardLefts.push(acc);
        acc += cardWs[i] + GAP;
      }
      return { cardWs, cardH, left0, cardLefts };
    }

    // Scatter offsets — % of vh applied to the LIFTED row Y. Symmetric:
    //   cards 2 + 4 (inner) lift high; cards 1 + 5 (outer) settle mid-low;
    //   card 3 (center) drops lowest. Constellation reads as a deliberate
    //   composition around the centered thesis text, not random.
    const SCATTER_DY_PCT = [0.22, -0.12, 0.34, -0.12, 0.22];
    const SCATTER_X = [-6, -3, 0, 3, 6];

    // Phase A lift — moves the WHOLE hero block (heading + cards) up
    // by this distance, in % of vh. Heading lands just below the nav.
    const LIFT_PCT = 0.25;

    // Card row baseline at rest — ~60% of vh, matching the reference.
    function rowTop(vh) { return Math.max(vh * 0.6, 340); }

    // Combined transform: lift (Phase A) then scatter (Phase B) added on
    // top of the lifted position. Both ts are independently in [0,1].
    function applyTransform(card, i, vw, vh, liftT, scatterT) {
      const { cardWs, cardH, cardLefts } = rowGeometry(vw, vh);
      const yLifted = rowTop(vh) - liftT * LIFT_PCT * vh;
      const dyScatter = SCATTER_DY_PCT[i] * vh;
      const top = yLifted + dyScatter * scatterT;
      const left = cardLefts[i] + SCATTER_X[i] * scatterT;
      card.style.width = `${cardWs[i]}px`;
      card.style.height = `${cardH}px`;
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
    }

    function syncCardSize(/* vw, vh */) { /* width/height applied per-card inside applyTransform */ }

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    function update() {
      const rect = stage.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;

      const vw = sticky.clientWidth;
      const vh = sticky.clientHeight;

      syncCardSize(vw, vh);

      // Three-act scroll choreography:
      //
      //   Phase A — Lift           0.00 → 0.32
      //     Hero block (heading + cards) translates UP together.
      //     Heading approaches the top of the viewport, cards lift with it.
      //   Phase B — Scatter        0.32 → 0.65
      //     Cards break out of row formation into the final constellation.
      //   Phase C — Thesis         0.55 → 0.85  (overlaps with end of B)
      //     The centered thesis copy fades in inside the open middle.
      //   Tail — Exit              0.85 → 1.00
      //     Constellation + thesis fade out into the next section.
      //
      // Hero text fades 0.18 → 0.36 — disappears as it slides under the nav,
      // landing the hand-off exactly when scatter begins.
      const liftT     = easeOutQuart(clamp(progress / 0.32, 0, 1));
      const scatterT  = easeOutQuint(clamp((progress - 0.32) / 0.33, 0, 1));
      const heroFadeT = easeOut(clamp((progress - 0.18) / 0.18, 0, 1));
      const thesisT   = easeOut(clamp((progress - 0.55) / 0.30, 0, 1));
      const fadeOutT  = easeOut(clamp((progress - 0.85) / 0.15, 0, 1));

      cards.forEach((card, i) => {
        applyTransform(card, i, vw, vh, liftT, scatterT);
        card.style.opacity = String(1 - fadeOutT);
      });

      if (hero) {
        // Hero text lifts WITH the cards — same translate distance.
        hero.style.setProperty('--hero-shift', `${-liftT * LIFT_PCT * vh}px`);
        hero.style.opacity = String(1 - heroFadeT);
      }

      if (thesis) {
        const thesisOpacity = thesisT * (1 - fadeOutT);
        thesis.style.opacity = String(thesisOpacity);
        thesis.style.transform = `translate(-50%, calc(-50% + ${(1 - thesisT) * 14}px))`;
      }

      let phase = 'hero';
      if (progress > 0.85) phase = 'exit';
      else if (progress > 0.55) phase = 'final';
      else if (progress > 0.32) phase = 'scatter';
      else if (progress > 0.02) phase = 'lift';
      if (stage.getAttribute('data-phase') !== phase) {
        stage.setAttribute('data-phase', phase);
      }
    }

    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }

    if (reduceMotion) {
      // Static row layout — cards in row state, hero visible, thesis hidden.
      function staticLayout() {
        const vw = sticky.clientWidth;
        const vh = sticky.clientHeight;
        cards.forEach((card, i) => applyTransform(card, i, vw, vh, 0, 0));
        if (thesis) thesis.style.opacity = '0';
      }
      window.addEventListener('resize', staticLayout);
      staticLayout();
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', update);
      update();
    }
  }

  // ────────────────────────────────────────────────────────────
  // Scroll-driven background — white ↔ Signal Blue.
  //
  // JS sets the typed --bg-progress CSS property (0..1) linearly from
  // scroll position. CSS color-mix(in oklch, ...) on .v1 paints the
  // body in a perceptually uniform color space — the white → blue path
  // stays vivid through the middle instead of going through grey-blue
  // mud the way RGB lerping does.
  //
  // No easing on a scroll-driven value: easing makes color progress lag
  // or jump vs. the user's scroll. Linear keeps it 1:1.
  // ────────────────────────────────────────────────────────────
  (function bgInterpolator() {
    const body = document.querySelector('.v1');
    const experience = document.querySelector('.v1-experience');
    const program = document.querySelector('.v1-program');
    if (!body || !experience || !program) return;

    function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

    // Skip writes smaller than this delta — repaints below this aren't
    // perceptible. Keeps update cost minimal during fine-grained scroll.
    const WRITE_THRESHOLD = 0.0025;
    let lastWrittenProgress = -1;

    function update() {
      const vh = window.innerHeight;
      const mid = vh / 2;
      const expRect = experience.getBoundingClientRect();
      const proRect = program.getBoundingClientRect();

      // Fade window — the user crosses ~1 viewport of scroll for each
      // half-transition (in and out of the dark zone). Tighter than 1.4×
      // so the bg lands solid before sections fully enter, and ramps off
      // before the next section's content arrives.
      const FADE = vh * 1.0;

      // Viewport mid relative to each boundary (positive when past it).
      const distPastExpStart = mid - expRect.top;
      const distBeforeProEnd = proRect.bottom - mid;

      // Linear ramps centered on each boundary.
      const enterT = clamp01((distPastExpStart + FADE / 2) / FADE);
      const exitT = clamp01((distBeforeProEnd + FADE / 2) / FADE);

      const progress = Math.min(enterT, exitT);

      if (Math.abs(progress - lastWrittenProgress) > WRITE_THRESHOLD) {
        body.style.setProperty('--bg-progress', progress.toFixed(4));
        lastWrittenProgress = progress;
      }

      // Nav theme snaps at the perceptual midpoint so chrome flips with
      // the visible color, not with scroll geometry.
      const theme = progress > 0.5 ? 'dark' : 'light';
      if (body.dataset.theme !== theme) body.dataset.theme = theme;
    }

    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  // ────────────────────────────────────────────────────────────
  // Video play/pause toggle — autoplay on load, hover reveals
  // a custom control button.
  // ────────────────────────────────────────────────────────────
  (function videoToggle() {
    const video = document.querySelector('.v1-video__media');
    const btn = document.querySelector('.v1-video__toggle');
    if (!video || !btn) return;

    function syncState() {
      const state = video.paused ? 'paused' : 'playing';
      btn.setAttribute('data-state', state);
      btn.setAttribute('aria-label', state === 'playing' ? 'Pause video' : 'Play video');
    }

    btn.addEventListener('click', () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
      syncState();
    });

    video.addEventListener('play', syncState);
    video.addEventListener('pause', syncState);
    video.addEventListener('loadedmetadata', syncState);

    // Try autoplay (muted is set, so most browsers allow this)
    const tryPlay = video.play();
    if (tryPlay && typeof tryPlay.catch === 'function') {
      tryPlay.catch(() => { /* autoplay blocked — button remains for manual play */ });
    }
    syncState();
  })();

  // ────────────────────────────────────────────────────────────
  // FAQ accordion (single-open behavior)
  // ────────────────────────────────────────────────────────────
  (function faq() {
    const items = Array.from(document.querySelectorAll('.v1-faq__item'));
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('.v1-faq__q');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const wasOpen = item.dataset.open === 'true';
        items.forEach((other) => {
          other.dataset.open = 'false';
          const otherBtn = other.querySelector('.v1-faq__q');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.dataset.open = 'true';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  // ────────────────────────────────────────────────────────────
  // Smooth back-to-top
  // ────────────────────────────────────────────────────────────
  (function backToTop() {
    const link = document.querySelector('[data-back-to-top]');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
})();
