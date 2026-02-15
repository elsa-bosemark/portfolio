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
/*  Tabbed image carousel — image only, full width                     */
/* ------------------------------------------------------------------ */

interface Tab {
  label: string;
  img: string;
  alt: string;
}

const TabbedCarousel = ({ tabs, sectionLabel, heading }: { tabs: Tab[]; sectionLabel: string; heading: string }) => {
  const [idx, setIdx] = useState(0);
  const current = tabs[idx];

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

  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
        {sectionLabel}
      </motion.p>
      <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-6">
        {heading}
      </motion.h2>

      {/* Tab buttons */}
      <motion.div {...stagger(2)} className="flex gap-2 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setIdx(i)}
            className={`px-5 py-2.5 text-sm font-semibold tracking-wide uppercase rounded-sm transition-colors ${
              i === idx
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Full-width image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current.label}
          src={current.img}
          alt={current.alt}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-sm object-contain max-h-[65vh]"
        />
      </AnimatePresence>

      <p className="text-sm text-muted-foreground/50 mt-4">
        Use <span className="font-medium">&larr; &rarr;</span> to switch tabs
      </p>
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
        <motion.img
          {...stagger(0)}
          src="profilepicture.PNG"
          alt="Elsa Bosemark"
          className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-full mb-8 border-4 border-primary/20"
        />
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

  /* ---- 2. About — Career Journey ---- */
  {
    id: "about-journey",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">About Me</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">My Career Journey</motion.h2>
        <motion.ul {...stagger(2)} className="space-y-4 max-w-3xl">
          <Bullet>Born and raised in San Francisco — grew up tinkering with digital tools</Bullet>
          <Bullet>Studying Product Design and Computer Science at Stanford</Bullet>
          <Bullet>Mentor for Stanford GSE's AI Tinkery, peer advisor at the d.school</Bullet>
          <Bullet>Researching new fabrication methods at ShapeLab</Bullet>
          <Bullet><span className="italic text-foreground/60">[Replace with your full career story — go beyond your resume]</span></Bullet>
        </motion.ul>
      </div>
    ),
  },

  /* ---- 3. About — Why Intuit + Personal ---- */
  {
    id: "about-why",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">About Me</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">Why Intuit?</motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <h3 className="text-2xl font-medium text-foreground mb-4">My "Why"</h3>
            <ul className="space-y-3">
              <Bullet><span className="italic text-foreground/60">[Why this role?]</span></Bullet>
              <Bullet><span className="italic text-foreground/60">[Why Intuit?]</span></Bullet>
              <Bullet><span className="italic text-foreground/60">[What motivates you?]</span></Bullet>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-foreground mb-4">Outside of Work</h3>
            <ul className="space-y-3">
              <Bullet>Speaks French</Bullet>
              <Bullet>Martial Arts Instructor</Bullet>
              <Bullet>Loves Cinnamon Rolls</Bullet>
              <Bullet><span className="italic text-foreground/60">[Add more personal details]</span></Bullet>
            </ul>
          </div>
        </motion.div>
      </div>
    ),
  },

  /* ---- 4. Carta — Title ---- */
  {
    id: "carta-title",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24">
        <div className="lg:w-1/2">
          <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Project 1 &middot; Product Design & Launch</motion.p>
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

  /* ---- 5. Carta — Objective & Problem ---- */
  {
    id: "carta-problem",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Objective</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">
          95% of Stanford Undergrads Use Carta, But Degree Planning Was Still Broken
        </motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

  /* ---- 6. Carta — Design Decisions (TABBED, image only) ---- */
  {
    id: "carta-process",
    hasTabs: true,
    render: () => (
      <TabbedCarousel
        sectionLabel="My Role & Process"
        heading="Three Design Decisions That Made the Difference"
        tabs={[
          { label: "Select > Drag & Drop", img: "Carta/1_Select instead of Drag & Drop.png", alt: "Select instead of drag and drop" },
          { label: "Keeping It Simple", img: "Carta/1_Keeping it Simple .png", alt: "Keeping it simple" },
          { label: "Quick Access", img: "Carta/1_Quick Access.png", alt: "Quick access edit button" },
        ]}
      />
    ),
  },

  /* ---- 7. Carta — Outcome (TABBED, image only) ---- */
  {
    id: "carta-outcome",
    hasTabs: true,
    render: () => (
      <TabbedCarousel
        sectionLabel="Outcome"
        heading="A Degree Tracker That Works the Way Students Think"
        tabs={[
          { label: "Automated", img: "Carta/Automated.png", alt: "Automated degree requirement filling" },
          { label: "Personalized", img: "Carta/Personlized.png", alt: "Personalized degree planning" },
          { label: "Visualized", img: "Carta/Visulize.png", alt: "Visualized degree progress" },
        ]}
      />
    ),
  },

  /* ---- 8. Carta — Impact ---- */
  {
    id: "carta-impact",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Impact</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">
          Carta: Results & Impact
        </motion.h2>
        <motion.ul {...stagger(2)} className="space-y-4 max-w-3xl">
          <Bullet>Now leading rollout as Product Manager — used by <span className="text-foreground font-medium">95% of Stanford students</span></Bullet>
          <Bullet>Run weekly meetings to drive features, validated through testing with <span className="text-foreground font-medium">20+ students</span></Bullet>
          <Bullet>Partnered with design and engineering for high-quality handoff and smooth implementation</Bullet>
          <Bullet>Consulted Stanford's Office of Digital Accessibility to integrate accessibility standards</Bullet>
          <Bullet>Documented every key decision and interaction flow for engineer handoff</Bullet>
        </motion.ul>
      </div>
    ),
  },

  /* ---- 9. Focal — Title ---- */
  {
    id: "focal-title",
    render: () => (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full px-8 md:px-16 lg:px-24">
        <div className="lg:w-1/2">
          <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Project 2 &middot; UX Design & Research</motion.p>
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

  /* ---- 10. Focal — Objective & Research ---- */
  {
    id: "focal-research",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Objective & Research</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-8">
          Understanding How Customers Experience Heating
        </motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-3 gap-10">
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

  /* ---- 11. Focal — Insights ---- */
  {
    id: "focal-insights",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Key Insights</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-8">Three Themes Emerged</motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            { theme: "Convenience", points: ["Guests feel guilty inconveniencing staff", "Heaters must be simpler than flicking a light switch", "Equipment frequently gets lost or broken"] },
            { theme: "Ambiance", points: ["Restaurants want to maintain aesthetics", "Heaters attract guests to the parklet", "Guests enjoy the ambient glow"] },
            { theme: "Flexibility", points: ["Guests dine outdoors for groups, strollers, dogs", "Guests rearrange tables to suit their needs", "Parklets feature various table arrangements"] },
          ].map((item, i) => (
            <div key={i} className="border border-border rounded-sm p-6">
              <h3 className="text-xl font-medium text-foreground mb-4">{item.theme}</h3>
              <ul className="space-y-2">
                {item.points.map((p, j) => (<Bullet key={j}>{p}</Bullet>))}
              </ul>
            </div>
          ))}
        </motion.div>
        <motion.div {...stagger(3)}>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Pain Points</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Forgetfulness around turning off heaters",
              "Confusion if heater is on, off, or warming up",
              "Equipment weathering & poor communication",
              "Unclarity around what Focal is",
            ].map((pain, i) => (
              <div key={i} className="flex gap-3 items-start border border-border rounded-sm p-5">
                <span className="text-2xl font-light text-primary leading-none">{i + 1}</span>
                <p className="text-lg text-muted-foreground leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
  },

  /* ---- 12. Focal — Outcome ---- */
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
          <img src="Focal/Final Customer Satisfaction Report.png" alt="Customer Satisfaction Report" className="md:w-1/2 w-full rounded-sm" />
        </motion.div>
      </div>
    ),
  },

  /* ---- 13. Focal — Impact ---- */
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

  /* ---- 14. Lessons Learned ---- */
  {
    id: "lessons",
    render: () => (
      <div className="flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.p {...stagger(0)} className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Lessons Learned</motion.p>
        <motion.h2 {...stagger(1)} className="text-4xl md:text-5xl leading-tight text-foreground mb-10">What These Projects Taught Me</motion.h2>
        <motion.div {...stagger(2)} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
          <div className="border border-border rounded-sm p-8">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">From Carta</h3>
            <ul className="space-y-3">
              <Bullet>Accessibility isn't an afterthought — consulting Stanford's Office of Accessibility early reshaped core interactions</Bullet>
              <Bullet>Usability beats aesthetics — a visible "Edit" button outperformed a sleeker three-dot menu every time</Bullet>
              <Bullet>Design for the whole system — keeping the degree tracker separate limited the experience; integration would have been stronger</Bullet>
            </ul>
          </div>
          <div className="border border-border rounded-sm p-8">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">From Focal</h3>
            <ul className="space-y-3">
              <Bullet>Build conviction with evidence — proposals need concrete data from interviews, prototypes, and experiments</Bullet>
              <Bullet>Don't add complexity without proof — unless you can clearly articulate the need, maintain consistency</Bullet>
              <Bullet>Field research reveals what surveys can't — stakeouts and in-person conversations surfaced insights no remote method could</Bullet>
            </ul>
          </div>
        </motion.div>
      </div>
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
