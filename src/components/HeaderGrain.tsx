import { useEffect, useRef } from "react";

export default function HeaderGrain() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    if (!surface) return;
    const context = surface.getContext("2d");
    if (!context) return;
    const render = () => {
      const bounds = surface.getBoundingClientRect();
      surface.width = Math.max(1, Math.round(bounds.width));
      surface.height = Math.max(1, Math.round(bounds.height));
      const texture = context.createImageData(surface.width, surface.height);
      let seed = 942;
      for (let i = 0; i < texture.data.length; i += 4) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const value = seed >>> 24;
        texture.data[i] = texture.data[i + 1] = texture.data[i + 2] = value;
        texture.data[i + 3] = 255;
      }
      context.putImageData(texture, 0, 0);
    };
    const observer = new ResizeObserver(render);
    observer.observe(surface);
    render();
    return () => observer.disconnect();
  }, []);
  return <canvas ref={canvas} className="header-grain" aria-hidden="true" />;
}
