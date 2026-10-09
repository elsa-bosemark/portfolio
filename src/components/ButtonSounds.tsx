import { useEffect } from "react";
import { isSoundEnabled, trackSound } from "./SoundPreferences";

export default function ButtonSounds() {
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/button-down.mp3`);
    audio.preload = "auto";
    audio.volume = .35;
    const untrack = trackSound(audio);
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest(".folio-intro-links a, .study-home-button, a.folio-project");
      if (!button || !isSoundEnabled()) return;
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    };
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      audio.pause();
      untrack();
    };
  }, []);
  return null;
}
