import { ArrowUpRight, FileText, Linkedin } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { useDisplayPreferences } from "@/components/DisplayPreferences";
import ProjectThumbnails from "@/components/ProjectThumbnails";
import ProtectedWork from "@/components/ProtectedWork";
import HeroAssembly from "@/components/HeroAssembly";
import FooterKeyboard from "@/components/FooterKeyboard";
import "./Portfolio.css";

const Index = () => {
  const { reduced } = useDisplayPreferences();
  const introCopy = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const copy = introCopy.current;
    if (!copy) return;
    const update = () => copy.closest<HTMLElement>(".folio-intro")?.style.setProperty("--portrait-size", `${copy.getBoundingClientRect().height}px`);
    const observer = new ResizeObserver(update);
    observer.observe(copy);
    update();
    return () => observer.disconnect();
  }, []);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? "instant" : "smooth",
  });
  return (
    <main className="folio">
      <header className="folio-nav">
        <button className="folio-wordmark" onClick={() => scrollTo("top")}>Elsa Bosemark</button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <a href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noreferrer">Let’s connect <ArrowUpRight size={14} /></a>
        </nav>
      </header>
      <section className="folio-hero" id="top" aria-labelledby="hero-title">
        <HeroAssembly><article className="folio-intro">
          <div className="folio-portrait-frame"><img src={`${import.meta.env.BASE_URL}profilepicture.PNG`} alt="Elsa Bosemark" width="104" height="156" /></div>
          <div className="folio-intro-copy" ref={introCopy}><p className="folio-intro-statement">I design to make <span className="cursor-highlight">technology easier to understand</span> and<br /><span className="cursor-highlight">more meaningful to use.</span></p><p className="folio-internship">Previously interned @ OpenAI and Amazon.</p></div>
        </article>
        </HeroAssembly>
      </section>
      <section className="folio-connect" aria-labelledby="connect-title">
        <div>
        <h2 id="connect-title">Let’s connect</h2>
            <div className="folio-intro-links">
              <a className="folio-action-primary" href="https://drive.google.com/file/d/16_tL-tuJBZhH0Asrn7B6ovjwlVOgvQiC/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="View résumé (opens in a new tab)"><FileText size={16} aria-hidden="true" />View résumé<ArrowUpRight size={14} aria-hidden="true" /></a>
              <a className="folio-action-secondary" href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn (opens in a new tab)"><Linkedin size={16} aria-hidden="true" />Connect on LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
        </div>
        <div className="folio-design-focus"><h2 id="connect-design-focus">Design Focus</h2>
          <ul className="folio-intro-skills" aria-labelledby="connect-design-focus">
            <li>Product strategy</li><li>Digital design</li><li>Interface design</li><li>AI collaboration</li><li>Agentic workflows</li>
          </ul>
        </div>
      </section>
      <ProtectedWork />
      <ProjectThumbnails />
      <section id="about" className="folio-about" aria-labelledby="about-title">
        <div className="folio-about-title"><div><p className="folio-eyebrow">A LITTLE ABOUT ME</p><h2 id="about-title">Designing for<br /><span>human–tech collaboration.</span></h2></div><FooterKeyboard /></div>
        <div className="folio-about-body">
          <div className="about-paragraph"><p>My background is in Product Design, with a concentration in Digital Experiences and AI. I’m pursuing a master’s in Computer Science focused on Human–Computer Interaction at Stanford.</p></div>
          <div className="about-paragraph"><p>In a Stanford Computer Science lab, I work on collaborative and predictive AI. At the Graduate School of Education’s AI Tinkery, I focus on education and AI enablement, helping people explore and use AI as a creative collaborator.</p></div>
          <div><dl>
            <div><dt>On campus</dt><dd>AI Tinkery, d.school & ShapeLab</dd></div>
            <div><dt>Fun facts</dt><dd>Speaks French · Martial Arts Instructor · Dual Citizenship</dd></div>
          </dl></div>
        </div>
      </section>
    </main>
  );
};
export default Index;
