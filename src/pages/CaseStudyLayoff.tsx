import CaseStudyPage from "@/components/CaseStudyPage";
import caseStudy1 from "@/assets/case-study-1.jpg";

const CaseStudyLayoff = () => (
  <CaseStudyPage
    title="Enrichment for Layoff Alerts"
    category="Service Design & UX"
    date="Jan — Mar 2025"
    skills={["User Research", "Service Design", "Data Visualization", "Prototyping"]}
    image={caseStudy1}
    overview="Journalists covering workforce trends needed a faster, more reliable way to verify and contextualize layoff reports. I designed an enrichment layer for layoff alert tools that surfaces critical data in real-time, transforming raw signals into actionable stories."
    sections={[
      {
        title: "Context",
        content: [
          "The media landscape is under constant pressure to report breaking workforce news accurately and quickly. Layoff alerts — automated notifications about workforce reductions — are a critical tool for journalists, but they often arrive as bare-bones data points with little context.",
          "Journalists were spending hours cross-referencing alerts with SEC filings, LinkedIn data, and company press releases just to verify a single story. The gap between receiving an alert and publishing a report was too wide.",
        ],
      },
      {
        title: "Problem",
        content: [
          "Raw layoff alerts lacked the context journalists needed to act on them confidently. Key questions — How large is this company? How does this compare to industry trends? Is this a pattern? — went unanswered by the existing tools.",
          "Without enrichment, journalists either delayed stories to do manual research or risked publishing with incomplete information. Neither outcome served their readers well.",
        ],
      },
      {
        title: "Solution",
        content: [
          "I designed an enrichment pipeline that automatically augments each layoff alert with company profile data, historical layoff patterns, industry benchmarks, and related news coverage.",
          "The interface presents enriched alerts as contextual cards — each alert becomes a mini-briefing with company size, sector, recent funding rounds, and a timeline of past workforce changes. Journalists can scan, verify, and start writing within minutes instead of hours.",
        ],
      },
      {
        title: "Process",
        content: [
          "I started with contextual interviews with 8 journalists at major outlets to understand their workflows, pain points, and information needs when covering layoffs.",
          "From there, I mapped the existing alert-to-publication journey and identified the key friction points where enrichment would have the most impact. I developed low-fidelity prototypes of enriched alert cards and tested them with journalists in simulated breaking-news scenarios.",
          "Through three rounds of iteration, I refined the information hierarchy, visual density, and interaction patterns to match the fast-paced editorial workflow. The final design was validated with a week-long pilot with a newsroom partner.",
        ],
      },
      {
        title: "Impact",
        content: [
          "The enriched alert system enabled journalists to identify and verify layoff stories 3x faster than before. Reporters spent significantly less time on manual data gathering and more time on analysis and storytelling.",
          "The pilot newsroom published 40% more layoff-related stories during the test period, with editors reporting higher confidence in the accuracy of initial reports.",
        ],
      },
    ]}
  />
);

export default CaseStudyLayoff;
