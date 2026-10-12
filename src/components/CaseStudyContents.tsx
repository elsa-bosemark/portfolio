import { useEffect, useState } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";

const destinations: Record<string, string[]> = {
  Carta: ["The Starting Point", "Listening to Students", "The Final Design"],
  Focal: ["The Challenge", "Where It Started", "Research-Informed Projects"],
  SafeBites: ["The Challenge", "Where It Started", "Revised Design"],
};
const labels = ["Problem", "Process", "Final design"];

export default function CaseStudyContents({ project }: { project: string }) {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState("");
  const { reduced } = useDisplayPreferences();
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".study-body-content > section"));
    const entries = (destinations[project] ?? []).flatMap((heading, index) => {
      const element = elements.find(section => section.querySelector("p.uppercase")?.textContent?.trim() === heading);
      if (!element) return [];
      element.id ||= `study-${labels[index].toLowerCase().replace(/\s+/g, "-")}`;
      return [{ id: element.id, label: labels[index], element }];
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
