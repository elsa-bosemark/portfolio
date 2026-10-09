import { isSoundEnabled, trackSound } from "./SoundPreferences";
export class CursorSounds {
  private playing = new Map<HTMLAudioElement, () => void>();
  private timers = new Set<number>();
  private disposed = false;

  private play(file: string, volume: number, duration?: number) {
    if (this.disposed || !isSoundEnabled()) return;
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/${file}`);
    audio.volume = volume;
    const untrack = trackSound(audio);
    const finish = () => {
      audio.removeEventListener("ended", finish);
      audio.removeEventListener("pause", finish);
      this.playing.delete(audio);
      untrack();
      audio.pause();
    };
    this.playing.set(audio, finish);
    audio.addEventListener("ended", finish, { once: true });
    audio.addEventListener("pause", finish, { once: true });
    void audio.play().then(() => { if (duration) this.later(finish, duration); }).catch(finish);
  }

  private later(callback: () => void, delay: number) {
    const timer = window.setTimeout(() => {
      this.timers.delete(timer);
      if (!this.disposed) callback();
    }, delay);
    this.timers.add(timer);
  }

  down() { this.play("button-down.mp3", .35); }
  up() { this.play("button-up.mp3", .3); }
  press() { this.play("cursor-tap-muffled-preview.wav", .6); }

  sweep(count: number, _erase: boolean) {
    for (let i = 0; i < count; i++) {
      this.later(() => this.play("cursor-drag.mp3", .18, 1400), 1470 + i * 1950);
    }
  }

  dispose() {
    this.disposed = true;
    this.timers.forEach(timer => window.clearTimeout(timer));
    this.playing.forEach(finish => finish());
    this.timers.clear();
    this.playing.clear();
  }
}
