import { Link } from "react-router-dom";
import PaperTags from "./PaperTags";
import ProjectIdentity from "./ProjectIdentity";
import SiteNavigation from "./SiteNavigation";
import PaperMosaic from "./PaperMosaic";
import ProgressiveImage from "./ProgressiveImage";
import HeroAssembly from "./HeroAssembly";
import PaperAction, { linkedinUrl, resumeUrl } from "./PaperAction";
import { type MouseEvent } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";
import "../pages/Homepage2027.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}portfolio-2027/${name}`;
const focus = ["Product strategy", "Digital design", "Interface design", "AI collaboration", "Agentic workflows"];
const projects = [
  {
    name: "Carta", slug: "carta", role: "UI/UX Designer · Dec 2023–Jun 2024",
    title: "A clearer path to graduation",
    summary: "Designed Stanford’s degree-tracking UI from student interviews through engineering handoff, clarifying requirements and next steps toward graduation.",
    skills: ["Interviewing", "UI design", "Prototyping"], image: "artwork-carta.webp",
    metric: "95%", outcome: "of Stanford students use the course-planning platform.",
  },
  {
    name: "Focal", slug: "focal", role: "Product Designer Intern · Summer 2024",
    title: "Making outdoor heating easier to use",
    summary: "Uncovered outdoor heating pain points through 50+ guest interviews and 10+ experiments. Prioritized improvements and presented actionable recommendations to the CEO and CTO.",
    skills: ["User research", "Experiments", "Journey mapping"], image: "artwork-focal.webp",
    metric: "+160%", outcome: "guest interactions after redesigning heater controls.",
  },
  {
    name: "SafeBites", slug: "safebites", role: "Founding Designer & Mobile App Developer · 2020–2021",
    title: "Helping diners assess restaurant safety",
    summary: "Developed a React Native app for safer dining during COVID-19. Led three designers and coordinated beta testing with 15 volunteers.",
    skills: ["Mobile development", "Beta testing", "Team leadership"], image: "artwork-safe-bites.webp",
    metric: "1st place", outcome: "MIT App Inventor Hackathon",
  },
];

export default function Homepage2027() {
  const { reduced } = useDisplayPreferences();
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
      <div className="paper-reading-column">
        <p className="paper-lead">I’m a product designer <span className="cursor-highlight">focused on AI interactions.</span> I turn open-ended technical possibilities into experiences people can try, helping teams shape emerging technology into tools that <span className="cursor-highlight">expand what people can do.</span></p>
        <PaperTags tags={focus} label="Design focus" />
        <div className="paper-contact-row">
          <h3>Let’s connect</h3>
          <div className="paper-actions"><PaperAction href={resumeUrl}>View résumé</PaperAction><PaperAction href={linkedinUrl} secondary>Connect on LinkedIn</PaperAction></div>
        </div>
      </div>
    </section>
    </HeroAssembly>

    <section id="work" className="paper-work paper-container" aria-labelledby="paper-work-title">
      <div className="paper-section-heading"><h2 id="paper-work-title">Selected work</h2><p>New work coming soon</p></div>
      <section className="paper-protected" aria-labelledby="paper-nda-title">
        <div className="paper-subheading"><h3 id="paper-nda-title">NDA-protected work</h3><p>Selected contributions; project specifics remain confidential.</p></div>
        <div className="paper-protected-rows">
          <article className="paper-protected-row">
            <div className="paper-protected-visual paper-protected-visual--openai"><ProgressiveImage src={asset("frame2.svg")} alt="OpenAI" width="100" height="100" /></div>
            <div className="paper-protected-copy">
              <ProjectIdentity name="OpenAI" role="Member of Technical Staff Intern · Summer 2026 · 12 weeks" />
              <h3>Prototyping human–AI experiences</h3>
              <p className="paper-project-summary">Built an internal tool to prototype and test novel technology for human–AI interaction. Explored concepts across hardware and the Codex app, collaborating with engineers on working proofs of concept.</p>
              <PaperTags tags={["Interaction design", "Technical prototyping"]} label="OpenAI skills" />
            </div>
          </article>
          <article className="paper-protected-row">
            <div className="paper-protected-visual paper-protected-visual--amazon"><div className="paper-amazon-crop"><ProgressiveImage src={asset("amazon-public-preview.png")} alt="Public Amazon content creation interface preview" width="1883" height="1476" loading="lazy" /></div></div>
            <div className="paper-protected-copy">
              <ProjectIdentity name="Amazon" role="UX Design Intern · Summer 2025 · 12 weeks" />
              <h3>AI workflows for branded content</h3>
              <p className="paper-project-summary">Crafted AI-powered content creation workflows for sellers, drawing on interviews and journey mapping. Refined the experience through usability studies.</p>
              <PaperTags tags={["User research", "Usability testing", "AI concepts"]} label="Amazon skills" />
            </div>
          </article>
        </div>
      </section>

      <section className="paper-cases" aria-labelledby="paper-cases-title">
        <div className="paper-subheading"><h3 id="paper-cases-title">Full case studies</h3><p>Explore the process, decisions, and outcomes.</p></div>
        <div className="paper-case-rows">{projects.map(project => <article className={`paper-case-row paper-case-row--${project.slug}`} key={project.slug}>
          <Link to={`/case-study/${project.slug}`} className="paper-case-visual" aria-label={`View ${project.name} case study`}>
            <PaperAction presentation secondary className="paper-case-cursor">View case study</PaperAction>
            <ProgressiveImage src={asset(project.image)} alt={`${project.name} project overview`} width="800" height="600" loading="lazy" />
          </Link>
          <div className="paper-case-copy">
            <ProjectIdentity name={project.name} role={project.role} />
            <h3>{project.title}</h3>
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
        <p className="paper-education">Stanford · M.S. Computer Science, HCI · 2027<br />B.S. Design</p>
        <section className="paper-experience" aria-labelledby="paper-experience-title"><h3 id="paper-experience-title">Experience</h3>
          <Experience organization="OpenAI" role="Member of Technical Staff · Intern" date="Summer 2026" />
          <Experience organization="Amazon" role="User Experience Designer · Intern" date="Summer 2025" />
          <Experience organization="Carta" role="Product Manager · UI/UX Designer" date="2024–2026" />
          <Experience organization="Focalheat" role="Product Designer · Intern" date="Summer 2024" />
        </section>
      </div>
      </div>
    </section>
  </main>;
}

function Experience({ organization, role, date }: { organization: string; role: string; date: string }) {
  return <div className="paper-experience-row"><div><p>{organization}</p><p>{role}</p></div><p>{date}</p></div>;
}
