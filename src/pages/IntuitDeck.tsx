import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & animation helpers                                          */
/* ------------------------------------------------------------------ */

interface Slide {
  id: string;
  hasTabs?: boolean;
  render: () => JSX.Element;
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: 0.12 * i },
});

/* ------------------------------------------------------------------ */
/*  Reusable small components                                          */
/* ------------------------------------------------------------------ */

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">{label}</p>
    <p className="text-lg text-foreground">{value}</p>
  </div>
);

const SkillPills = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((s) => (
      <span key={s} className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-muted text-muted-foreground rounded-sm">
        {s}
      </span>
    ))}
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 items-start text-lg text-muted-foreground leading-relaxed">
    <span className="text-primary mt-1.5 shrink-0">&bull;</span>
    <span>{children}</span>
  </li>
);

/* ------------------------------------------------------------------ */
/*  Tabbed image carousel,image only, full width                     */
/* ------------------------------------------------------------------ */

interface Tab {
  label: string;
  img: string;
  alt: string;
  bullets?: string[];
  collageImgs?: string[];
}

const TabbedCarousel = ({ tabs, sectionLabel, heading, layout = "row" }: { tabs: Tab[]; sectionLabel: string; heading: string; layout?: "row" | "column" }) => {
  const [idx, setIdx] = useState(0);
  const current = tabs[idx];
  const hasText = current.bullets && current.bullets.length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.stopPropagation();
        setIdx((i) => (i > 0 ? i - 1 : tabs.length - 1));
      } else if (e.key === "ArrowRight") {
        e.stopPropagation();
        setIdx((i) => (i < tabs.length - 1 ? i + 1 : 0));
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [tabs.length]);

  const tabButtons = (vertical: boolean) => (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2`}>
      {tabs.map((tab, i) => (
        <button
          key={tab.label}
          onClick={() => setIdx(i)}
          className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-sm transition-colors text-left ${
            i === idx
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const imageContent = (
    <AnimatePresence mode="wait">
      {current.collageImgs && current.collageImgs.length >= 3 ? (
        <motion.div
          key={current.label}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full grid grid-cols-2 gap-2"
        >
          <img src={current.collageImgs[1]} alt={`${current.alt} 2`} className="w-full rounded-sm object-cover" />
          <img src={current.collageImgs[0]} alt={`${current.alt} 1`} className="w-full rounded-sm object-cover row-span-2 h-full" />
          <img src={current.collageImgs[2]} alt={`${current.alt} 3`} className="w-full rounded-sm object-cover" />
        </motion.div>
      ) : (
        <motion.img
          key={current.label}
          src={current.img}
          alt={current.alt}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-sm object-contain max-h-[70vh]"
        />
      )}
    </AnimatePresence>
  );

  /* Column layout: title → tabs row → image → text below */
  if (layout === "column") {
    return (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
          {sectionLabel}
        </motion.p>
        <motion.h2 {...stagger(1)} className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          {heading}
        </motion.h2>
        <motion.div {...stagger(2)} className="mb-6">{tabButtons(false)}</motion.div>
        <div className="relative" style={{ height: "45vh" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={current.label}
              src={current.img}
              alt={current.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full rounded-sm object-contain"
            />
          </AnimatePresence>
        </div>
        {hasText && (
          <AnimatePresence mode="wait">
            <motion.ul
              key={`text-${current.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 mt-4"
            >
              {current.bullets!.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>
    );
  }

  /* Row layout (default): title top → row of (tabs+text | image) */
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
        {sectionLabel}
      </motion.p>
      <motion.h2 {...stagger(1)} className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
        {heading}
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 min-h-0 items-start">
        <motion.div {...stagger(2)} className="lg:w-1/4 flex flex-col shrink-0">
          <div className="mb-6">{tabButtons(true)}</div>
          {hasText && (
            <AnimatePresence mode="wait">
              <motion.ul
                key={`text-${current.label}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {current.bullets!.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
              </motion.ul>
            </AnimatePresence>
          )}
        </motion.div>

        <div className="lg:w-3/4 min-h-0">
          {imageContent}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Slides                                                             */
/* ------------------------------------------------------------------ */

const slides: Slide[] = [
  /* ---- 1. Cover ---- */
  {
    id: "cover",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div {...stagger(0)} className="relative w-44 h-56 md:w-56 md:h-68 mb-8">
          <img
            src="profilepicture.PNG"
            alt="Elsa Bosemark"
            className="w-full h-full object-cover"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          <div
            className="absolute -inset-3 border-2 border-primary/30 pointer-events-none"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              transform: "rotate(6deg)",
            }}
          />
        </motion.div>
        <motion.h1 {...stagger(1)} className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-3">
          Elsa Bosemark
        </motion.h1>
        <motion.p {...stagger(2)} className="text-2xl md:text-3xl text-muted-foreground mb-3">
          Product Designer
        </motion.p>
        <motion.p {...stagger(3)} className="text-lg tracking-widest uppercase text-primary">
          Intuit &middot; Design Interview
        </motion.p>
      </div>
    ),
  },

  /* ---- 2. About Me ---- */
  {
    id: "about-me",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 h-full px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Left: text */}
        <motion.div {...stagger(0)} className="lg:w-1/2">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">About Me</p>
          <h2 className="text-4xl md:text-5xl leading-tight text-foreground mb-8">
            Designer, thinker, <span className="italic text-primary">maker</span>.
          </h2>
          <ul className="space-y-4">
            <Bullet>Born and raised in San Francisco, grew up tinkering with digital tools before I knew "design" was a discipline</Bullet>
            <Bullet>Studying Product Design and Computer Science at Stanford (B.S. Design + M.S. CS, HCI,2027)</Bullet>
            <Bullet>UX Design intern at Amazon (SPGX) and Focal; PM at Carta</Bullet>
            <Bullet>Researcher at Stanford Graduate School of Education and peer advisor at the d.school </Bullet>
            <Bullet>Speaks French, martial arts instructor, and a serious cinnamon roll enthusiast</Bullet>
          </ul>
        </motion.div>
        {/* Right: fun photo grid */}
        <motion.div {...stagger(1)} className="lg:w-1/2 grid grid-cols-2 gap-3">
          <img src="Fun photos/Workshop.png" alt="Workshop" className="w-full rounded-sm object-cover aspect-square" />
          <img src="Fun photos/Friends.png" alt="With friends" className="w-full rounded-sm object-cover aspect-square" />
          <img src="Fun photos/Welding.JPG" alt="Welding" className="w-full rounded-sm object-cover aspect-square" />
          <img src="Fun photos/Cooking.JPG" alt="Cooking" className="w-full rounded-sm object-cover aspect-square" />
        </motion.div>
      </div>
    ),
  },

  /* ---- 3. Why Intuit ---- */
  {
    id: "why-intuit",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Why Intuit</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">
          Why This Role, Why Intuit
        </motion.h2>
        <motion.ul {...stagger(2)} className="space-y-5 max-w-3xl">
          <Bullet>Improving infrastructure people rely on daily,National Park Service, Stanford d.school</Bullet>
          <Bullet>QuickBooks & Mailchimp: tools on autopilot where small design wins compound at scale</Bullet>
          <Bullet>Bringing fresh ideas to settled spaces,reimagined Amazon seller tools that hadn't changed in years</Bullet>
        </motion.ul>
      </div>
    ),
  },

  /* ---- 4. Amazon Overview (NDA) ---- */
  {
    id: "amazon-overview",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div {...stagger(0)} className="lg:w-1/2">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Amazon SPGX · Summer 2025</p>
          <h2 className="text-4xl md:text-5xl leading-tight text-foreground mb-6">
            AI-Powered Concepts for <span className="text-primary">A+ Content Manager</span>
          </h2>
          <p className="text-sm text-muted-foreground/60 italic mb-6">Details under NDA</p>
          <ul className="space-y-4">
            <Bullet>Introduced AI-powered concepts into a tool used daily by 168K sellers to publish content to 20M+ products across 21 marketplaces</Bullet>
            <Bullet>Delivered launch-ready designs, increasing seller confidence from 4/7 to 7/7</Bullet>
            <Bullet>Ran 4 interviews and 5 usability tests, synthesized into a near-term roadmap and long-term vision</Bullet>
            <Bullet>Scoped and prioritized projects to improve tool ROI, balancing business needs and seller workflows</Bullet>
          </ul>
        </motion.div>
        <motion.img {...stagger(1)} src="Amazon/Amazon Thumbnail.png" alt="Amazon A+ Content Manager" className="lg:w-1/2 w-full rounded-sm object-contain" />
      </div>
    ),
  },

  /* ---- 5. Carta,Title ---- */
  {
    id: "carta-title",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24">
        <div className="lg:w-1/2">
          <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Product Design & Launch</motion.p>
          <motion.h2 {...stagger(1)} className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-8">
            Designed Degree Tracker UI for{" "}<span className="text-primary">Stanford's Academic Planner</span>
          </motion.h2>
          <motion.div {...stagger(2)} className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
            <Meta label="Role" value="UI/UX Designer" />
            <Meta label="Timeline" value="10 weeks" />
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Skills</p>
              <SkillPills items={["Interviewing", "UI Design", "Documenting", "Collaborating"]} />
            </div>
            <Meta label="Tools" value="Figma, Google Docs" />
          </motion.div>
        </div>
        <motion.img {...stagger(1)} src="Carta/MacBook Pro 16-inch Space Black Front.png" alt="Carta degree tracker" className="lg:w-1/2 w-full rounded-sm" />
      </div>
    ),
  },

  /* ---- 5. Carta,Objective & Problem ---- */
  {
    id: "carta-problem",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Objective</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-6">
          95% of Stanford Undergrads Use Carta, But Degree Planning Was Still Broken
        </motion.h2>
        <motion.blockquote {...stagger(2)} className="border-l-4 border-primary/40 pl-5 mb-10 italic text-lg text-muted-foreground leading-relaxed max-w-3xl">
          "Why am I having to transfer information that's already on the website to another document, then to another document? So yeah, it's a little tedious."
          <span className="block mt-2 text-sm not-italic font-medium text-primary/70">— Stanford Student</span>
        </motion.blockquote>
        <motion.div {...stagger(3)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Too Many Tabs", points: ["Constant tab-switching between university sites", "Copy-pasting requirements into personal spreadsheets"] },
            { title: "No Visual Planner", points: ["Students wanted color-coded systems", "No way to see how courses align with requirements"] },
            { title: '"What If" Missing', points: ["No way to experiment with different majors", "Couldn't compare academic paths"] },
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-sm p-6">
              <h3 className="text-xl font-medium text-foreground mb-3">{item.title}</h3>
              <ul className="space-y-2">
                {item.points.map((p, j) => (<Bullet key={j}>{p}</Bullet>))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    ),
  },

  /* ---- 6. Carta,Process: Landscape + Wireframes ---- */
  {
    id: "carta-process-overview",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Process</motion.p>
        <motion.h2 {...stagger(1)} className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Research & Iteration
        </motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Looking at the Landscape</p>
            <img src="Carta/Landscape.png" alt="Competitive landscape" className="w-full rounded-sm object-contain" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Low Fidelity</p>
              <img src="Carta/Lowfi.png" alt="Low-fidelity wireframes" className="w-full rounded-sm" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">High Fidelity</p>
              <img src="Carta/Highfi.png" alt="High-fidelity prototypes" className="w-full rounded-sm" />
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },

  /* ---- 7. Carta,Design Decisions (TABBED, image only) ---- */
  {
    id: "carta-process",
    hasTabs: true,
    render: () => (
      <TabbedCarousel
        sectionLabel="User Testing"
        heading="Three Design Decisions That Made the Difference"
        layout="column"
        tabs={[
          { label: "Select > Drag & Drop", img: "Carta/1_Select instead of Drag & Drop.png", alt: "Select instead of drag and drop", bullets: [
            "Drag-and-drop is not ideal for keyboard users (per Stanford Office of Accessibility)",
            "People prefer selecting from predefined options over creating their own",
            "User testing confirmed: select-from-list outperformed drag-and-drop",
          ] },
          { label: "Keeping It Simple", img: "Carta/1_Keeping it Simple.png", alt: "Keeping it simple", bullets: [
            "Tracking progress is helpful when it's actionable,show completed, planned, and unplanned",
            "Old design had too much irrelevant info",
            "Moved less critical details to the side, made main content more central",
          ] },
          { label: "Clairity", img: "Carta/1_Clairity.png", alt: "Clairity edit button", bullets: [
            "Three-dot menu was clean but required extra clicks",
            "Students edit frequently,made edit option more visible",
            "Text \"Edit\" button tested more intuitive than an icon",
          ] },
        ]}
      />
    ),
  },

  /* ---- 7. Carta,Outcome (TABBED, image only) ---- */
  {
    id: "carta-outcome",
    hasTabs: true,
    render: () => (
      <TabbedCarousel
        sectionLabel="Outcome"
        heading="A Degree Tracker That Works the Way Students Think"
        tabs={[
          { label: "Automated", img: "Carta/Carta Final 1.png", alt: "Automated degree requirement filling", bullets: [
            "Choose a degree and have requirements + progress automatically filled",
            "No more hunting across websites",
          ] },
          { label: "Personalized", img: "Carta/Carta Final 2.png", alt: "Personalized degree planning", bullets: [
            "Edit requirements to fit individual needs",
            "Track WAYS and unit count in one place",
          ] },
          { label: "Visualized", img: "Carta/Carta Final 3.png", alt: "Visualized degree progress", bullets: [
            "See degree progress at a glance",
            "Identify which classes in the four-year planner contribute to a given degree",
          ] },
        ]}
      />
    ),
  },

  /* ---- 8. Carta,Impact ---- */
  {
    id: "carta-impact",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Impact</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">
          Carta: Results & Impact
        </motion.h2>
        <motion.ul {...stagger(2)} className="space-y-4 max-w-3xl">
          <Bullet>Now leading rollout as Product Manager, used by <span className="text-foreground font-medium">95% of Stanford students</span></Bullet>
          <Bullet>Run weekly meetings to drive features, validated through testing with <span className="text-foreground font-medium">20+ students</span></Bullet>
          <Bullet>Partnered with design and engineering for high-quality handoff and smooth implementation</Bullet>
          <Bullet>Consulted Stanford's Office of Digital Accessibility to integrate accessibility standards</Bullet>
          <Bullet>Documented every key decision and interaction flow for engineer handoff</Bullet>
        </motion.ul>
      </div>
    ),
  },

  /* ---- 9. Focal,Title ---- */
  {
    id: "focal-title",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24">
        <div className="lg:w-1/2">
          <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">UX Design & Research</motion.p>
          <motion.h2 {...stagger(1)} className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-8">
            Uncovered User Insights to Improve the UX of{" "}<span className="text-primary">Infrared Heaters</span>
          </motion.h2>
          <motion.div {...stagger(2)} className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
            <Meta label="Role" value="UX Designer" />
            <Meta label="Timeline" value="8 weeks" />
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">Skills</p>
              <SkillPills items={["Experiments", "A/B Testing", "User Research", "Journey Mapping"]} />
            </div>
            <Meta label="Tools" value="Otter.ai, Figma, FigJam" />
          </motion.div>
        </div>
        <motion.img {...stagger(1)} src="Focal/Top Image and Thumbnail.png" alt="Focal infrared heater" className="lg:w-1/2 w-full rounded-sm" />
      </div>
    ),
  },

  /* ---- 10. Focal,Context ---- */
  {
    id: "focal-context",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div {...stagger(0)} className="lg:w-1/2">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Context</p>
          <h2 className="text-4xl md:text-5xl leading-tight text-foreground mb-6">
            What Is <span className="text-primary">Focal</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Focal is a startup revolutionizing how people are heated. I joined when they had five pilot installations.
          </p>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">The Challenge</p>
          <ul className="space-y-3">
            <Bullet>Limited understanding of how customers experience the heaters</Bullet>
            <Bullet>Needed to define the ideal heating experience before official launch</Bullet>
            <Bullet>Validate product desirability through real user insights</Bullet>
          </ul>
        </motion.div>
        <motion.img {...stagger(1)} src="Focal/Context.png" alt="Focal heater in context" className="lg:w-1/2 w-full rounded-sm object-contain" />
      </div>
    ),
  },

  /* ---- 11. Focal,Objective & Research ---- */
  {
    id: "focal-research",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Objective & Research</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-4">
          Understanding How Customers Experience Heating
        </motion.h2>
        <motion.div {...stagger(2)} className="space-y-4 mb-8">
          <div className="flex gap-5 items-start">
            <span className="text-3xl font-light text-primary leading-none mt-1">1</span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What is the ideal user journey for guests and staff when it comes to heating?
            </p>
          </div>
          <div className="flex gap-5 items-start">
            <span className="text-3xl font-light text-primary leading-none mt-1">2</span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What is the current guest and staff experience using Focal? What can be improved?
            </p>
          </div>
        </motion.div>
        <motion.div {...stagger(3)} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { img: "Focal/Field Work.png", title: "Field Work", points: ["Spoke with 20+ guests in Hayes Valley", "Ran activities with 28 guests at Cole Valley Tavern", "Interviewed 8 staff members"] },
            { img: "Focal/Observations.png", title: "Observations", points: ["Conducted stakeouts at five restaurants", "Identified key moments from parklet cameras"] },
            { img: "Focal/Interviews.png", title: "Interviews", points: ["Manager YES/NO decisions from ~20 restaurants", "Pricing validation with restaurant owners"] },
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-sm overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full" />
              <div className="p-6">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((p, j) => (<Bullet key={j}>{p}</Bullet>))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    ),
  },

  /* ---- 11. Focal,Insights ---- */
  {
    id: "focal-insights",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Left: themes + pain points */}
        <motion.div {...stagger(0)} className="lg:w-1/2">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Key Insights</p>
          <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">Three Themes Emerged</h2>
          <div className="space-y-4 mb-8">
            {[
              { theme: "Convenience", desc: "Heaters must be simpler than flicking a light switch" },
              { theme: "Ambiance", desc: "Restaurants want to maintain aesthetics; guests enjoy the glow" },
              { theme: "Flexibility", desc: "Guests rearrange tables to suit groups, strollers, dogs" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-2xl font-light text-primary leading-none mt-0.5">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{item.theme}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Pain Points</p>
          <ul className="space-y-2">
            <Bullet>Forgetfulness around turning off heaters</Bullet>
            <Bullet>Confusion if heater is on, off, or warming up</Bullet>
            <Bullet>Equipment weathering & poor communication</Bullet>
            <Bullet>Unclarity around what Focal is</Bullet>
          </ul>
        </motion.div>
        {/* Right: How Might We image */}
        <motion.img {...stagger(1)} src="Focal/How Might We.png" alt="How Might We synthesis" className="lg:w-1/2 w-full rounded-sm object-contain" />
      </div>
    ),
  },

  /* ---- 12. Focal,Outcome ---- */
  {
    id: "focal-outcome",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Outcome</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-8">From Friction to Four High-Impact Projects</motion.h2>
        <motion.div {...stagger(2)} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2 space-y-5">
            {[
              { num: "01", title: "Updated Admin UI", points: ["Thumbnails for table layouts", "Improved mobile responsiveness", "New auto-off feature"] },
              { num: "02", title: "Revised Guest UI", points: ["Progress bar and offline heater screen", "Enhanced accessibility and heat control"] },
              { num: "03", title: "Improved Clarity", points: ["Updated materials for durability", "Clearer communication of status"] },
              { num: "04", title: "Guest Education", points: ["Signage, lighting, symbols, and scripts", "Help guests understand the product"] },
            ].map((p) => (
              <div key={p.num} className="flex gap-4 items-start">
                <span className="text-2xl font-light text-primary shrink-0">{p.num}</span>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">{p.title}</h3>
                  <ul className="space-y-1">
                    {p.points.map((pt, j) => (<Bullet key={j}>{pt}</Bullet>))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <img src="Focal/Final Customer Satisfaction Report.png" alt="Customer Satisfaction Report" className="w-full rounded-sm" />
            <img src="Focal/Research Informed Projects.png" alt="Research Informed Projects" className="w-full rounded-sm" />
          </div>
        </motion.div>
      </div>
    ),
  },

  /* ---- 13. Focal,Impact ---- */
  {
    id: "focal-impact",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Impact</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">
          Focal: Results & Impact
        </motion.h2>
        <motion.ul {...stagger(2)} className="space-y-4 max-w-3xl">
          <Bullet>Redesigned guest controls, driving a <span className="text-foreground font-medium">160% increase in interactions</span></Bullet>
          <Bullet>Shipped <span className="text-foreground font-medium">2 new mobile app features</span> in collaboration with engineering and product</Bullet>
          <Bullet>Interviewed <span className="text-foreground font-medium">50+ guests</span> to create user journeys and flows displayed across the office</Bullet>
          <Bullet>Ran <span className="text-foreground font-medium">10+ design experiments</span> (A/B, Wizard of Oz) to build conviction for solutions</Bullet>
          <Bullet>Prioritized <span className="text-foreground font-medium">3 of 7 features</span> based on market analysis and user feedback</Bullet>
        </motion.ul>
      </div>
    ),
  },

  /* ---- 14. Lessons Learned (TABBED) ---- */
  {
    id: "lessons",
    hasTabs: true,
    render: () => (
      <TabbedCarousel
        sectionLabel="Lessons Learned"
        heading="What These Projects Taught Me"
        tabs={[
          { label: "Carta", img: "Carta/MacBook Pro 16-inch Space Black Front.png", alt: "Carta project", bullets: [
            "Aesthetics should never harm usability,learn to combine both",
            "Bake in accessibility from the start, not as an afterthought",
            "Design for the whole system,isolated features limit the experience",
          ] },
          { label: "Focal", img: "Focal/NewFocal1.jpg", alt: "Focal lessons", collageImgs: ["Focal/NewFocal1.jpg", "Focal/NewFocal2.jpg", "Focal/NewFocal3.jpg"], bullets: [
            "Build conviction with evidence, not assumptions",
            "Don't add complexity without proof",
            "Field research reveals what surveys can't",
            "Your work lives on,documentation and handoff matter as much as the design itself",
          ] },
        ]}
      />
    ),
  },

  /* ---- 15. Thank You ---- */
  {
    id: "thankyou",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h2 {...stagger(0)} className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6">
          Thank You
        </motion.h2>
        <motion.p {...stagger(1)} className="text-2xl text-muted-foreground mb-10">
          I'd love to discuss these projects further.
        </motion.p>
        <motion.div {...stagger(2)} className="flex gap-10">
          <a href="https://www.linkedin.com/in/elsa-bosemark/" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">LinkedIn</a>
          <a href="https://drive.google.com/drive/folders/1ItQnTRbk4xs_J7Z4OXYOoW3-VKtaUJl0?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">Resume</a>
        </motion.div>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Deck component                                                     */
/* ------------------------------------------------------------------ */

const IntuitDeck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    container.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-index="${index}"]`);
    target?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const currentSlide = slides[active];
      if (currentSlide?.hasTabs && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.min(active + 1, slides.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, goTo]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {slides.map((slide, i) => (
          <section
            key={slide.id}
            data-index={i}
            className="h-screen w-full flex-shrink-0 overflow-hidden bg-background"
            style={{ scrollSnapAlign: "start" }}
          >
            <AnimatePresence mode="wait">
              {slide.render()}
            </AnimatePresence>
          </section>
        ))}
      </div>

      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === active ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </nav>

      <div className="fixed bottom-4 right-4 z-50 text-xs text-muted-foreground tracking-widest">
        {active + 1} / {slides.length}
      </div>
    </div>
  );
};

export default IntuitDeck;
