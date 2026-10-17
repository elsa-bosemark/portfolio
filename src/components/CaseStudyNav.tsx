import SiteNavigation from "./SiteNavigation";
import CaseStudyProgress from "./CaseStudyProgress";
import "../pages/CaseStudy.css";

export default function CaseStudyNav({ project }: { project: string }) {
  return <><CaseStudyProgress project={project} /><SiteNavigation /></>;
}
