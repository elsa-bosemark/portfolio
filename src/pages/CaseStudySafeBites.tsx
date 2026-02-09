import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const CaseStudySafeBites = () => (
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
              Mobile App Development & Design
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-10">
              Coded an App for Safer Dining Experiences During{" "}
              <span className="text-primary">COVID-19</span>
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
              <p className="text-foreground">Front-end Developer, UI/UX Designer, Co-founder</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Timeline
              </p>
              <p className="text-foreground">2 months</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Mobile App Dev", "Presenting", "Team Management", "Beta Testing"].map(
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
              <p className="text-foreground">React Native, Video Editing, Figma</p>
            </div>
          </motion.div>
        </div>

        {/* Right: thumbnail image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 flex items-center justify-center"
        >
          <img
            src="/SafeBites/topthumbnailimage.png"
            alt="SafeBites app"
            className="w-full max-w-sm rounded-sm"
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
          Finding Restaurants During COVID-19
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          After months of quarantine because of COVID-19, restaurants were slowly
          reopening. Yet how do customers know which restaurants best follow
          health regulations, especially for individuals at higher risk?
        </p>
      </motion.div>
    </section>

    {/* Solution */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          The Solution
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Helping Restaurants Highlight Their Safety Measures
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          SafeBites addresses this dilemma by providing a platform for customers
          to review restaurants' compliance to the Center of Disease Control
          (CDC) COVID-19 safety guidelines.
        </p>
        <div className="aspect-video rounded-sm overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/JU45pUJp5jA"
            title="SafeBites demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </section>

    {/* Results */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Recognition
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Awards & Press
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-card rounded-sm p-6 border border-border">
            <p className="text-2xl font-light text-primary mb-2">1st Place</p>
            <p className="text-base text-muted-foreground leading-relaxed">
              MIT App Inventor 2020 Hackathon, Youth Team Category
            </p>
          </div>
          <div className="bg-card rounded-sm p-6 border border-border">
            <p className="text-2xl font-light text-primary mb-2">CNN</p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Interviewed for a CNN Digital article and featured on their Instagram
            </p>
          </div>
          <div className="bg-card rounded-sm p-6 border border-border">
            <p className="text-2xl font-light text-primary mb-2">20</p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Restaurants onboarded for beta testing the app
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Context */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Where It Started
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Drew Inspiration from Personal Experiences
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src="/SafeBites/Context.png"
            alt="SafeBites team context"
            className="w-full md:w-1/2 rounded-sm"
            loading="lazy"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            During the summer of 2020, I teamed up with five friends who were
            inspired by the closure of one of our friend's family restaurants.
            We started to explore ways we could highlight the hard work
            restaurants were putting in to protect customers during the pandemic.
          </p>
        </div>
      </motion.div>
    </section>

    {/* Proof of Concept */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Proof of Concept
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Gauged Desirability and Built Momentum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="/SafeBites/Brought Ideas to Life.png"
              alt="MIT Hackathon submission"
              className="w-full rounded-sm mb-5"
              loading="lazy"
            />
            <h3 className="text-xl font-medium text-foreground mb-3">
              Brought Ideas to Life
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Created an app for the one-week-long MIT App Inventor Hackathon.
              Won first place for the youth team category.
            </p>
          </div>

          <div>
            <img
              src="/SafeBites/Online Excitement .png"
              alt="CNN Digital coverage of SafeBites"
              className="w-full rounded-sm mb-5"
              loading="lazy"
            />
            <h3 className="text-xl font-medium text-foreground mb-3">
              Online Excitement
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our work was covered by CNN Digital and featured on their Instagram.
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Revised Design */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-card">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Revised Design
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Honed Use Cases and Features
        </h2>

        <img
          src="/SafeBites/Revised Design.png"
          alt="Revised SafeBites design"
          className="w-full rounded-sm mb-10"
          loading="lazy"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Homepage Quick Actions",
              desc: "Relevant filters and view nearby restaurants.",
            },
            {
              num: "02",
              title: "Restaurant Detail Page",
              desc: "Restaurant summary and explore information in depth.",
            },
            {
              num: "03",
              title: "Rating",
              desc: "Updated metrics based on CDC guidelines.",
            },
            {
              num: "04",
              title: "Profile Page",
              desc: "Save restaurants and view recent ratings & comments.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-background rounded-sm p-5 flex gap-4"
            >
              <span className="text-2xl font-light text-primary leading-none">
                {item.num}
              </span>
              <div>
                <h3 className="text-base font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* Coding */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Coding
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          React Native Mobile App Development
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          As the front-end lead, I was responsible for building the app
          architecture and bringing the designs to life in code.
        </p>

        <img
          src="/SafeBites/Coding.png"
          alt="SafeBites code and GitHub repo"
          className="w-full rounded-sm mb-10"
          loading="lazy"
        />

        <a
          href="https://github.com/elsa-bosemark/SafeBites-ReactNative/tree/master"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-primary/90 transition-colors mb-10"
        >
          View GitHub Repo &rarr;
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-base font-medium text-foreground mb-2">
              Component Architecture
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Organized the front-end architecture to utilize components,
              enabling faster development and easier maintenance.
            </p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-base font-medium text-foreground mb-2">
              API Integration
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Utilized APIs from Yelp, Google, and Apple Maps for
              comprehensive location-based information.
            </p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-base font-medium text-foreground mb-2">
              Backend Collaboration
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Collaborated with the backend developer to ensure accurate data
              was pulled from Firebase.
            </p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-base font-medium text-foreground mb-2">
              Cross-Platform
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Adapted the code for compatibility across different phone sizes,
              iOS and Android devices.
            </p>
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
          A Fleeting Wave of Demand
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          The team reached out to 20 local restaurants to beta test the
          application. However, at the point we were ready to launch we realized
          that our approach to addressing our users' needs was inherently
          short-sighted. It was apparent that larger companies like Yelp and
          Google would eventually incorporate similar features into their
          products. Our app fulfilled a "spike demand" rather than addressing a
          longer-term need. Still, I enjoyed working on the project and gained
          valuable skills in the process. In the future, I recognize that my
          focus should be on creating products with enduring utility, rather than
          catering to short-lived trends.
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          Managing Virtual Work
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The app came to life during the COVID lockdown, which meant a whole
          lot of Zoom sessions. Collaborating virtually brought its own set of
          pros and cons, and it was a valuable learning experience for me. The
          key lesson is all about communication! I found that things worked
          smoother when people regularly shared their progress, especially in
          the realm of software development. I started adopting this practice
          myself because I appreciated when others did it. Turns out, those
          regular updates were way better at keeping everyone on the same page.
          Sure, it might have been easier for us since we were a smaller and
          tech-savvy team, but it taught me to truly value the concept of
          sharing work and ideas collaboratively.
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
      </div>
    </section>
  </main>
);

export default CaseStudySafeBites;
