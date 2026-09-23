import { Link } from "react-router-dom";
import "../pages/CaseStudy.css";
import { ThemeToggle } from "./DisplayPreferences";

export default function CaseStudyNav({ project }: { project: string }) {
  return <header className="study-nav">
    <Link to="/" className="study-brand">Elsa Bosemark</Link>
    <span>{project} / Case study</span>
    <ThemeToggle />
    <Link to="/">← All work</Link>
  </header>;
}
