import { useEffect, useRef } from "react";
import { Color } from "three";

export type PaintStroke = { points: { x: number; y: number }[]; partner: boolean; hue?: number };
// A small wet-paper solver. Mobile pigment diffuses through water and deposits
// into the paper as it dries; RGB absorption mixes pigments subtractively.
export default function WatercolorPaint({ strokes, reduced, light }: { strokes: PaintStroke[]; reduced: boolean; light: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const input = useRef({ strokes, reduced, light });
  input.current = { strokes, reduced, light };
  useEffect(() => {
    const width = 400, height = 130, size = width * height;
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    let wet = new Float32Array(size * 4), next = new Float32Array(size * 4);
    const transported = new Float32Array(size * 4);
    // Curl of a multi-scale stream function: circulating eddies without
    // pushing everything outward or compressing it into a single blob.
    const flowX = new Float32Array(size), flowY = new Float32Array(size);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const i = y * width + x;
      flowX[i] = .65 * Math.sin(x * .047) * Math.cos(y * .065)
        + .3 * Math.sin(x * .105 + 1.3) * Math.cos(y * .12 + .7);
      flowY[i] = -.47 * Math.cos(x * .047) * Math.sin(y * .065)
        - .26 * Math.cos(x * .105 + 1.3) * Math.sin(y * .12 + .7);
    }
    const dry = new Float32Array(size * 3);
    const paper = Float32Array.from({ length: size }, (_, i) => .65 + .35 * (Math.sin(i * 127.1) * 43758.5453 % 1 + 1) / 2);
    const pixels = ctx.createImageData(width, height);
    let consumed: number[] = [], raf = 0, last = 0, activeUntil = 0, previousLight = light;
    const dab = (x: number, y: number, hue: number, amount: number) => {
      const color = new Color().setHSL(((hue % 360) + 360) % 360 / 360, .78, .56);
      const absorption = [color.r, color.g, color.b].map(c => -Math.log(.12 + .88 * c));
      const radius = 8.5;
      for (let py = Math.max(0, Math.floor(y - radius)); py <= Math.min(height - 1, y + radius); py++) {
        for (let px = Math.max(0, Math.floor(x - radius)); px <= Math.min(width - 1, x + radius); px++) {
          const i = py * width + px, d = Math.hypot((px - x) / radius, (py - y) / radius);
          if (d > 1) continue;
          const deposit = Math.pow(1 - d * d, 1.5) * amount * paper[i];
          wet[i * 4] = Math.min(3, wet[i * 4] + deposit * 4);
          for (let c = 0; c < 3; c++) wet[i * 4 + c + 1] += absorption[c] * deposit * .22;
        }
      }
    };
    const step = () => {
      // Backtrace wet pigment through the curl field; dried pigment stays put.
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const sx = Math.max(0, Math.min(width - 1.001, x - flowX[i]));
        const sy = Math.max(0, Math.min(height - 1.001, y - flowY[i]));
        const ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy;
        const a = (iy * width + ix) * 4, b = a + width * 4;
        for (let c = 0; c < 4; c++) {
          transported[i * 4 + c] = (wet[a + c] * (1 - fx) + wet[a + 4 + c] * fx) * (1 - fy)
            + (wet[b + c] * (1 - fx) + wet[b + 4 + c] * fx) * fy;
        }
      }
      wet.set(transported);
      next.set(wet);
      for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
        const i = y * width + x, a = i * 4;
        for (const j of [i + 1, i + width]) {
          const b = j * 4;
          const mobility = Math.min(.11, (wet[a] + wet[b]) * .18) * Math.min(paper[i], paper[j]);
          for (let c = 0; c < 4; c++) {
            const flow = (wet[a + c] - wet[b + c]) * (c ? mobility : .23);
            next[a + c] -= flow; next[b + c] += flow;
          }
        }
      }
      for (let i = 0; i < size; i++) {
        const a = i * 4;
        next[a] = Math.max(0, next[a] * .996 - .00025);
        // More pigment settles along drier edges and rougher paper fibers.
        const settle = next[a] < .012 ? .12 : .001 + (1 - paper[i]) * .003;
        for (let c = 0; c < 3; c++) {
          const pigment = Math.max(0, next[a + c + 1]);
          dry[i * 3 + c] += pigment * settle;
          next[a + c + 1] = pigment * (1 - settle);
        }
      }
      [wet, next] = [next, wet];
    };
    const render = () => {
      for (let i = 0; i < size; i++) {
        const density = [0, 1, 2].map(c => dry[i * 3 + c] + wet[i * 4 + c + 1]);
        const strength = Math.max(...density), alpha = 1 - Math.exp(-strength * 2.2);
        for (let c = 0; c < 3; c++) {
          const pigment = Math.exp(-density[c] * 2.2);
          const channel = alpha > .0001 ? (pigment - (1 - alpha)) / alpha : 1;
          pixels.data[i * 4 + c] = 255 * (input.current.light ? channel : .25 + channel * .75);
        }
        pixels.data[i * 4 + 3] = 255 * alpha * (.92 + paper[i] * .08);
      }
      ctx.putImageData(pixels, 0, 0);
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 33 || document.hidden) return;
      last = now;
      const state = input.current;
      let changed = previousLight !== state.light;
      previousLight = state.light;
      if (!state.strokes.length && consumed.length) {
        wet.fill(0); next.fill(0); dry.fill(0); consumed = []; activeUntil = 0; changed = true;
      }
      state.strokes.forEach((stroke, index) => {
        const from = consumed[index] ?? 0;
        for (let p = from; p < stroke.points.length; p++) {
          const end = stroke.points[p], start = stroke.points[Math.max(0, p - 1)];
          const dx = (end.x - start.x) * width / 1000, dy = (end.y - start.y) * height / 260;
          const count = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 1.5));
          for (let n = 1; n <= count; n++) dab(start.x * width / 1000 + dx * n / count, start.y * height / 260 + dy * n / count, stroke.hue ?? 255, stroke.partner ? .18 : .3);
          changed = true; activeUntil = now + 12000;
        }
        consumed[index] = stroke.points.length;
      });
      if (state.reduced) {
        if (changed) { for (let n = 0; n < 24; n++) step(); render(); }
      } else if (changed || now < activeUntil) { step(); step(); step(); render(); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvas} width={400} height={130} className="watercolor-paint" aria-hidden="true" />;
}
