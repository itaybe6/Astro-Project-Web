/* ============================================================
   ASTRO PROJECT — project page renderer
   Reads ?id= from the URL, renders the full mission page from
   projects-data.js, and wires the screenshot lightbox.
   Runs synchronously BEFORE astro-main.js (reveal/tilt/counters).
   ============================================================ */
(function () {
  const ALL = window.ASTRO_PROJECTS || [];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const id = new URLSearchParams(location.search).get('id');
  const idx = ALL.findIndex((p) => p.id === id);
  const root = document.getElementById('pp-root');

  /* Unknown / missing id — friendly lost-in-space screen */
  if (idx === -1) {
    root.innerHTML = `
<section class="pp-hero" data-screen-label="404">
  <div class="wrap">
    <div class="kicker pp-kicker">SIGNAL LOST</div>
    <h1 class="pp-title gradient-text">404</h1>
    <p class="pp-tagline">המשימה הזאת לא נמצאה במפת הכוכבים שלנו.</p>
    <div class="mission-actions" style="justify-content: center;">
      <a class="btn btn-primary" href="/#mobile">חזרה לכל המשימות</a>
    </div>
  </div>
</section>`;
    return;
  }

  const p = ALL[idx];
  const prev = ALL[(idx - 1 + ALL.length) % ALL.length];
  const next = ALL[(idx + 1) % ALL.length];
  const CAT_LABEL = { web: 'WEB MISSION', mobile: 'MOBILE MISSION', saas: 'SAAS FLAGSHIP' };

  document.title = p.name + ' — ' + p.heName + ' · Astro Project';

  const chips = p.features.map((f) => `<span class="chip">${esc(f)}</span>`).join('');
  const about = p.about.map((par) => `<p>${esc(par)}</p>`).join('');

  const stats = p.stats.map((s, i) => `
    <div class="stat reveal" style="--d: ${0.1 + i * 0.08}s;">
      <div class="stat-num"><span data-count="${esc(s.num)}">0</span>${s.suffix ? `<span class="suffix">${esc(s.suffix)}</span>` : ''}</div>
      <div class="stat-label">${esc(s.label)}</div>
    </div>`).join('');

  /* ---------- Gallery ---------- */
  let gallery = '';
  if (p.cat === 'web') {
    gallery = `<div class="pp-gallery-grid">` + p.shots.map((s, i) => `
      <button class="pp-shot reveal reveal-zoom" style="--d: ${(i % 2) * 0.12}s;" type="button" data-full="${esc(s.src)}" data-caption="${esc(s.alt)}">
        <span class="browser tilt" style="display:block;">
          <span class="browser-bar" style="display:flex;">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="url-pill">${esc(p.url)}</span>
          </span>
          <span class="browser-screen" style="display:block;">
            <img class="shot-img" src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy">
          </span>
        </span>
        <span class="pp-shot-caption" style="display:block;">${esc(s.alt)}</span>
      </button>`).join('') + `</div>`;
  } else if (p.shots.length) {
    gallery = `<div class="pp-phone-grid">` + p.shots.map((s, i) => `
      <div class="phone reveal reveal-zoom" style="--d: ${i * 0.1}s; --float-d: ${-i * 1.3}s;" data-full="${esc(s.src)}" data-caption="${esc(s.alt)}" role="button" tabindex="0" aria-label="הגדלת ${esc(s.alt)}">
        <div class="phone-island"></div>
        <div class="phone-screen"><img class="shot-img" src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy"></div>
        <div class="phone-glow"></div>
      </div>`).join('') + `</div>`;
  } else {
    gallery = `<div class="pp-phone-grid">
      <div class="phone reveal reveal-zoom">
        <div class="phone-island"></div>
        <div class="phone-screen">
          <span class="phone-brand"><img src="${esc(p.logo)}" alt="${esc(p.name)} logo"><span class="en">${esc(p.name)}</span></span>
        </div>
        <div class="phone-glow"></div>
      </div>
    </div>
    <p class="pp-shot-caption reveal" style="margin-top: 28px;">צילומי מסך מהאפליקציה יתווספו בקרוב — בינתיים, הלוגו שומר על המסלול.</p>`;
  }

  /* ---------- Videos (Tori) ---------- */
  const videos = p.videos ? `
<section data-screen-label="${esc(p.name)} Videos">
  <div class="wrap">
    <div class="section-head center reveal">
      <div class="kicker">Live Demo</div>
      <h2 class="section-title">המערכת בפעולה</h2>
      <p class="section-sub">הקליטות אמיתיות מתוך המערכת — ככה זה מרגיש למשתמש.</p>
    </div>
    <div class="pp-videos-grid">
      ${p.videos.map((v, i) => `
      <div class="pp-video-card glass reveal reveal-zoom" style="--d: ${i * 0.1}s;">
        <video src="${esc(v.src)}" controls muted loop playsinline preload="metadata"></video>
        <div class="pp-video-label">${esc(v.label)}</div>
      </div>`).join('')}
    </div>
  </div>
</section>` : '';

  const navCard = (proj, dir) => `
<a class="pp-nav-card glass ${dir}" href="/project.html?id=${encodeURIComponent(proj.id)}">
  ${dir === 'next' ? `<div><div class="pp-nav-dir">המשימה הבאה ←</div><div class="pp-nav-name">${esc(proj.name)}</div></div>` : ''}
  <span class="mission-logo glass${proj.logoLight ? ' logo-light' : ''}"><img src="${esc(proj.logo)}" alt="${esc(proj.name)} logo" loading="lazy"></span>
  ${dir === 'prev' ? `<div><div class="pp-nav-dir">→ המשימה הקודמת</div><div class="pp-nav-name">${esc(proj.name)}</div></div>` : ''}
</a>`;

  /* ---------- Page ---------- */
  root.innerHTML = `
<section class="pp-hero" data-screen-label="${esc(p.code)} Hero">
  <div class="wrap">
    <div class="pp-logo reveal reveal-zoom${p.logoLight ? ' logo-light' : ''}" style="--d: 0.05s;"><img src="${esc(p.logo)}" alt="${esc(p.name)} logo"></div>
    <div class="kicker pp-kicker reveal" style="--d: 0.15s;">${esc(CAT_LABEL[p.cat])} · ${esc(p.code)}</div>
    <h1 class="pp-title reveal" style="--d: 0.2s;">${esc(p.name)}</h1>
    <div class="pp-he reveal" style="--d: 0.28s;">${esc(p.heName)}</div>
    <p class="pp-tagline reveal" style="--d: 0.34s;">${esc(p.tagline)}</p>
    <div class="chips reveal" style="--d: 0.42s;">${chips}</div>
  </div>
</section>

<section data-screen-label="${esc(p.code)} Briefing" style="padding-block: clamp(40px, 6vw, 80px);">
  <div class="wrap pp-grid">
    <div class="pp-about glass reveal reveal-start">
      <div class="kicker">Mission Briefing</div>
      <h2>על הפרויקט</h2>
      ${about}
    </div>
    <div class="pp-stats glass reveal reveal-end" style="--d: 0.15s;">
      <div class="dash-head"><span>MISSION DATA</span><span class="dash-live">LIVE</span></div>
      ${stats}
    </div>
  </div>
</section>

<section data-screen-label="${esc(p.code)} Gallery">
  <div class="wrap">
    <div class="section-head center reveal">
      <div class="kicker">Visual Log</div>
      <h2 class="section-title">מתוך ${p.cat === 'web' ? 'המערכת' : 'האפליקציה'}</h2>
      <p class="section-sub">${p.shots.length ? 'לחצו על כל מסך כדי להגדיל.' : 'הצצה ראשונה למשימה.'}</p>
    </div>
    ${gallery}
  </div>
</section>

${videos}

<section data-screen-label="Next Mission" style="padding-block: clamp(30px, 5vw, 60px);">
  <div class="wrap">
    <div class="pp-nav reveal">
      ${navCard(prev, 'prev')}
      ${navCard(next, 'next')}
    </div>
  </div>
</section>

<section data-screen-label="CTA" style="padding-block: clamp(30px, 5vw, 70px);">
  <div class="wrap">
    <div class="pp-cta glass reveal reveal-zoom">
      <div class="kicker" style="text-align: center;">Your Mission Next?</div>
      <h2>רוצים פרויקט כזה משלכם?</h2>
      <p>ספרו לנו על הרעיון — ונחזור אליכם עם תוכנית שיגור תוך 24 שעות.</p>
      <div class="mission-actions">
        <a class="btn btn-primary" href="/#contact">בואו נדבר</a>
        <a class="btn btn-ghost" href="/#mobile">לכל הפרויקטים</a>
      </div>
    </div>
  </div>
</section>`;

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lightbox-caption');

  function openLb(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  root.querySelectorAll('[data-full]').forEach((el) => {
    el.addEventListener('click', () => openLb(el.dataset.full, el.dataset.caption));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(el.dataset.full, el.dataset.caption); }
    });
  });

  lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });
  lb.querySelector('.lightbox-close').addEventListener('click', closeLb);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
})();
