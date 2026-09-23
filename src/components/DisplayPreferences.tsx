import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";

const Preferences = createContext({ reduced: false, toggleMotion: () => {}, light: false, toggleTheme: (_button: HTMLElement) => {} });
export const useDisplayPreferences = () => useContext(Preferences);
export function DisplayPreferences({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => localStorage.getItem("folio-motion") === "reduce" || (localStorage.getItem("folio-motion") === null && matchMedia("(prefers-reduced-motion: reduce)").matches));
  const [light, setLight] = useState(() => localStorage.getItem("folio-theme") === "light");
  const transitioning = useRef(false);
  const toggleTheme = async (button: HTMLElement) => {
    if (transitioning.current) return;
    const next = !light;
    const apply = () => flushSync(() => {
      document.documentElement.dataset.theme = next ? "light" : "dark";
      setLight(next);
    });
    const doc = document as Document & { startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> } };
    if (reduced || !doc.startViewTransition) { apply(); return; }
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    transitioning.current = true;
    document.documentElement.dataset.themeTransition = next ? "light" : "dark";
    try {
      const transition = doc.startViewTransition(apply);
      await transition.ready;
      const closed = `circle(0px at ${x}px ${y}px)`;
      const open = `circle(${radius}px at ${x}px ${y}px)`;
      await document.documentElement.animate({ clipPath: next ? [closed, open] : [open, closed] }, {
        duration: 1600, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "forwards",
        pseudoElement: next ? "::view-transition-new(root)" : "::view-transition-old(root)",
      }).finished;
      await transition.finished;
    } catch { apply(); }
    finally { transitioning.current = false; delete document.documentElement.dataset.themeTransition; }
  };
  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
    localStorage.setItem("folio-theme", light ? "light" : "dark");
    localStorage.setItem("folio-motion", reduced ? "reduce" : "full");
  }, [light, reduced]);
  return <Preferences.Provider value={{ reduced, light, toggleMotion: () => setReduced(v => !v), toggleTheme }}>{children}</Preferences.Provider>;
}
export function ThemeToggle() {
  const { light, toggleTheme } = useDisplayPreferences();
  return <button className="theme-toggle" onClick={event => toggleTheme(event.currentTarget)} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark mode" : "Light mode"}>{light ? <Moon size={18} /> : <Sun size={18} />}</button>;
}
