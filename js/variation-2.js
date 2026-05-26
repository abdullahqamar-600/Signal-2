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
    '-3': 190,
    '-2': 170,
    '-1': 150,
    '0':  108,  // off-screen right, fully hidden
    '1':  68,   // slot 4 (top-right)
    '2':  48,   // slot 3
    '3':  28,   // slot 2
    '4':  8,    // slot 1 (bottom-left)
    '5':  -20,  // off-screen left, fully hidden
    '6':  -42,
    '7':  -62,
    '8':  -82
  };
  // S-curve vertical extent. Top row at TOP_Y, bottom row at BOT_Y,
  // both measured in vh (window units) from the viewport's TOP-left
  // corner. Because the viewport is now an 80vh centered band, both
  // values are pulled up so the heading + two rows fit inside it.
  // BOT_Y - TOP_Y (= 25vh) is the S height — unchanged.
  const TOP_Y = 16;    // vh — top edge of the top row
  const BOT_Y = 36;    // vh — top edge of the bottom row
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
      // 20vw step between waypoints).
      return 108 - 20 * u;
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
