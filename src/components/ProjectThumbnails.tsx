import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "./CaseStudies";
import ProjectGradient from "./ProjectGradient";

const selectedProjects = [
  { slug: "/case-study/carta", name: "Carta", summary: "A clearer way for Stanford students to track degree progress, explore majors, and plan their next steps." },
  { slug: "/case-study/focal", name: "Focal", summary: "Field research and user insights that shaped a better outdoor heating experience." },
  { slug: "/case-study/safebites", name: "SafeBites", summary: "A mobile app for more informed dining during COVID-19. Winner of the MIT App Inventor Hackathon." },
];

export default function ProjectThumbnails() {
  return (
    <section id="work" className="folio-work" aria-labelledby="work-title">
      <div className="folio-work-heading">
        <h2 id="work-title">Selected work <span className="folio-work-note">(New work coming soon)</span></h2>
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
              <div><h3>{name}</h3><p>{project.category}</p></div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
            <p className="folio-project-summary">{summary}</p>
            </div>
          </>;
          return <Link key={slug} to={slug} className="folio-project" aria-label={`View ${name} case study`}>{content}</Link>;
        })}
      </div>
    </section>
  );
}
