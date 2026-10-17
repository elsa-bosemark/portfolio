import CaseStudyCard from "./CaseStudyCard";

import { caseStudies } from "../lib/case-studies";

const CaseStudies = () => {
  return (
    <section id="work">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-20">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          Selected Work
        </p>
        <h2 className="text-4xl md:text-5xl leading-tight text-foreground">
          Case <span className="italic text-primary">Studies</span>
        </h2>
      </div>

      {caseStudies.map((study, index) => (
        <CaseStudyCard key={study.title} {...study} index={index} />
      ))}
    </section>
  );
};

export default CaseStudies;
