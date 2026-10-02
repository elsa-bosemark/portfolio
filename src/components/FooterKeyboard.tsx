import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three-stdlib";
import * as THREE from "three";
import { studioEnvironment } from "./LiquidCursor";

const letters = ["W", "A", "S", "D"];
const keyColors = ["#c7dff0", "#ddd0ef", "#f2d4bd", "#cddfc7"];
const themes = [
  ["🔬", "🧪", "🧬", "⚛️", "🔭", "🚀"],
  ["🎨", "🖌️", "🎭", "🎵", "🧵", "✨"],
  ["🥐", "🍓", "🍜", "🍰", "🍋", "🍕"],
  ["🌿", "🌻", "🦋", "🍄", "🌱", "🌈"],
];
const keyPositions: [number, number, number][] = [[0, 0, -.61], [-1.22, 0, .61], [0, 0, .61], [1.22, 0, .61]];

function roundedOpening(x: number, y: number, size: number) {
  const path = new THREE.Path();
  const r = .105, half = size / 2;
  path.moveTo(x - half + r, y - half);
  path.lineTo(x + half - r, y - half); path.quadraticCurveTo(x + half, y - half, x + half, y - half + r);
  path.lineTo(x + half, y + half - r); path.quadraticCurveTo(x + half, y + half, x + half - r, y + half);
  path.lineTo(x - half + r, y + half); path.quadraticCurveTo(x - half, y + half, x - half, y + half - r);
  path.lineTo(x - half, y - half + r); path.quadraticCurveTo(x - half, y - half, x - half + r, y - half);
  path.closePath();
  return path;
}

function clusterBase(depth: number, inset = 0) {
  const points = [[-1.99, -1.34], [1.99, -1.34], [1.99, .08], [.75, .08], [.75, 1.34], [-.75, 1.34], [-.75, .08], [-1.99, .08]].map(([x, y]) => new THREE.Vector2(x * (1 - inset), y * (1 - inset)));
  const shape = new THREE.Shape();
  points.forEach((point, index) => {
    const previous = points[(index + points.length - 1) % points.length];
    const next = points[(index + 1) % points.length];
    const incoming = point.clone().add(previous.clone().sub(point).normalize().multiplyScalar(.1));
    const outgoing = point.clone().add(next.clone().sub(point).normalize().multiplyScalar(.1));
    if (index === 0) shape.moveTo(incoming.x, incoming.y); else shape.lineTo(incoming.x, incoming.y);
    shape.quadraticCurveTo(point.x, point.y, outgoing.x, outgoing.y);
  });
  shape.closePath();
  if (inset) keyPositions.forEach(([x, , z]) => shape.holes.push(roundedOpening(x, -z, 1.15)));
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .035, bevelThickness: .025, bevelSegments: 3, steps: 1 });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function Key({ index, trigger, reduced, press }: { index: number; trigger: number; reduced: boolean; press: () => void }) {
  const { gl } = useThree();
  const environment = useMemo(() => {
    const source = studioEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromEquirectangular(source);
    source.dispose(); generator.dispose();
    return target;
  }, [gl]);
  useEffect(() => () => environment.dispose(), [environment]);
  const group = useRef<THREE.Group>(null);
  const burst = useRef<THREE.Group>(null);
  const started = useRef(-100);
  const elapsed = useRef(0);
  const emojiTextures = useMemo(() => themes[index].map(emoji => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 256;
    const context = canvas.getContext("2d")!;
    context.font = '180px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    context.textAlign = "center"; context.textBaseline = "middle";
    context.fillText(emoji, 128, 136);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }), [index]);
  useEffect(() => () => emojiTextures.forEach(texture => texture.dispose()), [emojiTextures]);
  const socketGeometry = useMemo(() => {
    const outline = roundedOpening(0, 0, 1.2);
    const shape = new THREE.Shape(outline.getPoints());
    shape.holes.push(roundedOpening(0, 0, 1.15));
    const socket = new THREE.ExtrudeGeometry(shape, { depth: .145, bevelEnabled: true, bevelSize: .008, bevelThickness: .008, bevelSegments: 3, steps: 1, curveSegments: 12 });
    socket.rotateX(-Math.PI / 2);
    return socket;
  }, []);
  const geometry = useMemo(() => {
    const keycap = new RoundedBoxGeometry(1.04, .72, 1.04, 8, .075);
    const positions = keycap.attributes.position;
    for (let n = 0; n < positions.count; n++) {
      const y = positions.getY(n);
      const height = (y + .36) / .72;
      const taper = 1 - .2 * height;
      const x = positions.getX(n) * taper;
      const z = positions.getZ(n) * taper;
      // Broad, shallow fingertip scoop, blended into the upper shoulders.
      const bowl = Math.max(0, 1 - (x * x + z * z) / .19);
      const topBlend = THREE.MathUtils.smoothstep(y, .24, .345);
      const dish = .09 * bowl * bowl * topBlend;
      positions.setXYZ(n, x, y - dish, z);
    }
    keycap.computeVertexNormals();
    keycap.clearGroups();
    return keycap;
  }, []);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 512;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#41414b"; context.font = "600 264px sans-serif";
    context.textAlign = "center"; context.textBaseline = "middle"; context.fillText(letters[index], 256, 272);
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace; result.anisotropy = 8; return result;
  }, [index]);
  useEffect(() => { if (trigger) started.current = elapsed.current; }, [trigger]);
  useEffect(() => () => { geometry.dispose(); socketGeometry.dispose(); texture.dispose(); }, [geometry, socketGeometry, texture]);
  useFrame(({ clock }) => {
    elapsed.current = clock.elapsedTime;
    const t = clock.elapsedTime - started.current;
    if (group.current) group.current.position.y = .64 - (!reduced && t < .42 ? Math.sin(t / .42 * Math.PI) * .17 : 0);
    if (burst.current) {
      burst.current.visible = t < (reduced ? .5 : 1.6);
      burst.current.children.forEach((particle, n) => {
        const angle = n * Math.PI * 2 / 6;
        const travel = reduced ? .5 : .15 + t * .65;
        particle.position.set(Math.cos(angle) * travel, 1 + Math.sin(angle) * travel * .35 + (reduced ? 0 : t * .65), .15 + Math.sin(n * 2.4) * travel * .3);
        const size = .42;
        particle.scale.setScalar(reduced ? size : size * Math.min(1, t * 12) * Math.max(0, Math.min(1, (1.6 - t) * 3)));
      });
    }
  });
  return <group position={keyPositions[index]}>
    <mesh geometry={socketGeometry} position={[0, .10, 0]} receiveShadow>
      <meshStandardMaterial color="#303039" roughness={.85} />
    </mesh>
    <mesh position={[0, .095, 0]} receiveShadow>
      <boxGeometry args={[1.15, .025, 1.15]} />
      <meshStandardMaterial color="#25252d" roughness={.9} />
    </mesh>
    <group ref={group} position={[0, .64, 0]} onClick={(event) => { event.stopPropagation(); press(); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = ""; }}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial color={keyColors[index]} roughness={.4} metalness={.4}
          transmission={0} ior={1.45}
          clearcoat={.25} clearcoatRoughness={.3} iridescence={.3} iridescenceIOR={1.45} iridescenceThicknessRange={[150, 450]}
          envMap={environment.texture} envMapIntensity={.6} />
      </mesh>
      <mesh position={[-.18, .365, -.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[.26, .26]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
    </group>
    <group ref={burst} visible={false}>
      {emojiTextures.map((texture, n) => <sprite key={n}>
        <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </sprite>)}
    </group>
  </group>;
}

export default function FooterKeyboard() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [reduced, setReduced] = useState(false);
  const baseGeometry = useMemo(() => clusterBase(.075), []);
  const deckGeometry = useMemo(() => clusterBase(.165, .045), []);
  useEffect(() => () => { baseGeometry.dispose(); deckGeometry.dispose(); }, [baseGeometry, deckGeometry]);
  const press = useCallback((index: number) => {
    setCounts((previous) => previous.map((value, n) => n === index ? value + 1 : value));
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!visible || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))) return;
      const index = letters.indexOf(event.key.toUpperCase());
      if (index !== -1) {
        event.preventDefault();
        press(index);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, press]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches); update(); query.addEventListener("change", update);
    return () => { observer.disconnect(); query.removeEventListener("change", update); document.body.style.cursor = ""; };
  }, []);
  return <div className="footer-keyboard" ref={container} role="group" tabIndex={0} aria-label="Interactive WASD keyboard. W releases science emojis, A art, S food, and D nature. Click a key or press it on your keyboard.">
    <div className="footer-keyboard-scene" aria-hidden="true">
      <Canvas shadows orthographic camera={{ position: [2.5, 6.5, 7], zoom: 58 }} dpr={[1, 3]} frameloop={visible ? "always" : "never"} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={.8} />
        <directionalLight position={[-3, 7, 4]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-normalBias={.015} />
        <directionalLight position={[4, 2, -3]} intensity={1} color="#d9ceef" />
        <group rotation={[0, 0, -.06]}>
          <mesh position={[0, 0, 0]} receiveShadow geometry={baseGeometry}>
            <meshStandardMaterial color="#dcdce2" roughness={.7} metalness={.08} />
          </mesh>
          <mesh position={[0, .10, 0]} receiveShadow geometry={deckGeometry}>
            <meshStandardMaterial color="#383840" roughness={.55} />
          </mesh>
          {letters.map((letter, index) => <Key key={letter} index={index} trigger={counts[index]} reduced={reduced} press={() => press(index)} />)}
        </group>
      </Canvas>
    </div>
  </div>;
}
