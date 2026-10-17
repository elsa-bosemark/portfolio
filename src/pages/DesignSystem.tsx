import SiteNavigation from "../components/SiteNavigation";
import PaperAction from "../components/PaperAction";
import PaperMosaic from "../components/PaperMosaic";
import PaperTags from "../components/PaperTags";
import PaperCard from "../components/PaperCard";
import "./Homepage2027.css";
import "./DesignSystem.css";

const colors = [
  ["Paper", "#FAF9F7", "Page background"], ["White", "#FFFFFF", "Inset surfaces and secondary actions"],
  ["Ink", "#202023", "Headings and primary text"], ["Muted ink", "#62626A", "Supporting text"],
  ["Navy", "#303E4E", "Actions and emphasis"], ["Outline", "#C7CFD9", "Secondary button borders"],
];
const type = [
  ["Landing title", "Hi, I’m Elsa", "106px desktop · 56–76px mobile · 500 · 1.1", "landing"],
  ["H1", "A clearer path to graduation", "40–64px · 500 · 1.1", "h1"],
  ["H2", "Selected work", "32–40px · 400 · 1.2", "h2"],
  ["H3", "A clearer path to graduation", "22–24px · 500 · 1.3", "h3"],
  ["Body", "Ideas become clearer when you make them", "16px · 400 · 1.65", "body"],
  ["Caption", "Welding for the first time at six years old", "16px · 400 · 1.5", "caption"],
];

export default function DesignSystem() {
  return <main className="portfolio-2027 design-system">
    <SiteNavigation />
    <div className="ds-container">
      <section className="ds-intro"><h1>Design system</h1>
        <nav aria-label="Design system sections">{["Colors", "Typography", "Components", "Surfaces"].map(name => <a key={name} href={`#/design-system`} onClick={event => { event.preventDefault(); document.getElementById(`ds-${name.toLowerCase()}`)?.scrollIntoView({ behavior: "instant" }); }}>{name}</a>)}</nav>
      </section>
      <section className="ds-section" id="ds-colors"><h2>Colors</h2>
        <div className="ds-swatches">{colors.map(([name, color, usage]) => <figure key={name}><div style={{ background: color }} /><figcaption><strong>{name}</strong><code>{color}</code><span>{usage}</span></figcaption></figure>)}</div>
        <div className="ds-gradients">{[["Carta", "carta"], ["Focal", "focal"], ["SafeBites", "safebites"]].map(([name, slug]) => <div key={slug} className={`paper-case-row--${slug}`}><div className="paper-case-visual" /><span>{name} · project surface</span></div>)}</div>
      </section>
      <section className="ds-section" id="ds-typography"><h2>Typography</h2>
        <div className="ds-type-list">{type.map(([role, sample, details, style]) => <div className="ds-type-row" key={role}><div><strong>{role}</strong><span>{details}</span></div><p className={`type-${style}`}>{sample}</p></div>)}</div>
        <p className="ds-note">Minimum text size: 16px. Text embedded in images is separate.</p>
      </section>
      <section className="ds-section" id="ds-components"><h2>Components</h2>
        <div className="ds-example"><h3>Cards</h3><div className="ds-card-examples"><PaperCard><h3>Content card</h3><p>White surface · no border · 16px corners · 24px padding.</p></PaperCard><PaperCard to="/case-study/focal" flush><img src={`${import.meta.env.BASE_URL}Focal/Context.png`} alt="Focal outdoor restaurant setting" loading="lazy" /><div><h3>Clickable card</h3><p>A subtle shadow signals that this card opens a case study.</p></div></PaperCard></div><p>20px padding on mobile. Shadows only on clickable cards.</p></div>
        <div className="ds-example"><h3>Actions</h3><div className="paper-actions"><PaperAction to="/">Primary action</PaperAction><PaperAction to="/" secondary>Secondary action</PaperAction></div><p>16px minimum · 12 × 18px button padding</p></div>
        <div className="ds-example"><h3>Focus tags</h3><PaperTags tags={["Product strategy", "AI collaboration", "Agentic workflows"]} label="Example focus tags" /></div>
        <div className="ds-example"><h3>Text highlights</h3><div className="paper-hero-assembly"><p className="ds-highlight-demo"><span className="cursor-highlight">focused on AI interactions.</span> and <span className="cursor-highlight">expand what people can do.</span></p></div></div>
      </section>
      <section className="ds-section" id="ds-surfaces"><h2>Surfaces & spacing</h2>
        <div className="ds-relief paper-masthead"><PaperMosaic /></div><p className="ds-note">Tap to reverse the inner shape’s shadow.</p>
        <div className="ds-spacing">{[8, 12, 16, 24, 48, 72].map(size => <div key={size}><span style={{ width: size }} /><code>{size}px</code></div>)}</div><p className="ds-note">Selected work: 1080px container · Intro & About: 800px content · Case-study body: up to 896px · Gutters: 40px desktop / 24px mobile</p>
      </section>
    </div>
  </main>;
}
