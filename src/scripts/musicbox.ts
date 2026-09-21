/**
 * Cajita de música romántica generada con Web Audio (sin archivos, sin dependencias).
 * Progresión tipo Canon en Re: arpegios, melodía, cuerdas suaves y reverb.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// Progresión tipo "Canon en Re" (Pachelbel, dominio público): D – A – Bm – F#m – G – D – G – A
// Cada compás: notas del acorde (MIDI) y melodía (una nota por tiempo, 0 = silencio)
const D = [62, 66, 69, 74];
const A = [57, 61, 64, 69];
const Bm = [59, 62, 66, 71];
const Fs = [54, 57, 61, 66];
const G = [55, 59, 62, 67];
const BARS: { chord: number[]; melody: number[] }[] = [
  // primera vuelta: la melodía descendente del Canon, nota larga por compás
  { chord: D, melody: [78, 0, 0, 0] },
  { chord: A, melody: [76, 0, 0, 0] },
  { chord: Bm, melody: [74, 0, 0, 0] },
  { chord: Fs, melody: [73, 0, 0, 0] },
  { chord: G, melody: [71, 0, 0, 0] },
  { chord: D, melody: [69, 0, 0, 0] },
  { chord: G, melody: [71, 0, 0, 0] },
  { chord: A, melody: [73, 0, 0, 0] },
  // segunda vuelta: melodía más viva y brillante
  { chord: D, melody: [81, 78, 74, 78] },
  { chord: A, melody: [80, 76, 73, 76] },
  { chord: Bm, melody: [78, 74, 71, 74] },
  { chord: Fs, melody: [78, 73, 69, 73] },
  { chord: G, melody: [79, 74, 71, 74] },
  { chord: D, melody: [78, 81, 86, 81] },
  { chord: G, melody: [79, 83, 86, 83] },
  { chord: A, melody: [85, 0, 81, 0] },
];
const ARP = [0, 1, 2, 3, 2, 1, 2, 3]; // patrón de corcheas dentro del compás

export class MusicBox {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private pad!: GainNode;
  private timer = 0;
  private next = 0;
  private step = 0;
  private readonly EIGHTH = 60 / 72 / 2; // ≈ 72 bpm
  constructor(private volume = 0.6) {}

  private init() {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AC();
    const ctx = this.ctx;

    this.master = ctx.createGain();
    this.master.gain.value = 0;

    // Eco suave para dar brillo tipo cajita de música
    const delay = ctx.createDelay(1);
    delay.delayTime.value = this.EIGHTH * 3;
    const fb = ctx.createGain();
    fb.gain.value = 0.32;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 2600;
    delay.connect(tone).connect(fb).connect(delay);

    // Reverb generada (ruido con decaimiento) para sensación de sala
    const reverb = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 3);
    const impulse = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = impulse.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    reverb.buffer = impulse;
    const rvGain = ctx.createGain();
    rvGain.gain.value = 0.55;
    this.master.connect(reverb).connect(rvGain).connect(ctx.destination);

    // Colchón de cuerdas suaves
    this.pad = ctx.createGain();
    this.pad.gain.value = 1;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 1100;
    this.pad.connect(padFilter).connect(this.master);

    this.master.connect(ctx.destination);
    this.master.connect(delay);
    const wet = ctx.createGain();
    wet.gain.value = 0.45;
    tone.connect(wet).connect(ctx.destination);
  }

  private note(freq: number, when: number, gain: number, dur = 1.8) {
    const ctx = this.ctx!;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.exponentialRampToValueAtTime(gain, when + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    env.connect(this.master);

    // fundamental + armónico agudo = timbre metálico de cajita de música
    const parts: [number, number][] = [
      [1, 1],
      [4, 0.22],
    ];
    for (const [mult, amp] of parts) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq * mult;
      g.gain.value = amp;
      osc.connect(g).connect(env);
      osc.start(when);
      osc.stop(when + dur + 0.05);
    }
  }

  /** Acorde sostenido con ataque lento (sonido de cuerdas) */
  private padChord(notes: number[], when: number, dur: number) {
    const ctx = this.ctx!;
    for (const n of notes) {
      for (const detune of [-6, 6]) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = midi(n);
        osc.detune.value = detune;
        g.gain.setValueAtTime(0.0001, when);
        g.gain.exponentialRampToValueAtTime(0.012, when + 0.9);
        g.gain.setValueAtTime(0.012, when + dur - 0.3);
        g.gain.exponentialRampToValueAtTime(0.0001, when + dur + 0.9);
        osc.connect(g).connect(this.pad);
        osc.start(when);
        osc.stop(when + dur + 1);
      }
    }
  }

  private schedule = () => {
    const ctx = this.ctx!;
    while (this.next < ctx.currentTime + 0.5) {
      const stepInBar = this.step % 8;
      const bar = BARS[Math.floor(this.step / 8) % BARS.length];

      // arpegio (una octava arriba del acorde)
      this.note(midi(bar.chord[ARP[stepInBar]] + 12), this.next, 0.09);
      // bajo al inicio del compás
      if (stepInBar === 0) {
        this.note(midi(bar.chord[0] - 12), this.next, 0.13, 3);
        this.padChord(bar.chord.slice(0, 3), this.next, this.EIGHTH * 8);
      }
      // melodía en cada tiempo
      if (stepInBar % 2 === 0) {
        const m = bar.melody[stepInBar / 2];
        if (m) this.note(midi(m), this.next, 0.17, this.step % 128 < 64 ? 3.2 : 2.2);
      }

      this.next += this.EIGHTH;
      this.step++;
    }
    this.timer = window.setTimeout(this.schedule, 100);
  };

  async start() {
    if (!this.ctx) this.init();
    const ctx = this.ctx!;
    await ctx.resume();
    clearTimeout(this.timer);
    this.next = ctx.currentTime + 0.1;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(this.volume, ctx.currentTime + 1.2);
    this.schedule();
  }

  stop() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    clearTimeout(this.timer);
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    setTimeout(() => ctx.suspend(), 700);
  }
}
