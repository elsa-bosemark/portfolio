import { Link } from "react-router-dom";
import "../pages/CaseStudy.css";

export default function CaseStudyNav({ project }: { project: string }) {
  return <header className="study-nav">
    <Link to="/" className="study-brand">Elsa Bosemark</Link>
    <span>{project} / Case study</span>
    <Link to="/">← All work</Link>
  </header>;
}
