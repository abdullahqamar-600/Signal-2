/* Intro animation controller.
   Drives the four-phase reveal of the white overlay with the swoosh-
   shaped mask cut-out. Class flips on the .v2-intro element advance
   the CSS transitions; this script just sequences them. Reduce-motion
   short-circuits and marks the page ready immediately. */
(function () {
  const root = document.documentElement;
  if (!root.classList.contains('v2--intro-pending')) return;

  const intro = document.querySelector('[data-intro]');
  if (!intro) {
    root.classList.remove('v2--intro-pending');
    root.classList.add('v2--intro-done');
    return;
  }

  // Hero video. Browser autoplay policy suppresses playback while the
  // element is covered by the overlay, AND can keep it suppressed for
  // a moment after reveal. We nudge it at every phase boundary, then
  // poll a few more times after the intro is gone to catch the case
  // where the browser has only just promoted the video to "visible".
  const heroVideo = document.querySelector('.v2-hero__video');
  const playVideo = () => {
    if (!heroVideo) return;
    const p = heroVideo.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };
  const ensureVideoPlaying = (attempts = 8) => {
    if (!heroVideo) return;
    if (!heroVideo.paused) return;
    playVideo();
    if (attempts > 0) {
      setTimeout(() => ensureVideoPlaying(attempts - 1), 220);
    }
  };

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    root.classList.remove('v2--intro-pending');
    root.classList.add('v2--intro-done');
    ensureVideoPlaying();
    try { sessionStorage.setItem('v2-intro-seen', '1'); } catch (_) {}
    return;
  }

  // ARIA: tell assistive tech the page is in a transitional state.
  root.setAttribute('aria-busy', 'true');

  // Track every timer so we can cancel them all if the user skips.
  const timers = [];
  const schedule = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  const clearAll = () => { timers.forEach(clearTimeout); timers.length = 0; };

  let finished = false;
  // mode: 'normal' (full reveal sequence finished), 'skip' (user
  // pressed Esc or clicked — quick fade), 'yank' (failsafe path —
  // tear it down instantly because we don't trust the timeline).
  const finishIntro = (mode) => {
    if (finished) return;
    finished = true;
    clearAll();
    root.classList.remove('v2--intro-pending');
    root.classList.add('v2--intro-done');
    root.removeAttribute('aria-busy');
    if (mode === 'yank') {
      if (intro.parentNode) intro.remove();
    } else if (mode === 'skip') {
      intro.classList.add('v2-intro--skip');
      schedule(() => { if (intro.parentNode) intro.remove(); }, 200);
    } else {
      intro.classList.add('v2-intro--done');
      // 280ms opacity cleanup + tiny buffer. Note this is also long
      // enough to cover the remaining ~160ms of the cutout scale
      // transition, so the SVG isn't torn out from under an in-flight
      // transform.
      schedule(() => { if (intro.parentNode) intro.remove(); }, 300);
    }
    // Kick the video, then poll a few times to catch the late-promote
    // case where the browser hasn't marked it visible yet.
    ensureVideoPlaying();
    document.removeEventListener('keydown', onKey);
    intro.removeEventListener('click', onClick);
  };

  // Skip handlers — Escape key, or a click anywhere on the overlay.
  const onKey = (e) => { if (e.key === 'Escape') finishIntro('skip'); };
  const onClick = () => finishIntro('skip');
  document.addEventListener('keydown', onKey);
  intro.addEventListener('click', onClick);

  // Belt-and-suspenders safety net: even if a setTimeout below silently
  // fails, this still releases the page after 3s. Yank instantly here —
  // if we got to this branch the timeline is already broken, so we
  // can't trust a transition to land.
  schedule(() => finishIntro('yank'), 3000);

  // Double-RAF + forced reflow so the initial styles paint before
  // transitions kick in. (Modern Chromium / Firefox honor the
  // double-RAF; the offsetWidth read is a third belt for Safari.)
  //
  // The reveal is the entire ending: the cutout scales from 2 to 36
  // and that motion alone takes the white overlay off-screen. There
  // is NO visible fade — by the time .v2-intro--done fires, the
  // cutout has already pushed the swoosh's wedges past the viewport
  // edges, so the opacity transition is just DOM cleanup. The user
  // reads the gesture as "the swoosh expands until it leaves the
  // frame," then the content arrives. One continuous expansion.
  //
  //   t≈0      — overlay visible, swoosh at scale 0 (invisible)
  //   t=40ms   — add .shown → swoosh scales 0→2 over 380ms (expoOut)
  //              | video plays through the growing window
  //   t=420ms  — entrance complete; ~480ms dwell on the brand mark
  //   t=900ms  — add .reveal → swoosh scales 2→160 over 1050ms (smooth in-out)
  //              | the swoosh keeps visibly growing until it leaves the frame
  //   t=1850ms — add .v2-intro--done → invisible opacity cleanup (280ms)
  //              + content fade-in begins (nav 480ms; plate 520ms +140 delay)
  //   t=1950ms — cutout scale completes (entirely off-frame)
  //   t=2130ms — intro removed from DOM
  const runPhases = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      /* eslint-disable-next-line no-unused-expressions */
      intro.offsetWidth; // force a reflow so the next class flip transitions
      playVideo();                                    // start playing under the mask
      intro.classList.add('v2-intro--shown');

      schedule(() => {
        playVideo();                                  // catch any pause from the overlay
        intro.classList.add('v2-intro--reveal');
      }, 900);

      schedule(() => {
        // Fire 950ms into the reveal scale, with ~100ms of scale
        // motion still in flight. By this point the cutout has long
        // since pushed the wedge boundaries past the viewport edges,
        // so the opacity cleanup is visually invisible — the user
        // only perceives the expansion, never a fade.
        finishIntro('normal');
      }, 1850);
    }));
  };

  // Don't open the swoosh window until the video can actually paint
  // a frame into it. Without this wait, the cutout briefly reveals
  // the video element's solid blue placeholder, which reads as a
  // glitch. Cap the wait at 600ms so a slow/blocked video never
  // strands the user behind the overlay.
  if (heroVideo && heroVideo.readyState < 2) {
    let started = false;
    const start = () => { if (started) return; started = true; runPhases(); };
    heroVideo.addEventListener('loadeddata', start, { once: true });
    schedule(start, 600);
  } else {
    runPhases();
  }

  try { sessionStorage.setItem('v2-intro-seen', '1'); } catch (_) {}
})();

/* Speakers — scroll-driven S-curve flow controller.

   Eight speaker cards ride an invisible S-shaped path that enters
   top-right, runs across the top row, curves down through the
   middle, runs across the bottom row, and exits bottom-left. At
   any moment four cards are visible in the LL/HH layout; the rest
   wait off-screen on either side.

   We parameterize the path by u, a scalar position-along-path:
     u =  0   → just past the right entry edge
     u =  1   → top-row slot 4 (rightmost visible, top)
     u =  2   → top-row slot 3
     u =  3   → bottom-row slot 2
     u =  4   → bottom-row slot 1 (leftmost visible, bottom)
     u =  5   → just past the left exit edge

   Each card i (0..7) gets u_i = (4 - i) + 4 * progress, so at
   progress = 0 cards 0..3 sit in slots 1..4 and cards 4..7 are
   stacked off-screen right; at progress = 1 cards 4..7 sit in
   the four slots and cards 0..3 have flowed off-screen left.

   pathPos(u) maps u to (x, y) in viewport units (vw/vh). x is a
   piecewise-linear interpolation across waypoints; y uses a
   smoothstep so the descent between the top and bottom rows feels
   like a real S-curve rather than a step. The CSS variables
   --x / --y on each card are then consumed by a translate(). */
(function () {
  const scene = document.querySelector('.v2-speakers__scene');
  if (!scene) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const viewport = scene.querySelector('.v2-speakers__viewport');
  const cards = Array.from(scene.querySelectorAll('.v2-speaker-card'));
  if (!viewport || cards.length === 0) return;

  // Path waypoints in vw / vh. xWaypoints is keyed by integer u;
  // values between are linearly interpolated. The four visible slots
  // sit at u=1..4 with a 20vw step so cards stay near each other; the
  // off-screen positions (u<=0 and u>=5) push fully clear of the
  // viewport so cards disappear cleanly behind the overflow:hidden.
  const X_WAYPOINTS = {
    '-3': 188,
    '-2': 166,
    '-1': 144,
    '0':  100,  // off-screen right, fully hidden (cards are now 21vw)
    '1':  72,   // slot 4 (top-right)
    '2':  50,   // slot 3
    '3':  28,   // slot 2
    '4':  6,    // slot 1 (bottom-left)
    '5':  -22,  // off-screen left, fully hidden
    '6':  -44,
    '7':  -66,
    '8':  -88
  };
  // S-curve vertical extent. Top row at TOP_Y, bottom row at BOT_Y,
  // both measured in vh (window units) from the viewport's TOP-left
  // corner. Because the viewport is now an 80vh centered band, both
  // values are pulled up so the heading + two rows fit inside it.
  // BOT_Y - TOP_Y (= 25vh) is the S height — unchanged.
  const TOP_Y = 18;    // vh — top edge of the top row
  const BOT_Y = 34;    // vh — top edge of the bottom row
  // The descent happens entirely between slot 2 (u=2) and slot 3
  // (u=3) so that all four slots stay on their flat rows.
  const CURVE_START = 2.05;
  const CURVE_END = 2.95;

  function smoothstep(x, a, b) {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function xAt(u) {
    const u0 = Math.floor(u);
    const t = u - u0;
    const x0 = X_WAYPOINTS[u0];
    // If u lands exactly on a waypoint we don't need the next one;
    // this matters at the ends where the next waypoint is undefined.
    if (x0 !== undefined && t === 0) return x0;
    const x1 = X_WAYPOINTS[u0 + 1];
    if (x0 === undefined || x1 === undefined) {
      // Fall back to linear extrapolation off the ends (matches the
      // 22vw step between in-slot waypoints).
      return 100 - 22 * u;
    }
    return x0 + (x1 - x0) * t;
  }

  function pathPos(u) {
    return {
      x: xAt(u),
      y: TOP_Y + (BOT_Y - TOP_Y) * smoothstep(u, CURVE_START, CURVE_END)
    };
  }

  const DELTA = 4; // total advance along u across the full scroll range

  let ticking = false;

  function update() {
    ticking = false;
    const rect = scene.getBoundingClientRect();
    // Read sticky-top + viewport height from the actual element so
    // CSS stays the source of truth for the band geometry. Sticky
    // engages when scene.top hits stickyTopPx; pin range is the scene
    // height minus the viewport (not the window) height.
    const stickyTopPx = parseFloat(getComputedStyle(viewport).top) || 0;
    const pinDistance = scene.offsetHeight - viewport.offsetHeight;
    if (pinDistance <= 0) return;
    const scrolled = stickyTopPx - rect.top;
    const raw = scrolled / pinDistance;
    const progress = Math.max(0, Math.min(1, raw));
    scene.style.setProperty('--progress', progress.toFixed(4));

    for (let i = 0; i < cards.length; i++) {
      const u = (4 - i) + DELTA * progress;
      const { x, y } = pathPos(u);
      const style = cards[i].style;
      style.setProperty('--x', x.toFixed(2));
      style.setProperty('--y', y.toFixed(2));
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
