import { Link } from "react-router-dom";
import CaseStudyProgress from "./CaseStudyProgress";
import "../pages/CaseStudy.css";

export default function CaseStudyNav({ project }: { project: string }) {
  return <><CaseStudyProgress project={project} /><header className="study-nav">
    <Link to="/" className="study-brand">Elsa Bosemark</Link>
    <span>{project} / Case study</span>
    <div className="study-nav-actions"><Link to="/">← All work</Link></div>
  </header></>;
}
