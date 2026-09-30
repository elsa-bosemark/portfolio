import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const Preferences = createContext({ reduced: false, light: true });
export const useDisplayPreferences = () => useContext(Preferences);
export function DisplayPreferences({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
  }, [reduced]);
  return <Preferences.Provider value={{ reduced, light: true }}>{children}</Preferences.Provider>;
}
