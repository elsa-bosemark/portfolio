import PaperCard from "../components/PaperCard";
import ContentImage from "../components/ContentImage";
import { motion } from "framer-motion";
import PaperAction from "../components/PaperAction";
import PaperTags from "../components/PaperTags";
import CaseStudyNav from "../components/CaseStudyNav";
import CaseStudyNextProjects from "../components/CaseStudyNextProjects";
import CaseStudyContents from "../components/CaseStudyContents";
import ProjectGradient from "../components/CaseStudyGradient";
import { caseStudyFadeIn as fadeIn } from "../lib/case-study-motion";
import "./Portfolio.css";


const CaseStudySafeBites = () => (
  <main className="case-study study-safebites min-h-screen">
    {/* Back link */}
    <CaseStudyNav project="SafeBites" />

    {/* Hero */}
    <section className="study-hero px-6 md:px-16 lg:px-24 pt-16 pb-12">
      <ProjectGradient project="safebites" />
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
              <PaperTags tags={["Mobile App Dev", "Presenting", "Team Management", "Beta Testing"]} label="SafeBites skills" />
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
          className="study-art lg:w-1/2 flex items-center justify-center"
        >
<ContentImage
            src="SafeBites/topthumbnailimage.png"
            alt="SafeBites app"
            className="w-full max-w-sm study-transparent-image" width={913} height={1328} loading="eager" fetchPriority="high" />
        </motion.div>
      </div>
    </section>
    <div className="study-body-layout">
      <CaseStudyContents project="SafeBites" />
      <div className="study-body-content">

    {/* Problem Statement */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="study-section-inner">
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
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
      <motion.div {...fadeIn} className="study-section-inner">
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
      <motion.div {...fadeIn} className="study-section-inner">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Recognition
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Awards & Press
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PaperCard >
            <h3 className="paper-card-metric">1st Place</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              MIT App Inventor 2020 Hackathon, Youth Team Category
            </p>
          </PaperCard>
          <PaperCard >
            <h3 className="paper-card-metric">CNN</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Interviewed for a CNN Digital article and featured on their Instagram
            </p>
          </PaperCard>
          <PaperCard >
            <h3 className="paper-card-metric">20</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Restaurants onboarded for beta testing the app
            </p>
          </PaperCard>
        </div>
      </motion.div>
    </section>

    {/* Context */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
      <motion.div {...fadeIn} className="study-section-inner">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Where It Started
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Drew Inspiration from Personal Experiences
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
<ContentImage
            src="SafeBites/Context.png"
            alt="SafeBites team context"
            className="w-full md:w-1/2 rounded-sm"
            loading="lazy" width={1024} height={691} />
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
      <motion.div {...fadeIn} className="study-section-inner">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Proof of Concept
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          Gauged Desirability and Built Momentum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
<ContentImage
              src="SafeBites/Brought Ideas to Life.png"
              alt="MIT Hackathon submission"
              className="w-full study-transparent-image mb-5"
              loading="lazy" width={1024} height={647} />
            <h3 className="text-xl font-medium text-foreground mb-3">
              Brought Ideas to Life
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Created an app for the one-week-long MIT App Inventor Hackathon.
              Won first place for the youth team category.
            </p>
          </div>

          <div>
<ContentImage
              src="SafeBites/Online Excitement .png"
              alt="CNN Digital coverage of SafeBites"
              className="w-full rounded-sm mb-5"
              loading="lazy" width={1024} height={662} />
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
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
      <motion.div {...fadeIn} className="study-section-inner">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Revised Design
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-8">
          What Changed in the Revised Design
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">I refined four parts of the app: finding restaurants, understanding their safety information, rating them, and returning to saved places.</p>

<ContentImage
          src="SafeBites/Revised Design.png"
          alt="Revised SafeBites design"
          className="w-full study-transparent-image mb-10"
          loading="lazy" width={1807} height={2048} />

        <ol className="study-question-list">
          {[
            {
              num: "01",
              title: "Homepage: Find Nearby Restaurants",
              desc: "Added quick actions for relevant filters and nearby restaurants, giving diners a clearer starting point for their search.",
            },
            {
              num: "02",
              title: "Restaurant Details: Summary First, Details Next",
              desc: "Organized the restaurant page around a summary, with more detailed information available for diners who want to explore further.",
            },
            {
              num: "03",
              title: "Ratings: Updated Safety Criteria",
              desc: "Updated the rating metrics using CDC guidelines at the time, so the criteria reflected the safety information the app was designed to help diners assess.",
            },
            {
              num: "04",
              title: "Profile: Keep Track of Places and Activity",
              desc: "Brought saved restaurants, recent ratings, and comments together on the profile page, so diners could revisit places and review their activity.",
            },
          ].map((item) => (
            <li key={item.num} className="study-question-item">
              <div>
                <h3 className="text-base font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>

    {/* Coding */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div {...fadeIn} className="study-section-inner">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Coding
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight text-foreground mb-6">
          React Native Mobile App Development
        </h2>
        <div className="study-project-introduction">
<ContentImage
          src="SafeBites/Coding.png"
          alt="SafeBites code and GitHub repo"
          className="w-full study-transparent-image"
          loading="lazy" width={3249} height={1828} />
          <div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          As the front-end lead, I was responsible for building the app
          architecture and bringing the designs to life in code.
        </p>

        <PaperAction href="https://github.com/elsa-bosemark/SafeBites-ReactNative/tree/master">View GitHub Repo</PaperAction>
          </div>


        </div>

        <ol className="study-question-list">
          <li className="study-question-item">
            <h3 className="text-base font-medium text-foreground mb-2">
              Component Architecture
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Organized the front-end architecture to utilize components,
              enabling faster development and easier maintenance.
            </p>
          </li>
          <li className="study-question-item">
            <h3 className="text-base font-medium text-foreground mb-2">
              API Integration
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Utilized APIs from Yelp, Google, and Apple Maps for
              comprehensive location-based information.
            </p>
          </li>
          <li className="study-question-item">
            <h3 className="text-base font-medium text-foreground mb-2">
              Backend Collaboration
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Collaborated with the backend developer to ensure accurate data
              was pulled from Firebase.
            </p>
          </li>
          <li className="study-question-item">
            <h3 className="text-base font-medium text-foreground mb-2">
              Cross-Platform
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Adapted the code for compatibility across different phone sizes,
              iOS and Android devices.
            </p>
          </li>
        </ol>
      </motion.div>
    </section>

    {/* Looking Back */}
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
      <motion.div {...fadeIn} className="study-section-inner">
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

    <CaseStudyNextProjects current="safebites" />
      </div>
    </div>
  </main>
);

export default CaseStudySafeBites;
