import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const CaseStudyCarta = () => (
  <main className="min-h-screen bg-background">
    {/* Back link */}
    <div className="px-6 md:px-16 lg:px-24 pt-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
      >
        &larr; Back
      </Link>
    </div>

    {/* Hero */}
    <section className="px-6 md:px-16 lg:px-24 pt-16 pb-12">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left: title + context */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-6">
              Product Design & Launch
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-10">
              Designed Degree Tracker UI for{" "}
              <span className="text-primary">Stanford's Academic Planner</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-6 pt-10 border-t border-border"
          >
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Role
              </p>
              <p className="text-foreground">UI/UX Designer</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Timeline
              </p>
              <p className="text-foreground">10 weeks</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Interviewing", "UI Design", "Documenting", "Collaborating"].map(
                  (s) => (
                    <span
                      key={s}
                      className="px-2 py-1 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Tools
              </p>
              <p className="text-foreground">Figma, Google Docs</p>
            </div>
          </motion.div>
        </div>

        {/* Right: thumbnail image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 flex items-center"
        >
          <img
            src="Carta/MacBook Pro 16-inch Space Black Front.png"
            alt="Carta degree tracker interface"
            className="w-full rounded-sm"
          />
        </motion.div>
      </div>
    </section>

    {/* The Starting Point */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          The Starting Point
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          95% of Stanford Undergrads Use Carta, But Degree Planning Was Still Broken
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Carta is Stanford's go-to course planning platform, used by nearly
          every undergraduate on campus. As the team prepared to launch a new
          version with expanded features, they identified a critical gap:
          students had no integrated way to track their degree progress.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Instead, students were stuck juggling fragmented, outdated resources:
          hopping between multiple university websites, copying requirements
          into personal spreadsheets, and manually cross-referencing their
          four-year plans. It was tedious, error-prone, and led to missed
          requirements and poor academic planning.
        </p>
      </motion.div>
    </section>

    {/* Listening to Students */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Listening to Students
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          The Frustration Was Universal
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          I interviewed Stanford students to understand how they actually
          navigate degree planning: the tools they use, the workarounds they've
          built, and the friction they experience. One theme surfaced again and
          again:
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-2 mb-10">
          <p className="text-xl md:text-2xl text-foreground leading-relaxed italic font-light">
            "Why am I having to transfer information that's already on the
            website to another document, then to another document? So yeah, it's
            a little tedious."
          </p>
        </blockquote>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The interviews revealed three core pain points that would shape
          everything that followed.
        </p>
      </motion.div>
    </section>

    {/* What I Found */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8">
          What I Found
        </p>
        <div className="space-y-10">
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xl font-medium text-foreground mb-3">
              Too Many Tabs and Copy-Pasting
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Students were frustrated with the need to constantly switch between
              tabs and manually copy-paste information into their own documents.
            </p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xl font-medium text-foreground mb-3">
              Visually Intuitive Four-Year Planner
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Many students use color-coded systems to organize their four-year
              plans. They desire better integration between their four-year
              planner and degree planner to easily see how their courses align
              with degree requirements.
            </p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xl font-medium text-foreground mb-3">
              "What If" Experimentations with Majors
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Students appreciated being able to experiment with different majors
              while planning their courses but found existing tools lacked the
              ability to explore and compare academic paths.
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Looking at the Landscape */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Looking at the Landscape
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Existing Tools Weren't Connecting the Dots
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          I reviewed resources available to students at Stanford and other
          universities. Degree planning had plenty of pre-made structures, and
          some spreadsheets attempted to check how requirements were being
          fulfilled. But building a four-year plan was still a manual process,
          and nowhere could students easily see how their planned courses
          actually mapped to degree requirements. The integration just didn't
          exist.
        </p>
        <img
          src="Carta/Landscape.png"
          alt="Competitive landscape of degree planning tools"
          className="w-full rounded-sm"
          loading="lazy"
        />
      </motion.div>
    </section>

    {/* Reframing the Challenge */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Reframing the Challenge
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Three Questions That Guided the Design
        </h2>
        <div className="space-y-6">
          {[
            "How might we reduce the need for online scavenging to find degree requirements, minimize redundant tabs and copy-pasting, and simplify the overall process?",
            "How might we improve the four-year planner to provide more detailed information about degree progress?",
            "How might we make it easier for students to experiment with different majors?",
          ].map((q, i) => (
            <div key={i} className="flex gap-5 items-start">
              <span className="text-3xl font-light text-primary leading-none mt-1">
                {i + 1}
              </span>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* Defining the Direction */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Defining the Direction
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          From Insights to a Clear Vision
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The research pointed to a centralized degree-planning tool built
          directly into Carta. Students should be able to select one or multiple
          majors, have all requirements automatically loaded, and see a visual
          progress bar tracking their journey. I translated this into three
          design pillars:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background border border-border rounded-sm p-5">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
              Automate
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Select any major and automatically upload all its requirements to
              Carta.
            </p>
          </div>
          <div className="bg-background border border-border rounded-sm p-5">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
              Integrate
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Automatically show which requirements have been satisfied by
              existing courses in the four-year planner.
            </p>
          </div>
          <div className="bg-background border border-border rounded-sm p-5">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
              Visualize
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Support multiple majors with a progress bar indicating completed
              versus required courses.
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* From Wireframes to Prototypes */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          From Wireframes to Prototypes
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Testing Structure, Then Polish
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl">
          I started with low-fidelity wireframes to explore how degree
          requirements, progress tracking, and course selection could coexist
          in a single interface. Once the structure was validated, I moved into
          high-fidelity designs matching Carta's visual language. These became
          the prototypes I put in front of real students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure>
            <img
              src="Carta/Lowfi.png"
              alt="Low-fidelity wireframes for Carta"
              className="w-full rounded-sm"
              loading="lazy"
            />
            <figcaption className="text-base text-muted-foreground mt-3">
              Low fidelity
            </figcaption>
          </figure>
          <figure>
            <img
              src="Carta/Highfi.png"
              alt="High-fidelity designs for Carta"
              className="w-full rounded-sm"
              loading="lazy"
            />
            <figcaption className="text-base text-muted-foreground mt-3">
              High fidelity
            </figcaption>
          </figure>
        </div>
      </motion.div>
    </section>

    {/* What Testing Revealed */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          What Testing Revealed
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Three Changes That Made All the Difference
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Putting the designs in front of students uncovered assumptions I
          didn't know I'd made. Each round of testing pushed the design closer
          to something that truly worked for them.
        </p>

        {/* Select instead of Drag & Drop */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Select instead of Drag & Drop
          </h3>
          <img
            src="Carta/1_Select instead of Drag & Drop.png"
            alt="Select instead of drag and drop"
            className="w-full rounded-sm mb-6"
            loading="lazy"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            After consulting Stanford's Office of Accessibility, I learned that
            drag-and-drop interfaces are not ideal for keyboard users. Studies
            also show that people prefer selecting from predefined options rather
            than creating their own. User testing confirmed this insight, leading
            to a new UI where students select from a list of predefined classes
            for each requirement.
          </p>
        </div>

        {/* Keeping it Simple */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Keeping it Simple
          </h3>
          <img
            src="Carta/1_Keeping it Simple .png"
            alt="Keeping it simple design change"
            className="w-full rounded-sm mb-6"
            loading="lazy"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            Research showed that tracking degree progress is helpful when it's
            actionable. Displaying completed, planned, and unplanned courses
            guides students better. The old design had too much irrelevant info,
            so I moved less critical details to the side, making the main content
            more central and prominent.
          </p>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Quick Access
          </h3>
          <img
            src="Carta/1_Quick Access.png"
            alt="Quick access design change"
            className="w-full rounded-sm mb-6"
            loading="lazy"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            I initially used three dots for editing to keep the design clean, but
            it required extra clicks. Since students edit frequently, I made the
            edit option more visible. Testing showed a text "Edit" button was
            more intuitive than an icon. Though it reduced visual sleekness, the
            improved usability was worth the trade-off.
          </p>
        </div>
      </motion.div>
    </section>

    {/* The Final Design */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          The Final Design
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          A Degree Tracker That Works the Way Students Think
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          After multiple rounds of research, prototyping, and testing, the
          design landed on three core principles, each addressing the pain
          points students had voiced from the very beginning.
        </p>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
              Automated
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Choose a degree and have requirements and current progress
              automatically filled out. No more hunting across websites.
            </p>
            <img
              src="Carta/Automated.png"
              alt="Automated degree requirement filling"
              className="w-full rounded-sm"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
              Personalized
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Customize degree plans by editing requirements to fit individual
              needs. Track WAYS and unit count requirements in one place.
            </p>
            <img
              src="Carta/Personlized.png"
              alt="Personalized degree planning"
              className="w-full rounded-sm"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
              Visualized
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Easily identify degree progress and see exactly which classes in
              the four-year planner contribute to a given degree.
            </p>
            <img
              src="Carta/Visulize.png"
              alt="Visualized degree progress"
              className="w-full rounded-sm"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </section>

    {/* Shipping It */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Shipping It
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Handing Off to Engineers
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="Carta/Handoff.png"
            alt="Design handoff documentation"
            className="w-full md:w-1/2 rounded-sm"
            loading="lazy"
          />
          <div className="flex-1">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              With the design finalized, I documented every key decision and
              interaction flow so engineers could implement the UI without
              guesswork. The handoff prioritized clarity, making it easy for
              the team to understand not just what to build, but why each
              choice was made.
            </p>
            <a
              href="https://www.figma.com/design/CvJo35Zlnt6dfGmb8k7VEI/Degree-Planner?node-id=41-2&t=yu85yPLjZLXbenLR-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-primary/90 transition-colors"
            >
              View Figma File &rarr;
            </a>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Looking Back */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Looking Back
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          What I'd Do With More Time
        </h2>
        <div className="space-y-5">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I kept the degree tracker separate from the four-year planner
            because another designer was focused on that side. In hindsight,
            combining everything into a single, cohesive space might have
            created a stronger experience. With more time, I'd explore designs
            that fully integrate these two components.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'd also push further on accessibility. While I ensured symbols
            were used alongside color to convey meaning, I'm less confident the
            interface is fully optimized for screen readers. Moving away from
            drag-and-drop was one step, but there's more ground to cover in
            making academic tools truly inclusive.
          </p>
        </div>
      </motion.div>
    </section>

    {/* Next Projects */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 border-t border-border">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8 text-center">
        Next Projects
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/case-study/focal"
          className="group border border-border rounded-sm p-6 hover:border-primary transition-colors"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            UX Design & Research
          </p>
          <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            Uncovered User Insights to Improve the UX of Infrared Heaters
          </p>
        </Link>
        <Link
          to="/case-study/safebites"
          className="group border border-border rounded-sm p-6 hover:border-primary transition-colors"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Mobile App Development & Design
          </p>
          <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            Coded an App for Safer Dining Experiences During COVID-19
          </p>
        </Link>
      </div>
    </section>
  </main>
);

export default CaseStudyCarta;
