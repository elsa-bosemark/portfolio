import { ArrowLeft } from "lucide-react";
import { caseStudies } from "../lib/case-studies";
import PaperCard from "./PaperCard";
import PaperAction from "./PaperAction";
import NextProjectImage from "./NextProjectImage";

type Project = "carta" | "focal" | "safebites";

export default function CaseStudyNextProjects({ current }: { current: Project }) {
  return <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
    <div className="study-section-inner study-project-navigation">
      {caseStudies.filter(study => study.slug !== "/case-study/safebites" && study.slug !== `/case-study/${current}`).map(study => <PaperCard key={study.slug} to={study.slug} className="study-next-project group">
        <NextProjectImage project={study.slug.split("/").pop() as Project} />
        <div><p className="type-caption mb-2">Next case study</p><h3>{study.title}</h3></div>
      </PaperCard>)}
      <div className="study-home-action"><PaperAction to="/" secondary icon={<ArrowLeft size={17} aria-hidden="true" />}>Back home</PaperAction></div>
    </div>
  </section>;
}
