import { useSyncExternalStore } from "react";

let enabled = true;
try { enabled = localStorage.getItem("portfolio-sound") !== "off"; } catch { /* Storage may be unavailable. */ }
const listeners = new Set<() => void>();
export const isSoundEnabled = () => enabled;
export function subscribeSound(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function toggleSound() {
  enabled = !enabled;
  try { localStorage.setItem("portfolio-sound", enabled ? "on" : "off"); } catch { /* Keep working without storage. */ }
  listeners.forEach(listener => listener());
}
export function useSoundEnabled() { return useSyncExternalStore(subscribeSound, isSoundEnabled); }
