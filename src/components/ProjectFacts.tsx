export default function ProjectFacts({ impact }: { impact: string }) {
  return <dl className="folio-project-facts">
    <div className="folio-project-impact"><dt>Impact</dt><dd>{impact}</dd></div>
  </dl>;
}
