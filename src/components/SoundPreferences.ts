import { useSyncExternalStore } from "react";

let enabled = true;
try { enabled = localStorage.getItem("portfolio-sound") !== "off"; } catch { /* Storage may be unavailable. */ }
const listeners = new Set<() => void>();
const audio = new Set<HTMLAudioElement>();
export const isSoundEnabled = () => enabled;
export function trackSound(element: HTMLAudioElement) {
  audio.add(element);
  return () => audio.delete(element);
}
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function toggleSound() {
  enabled = !enabled;
  try { localStorage.setItem("portfolio-sound", enabled ? "on" : "off"); } catch { /* Keep working without storage. */ }
  if (!enabled) audio.forEach(element => element.pause());
  listeners.forEach(listener => listener());
}
export function useSoundEnabled() { return useSyncExternalStore(subscribe, isSoundEnabled); }
