import { useEffect, useState } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";

export default function CaseStudyContents({ project }: { project: string }) {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState("");
  const { reduced } = useDisplayPreferences();
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".case-study > section, .study-body-content > section"));
    const entries = elements.flatMap((element, index) => {
      const label = index === 0 ? "Overview" : (element.querySelector("p.uppercase")?.textContent || element.querySelector("h2")?.textContent)?.trim().replace(/\s+/g, " ");
      if (!label) return [];
      element.id ||= `study-section-${index}`;
      return [{ id: element.id, label, element }];
    });
    setSections(entries.map(({ id, label }) => ({ id, label })));
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = entries[0]?.id || "";
      for (const entry of entries) {
        if (entry.element.getBoundingClientRect().top <= 150) current = entry.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [project]);
  return <nav className="study-contents" aria-label={`${project} table of contents`}>
    <p>On this page</p>
    <ol>{sections.map(({ id, label }) => <li key={id}>
      <button type="button" aria-current={active === id ? "location" : undefined} onClick={() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      }}>{label}</button>
    </li>)}</ol>
  </nav>;
}
