/* ============================================================
   ASTRO PROJECT — flight plan trajectory
   Scroll-driven rocket: sets --p (0..1) on .flight and toggles
   .passed on each stage as the rocket crosses its waypoint.
   ============================================================ */
(function () {
  const flight = document.getElementById('flight');
  if (!flight) return;

  const stages = [...flight.querySelectorAll('.flight-stage')];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    flight.classList.add('no-motion');
    flight.style.setProperty('--p', '1');
    stages.forEach((s) => s.classList.add('passed'));
    return;
  }

  let raf = null;

  function update() {
    raf = null;
    const r = flight.getBoundingClientRect();
    /* the rocket "is" at 62% of the viewport height */
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
    flight.style.setProperty('--p', p.toFixed(4));

    const headY = p * r.height;
    for (const s of stages) {
      const node = s.querySelector('.flight-node');
      const nr = node.getBoundingClientRect();
      const nodeY = nr.top + nr.height / 2 - r.top;
      s.classList.toggle('passed', headY >= nodeY - 2);
    }
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
