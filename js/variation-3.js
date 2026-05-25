/* ─────────────────────────────────────────────────────────────
   V3 · Hero scroll pile
   The hero is N × 100vh tall (one band per image). As the user
   scrolls through it, each next image is revealed ON TOP of the
   existing pile — previous images stay visible. Scrolling back
   peels images off from the top. Hard cut on each band boundary.
   ───────────────────────────────────────────────────────────── */

(function () {
  const hero  = document.querySelector('.v3-hero');
  const track = hero && hero.querySelector('.v3-hero__track');
  const imgs  = hero ? Array.from(hero.querySelectorAll('.v3-pile__img')) : [];
  if (!hero || !track || imgs.length === 0) return;

  const N = imgs.length;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // Show the full pile, no scroll behaviour
    imgs.forEach((el) => el.setAttribute('data-shown', 'true'));
    return;
  }

  let currentStep = -1;
  let ticking = false;

  function setStep(step) {
    if (step === currentStep) return;
    currentStep = step;
    for (let i = 0; i < N; i++) {
      // image i (data-step = i+1) is shown when step >= i+1, i.e. i < step
      imgs[i].setAttribute('data-shown', i < step ? 'true' : 'false');
    }
  }

  function update() {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    let progress = total > 0 ? -rect.top / total : 0;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // Map progress to step count 1..N (step 1 = only image 1, step N = all images)
    let step = Math.floor(progress * N) + 1;
    if (step > N) step = N;
    if (step < 1) step = 1;
    setStep(step);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
