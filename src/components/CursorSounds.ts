import { playSound } from "./SoundEngine";
export class CursorSounds {
  private playing = new Set<() => void>();
  private timers = new Set<number>();
  private disposed = false;

  private play(file: string, volume: number, duration?: number) {
    if (this.disposed) return;
    const stop = playSound(file, volume, duration);
    this.playing.add(stop);
    this.later(() => { stop(); this.playing.delete(stop); }, duration ?? 5000);
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
