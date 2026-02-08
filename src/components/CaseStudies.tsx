import CaseStudyCard from "./CaseStudyCard";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

const caseStudies = [
  {
    title: "Reimagining Digital Learning",
    category: "UX Research & Design",
    description:
      "A human-centered redesign of an educational platform, improving engagement by 40% through iterative prototyping and user testing.",
    image: caseStudy1,
  },
  {
    title: "Brand Identity for Walnut",
    category: "Branding & Visual Design",
    description:
      "Crafting a bold visual identity system for a fintech startup — from typography to motion guidelines.",
    image: caseStudy2,
  },
  {
    title: "Sustainable Product System",
    category: "Product Design",
    description:
      "Designing a cohesive product line with sustainability at its core, balancing aesthetics with environmental responsibility.",
    image: caseStudy3,
  },
];

const CaseStudies = () => {
  return (
    <section id="work" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <div className="mb-16">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          Selected Work
        </p>
        <h2 className="text-4xl md:text-5xl leading-tight text-foreground">
          Case <span className="italic text-primary">Studies</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.title} {...study} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
