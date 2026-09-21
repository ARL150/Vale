/**
 * Confeti ligero en un solo <canvas> (sin dependencias).
 * El canvas se crea al lanzar y se elimina al terminar → cero costo en reposo.
 */

type Shape = 'rect' | 'circle' | 'heart' | 'star';

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: Shape;
  wobble: number;
  life: number;
}

const COLORS = ['#ff8aa6', '#e8506a', '#ffc9d6', '#f4e0a9', '#d4a84b', '#ffffff', '#ffabc0'];
const SHAPES: Shape[] = ['rect', 'rect', 'circle', 'heart', 'heart', 'star'];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let pieces: Piece[] = [];
let raf = 0;
let dpr = 1;

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '70',
  });
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx = canvas.getContext('2d');
  ctx?.scale(dpr, dpr);
  document.body.appendChild(canvas);
}

function drawHeart(c: CanvasRenderingContext2D, s: number) {
  c.beginPath();
  c.moveTo(0, s * 0.35);
  c.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.95, 0, -s * 0.4);
  c.bezierCurveTo(s * 0.5, -s * 0.95, s, -s * 0.3, 0, s * 0.35);
  c.fill();
}

function drawStar(c: CanvasRenderingContext2D, s: number) {
  c.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? s : s * 0.35;
    const a = (Math.PI / 4) * i;
    c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  c.closePath();
  c.fill();
}

function tick() {
  if (!ctx || !canvas) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  pieces = pieces.filter((p) => p.life > 0 && p.y < h + 40);

  for (const p of pieces) {
    p.vy += 0.16; // gravedad
    p.vx *= 0.992;
    p.vy *= 0.992;
    p.x += p.vx + Math.sin(p.wobble) * 0.6;
    p.y += p.vy;
    p.rot += p.vr;
    p.wobble += 0.07;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life / 40);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    else if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'heart') drawHeart(ctx, p.size / 2);
    else drawStar(ctx, p.size / 2);
    ctx.restore();
  }

  if (pieces.length) {
    raf = requestAnimationFrame(tick);
  } else {
    cancelAnimationFrame(raf);
    raf = 0;
    canvas.remove();
    canvas = null;
    ctx = null;
  }
}

export interface ConfettiOptions {
  /** Origen en fracción de pantalla (0–1) */
  x?: number;
  y?: number;
  count?: number;
  /** Fuerza inicial */
  power?: number;
}

export function confetti({ x = 0.5, y = 0.55, count, power = 1 }: ConfettiOptions = {}) {
  if (reduce()) return;
  const small = window.innerWidth < 640;
  const total = Math.round((count ?? 90) * (small ? 0.7 : 1));
  ensureCanvas();

  const ox = x * window.innerWidth;
  const oy = y * window.innerHeight;

  for (let i = 0; i < total; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.15;
    const speed = (4 + Math.random() * 9) * power;
    pieces.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 8 + Math.random() * 9,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: SHAPES[(Math.random() * SHAPES.length) | 0],
      wobble: Math.random() * 6,
      life: 140 + Math.random() * 90,
    });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}

/** Lluvia de confeti desde arriba, para la sección final */
export function confettiRain(duration = 2600) {
  if (reduce()) return;
  const end = performance.now() + duration;
  const step = () => {
    confetti({ x: Math.random(), y: -0.05, count: 10, power: 0.35 });
    if (performance.now() < end) setTimeout(step, 180);
  };
  step();
}

/** Cañones laterales */
export function confettiCannons() {
  confetti({ x: 0.08, y: 0.85, count: 60, power: 1.25 });
  confetti({ x: 0.92, y: 0.85, count: 60, power: 1.25 });
}
