import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-identity">
      <Link to="/" className="site-footer-brand">Elsa Bosemark</Link>
    </div>
    <nav aria-label="Footer case studies">
      <h2>Case studies</h2>
      <Link to="/case-study/carta">Carta</Link>
      <Link to="/case-study/focal">Focal</Link>
      <Link to="/case-study/safebites">SafeBites</Link>
    </nav>
    <nav aria-label="Footer résumé and LinkedIn">
      <h2>Connect</h2>
      <a href="https://drive.google.com/file/d/16_tL-tuJBZhH0Asrn7B6ovjwlVOgvQiC/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="View résumé (opens in a new tab)">Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>
      <a href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
    </nav>
  </footer>;
}
