/* ============================================================
   ASTRO PROJECT — page behaviors
   nav glass, reveal-on-scroll, counters, 3D tilt, form validation
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar glass on scroll ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth page-to-page transitions ---------- */
  if (!reduceMotion) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const url = new URL(a.getAttribute('href'), location.href);
      if (url.origin !== location.origin) return;
      /* same-page anchors scroll as usual — only real page changes fade */
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => { location.href = url.href; }, 240);
    });

    /* restore visibility when coming back via the browser back/forward cache */
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) document.body.classList.remove('page-leave');
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector('.nav-burger');
  if (burger) {
    const closeMenu = () => {
      nav.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });
    /* tap outside the menu / Escape closes it */
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('menu-open')) return;
      if (e.target.closest('.nav')) return;
      closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('menu-open')) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const pending = new Set(document.querySelectorAll('.reveal, .constellation'));

  function inView(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  }

  function revealEl(el) {
    el.classList.add('in');
    pending.delete(el);
    revealObs.unobserve(el);
  }

  const revealObs = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) revealEl(en.target);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  /* Synchronous pass for above-the-fold content (works even when
     IntersectionObserver is throttled), then observe the rest. */
  function revealCheck() {
    for (const el of [...pending]) {
      if (inView(el)) revealEl(el);
    }
  }

  pending.forEach((el) => revealObs.observe(el));
  setTimeout(revealCheck, 80); /* after first paint, so entrance transitions still play */

  /* Scroll-event fallback in case IO never fires */
  window.addEventListener('scroll', revealCheck, { passive: true });
  window.__revealCheck = revealCheck;

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const dur = 1800;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    }
    if (reduceMotion) { el.textContent = el.dataset.count; return; }
    requestAnimationFrame(tick);
  }

  const countObs = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        animateCount(en.target);
        countObs.unobserve(en.target);
      }
    }
  }, { threshold: 0.6 });

  const pendingCounts = new Set(document.querySelectorAll('[data-count]'));
  pendingCounts.forEach((el) => countObs.observe(el));

  /* Counter fallback mirroring revealCheck */
  window.addEventListener('scroll', () => {
    for (const el of [...pendingCounts]) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        pendingCounts.delete(el);
        countObs.unobserve(el);
        animateCount(el);
      }
    }
  }, { passive: true });

  /* ---------- 3D tilt on mockups ---------- */
  if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach((el) => {
      let raf = null;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -8}deg)`;
        });
      });
      el.addEventListener('pointerleave', () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 600);
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('.field[data-required]').forEach((f) => {
        const input = f.querySelector('input, textarea');
        let valid = input.value.trim().length > 0;
        if (valid && input.type === 'email') {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        f.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (ok) {
        form.querySelector('.form-success').classList.add('show');
        form.querySelector('button[type="submit"]').disabled = true;
        form.querySelector('button[type="submit"]').style.opacity = 0.5;
      }
    });

    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.field').classList.remove('invalid');
      });
    });
  }
})();
