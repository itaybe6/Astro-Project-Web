/* ============================================================
   ASTRO PROJECT — homepage renderer
   Renders real projects (from projects-data.js) into the
   web / mobile / tori sections + clients logo marquee.
   Runs synchronously BEFORE astro-main.js so reveal/tilt/counter
   hooks pick the elements up.
   ============================================================ */
(function () {
  const ALL = window.ASTRO_PROJECTS || [];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const pageFor = (p) => '/project.html?id=' + encodeURIComponent(p.id);
  const pad2 = (n) => String(n).padStart(2, '0');

  const chipsHtml = (feats, max) =>
    feats.slice(0, max).map((f) => `<span class="chip">${esc(f)}</span>`).join('');

  const logoBadge = (p) =>
    `<span class="mission-logo glass"><img src="${esc(p.logo)}" alt="${esc(p.name)} logo" loading="lazy"></span>`;

  /* Compact animated stats strip inside each mission card */
  const miniStats = (p) =>
    `<div class="mini-stats">` +
    p.stats.slice(0, 3).map((s) => `
      <div class="mini-stat">
        <span class="mini-num en"><span data-count="${esc(s.num)}">0</span>${s.suffix ? `<span class="suffix">${esc(s.suffix)}</span>` : ''}</span>
        <span class="mini-label">${esc(s.label)}</span>
      </div>`).join('') +
    `</div>`;

  /* ---------- Web missions: layered browser mockup + copy ---------- */
  function webMission(p, i) {
    const flip = i % 2 === 1;
    const shot = p.shots[0];
    const peek = p.shots[1];
    const peekHtml = peek
      ? `<span class="shot-peek glass" aria-hidden="true"><img src="${esc(peek.src)}" alt="" loading="lazy"></span>`
      : '';
    return `
<article class="mission ${flip ? 'flip' : ''}" data-screen-label="${esc(p.code)} ${esc(p.name)}">
  <span class="mission-index en" aria-hidden="true">${pad2(i + 1)}</span>
  <div class="mission-media reveal ${flip ? 'reveal-end' : 'reveal-start'}">
    <div class="shot-stack">
      ${peekHtml}
      <a class="browser tilt mission-shot-link" href="${pageFor(p)}" aria-label="לעמוד הפרויקט ${esc(p.name)}">
        <div class="browser-bar">
          <div class="dots"><i></i><i></i><i></i></div>
          <div class="url-pill">${esc(p.url)}</div>
        </div>
        <div class="browser-screen">
          <img class="shot-img" src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy">
          <span class="shot-overlay"><span class="shot-overlay-text">לעמוד המשימה ←</span></span>
        </div>
      </a>
    </div>
  </div>
  <div class="mission-copy reveal ${flip ? 'reveal-start' : 'reveal-end'}" style="--d: 0.15s;">
    <div class="mission-head">
      ${logoBadge(p)}
      <div>
        <div class="mission-code">MISSION · ${esc(p.code)}</div>
        <h3 class="mission-name">${esc(p.name)}</h3>
      </div>
    </div>
    <div class="mission-he">${esc(p.heName)}</div>
    <p class="mission-tagline">${esc(p.tagline)}</p>
    <p class="mission-desc">${esc(p.desc)}</p>
    <div class="chips">${chipsHtml(p.features, 4)}</div>
    ${miniStats(p)}
    <div class="mission-actions">
      <a class="btn btn-primary btn-sm" href="${pageFor(p)}">צללו לעמוד המשימה</a>
    </div>
  </div>
</article>`;
  }

  /* ---------- Mobile missions: phone fleet + copy ---------- */
  function phone(shotHtml, cls, floatD) {
    return `
<div class="phone ${cls}" ${floatD ? `style="--float-d: ${floatD};"` : ''}>
  <div class="phone-island"></div>
  <div class="phone-screen">${shotHtml}</div>
  <div class="phone-glow"></div>
</div>`;
  }

  function mobileMission(p, i) {
    const flip = i % 2 === 1;
    const shots = p.shots;
    let stage;
    if (shots.length === 0) {
      /* no screenshots — branded logo screen */
      stage = phone(
        `<span class="phone-brand"><img src="${esc(p.logo)}" alt="${esc(p.name)} logo" loading="lazy"><span class="en">${esc(p.name)}</span></span>`,
        'tilt'
      );
    } else if (shots.length < 3) {
      stage = phone(`<img class="shot-img" src="${esc(shots[0].src)}" alt="${esc(shots[0].alt)}" loading="lazy">`, 'tilt');
      if (shots[1]) stage = phone(`<img class="shot-img" src="${esc(shots[1].src)}" alt="${esc(shots[1].alt)}" loading="lazy">`, 'back lean-l', '-2.2s') + stage;
    } else {
      stage =
        phone(`<img class="shot-img" src="${esc(shots[1].src)}" alt="${esc(shots[1].alt)}" loading="lazy">`, 'back lean-l', '-3s') +
        phone(`<img class="shot-img" src="${esc(shots[0].src)}" alt="${esc(shots[0].alt)}" loading="lazy">`, 'tilt') +
        phone(`<img class="shot-img" src="${esc(shots[2].src)}" alt="${esc(shots[2].alt)}" loading="lazy">`, 'back lean-r', '-1.4s');
    }
    return `
<article class="mission ${flip ? 'flip' : ''}" data-screen-label="${esc(p.code)} ${esc(p.name)}">
  <span class="mission-index en" aria-hidden="true">${pad2(i + 1)}</span>
  <div class="mission-media reveal reveal-zoom">
    <a class="fleet-stage mission-shot-link" href="${pageFor(p)}" aria-label="לעמוד הפרויקט ${esc(p.name)}">${stage}</a>
  </div>
  <div class="mission-copy reveal ${flip ? 'reveal-start' : 'reveal-end'}" style="--d: 0.15s;">
    <div class="mission-head">
      ${logoBadge(p)}
      <div>
        <div class="mission-code">MISSION · ${esc(p.code)}</div>
        <h3 class="mission-name">${esc(p.name)}</h3>
      </div>
    </div>
    <div class="mission-he">${esc(p.heName)}</div>
    <p class="mission-tagline">${esc(p.tagline)}</p>
    <p class="mission-desc">${esc(p.desc)}</p>
    <div class="chips">${chipsHtml(p.features, 4)}</div>
    ${miniStats(p)}
    <div class="mission-actions">
      <a class="btn btn-primary btn-sm" href="${pageFor(p)}">צללו לעמוד המשימה</a>
    </div>
  </div>
</article>`;
  }

  /* ---------- Tori spotlight (SaaS) ---------- */
  function toriSpotlight(p) {
    const videoChips = p.videos.map((v, i) =>
      `<button class="tori-video-chip ${i === 0 ? 'active' : ''}" type="button" data-video="${esc(v.src)}">${esc(v.label)}</button>`
    ).join('');
    const stats = p.stats.map((s) => `
      <div class="tori-stat">
        <div class="stat-num"><span>${esc(s.num)}</span>${s.suffix ? `<span class="suffix">${esc(s.suffix)}</span>` : ''}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`).join('');
    return `
<div class="tori-panel glass reveal reveal-zoom">
  <div class="tori-copy">
    <div class="tori-head">
      ${logoBadge(p)}
      <div>
        <div class="mission-code">FLAGSHIP · ${esc(p.code)}</div>
        <h3 class="mission-name">${esc(p.name)}</h3>
      </div>
    </div>
    <p class="mission-desc" style="max-width: none;">${esc(p.desc)}</p>
    <div class="chips">${chipsHtml(p.features, 6)}</div>
    <div class="tori-stats">${stats}</div>
    <div class="mission-actions">
      <a class="btn btn-primary" href="${pageFor(p)}">לעמוד Tori המלא</a>
      <a class="btn btn-ghost" href="#contact">אני רוצה אפליקציה לעסק</a>
    </div>
  </div>
  <div class="tori-demo">
    <div class="tori-video-frame">
      <video id="tori-video" src="${esc(p.videos[0].src)}" autoplay muted loop playsinline preload="metadata"></video>
    </div>
    <div class="tori-video-chips">${videoChips}</div>
  </div>
</div>`;
  }

  /* ---------- Clients logo marquee ---------- */
  function clientsMarquee() {
    const item = (p) => `
<a class="marquee-item" href="${pageFor(p)}" aria-label="${esc(p.name)}">
  <img src="${esc(p.logo)}" alt="${esc(p.name)} logo" loading="lazy">
  <span class="marquee-name en">${esc(p.name)}</span>
</a>`;
    const items = ALL.map(item).join('');
    /* content duplicated for a seamless infinite loop */
    return `
<div class="marquee" aria-label="הלקוחות שלנו">
  <div class="marquee-track">
    ${items}${items}
  </div>
</div>`;
  }

  /* ---------- Render ---------- */
  const webRoot = document.getElementById('web-missions');
  const mobRoot = document.getElementById('mobile-missions');
  const toriRoot = document.getElementById('tori-spotlight');
  const clientsRoot = document.getElementById('clients-strip');
  const clientsRoot2 = document.getElementById('clients-strip-2');

  if (webRoot) webRoot.innerHTML = ALL.filter((p) => p.cat === 'web').map(webMission).join('');
  if (mobRoot) mobRoot.innerHTML = ALL.filter((p) => p.cat === 'mobile').map(mobileMission).join('');
  const tori = ALL.find((p) => p.cat === 'saas');
  if (toriRoot && tori) toriRoot.innerHTML = toriSpotlight(tori);
  if (clientsRoot) clientsRoot.innerHTML = clientsMarquee();
  if (clientsRoot2) clientsRoot2.innerHTML = clientsMarquee();

  /* Tori video switcher */
  if (toriRoot) {
    const video = document.getElementById('tori-video');
    toriRoot.querySelectorAll('.tori-video-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (video.getAttribute('src') === btn.dataset.video) return;
        toriRoot.querySelectorAll('.tori-video-chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        video.style.opacity = '0';
        setTimeout(() => {
          video.src = btn.dataset.video;
          video.play().catch(() => {});
          video.style.opacity = '1';
        }, 220);
      });
    });
  }
})();
