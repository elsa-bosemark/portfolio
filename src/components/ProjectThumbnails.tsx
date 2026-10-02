import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "./CaseStudies";
import ProjectGradient from "./ProjectGradient";
import ProjectFacts from "./ProjectFacts";

const projectFacts = {
  Carta: { date: "Dec 2023–Jun 2024", role: "UI/UX Designer" },
  Focal: { date: "Summer 2024", role: "Product Designer Intern" },
  SafeBites: { date: "Summer 2020", role: "Co-founder, UI/UX Designer & Front-end Developer" },
};

const selectedProjects = [
  { slug: "/case-study/carta", name: "Carta", summary: "Designed a degree tracker for Carta, Stanford’s official course review platform, to help students track degree progress and plan their courses." },
  { slug: "/case-study/focal", name: "Focal", summary: "Uncovered user insights to improve the UX of infrared heaters through field research, interviews, and experiments." },
  { slug: "/case-study/safebites", name: "SafeBites", summary: "Designed and coded a mobile app for safer dining during COVID-19, helping people review restaurants’ safety practices." },
];

export default function ProjectThumbnails() {
  return (
    <section id="selected-work" className="folio-work" aria-labelledby="work-title">
      <div className="folio-work-heading">
        <h2 id="work-title">Selected case studies <span className="folio-work-note">(New work coming soon)</span></h2>
      </div>
      <div className="folio-project-grid">
        {selectedProjects.map(({ slug, name, summary }) => {
          const project = caseStudies.find(study => study.slug === slug)!;
          const content = <>
            <div className={`folio-project-image folio-project-image--${name.toLowerCase()}`}>
              <ProjectGradient project={name.toLowerCase()} />
              <img src={import.meta.env.BASE_URL + project.image} alt={project.title}
                loading="lazy" decoding="async" width="800" height="500" />
            </div>
            <div className="folio-project-text">
            <div className="folio-project-caption">
              <div><h3>{name}</h3><p>{projectFacts[name as keyof typeof projectFacts].role}</p></div>
              <p className="folio-project-date">{projectFacts[name as keyof typeof projectFacts].date}</p>
            </div>
            <p className="folio-project-summary">{summary}</p>
            <ProjectFacts impact={project.impact} />
            <span className="folio-project-cta">View case study <ArrowUpRight size={17} aria-hidden="true" /></span>
            </div>
          </>;
          return <Link key={slug} to={slug} className="folio-project" aria-label={`View ${name} case study`}>{content}</Link>;
        })}
      </div>
    </section>
  );
}
