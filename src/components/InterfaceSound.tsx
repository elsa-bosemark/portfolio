import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";

let enabled = true;
try { enabled = localStorage.getItem("portfolio-sound") !== "off"; } catch { /* Storage is optional. */ }
let context: AudioContext | undefined;
const buffers = new Map<string, AudioBuffer>();
const loading = new Set<string>();
const active = new Set<AudioBufferSourceNode>();
const files = ["button-down.mp3", "button-up.mp3", "cursor-tap-muffled-preview.wav"];
const subscribers = new Set<() => void>();
const subscribe = (listener: () => void) => { subscribers.add(listener); return () => { subscribers.delete(listener); }; };
export const useSoundEnabled = () => useSyncExternalStore(subscribe, () => enabled, () => false);

function audio() {
  if (!enabled) return;
  try {
    const Audio = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Audio) return;
    context ??= new Audio({ latencyHint: "interactive" });
    if (context.state === "suspended") void context.resume().catch(() => {});
    return context;
  } catch { return; }
}

function prepare() {
  const ctx = audio();
  if (!ctx) return;
  for (const file of files) {
    if (loading.has(file) || buffers.has(file)) continue;
    loading.add(file);
    void fetch(`${import.meta.env.BASE_URL}sounds/${file}`).then(response => {
      if (!response.ok) throw new Error("Sound unavailable");
      return response.arrayBuffer();
    }).then(data => ctx.decodeAudioData(data)).then(buffer => buffers.set(file, buffer)).catch(() => loading.delete(file));
  }
}

function play(kind: "button" | "cursor" | "in" | "out", strength = 1) {
  const ctx = audio();
  if (!ctx || ctx.state !== "running") return;
  const file = kind === "cursor" ? files[2] : kind === "out" ? files[1] : files[0];
  const buffer = buffers.get(file);
  if (!buffer) { prepare(); return; }
  const voice = ctx.createBufferSource();
  const gain = ctx.createGain();
  voice.buffer = buffer;
  gain.gain.value = (kind === "cursor" ? .6 : .35) * Math.max(0, Math.min(1, strength));
  voice.connect(gain); gain.connect(ctx.destination);
  active.add(voice);
  voice.start();
  voice.onended = () => { active.delete(voice); voice.disconnect(); gain.disconnect(); };
}

export function InterfaceSound() {
  useEffect(() => {
    prepare();
    const unlock = () => { audio(); prepare(); };
    const click = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(".paper-action, .greeting-glass-cursor, .paper-mosaic > button, .paper-case-visual");
      if (!target) return;
      if (!target.closest(".paper-hero-assembly")) return;
      if (target.closest(".paper-contact-row")) return;
      if (target.classList.contains("greeting-glass-cursor")) play("cursor");
      else if (target.parentElement?.classList.contains("paper-mosaic")) {
        if (event.type === "click") return;
        const tile = target as HTMLElement;
        if (!tile.dataset.initialDepth) {
          const shape = tile.querySelector<HTMLElement>(":scope > div[data-node-id]");
          const layers = shape ? [shape, ...shape.querySelectorAll<HTMLElement>("div")] : [];
          const shadow = layers.map(layer => layer.dataset.originalShadow ?? getComputedStyle(layer).boxShadow).find(value => value && value !== "none");
          // SVG quarter shapes start raised; native panels may start inset.
          tile.dataset.initialDepth = shadow?.includes("inset") ? "inset" : "raised";
          if (shadow) {
            const alphas = [...shadow.matchAll(/rgba\([^)]*,\s*([\d.]+)\)/g)].map(match => Number(match[1]));
            tile.dataset.shadowStrength = String(Math.min(1, Math.max(0, ...alphas) / .4));
          }
        }
        const startsInset = tile.dataset.initialDepth === "inset";
        const reversed = tile.getAttribute("aria-pressed") === "true";
        const currentlyInset = startsInset !== reversed;
        play(currentlyInset ? "out" : "in", Number(tile.dataset.shadowStrength ?? 1));
      }
      else play("button");
    };
    document.addEventListener("pointerdown", unlock, { passive: true });
    document.addEventListener("keydown", unlock);
    document.addEventListener("click", click, true);
    document.addEventListener("paper-relief-toggle", click, true);
    return () => { document.removeEventListener("pointerdown", unlock); document.removeEventListener("keydown", unlock); document.removeEventListener("click", click, true); document.removeEventListener("paper-relief-toggle", click, true); };
  }, []);
  return null;
}

export function SoundToggle() {
  const on = useSoundEnabled();
  const button = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const header = button.current?.closest(".portfolio-2027")?.querySelector(".paper-hero-assembly");
    if (!header || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  const toggle = () => {
    enabled = !enabled;
    try { localStorage.setItem("portfolio-sound", enabled ? "on" : "off"); } catch { /* Storage is optional. */ }
    subscribers.forEach(listener => listener());
    if (enabled) { audio(); prepare(); play("button"); }
    else active.forEach(source => { try { source.stop(); } catch { /* Already ended. */ } });
  };
  const Icon = on ? Volume2 : VolumeX;
  return <button ref={button} type="button" className="paper-action paper-action--secondary paper-sound-toggle" data-visible={visible} tabIndex={visible ? 0 : -1} aria-hidden={!visible} onClick={toggle} aria-label={on ? "Mute sound effects" : "Enable sound effects"} aria-pressed={on} title={on ? "Mute sound effects" : "Enable sound effects"}><Icon size={18} aria-hidden="true" /></button>;
}
