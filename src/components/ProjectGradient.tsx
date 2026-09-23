import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useDisplayPreferences } from "./DisplayPreferences";

const treatments = {
  carta: { colors: ["#e9a6bc", "#e5a18f"], speed: 0.018, strength: 2.8, density: 1.2, frequency: 4.2, rotation: -32, time: 4 },
  focal: { colors: ["#e8d599", "#dfb28b"], speed: 0.012, strength: 3.4, density: 1.7, frequency: 3.1, rotation: 58, time: 17 },
  safebites: { colors: ["#b4ce9d", "#8cc7b6"], speed: 0.022, strength: 2.4, density: 1.4, frequency: 5.8, rotation: 135, time: 29 },
};

class GradientFallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ProjectGradient({ project }: { project: string }) {
  const { reduced: preferenceReduced } = useDisplayPreferences();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  const treatment = treatments[project as keyof typeof treatments] ?? treatments.carta;
  const [color1, color2] = treatment.colors;
  return <div ref={ref} className="folio-project-gradient" aria-hidden="true">
    {visible && !reduced && !preferenceReduced && <GradientFallback>
      <ShaderGradientCanvas style={{ position: "absolute", inset: "-60px", width: "calc(100% + 120px)", height: "calc(100% + 120px)", filter: "blur(38px)" }} pixelDensity={1.25} pointerEvents="none" lazyLoad={false}>
        <ShaderGradient control="props" type="plane" animate="on"
          color1={color1} color2={color2} color3={color1}
          uSpeed={treatment.speed} uTime={treatment.time} uStrength={treatment.strength} uDensity={treatment.density} uFrequency={treatment.frequency}
          cDistance={3.6} cPolarAngle={90} cAzimuthAngle={0}
          rotationZ={treatment.rotation} lightType="3d" brightness={1.2}
          grain="off" reflection={0} enableTransition={false} />
      </ShaderGradientCanvas>
    </GradientFallback>}
  </div>;
}
