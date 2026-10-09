import { useEffect, useRef, useState } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";

export default function PortraitReveal() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const timers = useRef<number[]>([]);
  const { reduced } = useDisplayPreferences();
  useEffect(() => () => timers.current.forEach(timer => clearTimeout(timer)), []);
  const src = `${import.meta.env.BASE_URL}profilepicture.PNG`;
  useEffect(() => {
    const photo = new Image();
    let cancelled = false;
    photo.onload = () => {
      const surface = canvas.current;
      if (!surface || cancelled) return;
      const width = 560;
      const height = Math.round(width * photo.naturalHeight / photo.naturalWidth);
      surface.width = width;
      surface.height = height;
      const context = surface.getContext("2d");
      if (!context) return;
      context.drawImage(photo, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height).data;
      context.clearRect(0, 0, width, height);
      const silhouette = new Path2D();
      const outline = [[.02,1],[0,.72],[.11,.68],[.16,.61],[.19,.43],[.25,.27],[.33,.2],[.45,.18],[.58,.18],[.68,.22],[.73,.29],[.75,.4],[.79,.55],[.84,.64],[.94,.69],[1,.76],[1,1]];
      outline.forEach(([x,y], i) => i ? silhouette.lineTo(x*width,y*height) : silhouette.moveTo(x*width,y*height));
      silhouette.closePath();
      context.fillStyle = "#171717";
      // Choose glyph density from the original photo's brightness.
      const step = 9;
      const glyphs = ":;+=ixae&#MW@";
      context.font = "bold 12px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (!context.isPointInPath(silhouette, x + step / 2, y + step / 2)) continue;
          let luminance = 0, count = 0;
          for (let dy = 0; dy < step && y + dy < height; dy++) {
            for (let dx = 0; dx < step && x + dx < width; dx++) {
              const i = ((y + dy) * width + x + dx) * 4;
              luminance += .2126 * pixels[i] + .7152 * pixels[i + 1] + .0722 * pixels[i + 2];
              count++;
            }
          }
          const edgeDistance = Math.min(x, y, width - x, height - y);
          const edgeFade = Math.min(1, edgeDistance / 65);
          const darkness = Math.pow(1 - luminance / count / 255, 1.15) * edgeFade;
          // Deterministic thinning lets the characters dissolve at the edges.
          if (((x * 13 + y * 7) % 101) / 101 > edgeFade) continue;
          if (darkness < .045) continue;
          const glyph = glyphs[Math.min(glyphs.length - 1, Math.floor(darkness * glyphs.length))];
          // Smaller glyphs retain facial detail; larger ones give shadows weight.
          context.font = `bold ${10 + darkness * 5}px monospace`;
          context.globalAlpha = Math.min(1, .5 + darkness) * edgeFade;
          context.fillText(glyph, x + step / 2, y + step / 2);
        }
      }
      context.globalAlpha = 1;
    };
    photo.src = src;
    return () => { cancelled = true; };
  }, [src]);

  return <button type="button" className={`portrait-flip${flipping ? " is-turning" : ""}`} aria-pressed={flipped} aria-label={flipped ? "Show text portrait" : "Flip to show Elsa’s photo"}
    onPointerMove={event => {
      if (reduced || flipping || event.pointerType === "touch") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      event.currentTarget.style.setProperty("--portrait-tilt-x", `${-y * 14}deg`);
      event.currentTarget.style.setProperty("--portrait-tilt-y", `${x * 14}deg`);
    }}
    onPointerLeave={event => { event.currentTarget.style.setProperty("--portrait-tilt-x", "0deg"); event.currentTarget.style.setProperty("--portrait-tilt-y", "0deg"); }}
    onClick={event => {
      if (flipping) return;
      event.currentTarget.style.setProperty("--portrait-tilt-x", "0deg");
      event.currentTarget.style.setProperty("--portrait-tilt-y", "0deg");
      if (reduced) { setFlipped(previous => !previous); return; }
      setFlipping(true);
      setFlipped(previous => !previous);
      timers.current.forEach(timer => clearTimeout(timer));
      timers.current = [window.setTimeout(() => setFlipping(false), 750)];
    }}>
    <span className={`portrait-flip-inner${flipped ? " is-flipped" : ""}`}>
      <span className="portrait-flip-face portrait-flip-front"><canvas ref={canvas} aria-hidden="true" /></span>
      <span className="portrait-flip-face portrait-flip-back"><img src={src} alt="Elsa Bosemark" /></span>
    </span>
  </button>;
}
