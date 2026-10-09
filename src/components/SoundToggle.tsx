import { Volume2, VolumeX } from "lucide-react";
import { toggleSound, useSoundEnabled } from "./SoundPreferences";

export default function SoundToggle() {
  const enabled = useSoundEnabled();
  const Icon = enabled ? Volume2 : VolumeX;
  return <button type="button" className="site-sound-toggle" onClick={toggleSound} aria-pressed={enabled} aria-label={enabled ? "Mute site sounds" : "Enable site sounds"}>
    <Icon size={16} aria-hidden="true" /><span>Sound {enabled ? "on" : "off"}</span>
  </button>;
}
