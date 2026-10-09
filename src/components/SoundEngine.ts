import { isSoundEnabled, subscribeSound } from "./SoundPreferences";

const files = ["button-down.mp3", "button-up.mp3", "cursor-tap-muffled-preview.wav", "cursor-drag.mp3"];
let context: AudioContext | undefined;
const buffers = new Map<string, AudioBuffer>();
const loading = new Map<string, Promise<void>>();
const active = new Set<AudioBufferSourceNode>();

function getContext() {
  const Audio = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Audio) return;
  context ??= new Audio({ latencyHint: "interactive" });
  return context;
}
function load(file: string) {
  const audio = getContext();
  if (!audio || loading.has(file)) return;
  const request = fetch(`${import.meta.env.BASE_URL}sounds/${file}`)
    .then(response => { if (!response.ok) throw new Error("Sound unavailable"); return response.arrayBuffer(); })
    .then(data => audio.decodeAudioData(data))
    .then(buffer => { buffers.set(file, buffer); })
    .catch(() => { loading.delete(file); });
  loading.set(file, request);
}
export function prepareSounds() { files.forEach(load); }
export function unlockSounds() {
  const audio = getContext();
  if (audio && audio.state !== "running") void audio.resume().catch(() => {});
  prepareSounds();
}
export function playSound(file: string, volume: number, duration?: number): () => void {
  if (!isSoundEnabled()) return () => {};
  unlockSounds();
  const audio = context;
  const buffer = buffers.get(file);
  // Do not queue late sounds: they should coincide with the interaction.
  if (!audio || !buffer) return () => {};
  const source = audio.createBufferSource();
  const gain = audio.createGain();
  source.buffer = buffer;
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(audio.destination);
  active.add(source);
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    active.delete(source);
    try { source.stop(); } catch { /* Already ended. */ }
    source.disconnect();
    gain.disconnect();
  };
  source.onended = stop;
  source.start();
  if (duration) source.stop(audio.currentTime + duration / 1000);
  return stop;
}
subscribeSound(() => {
  if (!isSoundEnabled()) active.forEach(source => { try { source.stop(); } catch { /* Already ended. */ } });
});
