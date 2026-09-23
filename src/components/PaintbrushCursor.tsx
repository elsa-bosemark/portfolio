import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDisplayPreferences } from "./DisplayPreferences";

export default function PaintbrushCursor() {
  const element = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { reduced } = useDisplayPreferences();
  useEffect(() => {
    const el = element.current!;
    const surface = el.closest<HTMLElement>(".drawing-playground")!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas.current!, alpha: true, antialias: true }); }
    catch { return; }
    renderer.setSize(135, 135);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10, 80, 80, -10, .1, 200);
    camera.position.z = 100;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x56516b, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-30, 70, 80); scene.add(key);
    const rim = new THREE.DirectionalLight(0xcbb8ff, 2); rim.position.set(60, 10, 25); scene.add(rim);
    const handleMaterial = new THREE.MeshPhysicalMaterial({ color: 0x17151b, roughness: .2, metalness: .15, clearcoat: 1 });
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0xd8d9e0, metalness: .72, roughness: .23 });
    const up = new THREE.Vector3(0, 1, 0);
    const place = (mesh: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3) => {
      mesh.position.copy(a).add(b).multiplyScalar(.5);
      mesh.quaternion.setFromUnitVectors(up, b.clone().sub(a).normalize());
    };
    const handleGeometry = new THREE.CylinderGeometry(2.1, 3.5, 39, 20);
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    place(handle, new THREE.Vector3(31, 32, 2), new THREE.Vector3(57, 61, 7)); scene.add(handle);
    const ferruleGeometry = new THREE.CylinderGeometry(3.4, 5.3, 12, 20);
    const ferrule = new THREE.Mesh(ferruleGeometry, metalMaterial);
    ferrule.scale.z = .48;
    place(ferrule, new THREE.Vector3(27, 26, 1), new THREE.Vector3(35, 35, 2)); scene.add(ferrule);
    const hairGeometry = new THREE.CylinderGeometry(.3, .23, 1, 5);
    const hairMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .68 });
    const bristles = new THREE.InstancedMesh(hairGeometry, hairMaterial, 24 * 7);
    bristles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    bristles.frustumCulled = false;
    scene.add(bristles);
    const dummy = new THREE.Object3D(), color = new THREE.Color();
    for (let i = 0; i < 24; i++) for (let j = 0; j < 7; j++) {
      color.set(0xb8803e);
      bristles.setColorAt(i * 7 + j, color);
    }
    let visible = false, down = false, x = 0, y = 0, raf = 0, last = performance.now();
    let forceX = 0, forceY = 0, pressure = .5, movedAt = performance.now();
    let normalX = .707, normalY = .707;
    // Each hair is a damped particle chain, anchored inside the ferrule.
    const hairs = Array.from({ length: 24 }, (_, i) => {
      const across = (i / 23 - .5) * 9;
      return Array.from({ length: 8 }, (_, j) => {
        const u = j / 7;
        return { x: 27 + across * .707 - 15 * u, y: 44 + across * .707 + 14 * u, vx: 0, vy: 0 };
      });
    });
    let spread = 0;
    const hide = () => { down = false; forceX = 0; forceY = 0; };
    const position = (clientX: number, clientY: number) => {
      const rect = surface.getBoundingClientRect();
      // Align the pointer with the middle of the black handle.
      const left = Math.max(8, Math.min(rect.width - 143, clientX - rect.left - 81));
      const top = Math.max(8, Math.min(rect.height - 143, clientY - rect.top - 50));
      el.style.left = `${left}px`; el.style.top = `${top}px`;
      el.style.visibility = "visible";
      visible = true;
    };
    const initialRect = surface.getBoundingClientRect();
    position(initialRect.left + initialRect.width * .65, initialRect.top + initialRect.height * .6);
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !(event.target instanceof Element) || !event.target.closest(".drawing-surface")) { hide(); return; }
      const dx = event.clientX - x, dy = event.clientY - y;
      if (visible) {
        const dt = Math.max(1, performance.now() - movedAt);
        const speed = Math.hypot(dx, dy) / dt;
        const distance = Math.hypot(dx, dy);
        if (distance > .4) {
          const pull = 16 * Math.tanh(speed * .7);
          forceX = -dx / distance * pull;
          forceY = -dy / distance * pull;
          // Spread across the stroke, not along a fixed screen axis.
          let nx = -dy / distance, ny = dx / distance;
          if (nx * normalX + ny * normalY < 0) { nx = -nx; ny = -ny; }
          normalX += (nx - normalX) * .3; normalY += (ny - normalY) * .3;
        }
      }
      movedAt = performance.now(); pressure = event.pointerType === "pen" ? event.pressure : .65;
      x = event.clientX; y = event.clientY; visible = true;
      position(x, y);
    };
    const press = (event: PointerEvent) => { move(event); down = event.target instanceof Element && !!event.target.closest(".drawing-surface") && event.button === 0; };
    const release = () => { down = false; forceX = 0; forceY = 0; };
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, .05); last = now;
      spread += ((down && !reduced ? pressure * 10 : 0) - spread) * (1 - Math.exp(-dt * 8));
      forceX *= Math.exp(-dt * 4.5); forceY *= Math.exp(-dt * 4.5);
      hairs.forEach((chain, fiber) => {
        const fan = fiber / 23 * 2 - 1;
        const rootX = 27 + fan * 4.5 * .707, rootY = 44 + fan * 4.5 * .707;
        chain[0].x = rootX; chain[0].y = rootY;
        // Small fixed substeps keep fast pointer input and low frame rates stable.
        const steps = Math.max(1, Math.ceil(dt / .008)), h = dt / steps;
        for (let step = 0; step < steps; step++) {
          for (let j = 1; j < chain.length; j++) {
            const p = chain[j], u = j / 7;
            const split = fan * spread * u * u;
            const tx = rootX - 15 * u + normalX * split;
            const ty = rootY + 14 * u + normalY * split;
            if (reduced) { p.x = tx; p.y = ty; p.vx = 0; p.vy = 0; continue; }
            const stiffness = 75 + (1 - u) * 280 + fiber % 4 * 9;
            const damping = 11 + (1 - u) * 9;
            p.vx += ((tx - p.x) * stiffness + forceX * u * u * 190 - p.vx * damping) * h;
            p.vy += ((ty - p.y) * stiffness + forceY * u * u * 190 - p.vy * damping) * h;
            p.x += p.vx * h; p.y += p.vy * h;
          }
          // Inextensible segments stop hairs stretching like rubber.
          for (let pass = 0; pass < 3; pass++) for (let j = 1; j < chain.length; j++) {
            const a = chain[j - 1], b = chain[j];
            const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy);
            const maxLength = 3.35;
            if (length > maxLength) { b.x = a.x + dx / length * maxLength; b.y = a.y + dy / length * maxLength; }
          }
        }
        for (let j = 0; j < 7; j++) {
          const a = chain[j], b = chain[j + 1];
          const depth = (fiber % 3 - 1) * .65;
          const start = new THREE.Vector3(a.x, 70 - a.y, depth + (1 - j / 7));
          const end = new THREE.Vector3(b.x, 70 - b.y, depth + (1 - (j + 1) / 7));
          place(dummy, start, end);
          dummy.scale.set(1, start.distanceTo(end) + .15, 1);
          dummy.updateMatrix(); bristles.setMatrixAt(fiber * 7 + j, dummy.matrix);
        }
      });
      bristles.instanceMatrix.needsUpdate = true;
      if (visible) renderer.render(scene, camera);
      el.style.transform = "none";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(raf);
      [handleGeometry, ferruleGeometry, hairGeometry].forEach(g => g.dispose());
      [handleMaterial, metalMaterial, hairMaterial].forEach(m => m.dispose());
      renderer.dispose();
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release); window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide); window.removeEventListener("scroll", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [reduced]);
  return <div ref={element} className="paintbrush-cursor" style={{ position: "absolute", width: 135, height: 135, zIndex: 2 }} aria-hidden="true">
    <canvas ref={canvas} width="135" height="135" style={{ maxWidth: "none" }} />
  </div>;
}
