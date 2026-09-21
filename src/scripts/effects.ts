/**
 * Efectos compartidos: reveal al hacer scroll, corazones/destellos, parallax ligero.
 * Todo usa solo transform/opacity y se pausa cuando no está en pantalla.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.matchMedia('(max-width: 640px)').matches;

const HEART_COLORS = ['#ffabc0', '#ff8aa6', '#e8506a', '#ffc9d6', '#f4e0a9'];
const SPARK_COLORS = ['#d4a84b', '#f4e0a9', '#ffffff', '#ffc9d6'];
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

/* ───── Corazones y destellos ───── */
function populate(container: HTMLElement) {
  const hearts = Number(container.dataset.hearts ?? 0);
  const sparks = Number(container.dataset.sparks ?? 0);
  const factor = small ? 0.6 : 1;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < Math.round(hearts * factor); i++) {
    const el = document.createElement('span');
    el.className = 'fx-heart';
    el.textContent = '♥';
    el.style.cssText = [
      `--x:${rand(2, 96).toFixed(1)}%`,
      `--s:${rand(12, 30).toFixed(0)}px`,
      `--d:${rand(9, 17).toFixed(1)}s`,
      `--delay:-${rand(0, 16).toFixed(1)}s`,
      `--sway:${rand(-40, 40).toFixed(0)}px`,
      `--o:${rand(0.35, 0.8).toFixed(2)}`,
      `--c:${pick(HEART_COLORS)}`,
    ].join(';');
    frag.appendChild(el);
  }

  for (let i = 0; i < Math.round(sparks * factor); i++) {
    const el = document.createElement('span');
    el.className = 'fx-spark';
    el.style.cssText = [
      `--x:${rand(3, 95).toFixed(1)}%`,
      `--y:${rand(4, 94).toFixed(1)}%`,
      `--s:${rand(8, 18).toFixed(0)}px`,
      `--d:${rand(2.4, 5).toFixed(1)}s`,
      `--delay:-${rand(0, 5).toFixed(1)}s`,
      `--c:${pick(SPARK_COLORS)}`,
    ].join(';');
    frag.appendChild(el);
  }

  container.appendChild(frag);
}

function initFx() {
  const containers = document.querySelectorAll<HTMLElement>('.fx');
  if (reduce) return;
  containers.forEach(populate);

  // Pausa las animaciones de los contenedores fuera de pantalla (ahorra batería/CPU)
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.classList.toggle('is-paused', !e.isIntersecting);
    },
    { rootMargin: '80px' },
  );
  containers.forEach((c) => io.observe(c));
}

/* ───── Reveal al hacer scroll ───── */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  items.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--delay', `${el.dataset.delay}ms`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

/* ───── Parallax muy ligero ───── */
function initParallax() {
  if (reduce) return;
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!items.length) return;

  const visible = new Set<HTMLElement>();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) visible.add(el);
      else visible.delete(el);
    }
    update();
  });
  items.forEach((el) => io.observe(el));

  let ticking = false;
  function update() {
    ticking = false;
    const vh = window.innerHeight;
    visible.forEach((el) => {
      const speed = Number(el.dataset.parallax);
      const rect = el.parentElement!.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

/* ───── Corazón al tocar (exportado para otros componentes) ─────
 * Usa un pool de elementos reutilizables y la Web Animations API:
 * solo transform/opacity (compuestos en GPU), sin crear nodos ni tocar layout al tocar. */
const POOL_SIZE = 10;
let pool: HTMLElement[] = [];
let poolIdx = 0;

function ensurePool() {
  if (pool.length) return;
  for (let i = 0; i < POOL_SIZE; i++) {
    const el = document.createElement('span');
    el.className = 'pop-heart';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    pool.push(el);
  }
}

export function popHearts(x: number, y: number, n = 3) {
  if (reduce) return;
  ensurePool();
  for (let i = 0; i < n; i++) {
    const el = pool[poolIdx++ % POOL_SIZE];
    el.getAnimations().forEach((a) => a.cancel());
    el.style.backgroundColor = pick(HEART_COLORS);
    const px = x + rand(-14, 14) - 11;
    const py = y + rand(-8, 8) - 11;
    const dx = rand(-40, 40);
    el.animate(
      [
        { transform: `translate3d(${px}px, ${py}px, 0) scale(0.3)`, opacity: 0 },
        { transform: `translate3d(${px + dx * 0.4}px, ${py - 46}px, 0) scale(1.25)`, opacity: 1, offset: 0.25 },
        { transform: `translate3d(${px + dx}px, ${py - 130}px, 0) scale(0.8)`, opacity: 0 },
      ],
      { duration: 900, delay: i * 80, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
    );
  }
}

/* ───── Enlaces de scroll suave (funciona también en Safari viejo) ───── */
function initScrollLinks() {
  document.querySelectorAll<HTMLElement>('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const behavior = reduce ? 'auto' : 'smooth';
      const to = btn.dataset.scrollTo!;
      if (to === 'top') window.scrollTo({ top: 0, behavior });
      else document.querySelector(to)?.scrollIntoView({ behavior, block: 'start' });
    });
  });
}

initFx();
initReveal();
initParallax();
initScrollLinks();
