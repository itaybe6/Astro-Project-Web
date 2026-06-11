/* ============================================================
   ASTRO PROJECT — deep space canvas
   Layers (back to front):
     1. cosmic dust — large drifting glow clouds (violet/cyan/pink/teal)
     2. spiral galaxy — slowly rotating particle galaxy with a glowing core
     3. starfield — 3 parallax depth layers with twinkle + mouse drift
     4. meteors — colored shooting stars
   Everything is drawn additively ('lighter') so the sky glows.
   Tweakable via window events.
   ============================================================ */
(function () {
  const canvas = document.getElementById('space');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, dpr = 1;
  let stars = [];
  let meteors = [];
  let dust = [];
  let galaxy = [];
  let density = 1;            // tweakable multiplier
  let shootingStars = true;   // tweakable
  let mx = 0, my = 0;         // smoothed mouse offset (-1..1)
  let tmx = 0, tmy = 0;       // target mouse offset
  let nextMeteorAt = performance.now() + 1800;

  /* ---------- glow sprites (pre-rendered radial gradients) ---------- */
  const PALETTE = {
    violet: '168,120,255',
    cyan: '110,205,255',
    pink: '255,120,215',
    teal: '90,235,205'
  };
  const DUST_KEYS = ['violet', 'cyan', 'pink', 'teal'];
  const SPRITES = {};

  function glowSprite(key) {
    if (SPRITES[key]) return SPRITES[key];
    const R = 128;
    const c = document.createElement('canvas');
    c.width = c.height = R * 2;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(R, R, 0, R, R, R);
    grad.addColorStop(0, `rgba(${PALETTE[key]},0.55)`);
    grad.addColorStop(0.35, `rgba(${PALETTE[key]},0.22)`);
    grad.addColorStop(1, `rgba(${PALETTE[key]},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, R * 2, R * 2);
    SPRITES[key] = c;
    return c;
  }

  let lastW = 0, lastH = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    /* Rebuild only on real layout changes — mobile browsers fire resize
       when the URL bar collapses/expands mid-scroll, which would make
       the whole sky jump to new random positions. */
    if (W !== lastW || Math.abs(H - lastH) > 160) {
      lastW = W;
      lastH = H;
      buildStars();
      buildDust();
      buildGalaxy();
    }
    if (reduceMotion) drawScene(performance.now(), 0);
  }

  /* ---------- starfield ---------- */
  function buildStars() {
    const base = Math.round((W * H) / 3400 * density);
    stars = [];
    for (let i = 0; i < base; i++) {
      const depth = Math.random();           // 0 far .. 1 near
      const roll = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        depth,
        r: 0.4 + depth * 1.4,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.4 + Math.random() * 1.4,
        hue: roll < 0.62 ? 'white' : roll < 0.74 ? 'cyan' : roll < 0.86 ? 'violet' : roll < 0.94 ? 'pink' : 'teal'
      });
    }
  }

  /* ---------- cosmic dust clouds ---------- */
  function buildDust() {
    const n = Math.round(9 * density) + 4;
    dust = [];
    for (let i = 0; i < n; i++) {
      dust.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 150 + Math.random() * 300,
        key: DUST_KEYS[i % DUST_KEYS.length],
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 5,
        ph: Math.random() * Math.PI * 2,
        phSpeed: 0.12 + Math.random() * 0.22,
        a: 0.16 + Math.random() * 0.16
      });
    }
  }

  /* ---------- spiral galaxy ---------- */
  const ARM_COLORS = ['violet', 'cyan', 'pink'];

  function buildGalaxy() {
    galaxy = [];
    const N = 280;
    for (let i = 0; i < N; i++) {
      const t = Math.pow(Math.random(), 0.7); // denser near the core
      const arm = i % 3;
      galaxy.push({
        t,
        base: t * Math.PI * 3.6 + arm * (Math.PI * 2 / 3) + (Math.random() - 0.5) * 0.55,
        r: 0.5 + Math.random() * 1.4,
        key: ARM_COLORS[arm],
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  function spawnMeteor() {
    const fromLeft = Math.random() < 0.5;
    const keys = ['cyan', 'violet', 'pink', 'cyan']; // cyan twice — it reads best
    meteors.push({
      x: fromLeft ? -60 : Math.random() * W,
      y: fromLeft ? Math.random() * H * 0.4 : -60,
      vx: 7 + Math.random() * 5,
      vy: 3.5 + Math.random() * 2.5,
      life: 1,
      len: 120 + Math.random() * 90,
      key: keys[Math.floor(Math.random() * keys.length)]
    });
  }

  const COLORS = {
    white: (a) => `rgba(240,242,255,${a})`,
    cyan: (a) => `rgba(130,225,250,${a})`,
    violet: (a) => `rgba(185,150,255,${a})`,
    pink: (a) => `rgba(255,150,225,${a})`,
    teal: (a) => `rgba(120,240,210,${a})`
  };

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* Mouse parallax only — on touch, pointermove fires during scroll
     and would drag the stars sideways while swiping. */
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      tmx = (e.clientX / W) * 2 - 1;
      tmy = (e.clientY / H) * 2 - 1;
    }, { passive: true });
  }

  // Tweaks hooks
  window.addEventListener('astro:density', (e) => {
    density = e.detail;
    buildStars();
    buildDust();
  });
  window.addEventListener('astro:meteors', (e) => {
    shootingStars = !!e.detail;
  });

  let last = performance.now();

  function drawScene(now, dt) {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    /* ----- 1. cosmic dust ----- */
    for (const d of dust) {
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.ph += d.phSpeed * dt;
      // wrap softly around the edges
      if (d.x < -d.r) d.x = W + d.r;
      if (d.x > W + d.r) d.x = -d.r;
      if (d.y < -d.r) d.y = H + d.r;
      if (d.y > H + d.r) d.y = -d.r;

      let py = d.y - (scrollY * 0.06) % (H + d.r * 2);
      py = ((py % (H + d.r * 2)) + H + d.r * 2) % (H + d.r * 2) - d.r;

      const pulse = 0.72 + 0.28 * Math.sin(d.ph);
      ctx.globalAlpha = d.a * pulse;
      const s = glowSprite(d.key);
      ctx.drawImage(s, d.x - d.r, py - d.r, d.r * 2, d.r * 2);
    }

    /* ----- 2. spiral galaxy ----- */
    const gx = W * 0.82 + mx * 20;
    const gy = H * 0.66 + my * 16;
    const R = Math.min(W, H) * 0.3;
    const rot = now * 0.00005;

    // glowing core
    ctx.globalAlpha = 0.55 + 0.1 * Math.sin(now * 0.0012);
    ctx.drawImage(glowSprite('violet'), gx - R * 0.4, gy - R * 0.28, R * 0.8, R * 0.56);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(glowSprite('pink'), gx - R * 0.18, gy - R * 0.13, R * 0.36, R * 0.26);

    for (const p of galaxy) {
      const ang = p.base + rot;
      const rad = p.t * R;
      const px = gx + Math.cos(ang) * rad;
      const py = gy + Math.sin(ang) * rad * 0.52; // elliptical tilt
      const a = (1.05 - p.t) * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(p.tw + now * 0.0018))) * 0.55;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[p.key](a.toFixed(3));
      ctx.fill();
    }

    /* ----- 3. starfield ----- */
    ctx.globalAlpha = 1;
    for (const s of stars) {
      s.tw += s.twSpeed * dt;
      const alpha = 0.45 + 0.6 * (0.5 + 0.5 * Math.sin(s.tw)) * (0.4 + s.depth * 0.6);
      const px = s.x + mx * s.depth * 26;
      let py = s.y - (scrollY * s.depth * 0.12) % (H + 40) + my * s.depth * 18;
      py = ((py % (H + 40)) + H + 40) % (H + 40) - 20;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[s.hue](Math.min(alpha, 1).toFixed(3));
      ctx.fill();
      if (s.depth > 0.82) { // near stars get a soft glow
        ctx.beginPath();
        ctx.arc(px, py, s.r * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[s.hue]((alpha * 0.1).toFixed(3));
        ctx.fill();
      }
    }

    /* ----- 4. meteors ----- */
    if (shootingStars && !reduceMotion && now > nextMeteorAt) {
      spawnMeteor();
      nextMeteorAt = now + 2600 + Math.random() * 4500;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life -= dt * 0.55;
      if (m.life <= 0 || m.x > W + 200 || m.y > H + 200) { meteors.splice(i, 1); continue; }
      const tailX = m.x - m.len;
      const tailY = m.y - m.len * (m.vy / m.vx);
      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, COLORS[m.key](0.9 * m.life));
      grad.addColorStop(0.3, COLORS[m.key](0.45 * m.life));
      grad.addColorStop(1, COLORS[m.key](0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      // glowing head
      ctx.beginPath();
      ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.85 * m.life})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(m.x, m.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[m.key]((0.22 * m.life).toFixed(3));
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    // smooth mouse
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;

    drawScene(now, dt);
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();

  if (reduceMotion) {
    drawScene(performance.now(), 0); // single static draw
  } else {
    requestAnimationFrame(frame);
  }
})();
