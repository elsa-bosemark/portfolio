import { ChevronDown, LockKeyhole } from "lucide-react";

export default function ProtectedWork() {
  return (
    <section id="work" className="folio-work folio-protected" aria-labelledby="protected-work-title">
      <div className="folio-work-heading folio-protected-heading"><h2 id="protected-work-title">Protected work</h2><span className="folio-nda"><LockKeyhole size={14} aria-hidden="true" />NDA protected</span></div>
      <div className="folio-protected-grid">
        <article className="folio-protected-card">
          <div className="folio-protected-image folio-protected-image--openai">
            <span className="folio-openai-wordmark"><img className="folio-openai-logo" src={`${import.meta.env.BASE_URL}openai.svg`} alt="" width="64" height="64" />OpenAI</span>
          </div>
          <div className="folio-protected-caption">
            <div><h3 className="folio-project-title">OpenAI</h3><p>Member of Technical Staff Intern</p></div>
            <p className="folio-protected-date">Summer 2026 · 12 weeks</p>
          </div>
          <p className="folio-protected-summary">Design and technical prototyping with OpenAI’s consumer device team.</p>
          <details className="folio-protected-details">
            <summary className="folio-read-toggle"><span className="read-more">Read more</span><span className="read-less">Read less</span><ChevronDown size={16} aria-hidden="true" /></summary>
            <div className="folio-protected-expanded">
              <h4>What I worked on</h4>
              <p>I worked with the consumer device team, moving between design and technical work. The specifics of the work remain confidential.</p>
            </div>
          </details>
        </article>
        <article className="folio-protected-card">
          <div className="folio-protected-image folio-protected-image--amazon">
            <img className="folio-amazon-logo" src={`${import.meta.env.BASE_URL}amazon.svg`} alt="Amazon" width="603" height="182" />
            <div className="folio-amazon-crop"><img src={`${import.meta.env.BASE_URL}amazon-preview.png`} alt="Amazon Seller Central design preview with details obscured" loading="lazy" decoding="async" width="1883" height="1476" /></div>
          </div>
          <div className="folio-protected-caption">
            <div><h3 className="folio-project-title">Amazon</h3><p>UX Design Intern</p></div>
            <p className="folio-protected-date">Summer 2025 · 12 weeks</p>
          </div>
          <p className="folio-protected-summary">Designed AI-powered features for an Amazon content creation tool to help brands create more effective content for their product detail pages.</p>
          <details className="folio-protected-details">
            <summary className="folio-read-toggle"><span className="read-more">Read more</span><span className="read-less">Read less</span><ChevronDown size={16} aria-hidden="true" /></summary>
            <div className="folio-protected-expanded">
              <h4>What I worked on</h4>
              <p>I designed AI-powered features for an existing Amazon tool that helps sellers and vendors create branded content for their product detail pages. My work focused on helping brands tell their product stories through more effective, personalized content.</p>
              <p>At the time of my internship, the tool served over 68,000 daily active users, who published content for more than 20 million products each month across 21 global marketplaces.</p>
              <h4>Skills</h4>
              <ul className="folio-intro-skills folio-protected-skills" aria-label="Amazon skills">
                <li>User research</li><li>Usability testing</li><li>AI concepts</li>
              </ul>
            </div>
          </details>
        </article>
      </div>
    </section>
  );
}
