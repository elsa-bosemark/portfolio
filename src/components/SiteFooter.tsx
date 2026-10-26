import { Link } from "react-router-dom";
import PaperAction, { linkedinUrl, resumeUrl } from "./PaperAction";
import "./SiteFooter.css";

export default function SiteFooter() {
  return <footer className="paper-footer" id="connect">
    <div className="paper-footer-inner">
      <div className="paper-footer-identity">
        <Link to="/" className="paper-footer-brand">Elsa Bosemark</Link>
      </div>
      <nav className="paper-footer-projects" aria-label="Footer case studies">
        <h2>Case studies</h2>
        <Link to="/case-study/carta">Carta</Link>
        <Link to="/case-study/focal">Focal</Link>
      </nav>
      <nav className="paper-footer-connect" aria-label="Footer résumé and LinkedIn">
        <h2>Let’s connect</h2>
        <div className="paper-actions">
          <PaperAction href={resumeUrl}>View résumé</PaperAction>
          <PaperAction href={linkedinUrl} secondary>LinkedIn</PaperAction>
        </div>
      </nav>
    </div>
  </footer>;
}
