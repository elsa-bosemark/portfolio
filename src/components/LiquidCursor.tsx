import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDisplayPreferences } from "./DisplayPreferences";

// A rounded, beveled pointer silhouette. Each flock member is a true 3D mesh.
function makePointer() {
  const shape = new THREE.Shape();
  shape.moveTo(-.52, .65);
  shape.quadraticCurveTo(-.59, .7, -.57, .57);
  shape.lineTo(-.27, -.61);
  shape.quadraticCurveTo(-.23, -.74, -.15, -.62);
  shape.lineTo(.08, -.24);
  shape.quadraticCurveTo(.1, -.20, .15, -.19);
  shape.lineTo(.60, -.06);
  shape.quadraticCurveTo(.74, -.02, .62, .06);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: .11, bevelEnabled: true, bevelSegments: 5, steps: 1,
    bevelSize: .065, bevelThickness: .06, curveSegments: 18,
  });
  geometry.center();
  return geometry;
}

// Studio reflection map: white softboxes with narrow spectral accents.
function studioEnvironment() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#030508"; ctx.fillRect(0, 0, 1024, 512);
  const bands = [
    [80, 110, "#c8ecff"], [230, 55, "#0077ff"], [300, 150, "#ffffff"],
    [535, 65, "#ff6315"], [610, 65, "#fff4cf"], [750, 90, "#62f4ff"], [925, 60, "#6654ff"],
  ] as const;
  bands.forEach(([x, w, color]) => {
    const gradient = ctx.createLinearGradient(x, 0, x + w, 0);
    gradient.addColorStop(0, "#020407"); gradient.addColorStop(.35, color);
    gradient.addColorStop(.65, color); gradient.addColorStop(1, "#020407");
    ctx.fillStyle = gradient; ctx.fillRect(x, 70, w, 350);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type BuildTarget = {
  id: string; element: HTMLElement; piece: HTMLElement;
  highlight: HTMLElement | null; started: number | null;
};

function Flock({ reduced, paused }: { reduced: boolean; paused: boolean }) {
  const { light } = useDisplayPreferences();
  const { viewport, gl } = useThree();
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: -1000, y: -1000, impulse: 0 });
  const elapsed = useRef(0);
  const offsets = useRef(Array.from({ length: 10 }, () => new THREE.Vector2()));
  const targets = useRef<BuildTarget[]>([]);
  const scrollSequence = useRef({ available: 0, lastScroll: -Infinity });
  const geometry = useMemo(() => {
    const shape = makePointer();
    const positions = shape.getAttribute("position");
    const colors = new Float32Array(positions.count * 3);
    const spectrum = ["#66cddd", "#8c9feb", "#d78ed0", "#efb878", "#78cdbd"].map(c => new THREE.Color(c));
    const color = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      const t = THREE.MathUtils.clamp((positions.getX(i) + positions.getY(i) * .6 + .9) / 1.8, 0, .999) * (spectrum.length - 1);
      const index = Math.floor(t);
      color.copy(spectrum[index]).lerp(spectrum[index + 1], t - index);
      color.toArray(colors, i * 3);
    }
    shape.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return shape;
  }, []);
  const environment = useMemo(() => {
    const source = studioEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromEquirectangular(source);
    source.dispose(); generator.dispose();
    return target;
  }, [gl]);
  useEffect(() => () => { geometry.dispose(); environment.dispose(); }, [geometry, environment]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".folio");
    targets.current = Array.from(document.querySelectorAll<HTMLElement>("[data-build]")).map(element => ({
      id: element.dataset.build!, element, piece: element.querySelector<HTMLElement>("[data-piece]")!,
      highlight: element.querySelector<HTMLElement>("[data-highlight]"), started: null,
    }));
    if (!reduced) root?.setAttribute("data-choreographed", "true");
    const onMove = (event: PointerEvent) => {
      const stage = document.querySelector(".folio-orbit-space")?.getBoundingClientRect();
      if (!stage || event.clientY < stage.top || event.clientY > stage.bottom || event.pointerType === "touch") return;
      pointer.current.x = event.clientX; pointer.current.y = event.clientY;
    };
    const onPress = (event: PointerEvent) => {
      const stage = document.querySelector(".folio-orbit-space")?.getBoundingClientRect();
      if (!stage || event.clientY < stage.top || event.clientY > stage.bottom || event.pointerType === "touch") return;
      onMove(event); pointer.current.impulse = 1;
    };
    const leave = () => { pointer.current.x = -1000; pointer.current.y = -1000; pointer.current.impulse = 0; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPress, { passive: true });
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", leave, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      root?.removeAttribute("data-choreographed");
      targets.current.forEach(({piece, highlight}) => { piece.style.removeProperty("transform"); piece.style.removeProperty("opacity"); highlight?.style.removeProperty("--highlight"); });
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPress);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", leave);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduced]);

  const smooth = (value: number) => { const p = THREE.MathUtils.clamp(value, 0, 1); return p * p * (3 - 2 * p); };
  useFrame((_, delta) => {
    if (paused) return;
    if (!reduced) elapsed.current += Math.min(delta, .05);
    const t = elapsed.current;
    const width = gl.domElement.clientWidth, height = gl.domElement.clientHeight;
    const hero = document.getElementById("top")?.getBoundingClientRect();
    const stage = document.querySelector(".folio-orbit-space")?.getBoundingClientRect();
    if (!hero || !stage) return;
    const scroll = -hero.top;
    const mobile = width < 640;
    const destinations: {x: number; y: number; active: boolean; carrying: boolean}[] = [];
    const bounds = targets.current.map(target => ({target, rect: target.element.getBoundingClientRect()}));
    const aboutOrder = ["about-title"];
    const atBottom = scroll >= document.documentElement.scrollHeight - height - 30;
    bounds.forEach(({target, rect}, index) => {
      if (reduced) return;
      const about = target.id.startsWith("about");
      const order = aboutOrder.indexOf(target.id);
      const previous = order > 0 ? targets.current.find(item => item.id === aboutOrder[order - 1]) : null;
      const threshold = [.78, .68, .62, .58][order] ?? .78;
      // Fast scrolling must never leave an unseen earlier block blocking the queue.
      if (about && target.started === null && rect.bottom <= 0) target.started = t - 10;
      // One reading beat at a time, gated by both scroll progress and completion.
      if (about && target.started === null && rect.top < height * threshold && rect.bottom > 0
        && (!previous || previous.started !== null) && t >= scrollSequence.current.available
        && (scroll - scrollSequence.current.lastScroll >= 65 || atBottom)) {
        target.started = t;
        scrollSequence.current = { available: t + 6.2, lastScroll: scroll };
      }
      const delay = about ? target.started : .7;
      const local = delay === null ? -1 : t - delay;
      const duration = about ? 3.3 : 3.2;
      const progress = smooth(local / duration);
      const direction = target.id === "name-last" || target.id === "intro" || target.id === "about-first" || target.id === "about-details" ? 1 : -1;
      const distance = direction < 0 ? -rect.right - 55 : width - rect.left + 55;
      const shift = distance * (1 - progress);
      const lift = Math.sin(progress * Math.PI) * (about ? 22 : 34) * direction;
      const waiting = about && target.started === null;
      target.piece.style.transform = `translate3d(${shift}px, ${lift}px, 0)`;
      target.piece.style.opacity = waiting || progress <= 0 ? "0" : "1";
      const highlight = smooth((local - duration - .8) / 1.7);
      target.highlight?.style.setProperty("--highlight", String(highlight));

      // Dedicated builders enter and leave at the sides; none are borrowed from the flock.
      const builder = 10 + index;
      let x = rect.left + shift + (direction < 0 ? rect.width : 0);
      let y = rect.top + rect.height * .65 + lift;
      const restingX = rect.left + (direction < 0 ? rect.width : 0);
      const restingY = rect.top + rect.height * .65;
      if (local > duration && target.highlight) {
        const mark = target.highlight.getBoundingClientRect();
        const approach = smooth((local - duration) / .8);
        x = THREE.MathUtils.lerp(restingX, mark.left + mark.width * highlight, approach);
        y = THREE.MathUtils.lerp(restingY, mark.bottom + 3, approach)
          - Math.sin(approach * Math.PI) * 18;
      }
      const departAt = duration + (target.highlight ? 2.6 : .35);
      const depart = smooth((local - departAt) / 1.8);
      x = THREE.MathUtils.lerp(x, direction < 0 ? -65 : width + 65, depart);
      y += Math.sin(depart * Math.PI) * 42;
      destinations[builder] = { x, y, active: local >= 0 && local < departAt + 1.8 && rect.bottom > -100 && rect.top < height + 100, carrying: true };
    });

    pointer.current.impulse *= Math.exp(-delta * 1.3);
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      // Restore the original staggered flock, with separate lanes and slow tumbling.
      const phase = i * 2.39996 + t * .035;
      const radius = .18 + (i % 3) * .075;
      let x = stage.left + stage.width * (.5 + Math.cos(phase) * radius);
      let y = stage.top + stage.height * (.5 + Math.sin(phase) * .34);
      const job = destinations[i];
      let carrying = false;
      if (job?.active) {
        x = job.x; y = job.y; carrying = job.carrying;
      } else if (i >= 10) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      if (i < 10 && !reduced) {
        const dx = x - pointer.current.x, dy = y - pointer.current.y;
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - distance / (mobile ? 140 : 220));
        const pointerActive = pointer.current.x >= 0 && pointer.current.y >= stage.top && pointer.current.y <= stage.bottom;
        const push = pointerActive ? proximity * (95 + pointer.current.impulse * 100) : 0;
        const direction = distance > 1 ? Math.atan2(dy, dx) : phase;
        const ease = 1 - Math.exp(-delta * 2.6);
        offsets.current[i].x = THREE.MathUtils.lerp(offsets.current[i].x, Math.cos(direction) * push, ease);
        offsets.current[i].y = THREE.MathUtils.lerp(offsets.current[i].y, Math.sin(direction) * push, ease);
        x += offsets.current[i].x; y += offsets.current[i].y;
      }
      // Pointer tip is at (-.52, .65): offset the mesh so the tip grips the content.
      const pixels = carrying ? (mobile ? 21 : 25) : (mobile ? 19 : 25) + i % 4 * 3;
      const size = pixels / height * viewport.height;
      const worldX = (x / width - .5) * viewport.width + (carrying ? size * .50 : 0);
      const worldY = (.5 - y / height) * viewport.height - (carrying ? size * .62 : 0);
      // Keep page movement exact; only the interaction offset is damped.
      mesh.position.x = worldX;
      mesh.position.y = worldY;
      mesh.position.z = 0;
      if (!reduced || mesh.scale.x === 1) {
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, carrying ? .12 : .3 + Math.sin(t * .3 + phase) * .45, reduced ? 1 : .1);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, carrying ? .12 : Math.cos(t * .26 + phase) * .65, .1);
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, carrying ? 0 : -.35 + Math.sin(phase) * 1.9, .1);
      }
      mesh.scale.setScalar(size);
    });
  });

  return <>{Array.from({ length: 15 }, (_, i) => (
    <mesh key={i} position={[-100, 0, 0]} ref={mesh => { meshes.current[i] = mesh; }} geometry={geometry}>
      <meshPhysicalMaterial attach="material-0" color={light ? "#f1fbff" : "#101820"} metalness={light ? 0 : .7} roughness={light ? .035 : .12} clearcoat={1}
        transparent={light} opacity={light ? .2 : 1} depthWrite={!light}
        ior={1.45} reflectivity={light ? .35 : .5}
        iridescence={light ? 1 : 0} iridescenceIOR={1.8} iridescenceThicknessRange={[180, 650]}
        clearcoatRoughness={.04} envMap={environment.texture} envMapIntensity={light ? 1.8 : .75} />
      <meshPhysicalMaterial attach="material-1" vertexColors={light} color={light ? "#ffffff" : "#effaff"} metalness={light ? .28 : 1} roughness={light ? .025 : .075} clearcoat={1}
        transparent={light} opacity={light ? .85 : 1} depthWrite={!light} ior={light ? 1.7 : 1.45}
        clearcoatRoughness={.03} envMap={environment.texture} envMapIntensity={light ? 5 : 3}
        iridescence={light ? 1 : .65} iridescenceIOR={light ? 2 : 1.45} iridescenceThicknessRange={light ? [200, 850] : [150, 450]} />
    </mesh>
  ))}</>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="flock-fallback" aria-hidden="true">↖</div> : this.props.children; }
}

export default function LiquidCursor() {
  const { reduced } = useDisplayPreferences();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const visibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <div className="folio-flock" aria-hidden="true">
    <SceneBoundary><Suspense fallback={null}>
      <Canvas style={{ pointerEvents: "none" }} dpr={[1, 1.5]} camera={{ position: [0, 0, 12], fov: 42 }} gl={{ alpha: true, antialias: true }}
        frameloop={paused ? "never" : "always"}>
        <ambientLight intensity={.3} />
        <directionalLight position={[2, 5, 5]} intensity={2} />
        <Flock reduced={reduced} paused={paused} />
      </Canvas>
    </Suspense></SceneBoundary>
  </div>;
}
