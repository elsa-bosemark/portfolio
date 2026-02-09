import CaseStudyPage from "@/components/CaseStudyPage";
import caseStudy2 from "@/assets/case-study-2.jpg";

const CaseStudyNPS = () => (
  <CaseStudyPage
    title="Data Collection for the National Park Service"
    category="Systems Design & Research"
    date="Sep — Dec 2024"
    skills={["Systems Thinking", "Field Research", "Process Design", "Stakeholder Interviews"]}
    image={caseStudy2}
    overview="The National Park Service needed a more consistent and efficient way for field teams to collect environmental and visitor data across parks. I redesigned the data collection process from the ground up — from field forms to cross-park data sharing."
    sections={[
      {
        title: "Context",
        content: [
          "The National Park Service manages over 400 sites across the United States, each with unique ecosystems, visitor patterns, and operational needs. Field teams regularly collect data on wildlife, vegetation, trail conditions, and visitor behavior — but the methods and formats varied widely from park to park.",
          "This inconsistency made it difficult for regional and national teams to aggregate data, spot trends, or make evidence-based policy decisions.",
        ],
      },
      {
        title: "Problem",
        content: [
          "Field rangers were using a patchwork of paper forms, spreadsheets, and ad-hoc digital tools to record observations. Data entry was time-consuming and error-prone, and transferring field data to central databases often introduced further inconsistencies.",
          "Park managers lacked a unified view of conditions across sites, making it hard to allocate resources, prioritize conservation efforts, or report to stakeholders with confidence.",
        ],
      },
      {
        title: "Solution",
        content: [
          "I designed a standardized yet flexible data collection framework that adapts to different park environments while maintaining consistent data structures. The system includes streamlined field forms optimized for mobile use, clear data entry protocols, and automated validation checks.",
          "A shared data model ensures that observations from any park can be compared and aggregated meaningfully, while still allowing parks to capture site-specific information.",
        ],
      },
      {
        title: "Process",
        content: [
          "I began with two weeks of field research, shadowing rangers at three different parks to understand their daily workflows, the conditions they work in, and the tools they currently use.",
          "I conducted stakeholder interviews with park managers, data analysts, and regional coordinators to map the full data lifecycle — from field observation to policy report. These conversations revealed that the biggest pain points weren't the tools themselves, but the lack of shared standards and unclear handoff processes.",
          "I facilitated co-design workshops with rangers and data teams to develop the new collection framework, testing paper prototypes in the field before moving to digital solutions. The final process was piloted across two parks over six weeks.",
        ],
      },
      {
        title: "Impact",
        content: [
          "The new data collection process reduced field data entry time by 50% and virtually eliminated format-related errors during data transfer.",
          "Cross-park data consistency improved dramatically, enabling the regional team to produce their first unified quarterly report on trail conditions and visitor trends. The framework has since been adopted as a model for rollout to additional parks.",
        ],
      },
    ]}
  />
);

export default CaseStudyNPS;
