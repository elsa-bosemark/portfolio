import { ArrowLeft } from "lucide-react";
import { caseStudies } from "../lib/case-studies";
import PaperCard from "./PaperCard";
import PaperAction from "./PaperAction";
import NextProjectImage from "./NextProjectImage";

type Project = "carta" | "focal" | "safebites";

export default function CaseStudyNextProjects({ current }: { current: Project }) {
  return <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
    <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8 text-center">Next Projects</p>
    <div className="study-section-inner grid grid-cols-1 md:grid-cols-2 gap-6">
      {caseStudies.filter(study => study.slug !== `/case-study/${current}`).map(study => <PaperCard key={study.slug} to={study.slug} className="group">
        <NextProjectImage project={study.slug.split("/").pop() as Project} />
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">{study.category}</p>
        <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{study.title}</p>
      </PaperCard>)}
    </div>
    <div className="study-home-action"><PaperAction to="/" secondary icon={<ArrowLeft size={17} aria-hidden="true" />}>Back home</PaperAction></div>
  </section>;
}
