import { Link } from "react-router-dom";
import PaperAction, { linkedinUrl, resumeUrl } from "./PaperAction";
import "./SiteFooter.css";
import PaperMosaic from "./PaperMosaic";

export default function SiteFooter() {
  return <footer className="paper-footer" id="connect">
    <div className="paper-footer-background" aria-hidden="true"><PaperMosaic decorative /></div>
    <div className="paper-footer-inner">
      <nav className="paper-footer-projects" aria-label="Footer case studies">
        <h2>Case studies</h2>
        <div className="paper-footer-case-links"><Link to="/case-study/carta">Carta</Link><Link to="/case-study/focal">Focal</Link></div>
      </nav>
      <nav className="paper-footer-connect" aria-label="Footer résumé and LinkedIn">
        <h2>Contact</h2>
        <div className="paper-actions">
          <PaperAction href={resumeUrl}>Résumé</PaperAction>
          <PaperAction href={linkedinUrl} secondary>LinkedIn</PaperAction>
        </div>
      </nav>
    </div>
  </footer>;
}
