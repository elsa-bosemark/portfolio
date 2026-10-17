const gradients = {
  carta: "linear-gradient(103deg, #e9a6bc, #e5a18f)",
  focal: "linear-gradient(193deg, #e8d599, #dfb28b)",
  safebites: "linear-gradient(270deg, #b4ce9d, #8cc7b6)",
};

/** Case-study headers need only CSS, not the animated WebGL renderer. */
export default function CaseStudyGradient({ project }: { project: keyof typeof gradients }) {
  return <div className="folio-project-gradient" aria-hidden="true" style={{ background: gradients[project] }} />;
}
