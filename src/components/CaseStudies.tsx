import CaseStudyCard from "./CaseStudyCard";

const caseStudies = [
  {
    title: "Introduced AI-Powered Concepts Into Amazon's A+ Content Manager",
    titleHighlight: "Amazon's A+ Content Manager",
    category: "UX Design & AI",
    description:
      "Designed AI-powered tools for 168K sellers publishing content to 20M+ products across 21 marketplaces, helping brands generate higher-converting content faster and with greater confidence.",
    image: "Amazon/Amazon Thumbnail.png",
    slug: "#",
    skills: ["User Research", "Usability Testing", "AI Concepts", "Roadmapping"],
    date: "Summer 2025",
    impact: "Increased the most common seller confidence rating from 4/7 to 7/7",
    comingSoon: true,
  },
  {
    title: "Designed Degree Tracker UI for Stanford's Academic Planner",
    titleHighlight: "Stanford's Academic Planner",
    category: "Product Design & Launch",
    description:
      "Designed the degree tracker UI for Stanford's academic planner, helping 95% of undergrads track degree progress, explore majors, and plan courses, all in one place.",
    image: "Carta/MacBook Pro 16-inch Space Black Front.png",
    slug: "/case-study/carta",
    skills: ["Interviewing", "UI Design", "Documenting", "Collaborating"],
    date: "10 weeks",
    impact: "Designed and handed off implementation-ready UI for Stanford's most-used academic platform",
  },
  {
    title: "Uncovered User Insights to Improve the UX of Infrared Heaters",
    titleHighlight: "Infrared Heaters",
    category: "UX Design & Research",
    description:
      "Conducted field research, user interviews, and journey mapping at an infrared heater startup to define the ideal heating experience and scope four high-impact UX improvement projects.",
    image: "Focal/Top Image and Thumbnail.png",
    slug: "/case-study/focal",
    skills: ["Experiments", "A/B Testing", "User Research", "Journey Mapping"],
    date: "8 weeks",
    impact: "Compiled Customer Satisfaction Report presented to CEO and CFO, scoping four UX improvement projects",
  },
  {
    title: "Coded an App for Safer Dining Experiences During COVID-19",
    titleHighlight: "COVID-19",
    category: "Mobile App Development & Design",
    description:
      "Built a React Native app that lets customers review restaurants' compliance with CDC COVID-19 safety guidelines. Won 1st place at MIT App Inventor Hackathon and was featured by CNN.",
    image: "SafeBites/topthumbnailimage.png",
    slug: "/case-study/safebites",
    skills: ["Mobile App Dev", "Presenting", "Team Management", "Beta Testing"],
    date: "2 months",
    impact: "Won 1st Place at MIT Hackathon, featured by CNN, launched for 20 restaurants",
  },
];

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
