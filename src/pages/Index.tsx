import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useDisplayPreferences, ThemeToggle } from "@/components/DisplayPreferences";
import LiquidCursor from "@/components/LiquidCursor";
import ProjectThumbnails from "@/components/ProjectThumbnails";
import "./Portfolio.css";

const Index = () => {
  const { reduced, toggleMotion } = useDisplayPreferences();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? "instant" : "smooth",
  });
  return (
    <main className="folio">
      <LiquidCursor />
      <header className="folio-nav">
        <button className="folio-wordmark" onClick={() => scrollTo("top")}>Elsa Bosemark</button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <a href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noreferrer">Let’s connect <ArrowUpRight size={14} /></a>
        </nav>
      </header>
      <section className="folio-hero" id="top" aria-labelledby="hero-title">
        <div className="folio-orbit-space" aria-hidden="true" />
        <h1 id="hero-title" className="folio-greeting">Hi, I’m Elsa.</h1>
        <div className="folio-intro-anchor" data-build="intro"><article className="folio-intro" data-piece>
          <img src={`${import.meta.env.BASE_URL}profilepicture.PNG`} alt="Elsa Bosemark" width="48" height="48" />
          <div><p>I design for a future where <span className="build-highlight" data-highlight="intro">AI works alongside us.</span></p><p className="folio-internship">Previously interned @ OpenAI and Amazon.</p></div>
        </article></div>
        <div className="folio-hero-foot">
          <div className="folio-display-controls">
          <button role="switch" aria-label="Reduce motion" aria-checked={reduced} onClick={toggleMotion}><span className="motion-switch" data-on={reduced} aria-hidden="true"><span>{reduced ? "On" : "Off"}</span></span> Reduce motion</button>
          <ThemeToggle />
          </div>
          <button onClick={() => scrollTo("about")}>A little about me <ArrowDown size={14} /></button>
        </div>
      </section>
      <ProjectThumbnails />
      <section id="about" className="folio-about" aria-labelledby="about-title">
        <div className="folio-about-title" data-build="about-title"><div data-piece><p className="folio-eyebrow">A LITTLE ABOUT ME</p><h2 id="about-title">Designing for<br /><span>human–AI collaboration.</span></h2></div></div>
        <div className="folio-about-body">
          <div className="about-paragraph"><p>My background is in Product Design, with a concentration in Digital Experiences and AI. I’m pursuing a master’s in Computer Science focused on Human–Computer Interaction at Stanford.</p></div>
          <div className="about-paragraph"><p>In a Stanford Computer Science lab, I work on collaborative and predictive AI. At the Graduate School of Education’s AI Tinkery, I focus on education and AI enablement, helping people explore and use AI as a creative collaborator.</p></div>
          <div><dl>
            <div><dt>On campus</dt><dd>AI Tinkery, d.school & ShapeLab</dd></div>
            <div><dt>Fun facts</dt><dd>Speaks French · Martial Arts Instructor · Loves Cinnamon Rolls</dd></div>
          </dl></div>
        </div>
      </section>
      <footer className="folio-footer"><span>Elsa Bosemark</span><a href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noreferrer">Say hello <ArrowUpRight size={15} /></a></footer>
    </main>
  );
};
export default Index;
