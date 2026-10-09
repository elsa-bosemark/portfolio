import { useEffect } from "react";
import { playSound, prepareSounds, unlockSounds } from "./SoundEngine";

export default function ButtonSounds() {
  useEffect(() => {
    prepareSounds();
    const press = (event: Event) => {
      unlockSounds();
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest(".folio-intro-links a, .study-home-button, a.folio-project");
      if (button) playSound("button-down.mp3", .35);
    };
    const key = () => unlockSounds();
    const click = (event: MouseEvent) => { if (event.detail === 0) press(event); };
    document.addEventListener("pointerdown", press, true);
    document.addEventListener("keydown", key, true);
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("pointerdown", press, true);
      document.removeEventListener("keydown", key, true);
    };
  }, []);
  return null;
}
