import { caseStudies } from "../lib/case-studies";

export default function NextProjectImage({ project }: { project: "carta" | "focal" | "safebites" }) {
  const study = caseStudies.find(item => item.slug === `/case-study/${project}`)!;
  return <div className={`next-project-image next-project-image--${project}`}>
    <img src={`${import.meta.env.BASE_URL}${study.image}`} alt="" loading="lazy" decoding="async" width="800" height="500" />
  </div>;
}
