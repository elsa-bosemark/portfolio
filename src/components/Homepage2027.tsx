import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PaperTags from "./PaperTags";
import CompanyLogo from "./CompanyLogo";
import SiteNavigation from "./SiteNavigation";
import PaperMosaic from "./PaperMosaic";
import ProgressiveImage from "./ProgressiveImage";
import HeroAssembly from "./HeroAssembly";
import PaperAction, { linkedinUrl, resumeUrl } from "./PaperAction";
import { useLayoutEffect, useRef, type MouseEvent } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";
import "../pages/Homepage2027.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}portfolio-2027/${name}`;
const projects = [
  {
    name: "Carta", slug: "carta", role: "Design Lead · UI/UX Designer · 2024–2026",
    title: "A clearer path to graduation",
    summary: "Led design for Carta’s latest launch. This case study highlights my degree tracker designs, which clarify requirements and next steps toward graduation.",
    skills: ["Design leadership", "Engineering handoff"], image: "artwork-carta.webp",
    metric: "95%", outcome: "of Stanford students use the course-planning platform.",
  },
  {
    name: "Focal", slug: "focal", role: "Product Designer · Intern · Summer 2024",
    title: "Making outdoor heating easier to use",
    summary: "Identified high-impact UX improvements at an outdoor-heating startup ahead of scaling and go-to-market. Conducted 50+ guest interviews and 10+ experiments, translating findings into prioritized recommendations for the CEO and CTO.",
    skills: ["Field research", "Physical–digital experiences"], image: "artwork-focal.webp",
    metric: "+160%", outcome: "guest interactions after redesigning heater controls.",
  },
];

export default function Homepage2027() {
  const { reduced } = useDisplayPreferences();
  const introColumn = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const column = introColumn.current;
    const section = column?.parentElement;
    const lead = column?.querySelector(".paper-lead");
    if (!column || !section || !lead || typeof ResizeObserver === "undefined") return;
    let frame = 0;
    let active = true;
    let previousWidth = -1;
    const measure = () => {
      if (!active) return;
      column.style.width = "";
      if (window.innerWidth < 900) return;
      const range = document.createRange();
      range.selectNodeContents(lead);
      const lines = Array.from(range.getClientRects());
      const left = lead.getBoundingClientRect().left;
      const right = Math.max(left, ...lines.map(line => line.right));
      if (right > left) column.style.width = `${Math.ceil(right - left) + 1}px`;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width !== previousWidth) {
        previousWidth = entry.contentRect.width;
        schedule();
      }
    });
    observer.observe(section);
    measure();
    void document.fonts?.ready.then(schedule);
    return () => { active = false; observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    if (id === "work" && event.currentTarget.classList.contains("paper-skip")) {
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    }
  };
  return <main className="portfolio-2027" id="top">
    <a className="paper-skip" href="#work" onClick={event => jumpTo(event, "work")}>Skip to selected work</a>
    <SiteNavigation />
    <HeroAssembly paper masthead={<PaperMosaic />}>
    <section className="paper-introduction" aria-label="Introduction">
      <div className="paper-reading-column" ref={introColumn}>
        <p className="paper-lead">Product designer <span className="cursor-highlight">focused on AI interactions</span>; Experience in shaping emerging technology into tools that <span className="cursor-highlight">expand what people can do.</span></p>
        <div className="paper-contact-row">
          <div className="paper-affiliations"><p>Currently @ Stanford · Previously @ OpenAI · Amazon</p></div>
          <div className="paper-actions">
            <a className="paper-action paper-contact-icon" href={resumeUrl} target="_blank" rel="noopener noreferrer" aria-label="View résumé (opens in a new tab)">Résumé<ArrowUpRight size={19} aria-hidden="true" /></a>
            <a className="paper-action paper-action--secondary paper-contact-icon" href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn (opens in a new tab)">LinkedIn<ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
    </HeroAssembly>

    <section id="work" className="paper-work paper-container" aria-label="Work">
      <section className="paper-protected" aria-labelledby="paper-nda-title">
        <div className="paper-subheading"><h2 id="paper-nda-title">NDA-protected work</h2></div>
        <div className="paper-protected-rows">
          <article className="paper-protected-row">
            <div className="paper-protected-visual paper-protected-visual--openai"><ProgressiveImage src={asset("frame2.svg")} alt="OpenAI" width="100" height="100" /></div>
            <div className="paper-protected-copy">
              <CompanyLogo name="OpenAI" />
              <h3>Prototyping human–AI experiences</h3>
              <p className="paper-role">Member of Technical Staff · Intern · Summer 2026</p>
              <p className="paper-project-summary">Built an internal tool for designers and engineers to test new technology concepts for human–AI interaction. Applied concepts to consumer device hardware and the Codex app.</p>
              <PaperTags tags={["Human–AI interaction", "Technical prototyping", "Consumer devices"]} label="OpenAI skills" />
            </div>
          </article>
          <article className="paper-protected-row">
            <div className="paper-protected-visual paper-protected-visual--amazon"><div className="paper-amazon-crop"><ProgressiveImage src={asset("amazon-public-preview.png")} alt="Public Amazon content creation interface preview" width="1883" height="1476" loading="lazy" /></div></div>
            <div className="paper-protected-copy">
              <CompanyLogo name="Amazon" />
              <h3>AI workflows for branded content</h3>
              <p className="paper-role">User Experience Designer · Intern · Summer 2025</p>
              <p className="paper-project-summary">Crafted AI-powered content creation workflows for sellers, drawing on interviews and journey mapping. Refined the experience through usability studies.</p>
              <PaperTags tags={["Generative AI", "Seller workflows", "Usability testing"]} label="Amazon skills" />
            </div>
          </article>
        </div>
      </section>

      <section className="paper-cases" aria-labelledby="paper-cases-title">
        <div className="paper-section-heading"><h2 id="paper-cases-title">Public case studies</h2><p>New work coming soon</p></div>
        <div className="paper-case-rows">{projects.map(project => <article className={`paper-case-row paper-case-row--${project.slug}`} key={project.slug}>
          <Link to={`/case-study/${project.slug}`} className="paper-case-visual" aria-label={`View ${project.name} case study`}>
            <PaperAction presentation secondary className="paper-case-cursor">View case study</PaperAction>
            <ProgressiveImage src={asset(project.image)} alt={`${project.name} project overview`} width="800" height="600" loading="lazy" />
          </Link>
          <div className="paper-case-copy">
            <CompanyLogo name={project.name} />
            <h3>{project.title}</h3>
            <p className="paper-role">{project.role}</p>
            <p className="paper-project-summary">{project.summary}</p>
            <PaperTags tags={project.skills} label={`${project.name} skills`} />
            <div className="paper-outcome"><strong>{project.metric}</strong><p>{project.outcome}</p></div>
            <PaperAction to={`/case-study/${project.slug}`}>View case study</PaperAction>
          </div>
        </article>)}</div>
      </section>
    </section>

    <section id="about" className="paper-about paper-container" aria-labelledby="paper-about-title">
      <div className="paper-making"><h3 className="paper-about-label">A little about me</h3><h2 id="paper-about-title">Ideas become clearer when you make them</h2>
      </div>
      <div className="paper-about-story">
      <figure className="paper-welding-photo">
        <div className="paper-photo"><ProgressiveImage src={asset("welding.webp")} alt="Elsa welding for the first time at six years old" loading="lazy" /></div>
        <figcaption>Welding for the first time at six years old</figcaption>
      </figure>
      <div className="paper-about-copy">
        <p className="paper-lead">My approach is shaped by my experience at OpenAI and Amazon and my studies in design and CS/HCI at Stanford.</p>
        <p>With a background in product realization, I’m quick to roll up my sleeves and learn whatever tools an idea needs. I build across hardware and software to make experiences tangible, test assumptions, and move forward with conviction.</p>
        <p>At Stanford, I work on collaborative and predictive AI in the HCI CS lab.</p>
        <p className="paper-education">Stanford<br />M.S. Computer Science, HCI · 2027<br />B.S. Product Design</p>
        <section className="paper-experience" aria-labelledby="paper-experience-title"><h3 id="paper-experience-title">Experience</h3>
          <Experience organization="OpenAI" role="Member of Technical Staff · Intern" date="Summer 2026" />
          <Experience organization="Amazon" role="User Experience Designer · Intern" date="Summer 2025" />
          <Experience organization="Carta" role="Design Lead · UI/UX Designer" date="2024–2026" />
          <Experience organization="Focal" role="Product Designer · Intern" date="Summer 2024" />
        </section>
      </div>
      </div>
    </section>
  </main>;
}

function Experience({ organization, role, date }: { organization: string; role: string; date: string }) {
  return <div className="paper-experience-row"><div><p>{organization}</p><p>{role}</p></div><p>{date}</p></div>;
}
