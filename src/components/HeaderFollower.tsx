import { useEffect, useRef } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";

export default function HeaderFollower() {
  const circle = useRef<HTMLDivElement>(null);
  const { reduced } = useDisplayPreferences();
  useEffect(() => {
    const element = circle.current;
    const header = element?.closest<HTMLElement>(".paper-masthead");
    if (!element || !header) return;
    const navigation = header.closest(".portfolio-2027")?.querySelector<HTMLElement>(".paper-navigation");
    let headerBounds = header.getBoundingClientRect();
    const measure = () => {
      const parent = header.getBoundingClientRect();
      headerBounds = parent;
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
    observer?.observe(header);
    window.addEventListener("resize", measure);
    let frame = 0, x = 0, y = 0, vx = 0, vy = 0, targetX = 0, targetY = 0;
    let active = false;
    const draw = () => {
      vx = (vx + (targetX - x) * .1) * .72;
      vy = (vy + (targetY - y) * .1) * .72;
      x = reduced ? targetX : x + vx;
      y = reduced ? targetY : y + vy;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = active && Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) > .1 ? requestAnimationFrame(draw) : 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = headerBounds;
      if (event.clientY < rect.top || event.clientY > rect.bottom) { leave(); return; }
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      if (!active) { x = targetX; y = targetY; vx = vy = 0; }
      active = true;
      element.dataset.visible = "true";
      if (!frame) draw();
    };
    const leave = (event?: PointerEvent) => {
      const next = event?.relatedTarget;
      if (next instanceof Node && (header.contains(next) || navigation?.contains(next))) return;
      active = false; element.dataset.visible = "false"; cancelAnimationFrame(frame); frame = 0;
    };
    const blur = () => leave();
    const scroll = () => { headerBounds = header.getBoundingClientRect(); if (headerBounds.bottom < 0) leave(); };
    window.addEventListener("scroll", scroll, { passive: true });
    header.addEventListener("pointermove", move);
    header.addEventListener("pointerleave", leave);
    navigation?.addEventListener("pointermove", move);
    navigation?.addEventListener("pointerleave", leave);
    window.addEventListener("blur", blur);
    return () => { leave(); observer?.disconnect(); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", measure); header.removeEventListener("pointermove", move); header.removeEventListener("pointerleave", leave); navigation?.removeEventListener("pointermove", move); navigation?.removeEventListener("pointerleave", leave); window.removeEventListener("blur", blur); };
  }, [reduced]);
  return <div ref={circle} className="paper-header-follower" aria-hidden="true" />;
}
