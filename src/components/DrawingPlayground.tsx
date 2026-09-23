import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";
import WatercolorPaint from "./WatercolorPaint";
import PaintbrushCursor from "./PaintbrushCursor";

type Point = { x: number; y: number };
type Stroke = { id: number; points: Point[]; partner: boolean; hue?: number };
// Gradient Perlin noise: coherent turns, rather than frame-to-frame randomness.
function perlin(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const dot = (a: number, b: number, dx: number, dy: number) => {
    const angle = ((Math.sin(a * 127.1 + b * 311.7) * 43758.5453) % 1) * Math.PI * 2;
    return Math.cos(angle) * dx + Math.sin(angle) * dy;
  };
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  return mix(mix(dot(ix, iy, fx, fy), dot(ix + 1, iy, fx - 1, fy), fade(fx)), mix(dot(ix, iy + 1, fx, fy - 1), dot(ix + 1, iy + 1, fx - 1, fy - 1), fade(fx)), fade(fy));
}
export default function DrawingPlayground() {
  const { reduced, light } = useDisplayPreferences();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const drawing = useRef(false);
  const area = useRef<HTMLDivElement>(null);
  const frames = useRef(new Map<number, number>());
  const positions = useRef<Point[]>([]);
  const busyUntil = useRef<number[]>([]);
  const sequence = useRef(0);
  const userStroke = useRef(0);
  const nextVisit = useRef(0);
  const current = useRef<Point[]>([]);
  const lastPainter = useRef(-1);
  const gather = (active: boolean) => window.dispatchEvent(new CustomEvent("folio-gather", { detail: active }));
  const partner = (point: Point[] | null) => {
    window.dispatchEvent(new CustomEvent("folio-drawing", { detail: point }));
  };
  const setDrawingActive = (active: boolean) => window.dispatchEvent(new CustomEvent("folio-user-drawing", { detail: active }));
  const stopPartner = () => { frames.current.forEach(cancelAnimationFrame); frames.current.clear(); positions.current = []; busyUntil.current = []; partner(null); setDrawingActive(false); };
  useEffect(() => {
    const stop = () => { drawing.current = false; stopPartner(); };
    window.addEventListener("blur", stop);
    window.addEventListener("scroll", stop, { passive: true });
    return () => { stopPartner(); gather(false); window.removeEventListener("blur", stop); window.removeEventListener("scroll", stop); };
  }, []);
  useEffect(() => { if (reduced) stopPartner(); }, [reduced]);
  const pointAt = (event: PointerEvent) => {
    const rect = area.current!.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width * 1000, y: (event.clientY - rect.top) / rect.height * 260 };
  };
  const response = (points: Point[]) => {
    if (points.length < 2) return;
    const now = performance.now();
    if (now < nextVisit.current || frames.current.size >= 2) return;
    const available = Array.from({ length: 10 }, (_, i) => i).filter(i => i !== lastPainter.current && (busyUntil.current[i] ?? 0) < now);
    const painter = available[Math.floor(Math.random() * available.length)];
    if (painter === undefined) return;
    lastPainter.current = painter;
    nextVisit.current = now + 1100 + Math.random() * 1000;
    const center = points.reduce((a, p) => ({ x: a.x + p.x / points.length, y: a.y + p.y / points.length }), { x: 0, y: 0 });
    const first = points[0], last = points[points.length - 1];
    const direction = Math.atan2(last.y - first.y, (last.x - first.x) * .3);
    const energy = Math.min(1, points.reduce((sum, p, i) => i ? sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y) : 0, 0) / 500);
    const seed = Math.random() * 1000 + center.x * .013 + center.y * .019;
    const answers = Array.from({ length: 1 }, () => {
      const bird = painter;
      const phase = Math.random() * Math.PI * 2;
      const cx = 180 + Math.random() * 640;
      const cy = 90 + Math.random() * 120;
      const gesture = Math.floor(Math.random() * 4);
      return Array.from({ length: 180 }, (_, step) => {
        const t = step / 179, a = phase + direction + t * Math.PI * (1.1 + bird % 3 * .45);
        const noise = perlin(t * 1.8 + seed, bird * .7) * 18;
        let dx: number, dy: number;
        switch (gesture) {
          case 0: { // Broad opening spirals.
            const radius = 25 + t * (65 + energy * 35);
            dx = Math.cos(a) * radius; dy = Math.sin(a) * radius * .48; break;
          }
          case 1: // Long, gently waving ribbons.
            dx = (t - .5) * 260; dy = Math.sin(t * Math.PI * 2 + phase) * 36; break;
          case 2: // Small looping flourishes.
            dx = Math.sin(a) * 95; dy = Math.sin(a * 2) * 30; break;
          default: // Sweeping crescent washes.
            dx = Math.cos(a) * 135; dy = Math.sin(a) * 52; break;
        }
        return { x: Math.max(40, Math.min(960, cx + dx + noise)), y: Math.max(65, Math.min(240, cy + dy + noise * .3)) };
      });
    });
    // Each cursor keeps its own pigment even as the visitor order changes.
    const colors = [174, 54, 218, 325, 18, 280, 85, 350, 195, 145];
    const id = ++sequence.current;
    const layers = answers.map(answer => ({ id, points: reduced ? answer : [], partner: true, hue: colors[painter] }));
    setStrokes(s => [...s, ...layers]);
    if (reduced) return;
    const started = performance.now();
    const arrival = 950;
    const painting = 1400 + Math.random() * 900;
    // Each visit has its own departure; new drawing never resets its clock.
    const linger = Math.random() < .3 ? 120 : 650 + Math.random() * 350;
    const departure = arrival + painting + linger;
    busyUntil.current[painter] = started + departure + 2200;
    const tick = (now: number) => {
      // Give the partner time to arrive, then release pigment promptly.
      const elapsed = now - started;
      const progress = Math.max(0, (elapsed - arrival) / painting);
      const counts = answers.map((answer, i) => {
        const p = Math.max(0, Math.min(1, (progress - i * .045) / (1 + i % 3 * .1)));
        return Math.ceil(p * p * (3 - 2 * p) * answer.length);
      });
      setStrokes(s => s.map(stroke => stroke.id === id ? { ...stroke, points: answers[0].slice(0, counts[0]) } : stroke));
      const rect = area.current?.getBoundingClientRect();
      if (rect) {
        // Travel with the growing stroke rather than hovering at its start.
        const tip = answers[0][Math.max(0, counts[0] - 1)];
        positions.current[painter] = { x: rect.left + tip.x / 1000 * rect.width, y: rect.top + tip.y / 260 * rect.height };
        partner([...positions.current]);
      }
      if (elapsed < departure) frames.current.set(painter, requestAnimationFrame(tick));
      else {
        frames.current.delete(painter);
        delete positions.current[painter];
        partner([...positions.current]);
      }
    };
    frames.current.set(painter, requestAnimationFrame(tick));
  };
  const finish = () => { if (!drawing.current) return; drawing.current = false; setDrawingActive(false); response(current.current); };
  const leave = () => { finish(); current.current = []; };
  return <div ref={area} className="drawing-playground">
    <PaintbrushCursor />
    <WatercolorPaint strokes={strokes} reduced={reduced} light={light} />
    <svg className="drawing-surface" viewBox="0 0 1000 260" preserveAspectRatio="none" role="img" aria-label="Collaborative watercolor, your violet strokes and a rotating partner’s colored strokes"
      onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.releasePointerCapture?.(event.pointerId); gather(true); drawing.current = true; setDrawingActive(true); current.current = [pointAt(event)]; const id = ++sequence.current; userStroke.current = id; setStrokes(s => [...s, { id, points: current.current, partner: false }]); }}
      onPointerMove={event => { if (!drawing.current) return; const p = pointAt(event); current.current = [...current.current, p]; const points = current.current; const id = userStroke.current; setStrokes(s => s.map(stroke => stroke.id === id ? { ...stroke, points } : stroke)); if (points.length >= 5) response(points.slice(-60)); }}
      onPointerUp={finish} onPointerCancel={leave} onPointerLeave={leave}>
    </svg>
    {!strokes.length && <span className="drawing-hint">Try Drawing</span>}
    <div className="drawing-controls">
      {!!strokes.length && <button onClick={() => { drawing.current = false; current.current = []; stopPartner(); gather(false); nextVisit.current = 0; setStrokes([]); }}>Clear drawing</button>}
    </div>
  </div>;
}
