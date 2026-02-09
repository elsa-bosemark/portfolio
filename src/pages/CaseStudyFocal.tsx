import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const CaseStudyFocal = () => (
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
              UX Design & Research
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-10">
              Uncovered User Insights to Improve the UX of{" "}
              <span className="text-primary">Infrared Heaters</span>
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
              <p className="text-foreground">UX Designer</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Timeline
              </p>
              <p className="text-foreground">8 weeks</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Experiments", "A/B Testing", "User Research", "Journey Mapping"].map(
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
              <p className="text-foreground">Otter.ai, Figma, FigJam, Kanban</p>
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
            src="Focal/Top Image and Thumbnail.png"
            alt="Focal infrared heater project"
            className="w-full rounded-sm"
          />
        </motion.div>
      </div>
    </section>

    {/* Problem Statement */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          The Challenge
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Uncertainty Around Desirability
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The Focal team had a limited understanding of how customers were
          experiencing their heaters. They sought to define the ideal heating
          experience and identify ways to enhance their product. My primary goal
          was to gain insights into customer experiences and validate the product
          idea before its official launch at the end of the summer.
        </p>
      </motion.div>
    </section>

    {/* Solution */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          The Outcome
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Becoming the Voice of Customers
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          I compiled insights into a Customer Satisfaction Report, which I
          presented to the co-founders. Using these insights, I identified and
          scoped four high-impact projects aimed at improving customer
          satisfaction. Additionally, I leveraged the collected data to
          contribute to market fit discussions with the Strategy Lead.
        </p>
        <img
          src="Focal/Final Customer Satisfaction Report.png"
          alt="Snapshots from the final Customer Satisfaction Report"
          className="w-full rounded-sm mb-4"
          loading="lazy"
        />
        <p className="text-base text-muted-foreground">
          Snapshots from the final Customer Satisfaction Report.
        </p>
      </motion.div>
    </section>

    {/* Context */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Where It Started
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Working at an Infrared Heater Startup
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src="Focal/Context.png"
            alt="Focal context, infrared heater installations"
            className="w-full md:w-1/2 rounded-sm"
            loading="lazy"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            Focal is a startup whose mission is to revolutionize how people are
            heated. When I joined, they had finished installing five pilot
            installations.
          </p>
        </div>
      </motion.div>
    </section>

    {/* Discovery */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Discovery
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Understanding the Ideal Heating Experience
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          I set out to answer two key questions:
        </p>
        <div className="space-y-4 mb-12">
          <div className="flex gap-5 items-start">
            <span className="text-3xl font-light text-primary leading-none mt-1">
              1
            </span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What is the ideal user journey for guests and staff when it comes
              to heating?
            </p>
          </div>
          <div className="flex gap-5 items-start">
            <span className="text-3xl font-light text-primary leading-none mt-1">
              2
            </span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What is the current guest and staff experience using Focal? What
              can be improved?
            </p>
          </div>
        </div>

        {/* Research Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <img
              src="Focal/Field Work.png"
              alt="Field work research"
              className="w-full"
              loading="lazy"
            />
            <div className="p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Field Work
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Spoke with 20 guests dining outdoors in Hayes Valley. Ran
                activities with 28 guests at Cole Valley Tavern. Interviewed 8
                staff.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <img
              src="Focal/Observations.png"
              alt="Observations at restaurants"
              className="w-full"
              loading="lazy"
            />
            <div className="p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Observations
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Conducted stakeouts at five restaurants. Identified important
                moments from parklet cameras.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <img
              src="Focal/Interviews.png"
              alt="Interview notes"
              className="w-full"
              loading="lazy"
            />
            <div className="p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Interviews
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Notes from manager YES/NO decisions from ~20 restaurants when
                pitched pricing.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* How Might We */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Reframing the Challenge
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          How Might We...
        </h2>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic mb-10">
          Create a heating system for restaurant parklets that feels more
          convenient, flexible, and ambient for guests and staff.
        </p>
        <img
          src="Focal/How Might We.png"
          alt="How Might We synthesis"
          className="w-full rounded-sm"
          loading="lazy"
        />
      </motion.div>
    </section>

    {/* Themes and Insights */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8">
          Themes & Insights
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-sm p-6">
            <h3 className="text-lg font-medium text-foreground mb-3">
              Convenience
            </h3>
            <ul className="space-y-2 text-base text-muted-foreground leading-relaxed">
              <li>Guests feel guilty inconveniencing staff and struggle to get attention in the parklet.</li>
              <li>Heaters must be simpler than flicking a light switch to compete with electric systems.</li>
              <li>Outdoor table objects frequently get lost or broken during clean-up.</li>
            </ul>
          </div>

          <div className="bg-card rounded-sm p-6">
            <h3 className="text-lg font-medium text-foreground mb-3">
              Ambiance
            </h3>
            <ul className="space-y-2 text-base text-muted-foreground leading-relaxed">
              <li>Restaurants want to maintain aesthetics and foster a human-centered experience.</li>
              <li>Restaurants promote heaters to attract guests to the parklet.</li>
              <li>Guests enjoy the ambient glow that heaters create.</li>
            </ul>
          </div>

          <div className="bg-card rounded-sm p-6">
            <h3 className="text-lg font-medium text-foreground mb-3">
              Flexibility
            </h3>
            <ul className="space-y-2 text-base text-muted-foreground leading-relaxed">
              <li>Guests dine outdoors for large groups, strollers, or dogs, needs hard to meet indoors.</li>
              <li>Guests rearrange tables and chairs to suit their needs.</li>
              <li>Parklets feature various table and chair arrangements.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Case Studies */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8">
          Restaurant Case Studies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Cole Valley Tavern */}
          <div className="border border-border rounded-sm overflow-hidden bg-background">
            <img
              src="Focal/Cole Valley Tavern.png"
              alt="Cole Valley Tavern"
              className="w-full"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-medium text-foreground mb-3">
                Cole Valley Tavern
              </h3>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Under-staffed, casual atmosphere
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Goal: Encourage more guests to eat outdoors when it's cold.
                Needs a way for guests to stay warm without disrupting staff
                workflow.
              </p>
              <div className="space-y-3 pt-4 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    George & Sam
                  </p>
                  <p className="text-base text-muted-foreground">
                    Tech-savvy co-workers who struggle to get staff attention in
                    the parklet. Would prefer to control their own heater.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Niko</p>
                  <p className="text-base text-muted-foreground">
                    Eats outdoors because of her dogs. Gets cold more easily than
                    friends and prefers having a heater on while they don't.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vega */}
          <div className="border border-border rounded-sm overflow-hidden bg-background">
            <img
              src="Focal/Vega.png"
              alt="Vega restaurant"
              className="w-full"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-medium text-foreground mb-3">Vega</h3>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                High-end, well-staffed
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Goal: Provide an exceptionally pleasant heating experience.
                Needs a convenient system with minimal labor and cost to staff.
              </p>
              <div className="space-y-3 pt-4 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Jude & Sergio
                  </p>
                  <p className="text-base text-muted-foreground">
                    Senior couple who enjoy the parklet for fresh air. Prefer
                    low-tech, relaxed dining experiences.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Danielle
                  </p>
                  <p className="text-base text-muted-foreground">
                    Hosting extended family of eight. Wants an easy way to adjust
                    heat for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* User Journeys */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Mapping the Experience
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Plotting the Ideal Heating Journey
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          I mapped out the complete user journey for both guests and staff,
          identifying key moments of friction and delight throughout the heating
          experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src="Focal/User Journeys Left.png"
            alt="User journey map, left"
            className="w-full rounded-sm"
            loading="lazy"
          />
          <img
            src="Focal/User Journeys Right.png"
            alt="User journey map, right"
            className="w-full rounded-sm"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>

    {/* Pain Points */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8">
          Pain Points
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Forgetfulness and tediousness around turning off heaters",
            "Confusion if heater is on, off, or warming up",
            "Equipment weathering and insufficient communication of technical issues",
            "Unclarity around what Focal is and how to operate it",
          ].map((pain, i) => (
            <div
              key={i}
              className="flex gap-4 items-start bg-background border border-border rounded-sm p-5"
            >
              <span className="text-2xl font-light text-primary leading-none mt-0.5">
                {i + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed">{pain}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* Research Informed Projects */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Research-Informed Projects
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          From Friction to Four High-Impact Projects
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl">
          By identifying points of friction through user journey mapping and
          other methods, I scoped out four high-impact projects feasible within
          my limited timeline, all aimed at enhancing the user experience:
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="grid grid-cols-1 gap-4 md:w-1/2">
            {[
              {
                num: "01",
                title: "Updated Admin UI",
                desc: "Added thumbnails for table layouts, improved mobile responsiveness, and created a new auto-off feature for heaters.",
              },
              {
                num: "02",
                title: "Revised Guest UI",
                desc: "Proposed a progress bar, designed an \"Offline Heater\" screen, enhanced accessibility, and improved guest heat control.",
              },
              {
                num: "03",
                title: "Improved Clarity",
                desc: "Updated materials for durability and clearer communication.",
              },
              {
                num: "04",
                title: "Guest Product Education",
                desc: "Explored ideas such as signage, lighting, symbols, and scripts to help guests understand the product.",
              },
            ].map((project) => (
              <div
                key={project.num}
                className="bg-card rounded-sm p-5 flex gap-4"
              >
                <span className="text-2xl font-light text-primary leading-none">
                  {project.num}
                </span>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <img
            src="Focal/Research Informed Projects.png"
            alt="Four research-informed projects"
            className="w-full md:w-1/2 rounded-sm"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>

    {/* Reflection */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Looking Back
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Building Conviction
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Working on a small team with limited bandwidth, I quickly realized the
          importance of building strong conviction for the design propositions I
          presented to the engineering team. To ensure my ideas were
          well-founded, I conducted interviews, prototyped solutions, and ran
          experiments to gather concrete evidence. This approach not only
          strengthened my proposals but also helped streamline decision-making. I
          learned that unless I could clearly articulate the need for a change,
          it was often best to maintain consistency in the current iteration,
          focusing on refining existing elements rather than introducing
          unnecessary complexity. This experience taught me the value of being
          both methodical and persuasive in a fast-paced, resource-constrained
          environment.
        </p>
      </motion.div>
    </section>

    {/* Next Projects */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 border-t border-border">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8 text-center">
        Next Projects
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/case-study/carta"
          className="group border border-border rounded-sm p-6 hover:border-primary transition-colors"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Product Design & Launch
          </p>
          <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            Designed Degree Tracker UI for Stanford's Academic Planner
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

export default CaseStudyFocal;
