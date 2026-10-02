import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useDisplayPreferences } from "./DisplayPreferences";

export default function CaseStudyProgress({ project }: { project: string }) {
  const line = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const { reduced } = useDisplayPreferences();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? Math.max(0, Math.min(1, window.scrollY / available)) : 0;
      if (line.current) line.current.style.transform = `scaleX(${progress})`;
      setShowTop(window.scrollY > 400);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [project]);
  return <>
    <div className="study-progress" aria-hidden="true"><div ref={line} className="study-progress-fill" /></div>
    {showTop && <button className="study-back-top" type="button" aria-label="Back to top" title="Back to top" onClick={() => {
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    }}><ArrowUp size={18} aria-hidden="true" /><span>Back to top</span></button>}
  </>;
}
